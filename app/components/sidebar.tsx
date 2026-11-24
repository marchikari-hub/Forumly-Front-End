"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Settings } from "lucide-react";

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

          <span className="nav-title">HALAMAN UTAMA</span>
          <Link href="/posts" className={`nav-item ${pathname === "/posts" ? "active" : ""}`}>
            Post
          </Link>
          <Link href="/saved" className={`nav-item ${pathname === "/saved" ? "active" : ""}`}>
            Tersimpan
          </Link>
          <Link href="/create-post" className={`nav-item ${pathname === "/create-post" ? "active" : ""}`}>
            Buat Post
          </Link>
          <Link href="/chat" className={`nav-item ${pathname === "/chat" ? "active" : ""}`}>
            Chat
          </Link>
          <Link href="/inbox" className={`nav-item ${pathname === "/inbox" ? "active" : ""}`}>
            Inbox
          </Link>
          <Link href="/whats-new" className={`nav-item ${pathname === "/whats-new" ? "active" : ""}`}>
            What's New
          </Link>
          <Link href="/about" className={`nav-item ${pathname === "/about" ? "active" : ""}`}>
            About
          </Link>
          <Link href="/settings" className={`nav-item ${pathname === "/settings" ? "active" : ""}`}>
            Settings
          </Link>
          <Link href="/contact-us" className={`nav-item ${pathname === "/contact-us" ? "active" : ""}`}>
            Contact Us
          </Link>
        </nav>
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-actions">
          <button
            type="button"
            onClick={toggleTheme}
            className="btn-sidebar-theme"
          >
            {isDarkMode ? "Mode Terang" : "Mode Gelap"}
          </button>
          <Link
            href="/settings"
            className={`btn-sidebar-settings${pathname === "/settings" ? " active" : ""}`}
            aria-label="Pengaturan"
            title="Pengaturan"
          >
            <Settings size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </aside>
  );
}