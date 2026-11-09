import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

export const ME = "Gracia";

const dir = path.join(process.cwd(), "data");
fs.mkdirSync(dir, { recursive: true });

const g = globalThis as unknown as { forumlyDb?: Database.Database };

function init(): Database.Database {
  const db = new Database(path.join(dir, "forumly.db"));
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY, type TEXT NOT NULL, icon TEXT, actor TEXT,
      message TEXT, community TEXT, snippet TEXT, created_at INTEGER,
      is_read INTEGER DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,            -- posts | community | comments
      community TEXT, author TEXT, meta TEXT, title TEXT NOT NULL,
      content TEXT, kind TEXT DEFAULT 'text',   -- text | media | link
      base_likes INTEGER DEFAULT 0,
      media BLOB, media_type TEXT, media_name TEXT,
      created_at INTEGER
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

  if (db.prepare("SELECT COUNT(*) c FROM notifications").get() as { c: number } && (db.prepare("SELECT COUNT(*) c FROM notifications").get() as { c: number }).c === 0) {
    const now = Date.now();
    const n = db.prepare("INSERT INTO notifications (type,icon,actor,message,community,snippet,created_at,is_read) VALUES (?,?,?,?,?,?,?,?)");
    n.run("notification", "👤", "u/kang_kung", "replied to your post in", "r/indonesia", "Mantap bro, tutorialnya gacor banget!", now - 5 * 60e3, 0);
    n.run("notification", "🤖", "u/AutoModerator", "welcome to", "r/webdev", "Please read the rules before posting.", now - 3600e3, 0);
    n.run("messages", "💬", "u/kang_kung", "sent you a direct message", null, "Bowleh minta tips bikin dropdown pakai jQuery?", now - 86400e3, 1);
  }

  if ((db.prepare("SELECT COUNT(*) c FROM items").get() as { c: number }).c === 0) {
    const h = 3600e3, now = Date.now();
    const i = db.prepare("INSERT INTO items (category,community,author,meta,title,content,base_likes,created_at) VALUES (?,?,?,?,?,?,?,?)");
    i.run("posts", "Teknologi", "Budi Setiwan", "Posted by Budi Setiwan 2 jam lalu", "Tips belajar struktur data dan algoritma untuk persiapan praktikum minggu depan?", "Lagi persiapan ujian modul pohon (tree) dan graf. Ada saran visualisasi algoritma atau metode latihan yang efektif?", 14, now - 2 * h);
    i.run("posts", "Anime", "Rian Pratama", "Posted by Rian Pratama 4 jam lalu", "Anime Spring Season 2026 mana yang paling worth it buat diikuti?", "Musim ini lumayan banyak rilis sekuel dan adaptasi baru. Mau minta rekomendasi anime genre misteri atau slice of life.", 28, now - 4 * h);
    i.run("posts", "r/vitaminme", "wowonheean", "Posted by wowonheean 12 hours ago", "Kenawhy idol itu cape?", "I see mereka have fun aja tapi kenapa keliatanya kaya tekanan bagong?", 888, now - 12 * h);
    i.run("posts", "r/indonesia", "Mymintz", "Posted by Mymintz 10 hours ago", "Tutorial kena ban laptop", "Step 1 buka file explorer dan search windows lalu delete and done.", 10000, now - 10 * h);
    i.run("community", "r/Gllitz", null, "55M Members", "Komunitas Pecinta Illit", "Subreddit untuk para penggemar Illit berbagi dan berdiskusi.", 0, now);
    i.run("comments", "r/indonesia", "Mymintz", "Comment by Mymintz 9 hours ago", "Re: Tutorial kena ban laptop", "Jangan dicoba di laptop kantor ya, nanti beneran kena ban.", 420, now - 9 * h);
  }
  return db;
}

export const db = g.forumlyDb ?? (g.forumlyDb = init());

export function timeAgo(ts: number): string {
  const s = Math.max(1, Math.floor((Date.now() - ts) / 1000));
  if (s < 3600) return `${Math.max(1, Math.floor(s / 60))} minutes ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} hours ago`;
  return `${Math.floor(s / 86400)} days ago`;
}
