import { NextResponse } from "next/server";
import { db, timeAgo } from "@/lib/db";
import { getUser, unauthorized } from "@/lib/auth";
import type { Notif } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const me = await getUser();
  if (!me) return unauthorized();

  const rows = db
    .prepare(
      `SELECT n.*, i.title AS post_title
       FROM notifications n
       LEFT JOIN items i ON i.id = n.item_id
       WHERE n.user = ?
       ORDER BY n.created_at DESC, n.id DESC`
    )
    .all(me) as any[];

  const list: Notif[] = rows.map((r) => ({
    id: r.id,
    type: r.type,
    icon: r.icon,
    actor: r.actor,
    message: r.message,
    community: r.community,
    snippet: r.snippet,
    time: timeAgo(r.created_at),
    unread: !r.is_read,
    postTitle: r.post_title ?? null,
  }));
  return NextResponse.json(list);
}

export async function PATCH(req: Request) {
  const me = await getUser();
  if (!me) return unauthorized();

  const { id, all } = await req.json();
  if (all) db.prepare("UPDATE notifications SET is_read = 1 WHERE user = ?").run(me);
  else db.prepare("UPDATE notifications SET is_read = 1 WHERE user = ? AND id = ?").run(me, Number(id));
  return NextResponse.json({ ok: true });
}