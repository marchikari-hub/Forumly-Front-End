import type { Metadata } from "next";
import localFont from "next/font/local";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Forumly - Platform Diskusi",
  description: "Platform Diskusi Mahasiswa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-dark text-light`}>
        <div className="d-flex min-vh-100">
          <aside className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-white border-end border-secondary" style={{ width: "280px", minHeight: "100vh" }}>
            <div className="brand mb-4">
              <Link href="/" className="fs-3 fw-bold text-decoration-none text-primary">Forumly</Link>
            </div>
            <nav className="nav nav-pills flex-column mb-auto">
              <span className="text-muted small fw-bold mb-2">NAVIGASI UTAMA</span>
              <Link href="/" className="nav-link text-white mb-1">Beranda</Link>
              <Link href="/explore" className="nav-link text-white mb-1">Explore Topik</Link>
              <Link href="/community" className="nav-link text-white mb-3">Komunitas</Link>
            </nav>
          </aside>

          <main className="flex-grow-1 p-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}