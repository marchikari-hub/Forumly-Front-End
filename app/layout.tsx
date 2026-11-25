import type { Metadata } from "next";
import localFont from "next/font/local";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Sidebar from "./components/sidebar";
import { ForumContentProvider } from "./components/ForumContent";
import { RightSidebarInfo } from "./components/RightSidebarInfo";

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
        <ForumContentProvider>
          <div className="app-container">
            <Sidebar />
            <main className="main-content">{children}</main>
            <aside className="right-sidebar">
              <RightSidebarInfo />
            </aside>
          </div>
        </ForumContentProvider>
      </body>
    </html>
  );
}