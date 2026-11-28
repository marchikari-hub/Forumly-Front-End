import { db } from "@/lib/db";

export function GET(_: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) return new Response("Not found", { status: 404 });

  const r = db.prepare("SELECT media, media_type FROM items WHERE id=?").get(id) as
    | { media: Buffer | null; media_type: string | null }
    | undefined;
  if (!r?.media) return new Response("Not found", { status: 404 });

  return new Response(new Uint8Array(r.media), {
    headers: {
      "Content-Type": r.media_type || "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}