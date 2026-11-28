import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export function findItemId(raw: string, category?: string): number | null {
  const id = Number(raw);
  if (!Number.isInteger(id) || id <= 0) return null;
  const row = category
    ? db.prepare("SELECT 1 FROM items WHERE id = ? AND category = ?").get(id, category)
    : db.prepare("SELECT 1 FROM items WHERE id = ?").get(id);
  return row ? id : null;
}

export const notFound = () => NextResponse.json({ error: "Item tidak ditemukan." }, { status: 404 });