import { NextResponse } from "next/server";
import { db, ME } from "@/lib/db";

export function DELETE(_: Request, { params }: { params: { id: string } }) {
  db.prepare("DELETE FROM comments WHERE id=? AND author=?").run(Number(params.id), ME);
  return NextResponse.json({ ok: true });
}
