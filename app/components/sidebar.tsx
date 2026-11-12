"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
  }, [isDarkMode]);

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="brand">
          <Link href="/" className="logo">
            Forumly
          </Link>
        </div>

        <nav className="nav-group">
          <span className="nav-title">NAVIGASI UTAMA</span>
          <Link href="/" className={`nav-item ${pathname === "/" ? "active" : ""}`}>
            Beranda
          </Link>
          <Link href="/explore" className={`nav-item ${pathname.startsWith("/explore") ? "active" : ""}`}>
            Explore Topik
          </Link>
          <Link href="/community" className={`nav-item ${pathname === "/community" ? "active" : ""}`}>
            Komunitas
          </Link>
        </nav>
      </div>

      <div className="sidebar-bottom">
        <button
          type="button"
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="btn-sidebar-theme"
        >
          {isDarkMode ? "Mode Terang" : "Mode Gelap"}
        </button>
      </div>
    </aside>
  );
}