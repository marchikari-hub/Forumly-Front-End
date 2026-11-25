"use client";

import React, { useState } from "react";
import { useForumContent } from "./ForumContent";

interface ReportModalProps {
  isOpen: boolean;
  targetLabel: string;
  onClose: () => void;
  onConfirm: (reason: string, detail: string) => void;
}

export default function ReportModal({
  isOpen,
  targetLabel,
  onClose,
  onConfirm,
}: ReportModalProps) {
  const { t } = useForumContent();
  const [reason, setReason] = useState("Spam / Penipuan");
  const [detail, setDetail] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(reason, detail);
    setDetail("");
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "12px",
            marginBottom: "14px",
            borderBottom: "1px solid var(--border-color)",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "16px",
              fontWeight: 700,
              color: "var(--text-main)",
            }}
          >
            {t("Laporkan Konten", "Report Content")}
          </h3>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              fontSize: "18px",
              cursor: "pointer",
            }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <p
          style={{
            fontSize: "12px",
            color: "var(--text-muted)",
            marginBottom: "12px",
          }}
        >
          {targetLabel}
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--text-main)",
                marginBottom: "6px",
              }}
            >
              {t("Pilih alasan melaporkan:", "Select a reason:")}
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="search-input"
            >
              <option value="Spam / Penipuan">
                {t("Spam / Penipuan", "Spam / Scam")}
              </option>
              <option value="Ujaran Kebencian / Pelecehan">
                {t("Ujaran Kebencian / Pelecehan", "Hate Speech / Harassment")}
              </option>
              <option value="Konten Tidak Pantas">
                {t("Konten Tidak Pantas", "Inappropriate Content")}
              </option>
              <option value="Informasi Menyesatkan">
                {t("Informasi Menyesatkan", "Misinformation")}
              </option>
            </select>
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--text-muted)",
                marginBottom: "6px",
              }}
            >
              {t("Catatan tambahan (opsional)", "Additional note (optional)")}
            </label>
            <input
              type="text"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder={t("Tulis detail singkat...", "Write brief details...")}
              className="search-input"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", padding: "10px" }}
          >
            {t("Kirim Laporan", "Submit Report")}
          </button>
        </form>
      </div>
    </div>
  );
}