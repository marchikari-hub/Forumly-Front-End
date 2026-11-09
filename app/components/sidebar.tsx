"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-white border-end border-secondary"
      style={{ width: "280px", minHeight: "100vh" }}
    >
      <div className="brand mb-4">
        <Link href="/" className="fs-3 fw-bold text-decoration-none text-primary">
          Forumly
        </Link>
      </div>
      <nav className="nav nav-pills flex-column mb-auto">
        <span className="text-muted small fw-bold mb-2">NAVIGASI UTAMA</span>
        <Link
          href="/"
          className={`nav-link text-white mb-1 ${
            pathname === "/" ? "active bg-primary" : ""
          }`}
        >
          Beranda
        </Link>
        <Link
          href="/explore"
          className={`nav-link text-white mb-1 ${
            pathname.startsWith("/explore") ? "active bg-primary" : ""
          }`}
        >
          Explore Topik
        </Link>
        <Link
          href="/community"
          className={`nav-link text-white mb-3 ${
            pathname === "/community" ? "active bg-primary" : ""
          }`}
        >
          Komunitas
        </Link>
      </nav>
    </aside>
  );
}