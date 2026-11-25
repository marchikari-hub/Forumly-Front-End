"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForumContent } from "../components/ForumContent";
import { GENRE_TOPICS } from "../data/forumData";

export default function ExplorePage() {
  const { t, posts } = useForumContent();
  const [searchQuery, setSearchQuery] = useState("");

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredTopics = normalizedQuery
    ? GENRE_TOPICS.filter((topic) => {
        const name = t(topic.nameId, topic.nameEn).toLowerCase();
        const desc = t(topic.descId, topic.descEn).toLowerCase();
        return (
          name.includes(normalizedQuery) ||
          desc.includes(normalizedQuery) ||
          topic.slug.toLowerCase().includes(normalizedQuery)
        );
      })
    : GENRE_TOPICS;

  return (
    <div>
      <h2 className="feed-title">
        {t("Eksplore Topik", "Explore Topics")}
      </h2>

      <div className="top-header mb-4">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="search-form"
          style={{ display: "flex", gap: "8px" }}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t(
              "Cari topik atau kategori...",
              "Search topics or categories..."
            )}
            className="search-input"
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn btn-primary">
            {t("Cari", "Search")}
          </button>
        </form>
      </div>

      {filteredTopics.length > 0 ? (
        <div className="explore-grid">
          {filteredTopics.map((item) => {
            const topicPostsCount = posts.filter(
              (p) => p.genreSlug.toLowerCase() === item.slug.toLowerCase()
            ).length;

            return (
              <div key={item.slug} className="post-card">
                <h3 className="post-title">{t(item.nameId, item.nameEn)}</h3>
                <p className="post-excerpt">{t(item.descId, item.descEn)}</p>
                <div
                  className="post-actions"
                  style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span className="post-header" style={{ margin: 0 }}>
                    {topicPostsCount} {t("thread aktif", "active threads")}
                  </span>
                  <Link href={`/explore/${item.slug}`} className="explore-btn">
                    {t("Buka Topik", "Open Topic")}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="post-card">
          <p style={{ margin: 0, color: "var(--text-muted)" }}>
            {t(
              "Topik yang kamu cari tidak ditemukan.",
              "No matching topics found."
            )}
          </p>
        </div>
      )}
    </div>
  );
}