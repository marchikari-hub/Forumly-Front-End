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
    </div>
  );
}