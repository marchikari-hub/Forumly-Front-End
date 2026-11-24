"use client";

import { useState } from "react";
import Link from "next/link";

const POSTS = [
  {
    id: "1",
    author: "Budi Setiawan",
    timeAgo: "2 jam lalu",
    category: "Teknologi",
    href: "/explore/teknologi",
    title: "Tips belajar struktur data dan algoritma untuk persiapan praktikum minggu depan?",
    excerpt:
      "Lagi persiapan ujian modul pohon (tree) dan graf. Ada saran visualisasi algoritma atau metode latihan yang efektif?",
    likes: 14,
    dislikes: 1,
    comments: 0,
  },
  {
    id: "2",
    author: "Rian Pratama",
    timeAgo: "4 jam lalu",
    category: "Anime",
    href: "/explore/anime",
    title: "Anime Spring Season mana yang paling worth buat diikuti?",
    excerpt:
      "Musim ini lumayan banyak rilis sekuel dan adaptasi baru. Mau minta rekomendasi anime genre misteri atau slice of life.",
    likes: 28,
    dislikes: 0,
    comments: 2,
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = POSTS.filter((post) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.category.toLowerCase().includes(q) ||
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
            placeholder="Cari diskusi, pertanyaan, atau topik..."
            className="search-input"
          />
          <button type="button" className="btn btn-primary">
            Cari
          </button>
        </form>
      </div>
      
      <div>
        <h2 className="feed-title">Diskusi Terbaru</h2>

        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <span className="post-author">{post.author}</span> - {post.timeAgo} dalam{" "}
                <Link href={post.href} style={{ color: "var(--accent)" }}>
                  {post.category}
                </Link>
              </div>
              <h3 className="post-title">{post.title}</h3>
              <p className="post-excerpt">{post.excerpt}</p>
              <div className="post-actions">
                <button type="button" className="btn-action">
                  Suka ({post.likes})
                </button>
                <button type="button" className="btn-action">
                  Tidak Suka ({post.dislikes})
                </button>
                <button type="button" className="btn-action">
                  Komentar ({post.comments})
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="post-card" style={{ textAlign: "center", padding: "28px" }}>
            <p style={{ color: "var(--text-muted)", margin: 0 }}>
              Diskusi tidak ditemukan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}