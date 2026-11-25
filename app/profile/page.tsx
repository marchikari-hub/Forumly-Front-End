"use client";

import { useState } from "react";
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

export default function ProfilePage() {
  const { t } = useForumContent();
  const { foto, simpanFoto } = useFotoProfil();
  const [showCamera, setShowCamera] = useState(false);
  const [daftarPost, setDaftarPost] = useState<Post[]>(postAwal);

  const nama = "graciacs.14052008";
  const email = "graciacs.14052008@gmail.com";

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

  const tambahPost = () => {
    const judul = window.prompt(t("Judul post baru:", "New post title:"));
    if (!judul) return;
    const isi = window.prompt(t("Isi post:", "Post content:")) || "";
    setDaftarPost((lama) => [
      { id: Date.now(), judul, isi, suka: 0, tidakSuka: 0, komentar: 0, laporan: 0 },
      ...lama,
    ]);
  };

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
              <button className={styles.tombolAksi} onClick={() => tambahAngka(p.id, "suka")}>
                ♥ {t("Suka", "Like")} ({p.suka})
              </button>
              <button className={styles.tombolAksi} onClick={() => tambahAngka(p.id, "tidakSuka")}>
                {t("Tidak Suka", "Dislike")} ({p.tidakSuka})
              </button>
              <button className={styles.tombolAksi} onClick={() => tambahAngka(p.id, "komentar")}>
                {t("Komentar", "Comments")} ({p.komentar})
              </button>
              <button className={styles.tombolAksi} onClick={() => tambahAngka(p.id, "laporan")}>
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