import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword } from "@/lib/password";
import { COOKIE_NAME, createSessionToken, sessionCookieOptions } from "@/lib/session";

export const runtime = "nodejs";

// Used to keep response time similar whether or not the user exists.
const DUMMY_HASH = "scrypt$00000000000000000000000000000000$" + "00".repeat(64);

export async function POST(req: Request) {
  let body: { username?: unknown; password?: unknown };
  try { body = await req.json(); } catch { body = {}; }
  const username = typeof body.username === "string" ? body.username.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!username || !password) {
    return NextResponse.json({ error: "Username dan password wajib diisi." }, { status: 400 });
  }

  const user = db.prepare("SELECT id, username, password_hash FROM users WHERE username = ?")
    .get(username) as { id: number; username: string; password_hash: string } | undefined;
  const ok = verifyPassword(password, user?.password_hash ?? DUMMY_HASH);
  if (!user || !ok) {
    return NextResponse.json({ error: "Username atau password salah." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true, username: user.username });
  res.cookies.set(COOKIE_NAME, await createSessionToken(user.id), sessionCookieOptions());
  return res;
}
