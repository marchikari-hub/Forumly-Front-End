"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import { useForumContent } from "./ForumContent";
import FotoProfilMini from "./FotoProfilMini";

export default function Sidebar() {
  const pathname = usePathname();
  const { lang, setLang, t } = useForumContent();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    const themeStr = newMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", themeStr);
    localStorage.setItem("theme", themeStr);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div
          className="brand"
          style={{ display: "flex", alignItems: "center", gap: 12 }}
        >
          <Link href="/" className="logo">
            Forumly
          </Link>
          <FotoProfilMini />
        </div>

        <nav className="nav-group">
          <span className="nav-title">{t("NAVIGASI UTAMA", "MAIN NAVIGATION")}</span>
          <Link href="/" className={`nav-item ${pathname === "/" ? "active" : ""}`}>
            {t("Beranda", "Home")}
          </Link>
          <Link
            href="/explore"
            className={`nav-item ${pathname.startsWith("/explore") ? "active" : ""}`}
          >
            {t("Explore Topik", "Explore Topics")}
          </Link>
          <Link
            href="/community"
            className={`nav-item ${pathname === "/community" ? "active" : ""}`}
          >
            {t("Komunitas", "Communities")}
          </Link>

          <span className="nav-title">{t("HALAMAN UTAMA", "MAIN PAGES")}</span>
          <Link href="/posts" className={`nav-item ${pathname === "/posts" ? "active" : ""}`}>
            {t("Postingan", "Posts")}
          </Link>
          <Link href="/saved" className={`nav-item ${pathname === "/saved" ? "active" : ""}`}>
            {t("Tersimpan", "Saved")}
          </Link>
          <Link href="/search" className={`nav-item ${pathname === "/search" ? "active" : ""}`}>
          {t("Pencarian", "Search")}
          </Link>
          <Link
            href="/create-post"
            className={`nav-item ${pathname === "/create-post" ? "active" : ""}`}
          >
            {t("Buat Post", "Create Post")}
          </Link>
          <Link href="/chat" className={`nav-item ${pathname === "/chat" ? "active" : ""}`}>
            {t("Chat", "Chat")}
          </Link>
          <Link href="/inbox" className={`nav-item ${pathname === "/inbox" ? "active" : ""}`}>
            {t("Inbox", "Inbox")}
          </Link>
          <Link
            href="/whats-new"
            className={`nav-item ${pathname === "/whats-new" ? "active" : ""}`}
          >
            {t("Pembaruan", "What's New")}
          </Link>
          <Link href="/about" className={`nav-item ${pathname === "/about" ? "active" : ""}`}>
            {t("Tentang", "About")}
          </Link>
          <Link
            href="/settings"
            className={`nav-item ${pathname === "/settings" ? "active" : ""}`}
          >
            {t("Pengaturan", "Settings")}
          </Link>
          <Link
            href="/contact-us"
            className={`nav-item ${pathname === "/contact-us" ? "active" : ""}`}
          >
            {t("Hubungi Kami", "Contact Us")}
          </Link>
        </nav>
      </div>

      <div className="sidebar-bottom">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4px",
            padding: "4px",
            marginBottom: "8px",
            borderRadius: "8px",
            backgroundColor: "var(--input-bg)",
            border: "1px solid var(--border-color)",
          }}
        >
          <button
            type="button"
            onClick={() => setLang("id")}
            style={{
              padding: "6px 0",
              borderRadius: "6px",
              border: "none",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
              backgroundColor: lang === "id" ? "var(--accent)" : "transparent",
              color: lang === "id" ? "#ffffff" : "var(--text-muted)",
            }}
          >
            ID
          </button>
          <button
            type="button"
            onClick={() => setLang("en")}
            style={{
              padding: "6px 0",
              borderRadius: "6px",
              border: "none",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
              backgroundColor: lang === "en" ? "var(--accent)" : "transparent",
              color: lang === "en" ? "#ffffff" : "var(--text-muted)",
            }}
          >
            EN
          </button>
        </div>

        <div className="sidebar-actions">
          <button
            type="button"
            onClick={toggleTheme}
            className="btn-sidebar-theme"
          >
            {isDarkMode ? t("Mode Terang", "Light Mode") : t("Mode Gelap", "Dark Mode")}
          </button>
          <Link
            href="/settings"
            className={`btn-sidebar-settings${pathname === "/settings" ? " active" : ""}`}
            aria-label={t("Pengaturan", "Settings")}
            title={t("Pengaturan", "Settings")}
          >
            <Settings size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </aside>
  );
}