import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUser, unauthorized } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const me = await getUser();
  const rows = db.prepare("SELECT id,author,text FROM comments WHERE item_id=? ORDER BY id")
    .all(Number(params.id)) as { id: number; author: string; text: string }[];
  return NextResponse.json(rows.map((c) => ({ id: c.id, author: c.author, text: c.text, mine: !!me && c.author === me })));
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const me = await getUser();
  if (!me) return unauthorized();

  const { text } = await req.json();
  const t = String(text || "").trim();
  if (!t) return NextResponse.json({ error: "empty" }, { status: 400 });
  db.prepare("INSERT INTO comments (item_id,author,text,created_at) VALUES (?,?,?,?)")
    .run(Number(params.id), me, t, Date.now());
  return NextResponse.json({ ok: true });
}