import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUser } from "@/lib/auth";
import type { CommentHit, Item, UserHit } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const me = (await getUser()) ?? "";
  const q = (new URL(req.url).searchParams.get("q") || "").trim().toLowerCase();
  const like = `%${q}%`;

  const rows = db
    .prepare(
      `SELECT i.*,
        (SELECT COUNT(*) FROM reactions r WHERE r.item_id=i.id AND r.type='like') AS likes,
        (SELECT COUNT(*) FROM reactions r WHERE r.item_id=i.id AND r.type='dislike') AS dislikes,
        (SELECT COUNT(*) FROM comments c WHERE c.item_id=i.id) AS ccount,
        EXISTS(SELECT 1 FROM reactions r WHERE r.item_id=i.id AND r.type='like' AND r.user=?) AS liked,
        EXISTS(SELECT 1 FROM reactions r WHERE r.item_id=i.id AND r.type='dislike' AND r.user=?) AS disliked,
        EXISTS(SELECT 1 FROM joined j WHERE j.item_id=i.id AND j.user=?) AS joined
       FROM items i
       WHERE (? = '' OR lower(i.title || ' ' || ifnull(i.content,'') || ' ' || ifnull(i.community,'') || ' ' || ifnull(i.meta,'')) LIKE ?)
       ORDER BY i.created_at DESC, i.id DESC`
    )
    .all(me, me, me, q, like) as any[];

  const items: Item[] = rows.map((r) => ({
    id: r.id,
    category: r.category,
    community: r.community,
    meta: r.meta,
    title: r.title,
    content: r.content || "",
    kind: r.kind,
    hasMedia: !!r.media_type,
    mediaType: r.media_type,
    mediaName: r.media_name,
    likes: r.base_likes + r.likes,
    dislikes: r.dislikes,
    commentCount: r.ccount,
    liked: !!r.liked,
    disliked: !!r.disliked,
    joined: !!r.joined,
  }));

  const users = db
    .prepare(
      `SELECT u.username,
        (SELECT COUNT(*) FROM items i WHERE i.author = u.username AND i.category = 'posts') AS posts,
        (SELECT COUNT(*) FROM comments c WHERE c.author = u.username) AS comments
       FROM users u
       WHERE (? = '' OR lower(u.username) LIKE ?)
       ORDER BY u.username`
    )
    .all(q, like) as UserHit[];

  const commentRows = db
    .prepare(
      `SELECT c.id, c.author, c.text, i.id AS post_id, i.title AS post_title
       FROM comments c
       JOIN items i ON i.id = c.item_id
       WHERE (? = '' OR lower(c.text || ' ' || c.author) LIKE ?)
       ORDER BY c.created_at DESC, c.id DESC`
    )
    .all(q, like) as any[];

  const comments: CommentHit[] = commentRows.map((c) => ({
    id: c.id,
    author: c.author,
    text: c.text,
    postId: c.post_id,
    postTitle: c.post_title,
  }));

  return NextResponse.json({ items, users, comments });
}