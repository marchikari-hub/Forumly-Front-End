"use client";

import { useState } from "react";

interface CreateCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, desc: string) => void;
}

export default function CreateCommunityModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateCommunityModalProps) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit(name, desc);
    setName("");
    setDesc("");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(6px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          width: "460px",
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          borderRadius: "12px",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 24px 16px 24px",
            borderBottom: "1px solid var(--border-color)",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--text-main)" }}>
            Buat Komunitas
          </h3>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              fontSize: "16px",
              padding: 0,
            }}
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ padding: "20px 24px 24px 24px", display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <div>
            <label
              style={{
                fontSize: "12px",
                display: "block",
                marginBottom: "6px",
                fontWeight: 700,
                color: "var(--text-muted)",
              }}
            >
              Nama Komunitas
            </label>
            <input
              type="text"
              placeholder="Contoh: Pemrograman Web"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="search-input"
              required
            />
          </div>

          <div>
            <label
              style={{
                fontSize: "12px",
                display: "block",
                marginBottom: "6px",
                fontWeight: 700,
                color: "var(--text-muted)",
              }}
            >
              Deskripsi
            </label>
            <textarea
              placeholder="Jelaskan tujuan komunitas..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={3}
              className="search-input"
              style={{ resize: "none", height: "auto" }}
            />
          </div>

          <div style={{ marginTop: "8px" }}>
            <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "11px" }}>
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}