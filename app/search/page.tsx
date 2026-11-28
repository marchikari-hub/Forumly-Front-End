"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Comment, CommentHit, Item, UserHit } from "@/lib/types";
import "./search.css";

type Tab = "all" | "posts" | "community" | "comments" | "users";

function SearchView() {
  const router = useRouter();
  const q = (useSearchParams().get("q") || "").trim();
  const [input, setInput] = useState(q);
  const [items, setItems] = useState<Item[]>([]);
  const [users, setUsers] = useState<UserHit[]>([]);
  const [commentHits, setCommentHits] = useState<CommentHit[]>([]);
  const [tab, setTab] = useState<Tab>("all");
  const [thread, setThread] = useState<Item | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [reportItem, setReportItem] = useState<Item | null>(null);
  const [reason, setReason] = useState("spam");
  const [toast, setToast] = useState("");
  const [lang, setLang] = useState<"id" | "en">("id");

  useEffect(() => {
    try {
      if (localStorage.getItem("forumly_lang_v1") === "en") setLang("en");
    } catch {}
  }, []);

  const load = useCallback(async () => {
    const res = await fetch("/api/search?q=" + encodeURIComponent(q), { cache: "no-store" });
    const data = await res.json();
    setItems(data.items);
    setUsers(data.users);
    setCommentHits(data.comments);
  }, [q]);

  useEffect(() => {
    setInput(q);
    load();
  }, [q, load]);

  const post = async (url: string, body?: unknown) => {
    const res = await fetch(url, { method: "POST", body: body ? JSON.stringify(body) : undefined });
    if (res.status === 401) router.push("/login");
    return res;
  };

  const react = async (it: Item, type: "like" | "dislike") => {
    await post(`/api/items/${it.id}/react`, { type });
    load();
  };

  const loadComments = async (id: number) => {
    const res = await fetch(`/api/items/${id}/comments`, { cache: "no-store" });
    setComments(await res.json());
    load();
  };

  const openThread = (it: Item) => {
    setThread(it);
    loadComments(it.id);
  };

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

  const join = async (it: Item) => {
    await post(`/api/items/${it.id}/join`);
    load();
  };

  const countOf = (c: Item["category"]) => items.filter((i) => i.category === c).length;
  const tabs: [Tab, string, number][] = [
    ["all", "Semua", items.length + commentHits.length + users.length],
    ["posts", "Posts", countOf("posts")],
    ["community", "Communities", countOf("community")],
    ["comments", "Comments", commentHits.length],
    ["users", "Users", users.length],
  ];

  const shownItems =
    tab === "all" ? items : tab === "posts" || tab === "community" ? items.filter((i) => i.category === tab) : [];
  const showComments = tab === "all" || tab === "comments";
  const showUsers = tab === "all" || tab === "users";
  const isEmpty =
    shownItems.length === 0&&
    (!showComments || commentHits.length === 0) &&
    (!showUsers || users.length === 0);

  const titleOf = (it: Item) => (lang === "en" ? it.titleEn : it.title);
  const metaOf = (it: Item) => (lang === "en" ? it.metaEn : it.meta);

  const body = (it: Item) => {
    const text = lang === "en" ? it.contentEn : it.content;
    if (it.imageUrl) {
      return (
        <>
          {text}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={it.imageUrl} alt={titleOf(it)} />
        </>
      );
    }
    if (it.videoUrl) {
      return (
        <>
          {text}
          <video controls preload="metadata" src={it.videoUrl} />
        </>
      );
    }
    if (it.hasMedia) {
      return it.mediaType?.startsWith("video/") ? (
        <video controls preload="metadata" src={`/api/media/${it.id}`} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`/api/media/${it.id}`} alt={it.mediaName || it.title} />
      );
    }
    if (it.kind === "link" && /^https?:\/\/\S+$/i.test(it.content)) {
      return <a href={it.content} target="_blank" rel="noopener noreferrer">{it.content}</a>;
    }
    return text;
  };

  return (
    <div className="fm-page">
      <main className="sr-container">
        <form
          className="sr-search-form"
          onSubmit={(e) => {
            e.preventDefault();
            router.push("/search?q=" + encodeURIComponent(input.trim()));
          }}
        >
          <input
            className="sr-search-input"
            name="q"
            placeholder="Cari post, komunitas, komentar, atau pengguna..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="sr-search-btn">Cari</button>
        </form>

        <div className="sr-filter-tabs">
          {tabs.map(([key, label, n]) => (
            <button key={key} type="button" className={`sr-tab${tab === key ? " active" : ""}`} onClick={() => setTab(key)}>
              {label} ({n})
            </button>
          ))}
        </div>

        <div className="sr-results">
          {shownItems.map((it) => (
            <div key={it.id} className="sr-card">
              <div className="sr-card-header">
                <span className="sr-subreddit">{it.community}</span>
                <span className="sr-author">{" "}• {metaOf(it).trim()}</span>
              </div>
              <h3 className="sr-title">{titleOf(it)}</h3>
              <p className="sr-snippet">{body(it)}</p>
              <div className="sr-card-footer">
                {it.category === "community" ? (
                  <button type="button" className="sr-join-btn" onClick={() => join(it)}>
                    {it.joined ? "Joined" : "Join"}
                  </button>
                ) : (
                  <>
                    <button type="button" className={`btn-action btn-like${it.liked ? " active" : ""}`} onClick={() => react(it, "like")}>
                      ♥ Suka ({it.likes})
                    </button>
                    <button type="button" className={`btn-action btn-dislike${it.disliked ? " active" : ""}`} onClick={() => react(it, "dislike")}>
                      Tidak Suka ({it.dislikes})
                    </button>
                    {it.category === "posts" && (
                      <button type="button" className="btn-action btn-comment" onClick={() => openThread(it)}>
                        Komentar ({it.commentCount})
                      </button>
                    )}
                    <button type="button" className="btn-action btn-report" onClick={() => setReportItem(it)}>Laporkan</button>
                  </>
                )}
              </div>
            </div>
          ))}

          {showComments &&
            commentHits.map((c) => (
              <div key={`c-${c.id}`} className="sr-card">
                <div className="sr-card-header">
                  <span className="sr-subreddit">{c.author}</span>
                  <span className="sr-author">{" "}• komentar di &quot;{c.postTitle}&quot;</span>
                </div>
                <p className="sr-snippet">{c.text}</p>
                <div className="sr-card-footer">
                  <button
                    type="button"
                    className="sr-join-btn"
                    onClick={() => {
                      setTab("posts");
                      router.push("/search?q=" + encodeURIComponent(c.postTitle));
                    }}
                  >
                    Lihat post
                  </button>
                </div>
              </div>
            ))}

          {showUsers &&
            users.map((u) => (
              <div key={u.username} className="sr-card">
                <div className="sr-card-header">
                  <span className="sr-subreddit">u/{u.username}</span>
                </div>
                <p className="sr-snippet">{u.posts} post • {u.comments} komentar</p>
                <div className="sr-card-footer">
                  <button
                    type="button"
                    className="sr-join-btn"
                    onClick={() => {
                      setTab("posts");
                      router.push("/search?q=" + encodeURIComponent(u.username));
                    }}
                  >
                    Lihat post
                  </button>
                </div>
              </div>
            ))}
        </div>

        <p className={`sr-no-results${isEmpty ? " show" : ""}`}>Tidak ada hasil yang cocok.</p>
      </main>

      <div className={`sr-modal${thread ? " show" : ""}`} onClick={(e) => e.target === e.currentTarget && setThread(null)}>
        <div className="sr-modal-card">
          <div className="sr-modal-header">
            <h3>{thread ? titleOf(thread) : ""}</h3>
            <button type="button" onClick={() => setThread(null)}>&times;</button>
          </div>
          <div>
            {comments.length === 0 && <p className="sr-empty-comment">Belum ada komentar.</p>}
            {comments.map((c) => (
              <div key={c.id} className="sr-comment">
                <strong>{c.author}</strong>
                <p>{c.text}</p>
                {c.mine && (
                  <button type="button" className="sr-comment-del" onClick={() => delComment(c.id)}>Hapus</button>
                )}
              </div>
            ))}
          </div>
          <div className="sr-comment-form">
            <input
              type="text"
              placeholder="Tulis komentar..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendComment()}
            />
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
          <p>{reportItem ? "Laporkan: " + titleOf(reportItem) : "Pilih alasan melaporkan:"}</p>
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