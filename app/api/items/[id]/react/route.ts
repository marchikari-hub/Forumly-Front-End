import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUser, unauthorized } from "@/lib/auth";
import { notify } from "@/lib/notify";
import { findItemId, notFound } from "@/lib/validate";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const me = await getUser();
  if (!me) return unauthorized();

  const id = findItemId(params.id);
  if (id === null) return notFound();

  const { type } = await req.json();
  if (type !== "like" && type !== "dislike") {
    return NextResponse.json({ error: "bad type" }, { status: 400 });
  }
  const other = type === "like" ? "dislike" : "like";
  const has = db.prepare("SELECT 1 FROM reactions WHERE item_id=? AND user=? AND type=?").get(id, me, type);

  if (has) {
    db.prepare("DELETE FROM reactions WHERE item_id=? AND user=? AND type=?").run(id, me, type);
  } else {
    db.prepare("DELETE FROM reactions WHERE item_id=? AND user=? AND type=?").run(id, me, other);
    db.prepare("INSERT INTO reactions (item_id,user,type) VALUES (?,?,?)").run(id, me, type);

    if (type === "like") {
      const item = db.prepare("SELECT author, community, title FROM items WHERE id = ?").get(id) as
        | { author: string | null; community: string; title: string }
        | undefined;
      if (item?.author) {
        notify({
          to: item.author,
          actor: me,
          icon: "❤️",
          message: "liked your post in",
          community: item.community,
          snippet: item.title,
          itemId: id,
          dedupe: true,
        });
      }
    }
  }
  return NextResponse.json({ ok: true });
}