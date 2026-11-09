import { db } from "@/lib/db";

export function GET(_: Request, { params }: { params: { id: string } }) {
  const r = db.prepare("SELECT media, media_type FROM items WHERE id=?").get(Number(params.id)) as { media: Buffer | null; media_type: string | null } | undefined;
  if (!r?.media) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(r.media), { headers: { "Content-Type": r.media_type || "application/octet-stream" } });
}
