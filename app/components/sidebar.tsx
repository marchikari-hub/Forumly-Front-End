"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-dark text-white p-3 border-end border-secondary" style={{ width: "280px", minHeight: "100vh" }}>
      <div className="mb-4">
        <Link href="/" className="fs-3 fw-bold text-decoration-none text-primary">
          Forumly
        </Link>
      </div>

      <div className="nav flex-column nav-pills">
        <span className="text-muted small fw-bold mb-2">NAVIGASI UTAMA</span>
        <Link 
          href="/" 
          className={`nav-link text-white mb-1 ${pathname === "/" ? "active" : ""}`}
        >
          Beranda
        </Link>
        <Link 
          href="/explore" 
          className={`nav-link text-white mb-1 ${pathname.startsWith("/explore") ? "active" : ""}`}
        >
          Explore Topik
        </Link>
        <Link 
          href="/community" 
          className={`nav-link text-white mb-3 ${pathname === "/community" ? "active" : ""}`}
        >
          Komunitas
        </Link>
      </div>
    </aside>
  );
}