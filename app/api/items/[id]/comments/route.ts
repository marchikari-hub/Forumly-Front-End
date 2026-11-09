import { NextResponse } from "next/server";
import { db, ME } from "@/lib/db";

export const dynamic = "force-dynamic";

export function GET(_: Request, { params }: { params: { id: string } }) {
  return NextResponse.json(db.prepare("SELECT id,author,text FROM comments WHERE item_id=? ORDER BY id").all(Number(params.id)));
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { text } = await req.json();
  const t = String(text || "").trim();
  if (!t) return NextResponse.json({ error: "empty" }, { status: 400 });
  db.prepare("INSERT INTO comments (item_id,author,text,created_at) VALUES (?,?,?,?)").run(Number(params.id), ME, t, Date.now());
  return NextResponse.json({ ok: true });
}
