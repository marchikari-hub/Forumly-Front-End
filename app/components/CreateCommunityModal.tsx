"use client";

import { useState } from "react";

interface CreateCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, desc: string) => void;
  isLightMode: boolean;
}

export default function CreateCommunityModal({
  isOpen,
  onClose,
  onSubmit,
  isLightMode,
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

  const modalBg = isLightMode ? "#ffffff" : "#141414";
  const modalText = isLightMode ? "#111827" : "#ffffff";
  const modalBorder = isLightMode ? "#e5e7eb" : "#27272a";
  const inputBg = isLightMode ? "#f3f4f6" : "#27272a";

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(8px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          width: "460px",
          backgroundColor: modalBg,
          border: `1px solid ${modalBorder}`,
          borderRadius: "12px",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 24px 16px 24px",
            borderBottom: `1px solid ${modalBorder}`,
          }}
        >
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600, color: modalText }}>
            Buat Komunitas
          </h3>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: modalText,
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
                fontWeight: 500,
                color: modalText,
              }}
            >
              Nama Komunitas
            </label>
            <input
              type="text"
              placeholder="Contoh: Pemrograman Web"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "6px",
                border: `1px solid ${modalBorder}`,
                backgroundColor: inputBg,
                color: modalText,
                outline: "none",
                fontSize: "14px",
              }}
              required
            />
          </div>

          <div>
            <label
              style={{
                fontSize: "12px",
                display: "block",
                marginBottom: "6px",
                fontWeight: 500,
                color: modalText,
              }}
            >
              Deskripsi
            </label>
            <textarea
              placeholder="Jelaskan tujuan komunitas..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={3}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "6px",
                border: `1px solid ${modalBorder}`,
                backgroundColor: inputBg,
                color: modalText,
                resize: "none",
                outline: "none",
                fontSize: "14px",
              }}
            />
          </div>

          <div style={{ marginTop: "8px" }}>
            <button
              type="submit"
              className="explore-btn"
              style={{
                backgroundColor: "#1d74f5",
                color: "#ffffff",
                width: "100%",
                textAlign: "center",
                padding: "11px",
                borderColor: "#1d74f5",
                fontWeight: 500,
              }}
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}