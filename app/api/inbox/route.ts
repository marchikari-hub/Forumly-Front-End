import { NextResponse } from "next/server";
import { db, timeAgo } from "@/lib/db";
import type { Notif } from "@/lib/types";

export const dynamic = "force-dynamic";

export function GET() {
  const rows = db.prepare("SELECT * FROM notifications ORDER BY created_at DESC").all() as any[];
  const list: Notif[] = rows.map((r) => ({
    id: r.id, type: r.type, icon: r.icon, actor: r.actor, message: r.message,
    community: r.community, snippet: r.snippet, time: timeAgo(r.created_at), unread: !r.is_read,
  }));
  return NextResponse.json(list);
}

export async function PATCH(req: Request) {
  const { id, all } = await req.json();
  if (all) db.prepare("UPDATE notifications SET is_read = 1").run();
  else db.prepare("UPDATE notifications SET is_read = 1 WHERE id = ?").run(id);
  return NextResponse.json({ ok: true });
}
