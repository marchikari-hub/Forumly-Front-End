"use client";

import React, { useState } from "react";
import { useForumContent } from "../components/ForumContent";
import { FORUM_RULES } from "../data/forumData";
import CreateCommunityModal from "../components/CreateCommunityModal";

export default function CommunityPage() {
  const { t, communities, toggleJoinCommunity, createCommunity } =
    useForumContent();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterJoinedOnly, setFilterJoinedOnly] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredCommunities = communities.filter((item) => {
    if (filterJoinedOnly && !item.joined) return false;
    if (!normalizedQuery) return true;

    const name = t(item.nameId, item.nameEn).toLowerCase();
    const desc = t(item.descId, item.descEn).toLowerCase();
    const cat = t(item.categoryId, item.categoryEn).toLowerCase();
    return (
      name.includes(normalizedQuery) ||
      desc.includes(normalizedQuery) ||
      cat.includes(normalizedQuery)
    );
  });

  const joinedCount = communities.filter((c) => Boolean(c.joined)).length;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "16px",
        }}
      >
        <div>
          <h2 className="feed-title" style={{ margin: 0 }}>
            {t("Jelajahi Komunitas", "Explore Communities")}
          </h2>
          <p
            style={{
              margin: "4px 0 0",
              fontSize: "13px",
              color: "var(--text-muted)",
            }}
          >
            {t(
              "Temukan ruang diskusi sesuai minat, bergabunglah, atau buat komunitas baru.",
              "Find interest-based discussion spaces, join groups, or create a new community."
            )}
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setIsCreateOpen(true)}
        >
          + {t("Buat Komunitas", "Create Community")}
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          marginBottom: "18px",
        }}
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t(
            "Cari nama, deskripsi, atau kategori komunitas...",
            "Search community name, description, or category..."
          )}
          className="search-input"
          style={{ flex: 1, minWidth: "200px" }}
        />
        <button
          type="button"
          className={`btn-action${!filterJoinedOnly ? " active" : ""}`}
          onClick={() => setFilterJoinedOnly(false)}
        >
          {t("Semua", "All")} ({communities.length})
        </button>
        <button
          type="button"
          className={`btn-action${filterJoinedOnly ? " active" : ""}`}
          onClick={() => setFilterJoinedOnly(true)}
        >
          {t("Diikuti", "Joined")} ({joinedCount})
        </button>
      </div>

      {filteredCommunities.length > 0 ? (
        <div className="explore-grid" style={{ marginBottom: "28px" }}>
          {filteredCommunities.map((item) => (
            <div key={item.id} className="post-card">
              <div className="post-header" style={{ marginBottom: "6px" }}>
                <span style={{ color: "var(--accent)", fontWeight: 600 }}>
                  {t(item.categoryId, item.categoryEn)}
                </span>{" "}
                • {item.members} {t("Anggota", "Members")}
              </div>

              <h3 className="post-title">{t(item.nameId, item.nameEn)}</h3>
              <p className="post-excerpt">{t(item.descId, item.descEn)}</p>

              <div
                className="post-actions"
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "14px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    color: item.joined ? "var(--accent)" : "var(--text-muted)",
                    fontWeight: 600,
                  }}
                >
                  {item.joined
                    ? t("Sudah Bergabung", "Joined")
                    : t("Belum Bergabung", "Not Joined")}
                </span>

                <button
                  type="button"
                  className={item.joined ? "btn-action active" : "btn btn-primary"}
                  onClick={() => toggleJoinCommunity(item.id)}
                >
                  {item.joined
                    ? t("Keluar", "Leave")
                    : t("Gabung", "Join")}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="post-card" style={{ marginBottom: "28px" }}>
          <p style={{ margin: 0, color: "var(--text-muted)" }}>
            {t(
              "Tidak ada komunitas yang cocok dengan pencarian atau filter.",
              "No communities match your search or filter."
            )}
          </p>
        </div>
      )}

      <section
        className="post-card"
        aria-label={t("Aturan Komunitas", "Community Rules")}
      >
        <h3 className="post-title" style={{ marginTop: 0, marginBottom: "6px" }}>
          {t(
            "Aturan Komunitas & Etika Forum",
            "Community Rules & Forum Guidelines"
          )}
        </h3>
        <p
          style={{
            marginTop: 0,
            marginBottom: "14px",
            fontSize: "13px",
            color: "var(--text-muted)",
          }}
        >
          {t(
            "Harap patuhi pedoman berikut agar diskusi tetap nyaman, aman, dan bermanfaat bagi semua anggota.",
            "Please follow these guidelines so discussions remain welcoming, safe, and helpful for everyone."
          )}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {FORUM_RULES.map((rule) => (
            <div
              key={rule.id}
              style={{
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "14px",
                  marginBottom: "4px",
                }}
              >
                {t(rule.titleId, rule.titleEn)}
              </div>
              <p className="post-excerpt" style={{ margin: 0, fontSize: "13px" }}>
                {t(rule.descId, rule.descEn)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CreateCommunityModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={(name, desc) =>
          createCommunity({ name, description: desc })
        }
      />
    </div>
  );
}