import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUser, unauthorized } from "@/lib/auth";

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const me = await getUser();
  if (!me) return unauthorized();

  db.prepare("DELETE FROM comments WHERE id=? AND author=?").run(Number(params.id), me);
  return NextResponse.json({ ok: true });
}