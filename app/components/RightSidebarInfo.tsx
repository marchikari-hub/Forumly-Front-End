"use client";

import React from "react";
import { useForumContent } from "./ForumContent";
import { FORUM_RULES } from "../data/forumData";

export function RightSidebarInfo() {
  const { t } = useForumContent();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div className="widget-card">
        <div className="widget-title">
          {t("Tentang Forumly", "About Forumly")}
        </div>
        <p className="widget-text" style={{ marginBottom: 0 }}>
          {t(
            "Ruang diskusi mahasiswa untuk berbagi informasi perkuliahan, teknologi, dan komunitas.",
            "Student discussion space for sharing coursework, tech, and community updates."
          )}
        </p>
      </div>

      <div className="widget-card">
        <div className="widget-title">
          {t("Aturan Forum", "Forum Rules")}
        </div>
        <ul
          className="widget-text"
          style={{
            margin: 0,
            paddingLeft: "18px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          {FORUM_RULES.map((rule) => (
            <li key={rule.id}>{t(rule.titleId, rule.titleEn)}</li>
          ))}
        </ul>
      </div>

      <div className="widget-card">
        <div className="widget-title">
          {t("Ketentuan & Keterangan Forum", "Forum Guidelines & Notes")}
        </div>
        <ul
          className="widget-text"
          style={{
            margin: 0,
            paddingLeft: "18px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <li>
            <strong>{t("Relevansi & Kualitas:", "Relevance & Quality:")}</strong>{" "}
            {t(
              "Gunakan kategori atau topik yang sesuai dan jelaskan konteks masalah agar diskusi mudah dipahami.",
              "Pick a relevant topic and provide clear context so others can help effectively."
            )}
          </li>
          <li>
            <strong>{t("Keamanan Data:", "Data Safety:")}</strong>{" "}
            {t(
              "Hindari mengunggah data pribadi, kredensial akun, atau informasi rahasia di kolom publik maupun komentar.",
              "Avoid sharing personal data, account credentials, or confidential info in public posts or comments."
            )}
          </li>
          <li>
            <strong>{t("Moderasi & Laporan:", "Moderation & Reports:")}</strong>{" "}
            {t(
              "Konten yang melanggar etika dapat dilaporkan melalui tombol Laporkan untuk ditinjau.",
              "Content that violates community standards can be flagged using the Report button for review."
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}