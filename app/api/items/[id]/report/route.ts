import { NextResponse } from "next/server";
import { db, ME } from "@/lib/db";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { reason } = await req.json();
  db.prepare("INSERT OR REPLACE INTO reactions (item_id,user,type,reason) VALUES (?,?,'report',?)").run(Number(params.id), ME, String(reason || "spam"));
  return NextResponse.json({ ok: true });
}
