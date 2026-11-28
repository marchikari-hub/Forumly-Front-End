"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "./heading/nav";
import Hero from "./heading/hero";
import Footer from "./footer/footer";
import CameraProfile from "../components/CameraProfile";
import { useForumContent } from "../components/ForumContent";
import styles from "./profile.module.css";
import { useFotoProfil } from "../../lib/fotoprofile";

type Post = {
  id: number;
  judul: string;
  isi: string;
  judulEn?: string;
  isiEn?: string;
  suka: number;
  tidakSuka: number;
  komentar: number;
  laporan: number;
  asli?: boolean;
};

type Kolom = "suka" | "tidakSuka" | "komentar" | "laporan";

const postAwal: Post[] = [
  {
    id: 1,
    judul: "Judul Post Contoh",
    isi: "Ini contoh preview isi post...",
    judulEn: "Example Post Title",
    isiEn: "This is an example preview of the post content...",
    suka: 0,
    tidakSuka: 0,
    komentar: 0,
    laporan: 0,
  },
  {
    id: 2,
    judul: "Belajar HTML, CSS, dan JavaScript",
    isi: "Lagi ngerjain project forum bareng teman-teman kelompok.",
    judulEn: "Learning HTML, CSS, and JavaScript",
    isiEn: "Working on the forum project with my group mates.",
    suka: 0,
    tidakSuka: 0,
    komentar: 0,
    laporan: 0,
  },
  {
    id: 3,
    judul: "Mulai Belajar Next.js",
    isi: "Sekarang project forum dibuat ulang pakai Next.js.",
    judulEn: "Starting to Learn Next.js",
    isiEn: "The forum project is now being rebuilt with Next.js.",
    suka: 0,
    tidakSuka: 0,
    komentar: 0,
    laporan: 0,
  },
];

const kirimJson = (url: string, body: object) =>
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

export default function ProfilePage() {
  const router = useRouter();
  const { t } = useForumContent();
  const { foto, simpanFoto } = useFotoProfil();
  const [showCamera, setShowCamera] = useState(false);
  const [daftarPost, setDaftarPost] = useState<Post[]>(postAwal);

  const nama = "graciacs.14052008";
  const email = "graciacs.14052008@gmail.com";

  const muatPost = async () => {
    try {
      const res = await fetch("/api/search?q=", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      const rows = Array.isArray(data)
        ? data
        : data.items ?? data.posts ?? data.results ?? [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const milik: Post[] = rows
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((r: any) => r.author === nama)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((r: any) => ({
          id: Number(r.id),
          judul: String(r.title ?? ""),
          isi: String(r.content ?? ""),
          suka: Number(r.likes ?? 0),
          tidakSuka: Number(r.dislikes ?? 0),
          komentar: Number(r.comments ?? r.commentCount ?? 0),
          laporan: Number(r.reports ?? 0),
          asli: true,
        }));
      if (milik.length > 0) setDaftarPost(milik);
    } catch {
      // kalau gagal, tetap pakai post contoh
    }
  };

  useEffect(() => {
    muatPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gantiFoto = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => simpanFoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const ambilFoto = (dataUrl: string) => {
    simpanFoto(dataUrl);
  };

  const tambahAngka = (id: number, kolom: Kolom) => {
    setDaftarPost((lama) =>
      lama.map((p) => (p.id === id ? { ...p, [kolom]: p[kolom] + 1 } : p))
    );
  };

  const aksi = async (p: Post, kolom: Kolom) => {
    if (!p.asli) return tambahAngka(p.id, kolom);

    let res: Response;
    if (kolom === "suka" || kolom === "tidakSuka") {
      res = await kirimJson(`/api/items/${p.id}/react`, {
        type: kolom === "suka" ? "like" : "dislike",
      });
    } else if (kolom === "komentar") {
      const text = window.prompt(t("Tulis komentar:", "Write a comment:"));
      if (!text) return;
      res = await kirimJson(`/api/items/${p.id}/comments`, { text });
    } else {
      const reason =
        window.prompt(t("Alasan laporan:", "Report reason:"), "spam") || "spam";
      res = await kirimJson(`/api/items/${p.id}/report`, { reason });
    }

    if (res.status === 401) return router.push("/login");
    await muatPost();
  };

  const tambahPost = () => router.push("/create-post");

  return (
    <div className={styles.halaman}>
      <Nav />
      <main className={styles.wadah}>
        <Hero
          nama={nama}
          email={email}
          foto={foto}
          jumlahPost={daftarPost.length}
          onGantiFoto={gantiFoto}
          onAmbilFoto={() => setShowCamera(true)}
        />

        <div className={styles.judulBagian}>
          <h2>{t("Postingan Saya", "My Posts")}</h2>
          <button className={styles.tombolTambah} onClick={tambahPost}>
            +
          </button>
        </div>

        {daftarPost.map((p) => (
          <div key={p.id} className={styles.kartuPost}>
            <h3 className={styles.judulPost}>{t(p.judul, p.judulEn ?? p.judul)}</h3>
            <p className={styles.isiPost}>{t(p.isi, p.isiEn ?? p.isi)}</p>
            <hr className={styles.garis} />
            <div className={styles.barisAksi}>
              <button className={styles.tombolAksi} onClick={() => aksi(p, "suka")}>
                ♥ {t("Suka", "Like")} ({p.suka})
              </button>
              <button className={styles.tombolAksi} onClick={() => aksi(p, "tidakSuka")}>
                {t("Tidak Suka", "Dislike")} ({p.tidakSuka})
              </button>
              <button className={styles.tombolAksi} onClick={() => aksi(p, "komentar")}>
                {t("Komentar", "Comments")} ({p.komentar})
              </button>
              <button className={styles.tombolAksi} onClick={() => aksi(p, "laporan")}>
                {t("Laporkan", "Report")} ({p.laporan})
              </button>
            </div>
          </div>
        ))}
      </main>
      <Footer />

      {showCamera && (
        <CameraProfile
          onCapture={ambilFoto}
          onClose={() => setShowCamera(false)}
        />
      )}
    </div>
  );
}