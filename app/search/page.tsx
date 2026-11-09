"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Comment, Item } from "@/lib/types";
import { useTheme } from "@/lib/useTheme";
import { ME_NAME } from "./me";
import "./search.css";

type Tab = "posts" | "community" | "comments";

function SearchView() {
  const theme = useTheme();
  const router = useRouter();
  const q = (useSearchParams().get("q") || "").trim();
  const [input, setInput] = useState(q);
  const [items, setItems] = useState<Item[]>([]);
  const [tab, setTab] = useState<Tab>("posts");
  const [thread, setThread] = useState<Item | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [reportItem, setReportItem] = useState<Item | null>(null);
  const [reason, setReason] = useState("spam");
  const [toast, setToast] = useState("");

  const load = useCallback(async () => {
    const res = await fetch("/api/search?q=" + encodeURIComponent(q), { cache: "no-store" });
    setItems(await res.json());
  }, [q]);

  useEffect(() => { setInput(q); load(); }, [q, load]);

  const post = (url: string, body?: unknown) =>
    fetch(url, { method: "POST", body: body ? JSON.stringify(body) : undefined });

  const react = async (it: Item, type: "like" | "dislike") => {
    await post(`/api/items/${it.id}/react`, { type });
    load();
  };

  const loadComments = async (id: number) => {
    const res = await fetch(`/api/items/${id}/comments`, { cache: "no-store" });
    setComments(await res.json());
    load();
  };

  const openThread = (it: Item) => { setThread(it); loadComments(it.id); };

  const sendComment = async () => {
    if (!thread || !text.trim()) return;
    await post(`/api/items/${thread.id}/comments`, { text: text.trim() });
    setText("");
    loadComments(thread.id);
  };

  const delComment = async (id: number) => {
    await fetch(`/api/comments/${id}`, { method: "DELETE" });
    if (thread) loadComments(thread.id);
  };

  const sendReport = async () => {
    if (!reportItem) return;
    await post(`/api/items/${reportItem.id}/report`, { reason });
    setReportItem(null);
    setToast("Laporan berhasil dikirim.");
    setTimeout(() => setToast(""), 2500);
  };

  const join = async (it: Item) => { await post(`/api/items/${it.id}/join`); load(); };

  const shown = items.filter((i) => i.category === tab);
  const tabs: [Tab, string][] = [["posts", "Posts"], ["community", "Communities"], ["comments", "Comments"]];

  const body = (it: Item) => {
    if (it.hasMedia)
      return it.mediaType?.startsWith("video/")
        ? <video controls preload="metadata" src={`/api/media/${it.id}`} />
        // eslint-disable-next-line @next/next/no-img-element
        : <img src={`/api/media/${it.id}`} alt={it.mediaName || it.title} />;
    if (it.kind === "link" && /^https?:\/\/\S+$/i.test(it.content))
      return <a href={it.content} target="_blank" rel="noopener noreferrer">{it.content}</a>;
    return it.content;
  };

  return (
    <div className="fm-page" data-theme={theme}>
      <main className="sr-container">
        <form className="sr-search-form" onSubmit={(e) => { e.preventDefault(); router.push("/search?q=" + encodeURIComponent(input.trim())); }}>
          <input className="sr-search-input" name="q" placeholder="Cari diskusi, pertanyaan, atau topik..." value={input} onChange={(e) => setInput(e.target.value)} />
          <button type="submit" className="sr-search-btn">Cari</button>
        </form>

        <div className="sr-filter-tabs">
          {tabs.map(([key, label]) => (
            <button key={key} type="button" className={`sr-tab${tab === key ? " active" : ""}`} onClick={() => setTab(key)}>{label}</button>
          ))}
        </div>

        <div className="sr-results">
          {shown.map((it) => (
            <div key={it.id} className="sr-card">
              <div className="sr-card-header">
                <span className="sr-subreddit">{it.community}</span>
                <span className="sr-author">• {it.meta.trim()}</span>
              </div>
              <h3 className="sr-title">{it.title}</h3>
              <p className="sr-snippet">{body(it)}</p>
              <div className="sr-card-footer">
                {it.category === "community" ? (
                  <button type="button" className="sr-join-btn" onClick={() => join(it)}>{it.joined ? "Joined" : "Join"}</button>
                ) : (
                  <>
                    <button type="button" className={`btn-action btn-like${it.liked ? " active" : ""}`} onClick={() => react(it, "like")}>♥ Suka ({it.likes})</button>
                    <button type="button" className={`btn-action btn-dislike${it.disliked ? " active" : ""}`} onClick={() => react(it, "dislike")}>Tidak Suka ({it.dislikes})</button>
                    {it.category === "posts" && (
                      <button type="button" className="btn-action btn-comment" onClick={() => openThread(it)}>Komentar ({it.commentCount})</button>
                    )}
                    <button type="button" className="btn-action btn-report" onClick={() => setReportItem(it)}>Laporkan</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className={`sr-no-results${shown.length === 0 ? " show" : ""}`}>Tidak ada hasil yang cocok.</p>
      </main>

      <div className={`sr-modal${thread ? " show" : ""}`} onClick={(e) => e.target === e.currentTarget && setThread(null)}>
        <div className="sr-modal-card">
          <div className="sr-modal-header">
            <h3>{thread?.title}</h3>
            <button type="button" onClick={() => setThread(null)}>&times;</button>
          </div>
          <div>
            {comments.length === 0 && <p className="sr-empty-comment">Belum ada komentar.</p>}
            {comments.map((c) => (
              <div key={c.id} className="sr-comment">
                <strong>{c.author}</strong>
                <p>{c.text}</p>
                {c.author === ME_NAME && <button type="button" className="sr-comment-del" onClick={() => delComment(c.id)}>Hapus</button>}
              </div>
            ))}
          </div>
          <div className="sr-comment-form">
            <input type="text" placeholder="Tulis komentar..." value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendComment()} />
            <button type="button" onClick={sendComment}>Kirim</button>
          </div>
        </div>
      </div>

      <div className={`sr-modal${reportItem ? " show" : ""}`} onClick={(e) => e.target === e.currentTarget && setReportItem(null)}>
        <div className="sr-modal-card">
          <div className="sr-modal-header">
            <h3>Laporkan Konten</h3>
            <button type="button" onClick={() => setReportItem(null)}>&times;</button>
          </div>
          <p>{reportItem ? "Laporkan: " + reportItem.title : "Pilih alasan melaporkan:"}</p>
          <select className="sr-report-select" value={reason} onChange={(e) => setReason(e.target.value)}>
            <option value="spam">Spam / Penipuan</option>
            <option value="hate">Ujaran Kebencian / SARA</option>
            <option value="inappropriate">Konten Tidak Layak</option>
          </select>
          <button type="button" className="sr-report-submit" onClick={sendReport}>Kirim Laporan</button>
        </div>
      </div>
      <div className={`sr-toast${toast ? " show" : ""}`}>{toast}</div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchView />
    </Suspense>
  );
}
