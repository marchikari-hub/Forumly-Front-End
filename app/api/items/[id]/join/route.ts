import { NextResponse } from "next/server";
import { db, ME } from "@/lib/db";

export function POST(_: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const has = db.prepare("SELECT 1 FROM joined WHERE user=? AND item_id=?").get(ME, id);
  if (has) db.prepare("DELETE FROM joined WHERE user=? AND item_id=?").run(ME, id);
  else db.prepare("INSERT INTO joined (user,item_id) VALUES (?,?)").run(ME, id);
  return NextResponse.json({ ok: true });
}
