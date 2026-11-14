"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const pathname = usePathname();
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
          onClick={toggleTheme}
          className="btn-sidebar-theme"
        >
          {isDarkMode ? "Mode Terang" : "Mode Gelap"}
        </button>
      </div>
    </aside>
  );
}