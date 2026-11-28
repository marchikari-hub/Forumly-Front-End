import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const me = (await getUser()) ?? "";
  const rows = db
    .prepare(
      `SELECT i.community AS name,
        EXISTS(SELECT 1 FROM joined j WHERE j.item_id = i.id AND j.user = ?) AS joined
       FROM items i
       WHERE i.category = 'community'
       ORDER BY joined DESC, i.community`
    )
    .all(me) as { name: string; joined: number }[];
  return NextResponse.json(rows.map((r) => r.name));
}