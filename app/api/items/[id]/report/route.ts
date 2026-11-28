import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUser, unauthorized } from "@/lib/auth";
import { findItemId, notFound } from "@/lib/validate";

const REASONS = ["spam", "hate", "inappropriate"];

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const me = await getUser();
  if (!me) return unauthorized();

  const id = findItemId(params.id);
  if (id === null) return notFound();

  const { reason } = await req.json();
  const safeReason = REASONS.includes(reason) ? reason : "spam";
  db.prepare("INSERT OR REPLACE INTO reactions (item_id,user,type,reason) VALUES (?,?,'report',?)")
    .run(id, me, safeReason);
  return NextResponse.json({ ok: true });
}