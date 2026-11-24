"use client";

import { useState } from "react";
import Link from "next/link";
import { useForumContent } from "./components/ForumContent";

export default function Home() {
  const { t, posts, getPostText } = useForumContent();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    const text = getPostText(post);
    return (
      text.title.toLowerCase().includes(q) ||
      text.excerpt.toLowerCase().includes(q) ||
      text.genre.toLowerCase().includes(q) ||
      post.author.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <div className="top-header mb-4">
        <form onSubmit={(e) => e.preventDefault()} className="search-form">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t(
              "Cari diskusi, pertanyaan, atau topik...",
              "Search discussions, questions, or topics..."
            )}
            className="search-input"
          />
          <button type="button" className="btn btn-primary">
            {t("Cari", "Search")}
          </button>
        </form>
      </div>

      <div>
        <h2 className="feed-title">
          {t("Diskusi Terbaru", "Latest Discussions")}
        </h2>

        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => {
            const text = getPostText(post);
            return (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <span className="post-author">{post.author}</span> - {text.time}{" "}
                  {t("dalam", "in")}{" "}
                  <Link
                    href={`/explore/${post.genreSlug}`}
                    style={{ color: "var(--accent)" }}
                  >
                    {text.genre}
                  </Link>
                </div>
                <h3 className="post-title">{text.title}</h3>
                <p className="post-excerpt">{text.excerpt}</p>
                <div className="post-actions">
                  <button type="button" className="btn-action">
                    {t("Suka", "Like")} ({post.likes})
                  </button>
                  <button type="button" className="btn-action">
                    {t("Tidak Suka", "Dislike")} ({post.dislikes})
                  </button>
                  <button type="button" className="btn-action">
                    {t("Komentar", "Comments")} ({post.comments.length})
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="post-card" style={{ textAlign: "center", padding: "28px" }}>
            <p style={{ color: "var(--text-muted)", margin: 0 }}>
              {t("Diskusi tidak ditemukan.", "No discussions found.")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}