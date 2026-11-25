import { NextResponse } from "next/server";
import { db, ME } from "@/lib/db";

const MAX_IMAGE = 10 * 1024 * 1024;
const MAX_VIDEO = 50 * 1024 * 1024;

export async function POST(req: Request) {
  const form = await req.formData();
  const community = String(form.get("community") || "");
  const title = String(form.get("title") || "").trim().slice(0, 300);
  const kind = String(form.get("kind") || "text");
  let content = String(form.get("content") || "").trim();
  if (!community || !title) return NextResponse.json({ error: "Komunitas dan judul wajib diisi." }, { status: 400 });

  let media: Buffer | null = null, mediaType: string | null = null, mediaName: string | null = null;
  if (kind === "link") {
    if (!/^https?:\/\/\S+$/i.test(content)) return NextResponse.json({ error: "URL tidak valid." }, { status: 400 });
  } else if (kind === "media") {
    const file = form.get("file");
    if (!(file instanceof File) || file.size === 0) return NextResponse.json({ error: "Pilih gambar atau video terlebih dahulu." }, { status: 400 });
    const isImage = file.type.startsWith("image/"), isVideo = file.type.startsWith("video/");
    if (!isImage && !isVideo) return NextResponse.json({ error: "Hanya file gambar atau video yang bisa diunggah." }, { status: 400 });
    if (file.size > (isImage ? MAX_IMAGE : MAX_VIDEO)) return NextResponse.json({ error: "Ukuran file terlalu besar." }, { status: 400 });
    media = Buffer.from(await file.arrayBuffer());
    mediaType = file.type; mediaName = file.name;
    content = `[${isVideo ? "Video" : "Gambar"}: ${file.name}]`;
  }

  const now = Date.now();
  const r = db.prepare(
    "INSERT INTO items (category,community,author,meta,title,content,kind,media,media_type,media_name,created_at) VALUES ('posts',?,?,?,?,?,?,?,?,?,?)"
  ).run(community, ME, ` Posted by ${ME}`, title, content, kind, media, mediaType, mediaName, now);
  return NextResponse.json({ id: r.lastInsertRowid });
}
