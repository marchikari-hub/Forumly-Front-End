import { DatabaseSync } from "node:sqlite";
import path from "path";
import fs from "fs";
import { hashPassword } from "./password";
import { INITIAL_POSTS, INITIAL_COMMUNITIES } from "@/app/data/forumData";

export const ME = "Gracia";

const dir = path.join(process.cwd(), "data");
fs.mkdirSync(dir, { recursive: true });

const g = globalThis as unknown as { forumlyDb?: DatabaseSync };

function count(db: DatabaseSync, table: string): number {
  return (db.prepare(`SELECT COUNT(*) c FROM ${table}`).get() as { c: number }).c;
}

function addColumn(db: DatabaseSync, table: string, column: string, definition: string) {
  const cols = db.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[];
  if (!cols.some((c) => c.name === column)) {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  }
}

function seedStatic(db: DatabaseSync) {
  const find = db.prepare("SELECT id FROM items WHERE source_id = ?");
  const insItem = db.prepare(
    "INSERT INTO items (category,community,author,meta,title,content,base_likes,created_at,source_id,title_en,content_en,meta_en,image_url,video_url) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
  );
  const updItem = db.prepare(
    "UPDATE items SET community=?, author=?, meta=?, title=?, content=?, base_likes=?, title_en=?, content_en=?, meta_en=?, image_url=?, video_url=? WHERE source_id=?"
  );
  const insComment = db.prepare("INSERT INTO comments (item_id,author,text,created_at) VALUES (?,?,?,?)");
  const now = Date.now();

  INITIAL_POSTS.forEach((p, i) => {
    const meta = `Posted by ${p.author} ${p.timeId}`;
    const metaEn = `Posted by ${p.author} ${p.timeEn}`;
    const image = p.imageUrl ?? null;
    const video = p.videoUrl ?? null;
    const existing = find.get(p.id) as { id: number } | undefined;

    if (existing) {
      updItem.run(p.genreId, p.author, meta, p.titleId, p.excerptId, p.likes, p.titleEn, p.excerptEn, metaEn, image, video, p.id);
      return;
    }

    const at = now - (i + 1) * 3600e3;
    const r = insItem.run("posts", p.genreId, p.author, meta, p.titleId, p.excerptId, p.likes, at, p.id, p.titleEn, p.excerptEn, metaEn, image, video);
    const itemId = Number(r.lastInsertRowid);
    p.comments.forEach((c, j) => insComment.run(itemId, c.author, c.text, at + (j + 1) * 60e3));
  });

  INITIAL_COMMUNITIES.forEach((c) => {
    if (find.get(c.id)) return;
    insItem.run("community", `r/${c.slug}`, null, `${c.members} Members`, c.nameId, c.descId, 0, now, c.id, c.nameEn, c.descEn, `${c.members} Members`, null, null);
  });
}

function init(): DatabaseSync {
  const db = new DatabaseSync(path.join(dir, "forumly.db"));
  db.exec("PRAGMA journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE COLLATE NOCASE,
      password_hash TEXT NOT NULL,
      created_at INTEGER
    );
    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY, user TEXT, type TEXT NOT NULL, icon TEXT, actor TEXT,
      message TEXT, community TEXT, snippet TEXT, item_id INTEGER, created_at INTEGER,
      is_read INTEGER DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      community TEXT, author TEXT, meta TEXT, title TEXT NOT NULL,
      content TEXT, kind TEXT DEFAULT 'text',
      base_likes INTEGER DEFAULT 0,
      media BLOB, media_type TEXT, media_name TEXT,
      created_at INTEGER, source_id TEXT
    );
    CREATE TABLE IF NOT EXISTS reactions (
      item_id INTEGER, user TEXT, type TEXT, reason TEXT,
      PRIMARY KEY (item_id, user, type)
    );
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT, item_id INTEGER, author TEXT,
      text TEXT, created_at INTEGER
    );
    CREATE TABLE IF NOT EXISTS joined (user TEXT, item_id INTEGER, PRIMARY KEY (user, item_id));
  `);

  addColumn(db, "notifications", "user", "TEXT");
  addColumn(db, "notifications", "item_id", "INTEGER");
  addColumn(db, "items", "source_id", "TEXT");
  addColumn(db, "items", "title_en", "TEXT");
  addColumn(db, "items", "content_en", "TEXT");
  addColumn(db, "items", "meta_en", "TEXT");
  addColumn(db, "items", "image_url", "TEXT");
  addColumn(db, "items", "video_url", "TEXT");

  if (count(db, "users") === 0) {
    db.prepare("INSERT INTO users (username,password_hash,created_at) VALUES (?,?,?)")
      .run(ME, hashPassword(process.env.SEED_PASSWORD || "gracia123"), Date.now());
  }

  db.exec(`
    DELETE FROM items WHERE source_id IS NULL AND author IS NOT NULL AND author NOT IN (SELECT username FROM users);
    DELETE FROM items WHERE source_id IS NULL AND category IN ('community','comments');
    DELETE FROM comments WHERE item_id NOT IN (SELECT id FROM items);
    DELETE FROM reactions WHERE item_id NOT IN (SELECT id FROM items);
    DELETE FROM joined WHERE item_id NOT IN (SELECT id FROM items);
  `);

  seedStatic(db);

  if (count(db, "notifications") === 0) {
    const now = Date.now();
    const n = db.prepare(
      "INSERT INTO notifications (user,type,icon,actor,message,community,snippet,created_at,is_read) VALUES (?,?,?,?,?,?,?,?,?)"
    );
    n.run(ME, "notification", "🤖", "u/AutoModerator", "welcome to", "Forumly", "Please read the rules before posting.", now - 3600e3, 0);
    n.run(ME, "messages", "💬", "u/kang_kung", "sent you a direct message", null, "Bowleh minta tips bikin dropdown pakai jQuery?", now - 86400e3, 1);
  }
  db.prepare("UPDATE notifications SET user = ? WHERE user IS NULL").run(ME);

  return db;
}

export const db = g.forumlyDb ?? (g.forumlyDb = init());

export function timeAgo(ts: number): string {
  const s = Math.max(1, Math.floor((Date.now() - ts) / 1000));
  if (s < 3600) return `${Math.max(1, Math.floor(s / 60))} minutes ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} hours ago`;
  return `${Math.floor(s / 86400)} days ago`;
}