"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./chat.module.css";

type Pesan = {
  id: number;
  pengirim: "saya" | "lawan";
  isi: string;
  waktu: string;
};

type Kontak = {
  id: number;
  nama: string;
};

const kontakAwal: Kontak[] = [
  { id: 1, nama: "Teman Kelompok" },
  { id: 2, nama: "Asisten Dosen" },
  { id: 3, nama: "Komunitas Next.js" },
];

const pesanAwal: Record<number, Pesan[]> = {
  1: [
    { id: 1, pengirim: "lawan", isi: "Halo, fitur login sudah aku push ya.", waktu: "13:50" },
    { id: 2, pengirim: "saya", isi: "Oke, nanti aku pull dulu.", waktu: "13:52" },
  ],
  2: [
    { id: 1, pengirim: "lawan", isi: "Jangan lupa kumpulkan laporan UAS.", waktu: "09:10" },
  ],
  3: [],
};

function jamSekarang() {
  return new Date().toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ChatPage() {
  const [kontak] = useState<Kontak[]>(kontakAwal);
  const [aktifId, setAktifId] = useState<number>(kontakAwal[0].id);
  const [semuaPesan, setSemuaPesan] = useState<Record<number, Pesan[]>>(pesanAwal);
  const [teks, setTeks] = useState("");
  const [cari, setCari] = useState("");
  const akhirPesan = useRef<HTMLDivElement>(null);

  const kontakAktif = kontak.find((k) => k.id === aktifId)!;
  const pesanAktif = semuaPesan[aktifId] ?? [];

  const kontakTampil = kontak.filter((k) =>
    k.nama.toLowerCase().includes(cari.toLowerCase())
  );

  // scroll otomatis ke pesan paling bawah
  useEffect(() => {
    akhirPesan.current?.scrollIntoView({ behavior: "smooth" });
  }, [pesanAktif.length, aktifId]);

  const kirim = (e: FormEvent) => {
    e.preventDefault();
    const isi = teks.trim();
    if (!isi) return;

    const baru: Pesan = {
      id: Date.now(),
      pengirim: "saya",
      isi,
      waktu: jamSekarang(),
    };

    setSemuaPesan((lama) => ({
      ...lama,
      [aktifId]: [...(lama[aktifId] ?? []), baru],
    }));
    setTeks("");
  };

  return (
    <div className={styles.halaman}>
      <div className={styles.wadah}>
        {/* Daftar kontak */}
        <aside className={styles.daftarKontak}>
          <h2 className={styles.judul}>Chat</h2>
          <input
            className={styles.cari}
            placeholder="Cari percakapan..."
            value={cari}
            onChange={(e) => setCari(e.target.value)}
          />

          {kontakTampil.map((k) => {
            const pesan = semuaPesan[k.id] ?? [];
            const terakhir = pesan[pesan.length - 1];
            return (
              <button
                key={k.id}
                className={`${styles.kontak} ${k.id === aktifId ? styles.aktif : ""}`}
                onClick={() => setAktifId(k.id)}
              >
                <div className={styles.avatar}>{k.nama.charAt(0).toUpperCase()}</div>
                <div className={styles.infoKontak}>
                  <b>{k.nama}</b>
                  <span>{terakhir ? terakhir.isi : "Belum ada pesan"}</span>
                </div>
              </button>
            );
          })}

          {kontakTampil.length === 0 && (
            <p className={styles.kosong}>Percakapan tidak ditemukan.</p>
          )}
        </aside>

        {/* Panel percakapan */}
        <section className={styles.panelChat}>
          <header className={styles.header}>
            <div className={styles.avatar}>
              {kontakAktif.nama.charAt(0).toUpperCase()}
            </div>
            <b>{kontakAktif.nama}</b>
          </header>

          <div className={styles.isiPesan}>
            {pesanAktif.length === 0 && (
              <p className={styles.kosong}>Mulai percakapan dengan mengirim pesan.</p>
            )}

            {pesanAktif.map((p) => (
              <div
                key={p.id}
                className={`${styles.bubble} ${
                  p.pengirim === "saya" ? styles.saya : styles.lawan
                }`}
              >
                <p>{p.isi}</p>
                <span className={styles.waktu}>{p.waktu}</span>
              </div>
            ))}
            <div ref={akhirPesan} />
          </div>

          <form className={styles.formKirim} onSubmit={kirim}>
            <input
              className={styles.inputPesan}
              placeholder="Tulis pesan..."
              value={teks}
              onChange={(e) => setTeks(e.target.value)}
            />
            <button type="submit" className={styles.tombolKirim}>
              Kirim
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}