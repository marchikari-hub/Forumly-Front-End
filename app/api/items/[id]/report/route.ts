import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUser, unauthorized } from "@/lib/auth";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const me = await getUser();
  if (!me) return unauthorized();

  const { reason } = await req.json();
  db.prepare("INSERT OR REPLACE INTO reactions (item_id,user,type,reason) VALUES (?,?,'report',?)")
    .run(Number(params.id), me, String(reason || "spam"));
  return NextResponse.json({ ok: true });
}