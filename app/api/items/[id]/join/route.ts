import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUser, unauthorized } from "@/lib/auth";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const me = await getUser();
  if (!me) return unauthorized();

  const id = Number(params.id);
  const has = db.prepare("SELECT 1 FROM joined WHERE user=? AND item_id=?").get(me, id);
  if (has) db.prepare("DELETE FROM joined WHERE user=? AND item_id=?").run(me, id);
  else db.prepare("INSERT INTO joined (user,item_id) VALUES (?,?)").run(me, id);
  return NextResponse.json({ ok: true });
}