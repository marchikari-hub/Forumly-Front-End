"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { Notif } from "@/lib/types";
import "./inbox.css";

type Tab = "all" | "unread" | "messages";

export default function InboxPage() {
  const router = useRouter();
  const [list, setList] = useState<Notif[]>([]);
  const [tab, setTab] = useState<Tab>("all");

  const load = useCallback(async () => {
    const res = await fetch("/api/inbox", { cache: "no-store" });
    if (res.status === 401) {
      router.push("/login");
      return;
    }
    setList(await res.json());
  }, [router]);

  useEffect(() => {
    load();
    const poll = setInterval(load, 10000);
    return () => clearInterval(poll);
  }, [load]);

  const mark = async (body: { id?: number; all?: boolean }) => {
    setList((l) => l.map((n) => (body.all || n.id === body.id ? { ...n, unread: false } : n)));
    await fetch("/api/inbox", { method: "PATCH", body: JSON.stringify(body) });
  };

  const unreadCount = list.filter((n) => n.unread).length;
  const shown = list.filter(
    (n) => tab === "all" || (tab === "unread" && n.unread) || (tab === "messages" && n.type === "messages")
  );
  const tabs: Tab[] = ["all", "unread", "messages"];

  return (
    <div className="fm-page">
      <main className="ib-container">
        <div className="ib-head">
          <h2>
            Inbox
            {unreadCount > 0 && <span className="ib-count">{unreadCount}</span>}
          </h2>
          <button type="button" className="ib-markall" disabled={unreadCount === 0} onClick={() => mark({ all: true })}>
            Tandai semua dibaca
          </button>
        </div>

        <div className="ib-tabs">
          {tabs.map((t) => (
            <button key={t} type="button" className={`ib-tab${tab === t ? " active" : ""}`} onClick={() => setTab(t)}>
              {t[0].toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <div className="ib-content-list">
          {shown.map((n) => (
            <div key={n.id} className={`ib-card${n.unread ? " unread" : ""}`}>
              <div className="ib-avatar">{n.icon}</div>
              <div className="ib-details">
                <p>
                  <strong>{n.actor}</strong> {n.message}
                  {n.community && <> <em>{n.community}</em></>}
                </p>
                {n.snippet && <blockquote className="ib-snippet">&quot;{n.snippet}&quot;</blockquote>}
                <span className="ib-time">{n.time}</span>
                {n.postTitle && (
                  <Link href={"/search?q=" + encodeURIComponent(n.postTitle)} className="ib-reply-link">Lihat post</Link>
                )}
                {n.type === "messages" && <Link href="/chat" className="ib-reply-link">Balas lewat Chat</Link>}
              </div>
              {n.unread && (
                <button type="button" className="ib-read-btn" title="Mark as read" onClick={() => mark({ id: n.id })}>✓</button>
              )}
            </div>
          ))}
        </div>

        <p className={`ib-empty${shown.length === 0 ? " show" : ""}`}>Tidak ada notifikasi.</p>
      </main>
    </div>
  );
}