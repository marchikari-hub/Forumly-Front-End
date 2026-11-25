import { NextResponse } from "next/server";
import { db, ME } from "@/lib/db";
import type { Item } from "@/lib/types";

export const dynamic = "force-dynamic";

export function GET(req: Request) {
  const q = (new URL(req.url).searchParams.get("q") || "").trim().toLowerCase();
  const rows = db.prepare(
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
  ).all(ME, ME, ME, q, `%${q}%`) as any[];

  const items: Item[] = rows.map((r) => ({
    id: r.id, category: r.category, community: r.community, meta: r.meta, title: r.title,
    content: r.content || "", kind: r.kind, hasMedia: !!r.media_type, mediaType: r.media_type, mediaName: r.media_name,
    likes: r.base_likes + r.likes, dislikes: r.dislikes, commentCount: r.ccount,
    liked: !!r.liked, disliked: !!r.disliked, joined: !!r.joined,
  }));
  return NextResponse.json(items);
}
