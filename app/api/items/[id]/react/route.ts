import { NextResponse } from "next/server";
import { db, ME } from "@/lib/db";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { type } = await req.json();
  if (type !== "like" && type !== "dislike") return NextResponse.json({ error: "bad type" }, { status: 400 });
  const id = Number(params.id), other = type === "like" ? "dislike" : "like";
  const has = db.prepare("SELECT 1 FROM reactions WHERE item_id=? AND user=? AND type=?").get(id, ME, type);
  if (has) db.prepare("DELETE FROM reactions WHERE item_id=? AND user=? AND type=?").run(id, ME, type);
  else {
    db.prepare("DELETE FROM reactions WHERE item_id=? AND user=? AND type=?").run(id, ME, other);
    db.prepare("INSERT INTO reactions (item_id,user,type) VALUES (?,?,?)").run(id, ME, type);
  }
  return NextResponse.json({ ok: true });
}
