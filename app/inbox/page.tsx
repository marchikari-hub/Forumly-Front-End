"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { Notif } from "@/lib/types";
import { useTheme } from "@/lib/useTheme";
import "./inbox.css";

type Tab = "all" | "unread" | "messages";

export default function InboxPage() {
  const router = useRouter();
  const theme = useTheme();
  const [list, setList] = useState<Notif[]>([]);
  const [tab, setTab] = useState<Tab>("all");
  const [open, setOpen] = useState(false);

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
    const close = () => setOpen(false);
    document.addEventListener("click", close);
    return () => {
      clearInterval(poll);
      document.removeEventListener("click", close);
    };
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
    <div className="fm-page" data-theme={theme}>
      <header className="ib-navbar">
        <Link href="/" className="ib-logo">Forumly</Link>

        <div className="ib-nav-right">
          <Link href="/create-post" className="ib-nav-link">+ Create Post</Link>

          <div className="ib-dropdown-wrapper">
            <button
              type="button"
              className="ib-bell-btn"
              aria-label="Notifications"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((o) => !o);
              }}
            >
              🔔 {unreadCount > 0 && <span className="ib-badge" style={{ display: "inline-block" }}>{unreadCount}</span>}
            </button>

            <div
              className="ib-dropdown-content"
              style={{ display: open ? "block" : "none" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="ib-dropdown-header">
                <span>Notifications</span>
                <a href="#" onClick={(e) => { e.preventDefault(); mark({ all: true }); }}>Mark read</a>
              </div>
              <ul className="ib-preview-list">
                {list.filter((n) => n.type === "notification").slice(0, 5).map((n) => (
                  <li key={n.id} className={`ib-preview-item${n.unread ? " unread" : ""}`}>
                    <p>
                      <strong>{n.actor}</strong> {n.message}
                      {n.community && <> {n.community}</>}
                    </p>
                    <span className="time">{n.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </header>

      <main className="ib-container">
        <h2>Inbox</h2>

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