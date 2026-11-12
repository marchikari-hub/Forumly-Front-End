import type { Metadata } from "next";
import localFont from "next/font/local";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Sidebar from "./components/sidebar";

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
    <html lang="id" data-theme="light">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="app-container">
          <Sidebar />
          <main className="main-content">{children}</main>
          <aside className="right-sidebar">
            <div className="widget-card">
              <div className="widget-title">Tentang Forumly</div>
              <p className="widget-text">
                Ruang diskusi mahasiswa untuk berbagi informasi perkuliahan, teknologi, dan komunitas.
              </p>
            </div>
          </aside>
        </div>
      </body>
    </html>
  );
}