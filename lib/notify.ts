import { db } from "@/lib/db";

type NotifyInput = {
    to: string;
    actor: string;
    icon: string;
    message: string;
    community?: string | null;
    snippet?: string;
    itemId?: number | null;
    dedupe?: boolean;
};

export function notify(n: NotifyInput) {
    if (n.to.toLowerCase() === n.actor.toLowerCase()) return;
    const exists = db.prepare("SELECT 1 FROM users WHERE username = ?").get(n.to);
    if (!exists) return;

    if (n.dedupe) {
        const dup = db
        .prepare("SELECT 1 FROM notifications WHERE user = ? AND actor = ? AND message = ? AND item_id = ?")
        .get(n.to, `u/${n.actor}`, n.message, n.itemId ?? null);
        if (dup) return;
    }

    db.prepare(
        "INSERT INTO notifications (user,type,icon,actor,message,community,snippet,item_id,created_at,is_read) VALUES (?,?,?,?,?,?,?,?,?,0)"
    ).run(n.to, "notification", n.icon, `u/${n.actor}`, n.message, n.community ?? null, n.snippet ?? "", n.itemId ?? null, Date.now());
    }