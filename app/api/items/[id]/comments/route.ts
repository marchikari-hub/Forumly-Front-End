import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUser, unauthorized } from "@/lib/auth";
import { notify } from "@/lib/notify";
import { findItemId, notFound } from "@/lib/validate";

export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const me = await getUser();
  const rows = db
    .prepare("SELECT id,author,text FROM comments WHERE item_id=? ORDER BY id")
    .all(Number(params.id)) as { id: number; author: string; text: string }[];
  return NextResponse.json(
    rows.map((c) => ({ id: c.id, author: c.author, text: c.text, mine: !!me && c.author === me }))
  );
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const me = await getUser();
  if (!me) return unauthorized();

  const id = findItemId(params.id, "posts");
  if (id === null) return notFound();

  const { text } = await req.json();
  const t = String(text || "").trim();
  if (!t) return NextResponse.json({ error: "empty" }, { status: 400 });

  db.prepare("INSERT INTO comments (item_id,author,text,created_at) VALUES (?,?,?,?)").run(id, me, t, Date.now());

  const item = db.prepare("SELECT author, community FROM items WHERE id = ?").get(id) as
    | { author: string | null; community: string }
    | undefined;
  if (item?.author) {
    notify({
      to: item.author,
      actor: me,
      icon: "💬",
      message: "commented on your post in",
      community: item.community,
      snippet: t.slice(0, 140),
      itemId: id,
    });
  }
  return NextResponse.json({ ok: true });
}