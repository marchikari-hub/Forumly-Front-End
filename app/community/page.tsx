"use client";

import { useState } from "react";
import CreateCommunityModal from "../components/CreateCommunityModal";

interface CommunityItem {
  id: string;
  name: string;
  desc: string;
  members: string;
  joined: boolean;
}

const INITIAL_COMMUNITIES: CommunityItem[] = [
  {
    id: "anime-lovers",
    name: "Anime Lovers Indonesia",
    desc: "Wadah diskusi dan pecinta budaya pop Jepang.",
    members: "12.4k Anggota",
    joined: false,
  },
  {
    id: "sepakbola-kampus",
    name: "Komunitas Sepakbola Kampus",
    desc: "Tempat kumpul fans liga lokal & Eropa, mabar game bola, dan nobar.",
    members: "8.1k Anggota",
    joined: false,
  },
  {
    id: "melek-finansial",
    name: "Melek Finansial Student",
    desc: "Belajar manajemen keuangan, investasi, dan persiapan karir.",
    members: "5.9k Anggota",
    joined: false,
  },
];

export default function CommunityPage() {
  const [communities, setCommunities] = useState<CommunityItem[]>(INITIAL_COMMUNITIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleJoin = (id: string) => {
    setCommunities((prev) =>
      prev.map((comm) => (comm.id === id ? { ...comm, joined: !comm.joined } : comm))
    );
  };

  const handleCreateCommunity = (name: string, desc: string) => {
    const newCommunity: CommunityItem = {
      id: name.toLowerCase().replace(/\s+/g, "-"),
      name: name.trim(),
      desc: desc.trim() || "Diskusi seputar komunitas baru.",
      members: "1 Anggota",
      joined: true,
    };
    setCommunities([newCommunity, ...communities]);
    setIsModalOpen(false);
  };

  const filteredCommunities = communities.filter((comm) =>
    comm.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h2 className="feed-title" style={{ margin: 0 }}>Jelajahi Komunitas</h2>
          <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: "4px 0 0 0" }}>
            Temukan ruang diskusi yang sesuai dengan minat dan passion kamu.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="explore-btn"
          style={{ backgroundColor: "var(--accent)", color: "#ffffff", borderColor: "var(--accent)" }}
        >
          + Buat Komunitas
        </button>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="Filter nama komunitas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid var(--border-color)",
            backgroundColor: "var(--input-bg)",
            color: "var(--text-main)",
            fontSize: "14px",
            outline: "none",
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {filteredCommunities.length > 0 ? (
          filteredCommunities.map((comm) => (
            <div key={comm.id} className="post-card" style={{ transition: "all 0.2s ease" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ paddingRight: "16px" }}>
                  <h3 className="post-title" style={{ marginBottom: "4px" }}>{comm.name}</h3>
                  <p className="post-excerpt" style={{ margin: "0 0 8px 0" }}>{comm.desc}</p>
                  <span className="post-header" style={{ fontSize: "12px" }}>{comm.members}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleJoin(comm.id)}
                  className="explore-btn"
                  style={{
                    backgroundColor: comm.joined ? "transparent" : "var(--accent)",
                    color: comm.joined ? "var(--text-main)" : "#ffffff",
                    borderColor: comm.joined ? "var(--border-color)" : "var(--accent)",
                    minWidth: "90px",
                    textAlign: "center",
                  }}
                >
                  {comm.joined ? "Tergabung" : "Gabung"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="post-card" style={{ textAlign: "center", padding: "32px" }}>
            <p style={{ color: "var(--text-secondary)", margin: 0 }}>Komunitas tidak ditemukan.</p>
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