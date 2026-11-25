import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { COOKIE_NAME, verifySessionToken } from "@/lib/session";

export async function getUser(): Promise<string | null> {
    const id = await verifySessionToken(cookies().get(COOKIE_NAME)?.value);
    if (!id) return null;
    const u = db.prepare("SELECT username FROM users WHERE id = ?").get(id) as { username: string } | undefined;
    return u?.username ?? null;
}

export const unauthorized = () =>
    NextResponse.json({ error: "Harus login dulu." }, { status: 401 });