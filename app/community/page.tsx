"use client";

import React, { useState } from "react";
import { useForumContent } from "../components/ForumContent";
import CreateCommunityModal from "../components/CreateCommunityModal";

interface CommunityItem {
  id: string;
  nameId: string;
  nameEn: string;
  descId: string;
  descEn: string;
  membersCount: number;
  membersLabelId?: string;
  membersLabelEn?: string;
  joined: boolean;
}

const INITIAL_COMMUNITIES: CommunityItem[] = [
  {
    id: "anime-lovers",
    nameId: "Anime Lovers Indonesia",
    nameEn: "Anime Lovers Indonesia",
    descId: "Wadah diskusi dan pecinta budaya pop Jepang.",
    descEn: "Discussion hub for anime fans and Japanese pop culture lovers.",
    membersCount: 12400,
    membersLabelId: "12.4k Anggota",
    membersLabelEn: "12.4k Members",
    joined: false,
  },
  {
    id: "sepakbola-kampus",
    nameId: "Komunitas Sepakbola Kampus",
    nameEn: "Campus Football Community",
    descId: "Tempat kumpul fans liga lokal & Eropa, mabar game bola, dan nobar.",
    descEn: "Hangout for local & European league fans, football games, and watch parties.",
    membersCount: 8100,
    membersLabelId: "8.1k Anggota",
    membersLabelEn: "8.1k Members",
    joined: false,
  },
  {
    id: "melek-finansial",
    nameId: "Melek Finansial Student",
    nameEn: "Student Financial Literacy",
    descId: "Belajar manajemen keuangan, investasi, dan persiapan karir.",
    descEn: "Learn budgeting, investing, and career preparation.",
    membersCount: 5900,
    membersLabelId: "5.9k Anggota",
    membersLabelEn: "5.9k Members",
    joined: false,
  },
];

export default function CommunityPage() {
  const { t } = useForumContent();

  const [communities, setCommunities] =
    useState<CommunityItem[]>(INITIAL_COMMUNITIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleJoin = (id: string) => {
    setCommunities((prev) =>
      prev.map((comm) => {
        if (comm.id !== id) return comm;
        const nextJoined = !comm.joined;
        const nextCount = comm.membersLabelId
          ? comm.membersCount
          : nextJoined
          ? comm.membersCount + 1
          : Math.max(0, comm.membersCount - 1);
        return {
          ...comm,
          joined: nextJoined,
          membersCount: nextCount,
        };
      })
    );
  };

  const handleCreateCommunity = (name: string, desc: string) => {
    const cleanName = name.trim();
    if (!cleanName) return;
    const cleanDesc =
      desc.trim() ||
      t(
        "Diskusi seputar komunitas baru.",
        "Discussions around this new community."
      );

    const newCommunity: CommunityItem = {
      id: `${cleanName.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
      nameId: cleanName,
      nameEn: cleanName,
      descId: cleanDesc,
      descEn: cleanDesc,
      membersCount: 1,
      joined: true,
    };

    setCommunities((prev) => [newCommunity, ...prev]);
    setIsModalOpen(false);
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredCommunities = communities.filter((comm) => {
    if (!normalizedQuery) return true;
    const name = t(comm.nameId, comm.nameEn).toLowerCase();
    const desc = t(comm.descId, comm.descEn).toLowerCase();
    return name.includes(normalizedQuery) || desc.includes(normalizedQuery);
  });

  const formatMembers = (comm: CommunityItem) => {
    if (comm.membersLabelId && comm.membersLabelEn) {
      return t(comm.membersLabelId, comm.membersLabelEn);
    }
    return `${comm.membersCount} ${t("Anggota", "Members")}`;
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2 className="feed-title" style={{ margin: 0 }}>
            {t("Jelajahi Komunitas", "Explore Communities")}
          </h2>
          <p
            style={{
              fontSize: "13px",
              color: "var(--text-secondary)",
              margin: "4px 0 0 0",
            }}
          >
            {t(
              "Temukan ruang diskusi yang sesuai dengan minat dan passion kamu.",
              "Find discussion spaces that match your interests and passions."
            )}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="explore-btn"
          style={{
            backgroundColor: "var(--accent)",
            color: "#ffffff",
            borderColor: "var(--accent)",
          }}
        >
          + {t("Buat Komunitas", "Create Community")}
        </button>
      </div>

      <div className="top-header mb-4">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="search-form"
          style={{ display: "flex", gap: "8px" }}
        >
          <input
            type="text"
            placeholder={t(
              "Cari nama komunitas...",
              "Search community name..."
            )}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn btn-primary">
            {t("Cari", "Search")}
          </button>
        </form>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {filteredCommunities.length > 0 ? (
          filteredCommunities.map((comm) => (
            <div
              key={comm.id}
              className="post-card"
              style={{ transition: "all 0.2s ease" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div style={{ paddingRight: "16px" }}>
                  <h3 className="post-title" style={{ marginBottom: "4px" }}>
                    {t(comm.nameId, comm.nameEn)}
                  </h3>
                  <p className="post-excerpt" style={{ margin: "0 0 8px 0" }}>
                    {t(comm.descId, comm.descEn)}
                  </p>
                  <span className="post-header" style={{ fontSize: "12px" }}>
                    {formatMembers(comm)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleJoin(comm.id)}
                  className="explore-btn"
                  style={{
                    backgroundColor: comm.joined
                      ? "transparent"
                      : "var(--accent)",
                    color: comm.joined ? "var(--text-main)" : "#ffffff",
                    borderColor: comm.joined
                      ? "var(--border-color)"
                      : "var(--accent)",
                    minWidth: "96px",
                    textAlign: "center",
                  }}
                >
                  {comm.joined
                    ? t("Tergabung", "Joined")
                    : t("Gabung", "Join")}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div
            className="post-card"
            style={{ textAlign: "center", padding: "32px" }}
          >
            <p style={{ color: "var(--text-secondary)", margin: 0 }}>
              {t(
                "Komunitas tidak ditemukan.",
                "No communities found."
              )}
            </p>
          </div>
        )}
      </div>

      <CreateCommunityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateCommunity}
      />
    </div>
  );
}