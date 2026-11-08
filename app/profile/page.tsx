"use client";

import { useState } from "react";
import Nav from "./heading/nav";
import Hero from "./heading/hero";
import Footer from "./footer/footer";
import styles from "./profile.module.css";

type Post = {
  id: number;
  judul: string;
  isi: string;
  suka: number;
  tidakSuka: number;
  komentar: number;
  laporan: number;
};

type Kolom = "suka" | "tidakSuka" | "komentar" | "laporan";

const postAwal: Post[] = [
  { id: 1, judul: "Judul Post Contoh", isi: "Ini contoh preview isi post...", suka: 0, tidakSuka: 0, komentar: 0, laporan: 0 },
  { id: 2, judul: "Belajar HTML, CSS, dan JavaScript", isi: "Lagi ngerjain project forum bareng teman-teman kelompok.", suka: 0, tidakSuka: 0, komentar: 0, laporan: 0 },
  { id: 3, judul: "Mulai Belajar Next.js", isi: "Sekarang project forum dibuat ulang pakai Next.js.", suka: 0, tidakSuka: 0, komentar: 0, laporan: 0 },
];

export default function ProfilePage() {
  const [foto, setFoto] = useState("");
  const [daftarPost, setDaftarPost] = useState<Post[]>(postAwal);

  const nama = "graciacs.14052008";
  const email = "graciacs.14052008@gmail.com";

  const gantiFoto = (file: File) => {
    setFoto(URL.createObjectURL(file));
  };

  const tambahAngka = (id: number, kolom: Kolom) => {
    setDaftarPost((lama) =>
      lama.map((p) => (p.id === id ? { ...p, [kolom]: p[kolom] + 1 } : p))
    );
  };

  const tambahPost = () => {
    const judul = window.prompt("Judul post baru:");
    if (!judul) return;
    const isi = window.prompt("Isi post:") || "";
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
        />

        <div className={styles.judulBagian}>
          <h2>Postingan Saya</h2>
          <button className={styles.tombolTambah} onClick={tambahPost}>
            +
          </button>
        </div>

        {daftarPost.map((p) => (
          <div key={p.id} className={styles.kartuPost}>
            <h3 className={styles.judulPost}>{p.judul}</h3>
            <p className={styles.isiPost}>{p.isi}</p>
            <hr className={styles.garis} />
            <div className={styles.barisAksi}>
              <button className={styles.tombolAksi} onClick={() => tambahAngka(p.id, "suka")}>
                ♥ Suka ({p.suka})
              </button>
              <button className={styles.tombolAksi} onClick={() => tambahAngka(p.id, "tidakSuka")}>
                Tidak Suka ({p.tidakSuka})
              </button>
              <button className={styles.tombolAksi} onClick={() => tambahAngka(p.id, "komentar")}>
                Komentar ({p.komentar})
              </button>
              <button className={styles.tombolAksi} onClick={() => tambahAngka(p.id, "laporan")}>
                Laporkan ({p.laporan})
              </button>
            </div>
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
}