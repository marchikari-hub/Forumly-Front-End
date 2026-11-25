import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUser, unauthorized } from "@/lib/auth";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const me = await getUser();
  if (!me) return unauthorized();

  const { type } = await req.json();
  if (type !== "like" && type !== "dislike")
    return NextResponse.json({ error: "bad type" }, { status: 400 });
  const id = Number(params.id), other = type === "like" ? "dislike" : "like";
  const has = db.prepare("SELECT 1 FROM reactions WHERE item_id=? AND user=? AND type=?").get(id, me, type);
  if (has) {
    db.prepare("DELETE FROM reactions WHERE item_id=? AND user=? AND type=?").run(id, me, type);
  } else {
    db.prepare("DELETE FROM reactions WHERE item_id=? AND user=? AND type=?").run(id, me, other);
    db.prepare("INSERT INTO reactions (item_id,user,type) VALUES (?,?,?)").run(id, me, type);
  }
  return NextResponse.json({ ok: true });
}