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
  sudahSuka?: boolean;
  sudahTidakSuka?: boolean;
};

type Kolom = "suka" | "tidakSuka" | "komentar" | "laporan";

type Balasan = {
  id: number;
  penulis: string;
  teks: string;
};

type Komentar = {
  id: number;
  penulis: string;
  teks: string;
  suka: number;
  tidakSuka: number;
  sudahSuka: boolean;
  sudahTidakSuka: boolean;
  dilaporkan: boolean;
  balasan: Balasan[];
};

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

const KUNCI_KOMENTAR = "forumly_profil_komentar_v1";
const KUNCI_POST = "forumly_profil_post_v1";

const kirimJson = (url: string, body: object) =>
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

const gayaKotakKomentar = {
  flex: 1,
  padding: "10px 14px",
  margin: 0,
  borderRadius: "8px",
  border: "1px solid rgba(128, 128, 128, 0.25)",
  background: "rgba(128, 128, 128, 0.15)",
  fontSize: "14px",
  outline: "none",
} as const;

const gayaTombolBiru = {
  padding: "10px 18px",
  borderRadius: "8px",
  border: "none",
  background: "#1877f2",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
} as const;

const gayaTombolKecil = {
  padding: "6px 14px",
  borderRadius: "8px",
  fontSize: "13px",
  fontWeight: 600,
  cursor: "pointer",
} as const;

const gayaKartuKomentar = {
  marginTop: "14px",
  padding: "12px 14px",
  borderRadius: "8px",
  border: "1px solid rgba(128, 128, 128, 0.25)",
  background: "rgba(128, 128, 128, 0.1)",
} as const;

const gayaKartuBalasan = {
  marginTop: "12px",
  padding: "8px 14px",
  borderLeft: "3px solid #1877f2",
  background: "rgba(128, 128, 128, 0.12)",
  borderRadius: "6px",
} as const;

export default function ProfilePage() {
  const router = useRouter();
  const { t } = useForumContent();
  const { foto, simpanFoto } = useFotoProfil();
  const [showCamera, setShowCamera] = useState(false);
  const [daftarPost, setDaftarPost] = useState<Post[]>(postAwal);
  const [komentarMap, setKomentarMap] = useState<Record<number, Komentar[]>>({});
  const [teksKomentar, setTeksKomentar] = useState<Record<number, string>>({});
  const [balasAktif, setBalasAktif] = useState<string | null>(null);
  const [teksBalas, setTeksBalas] = useState<Record<string, string>>({});
  const [siapSimpan, setSiapSimpan] = useState(false);

  const nama = "graciacs.14052008";
  const email = "graciacs.14052008@gmail.com";

  const muatPost = async () => {
    try {
      const res = await fetch("/api/search?q=", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      const rows: Record<string, unknown>[] = Array.isArray(data)
        ? data
        : data.items ?? data.posts ?? data.results ?? [];
      const milik: Post[] = rows
        .filter((r) => r.author === nama)
        .map((r) => ({
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
    } catch {}
  };

  useEffect(() => {
    try {
      const komentarTersimpan = localStorage.getItem(KUNCI_KOMENTAR);
      if (komentarTersimpan) setKomentarMap(JSON.parse(komentarTersimpan));
      const postTersimpan = localStorage.getItem(KUNCI_POST);
      if (postTersimpan) {
        const parsed: Post[] = JSON.parse(postTersimpan);
        if (Array.isArray(parsed) && parsed.length > 0) setDaftarPost(parsed);
      }
    } catch {}
    setSiapSimpan(true);
  }, []);

  useEffect(() => {
    muatPost();
  }, []);

  useEffect(() => {
    if (!siapSimpan) return;
    try {
      localStorage.setItem(KUNCI_KOMENTAR, JSON.stringify(komentarMap));
    } catch {}
  }, [komentarMap, siapSimpan]);

  useEffect(() => {
    if (!siapSimpan) return;
    if (daftarPost.some((p) => p.asli)) return;
    try {
      localStorage.setItem(KUNCI_POST, JSON.stringify(daftarPost));
    } catch {}
  }, [daftarPost, siapSimpan]);

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
      lama.map((p) => {
        if (p.id !== id) return p;
        if (kolom === "suka") {
          return p.sudahSuka
            ? { ...p, suka: p.suka - 1, sudahSuka: false }
            : { ...p, suka: p.suka + 1, sudahSuka: true };
        }
        if (kolom === "tidakSuka") {
          return p.sudahTidakSuka
            ? { ...p, tidakSuka: p.tidakSuka - 1, sudahTidakSuka: false }
            : { ...p, tidakSuka: p.tidakSuka + 1, sudahTidakSuka: true };
        }
        return { ...p, [kolom]: p[kolom] + 1 };
      })
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

  const fokusKomentar = (id: number) => {
    const el = document.getElementById(`input-komentar-${id}`);
    if (el) el.focus();
  };

  const ubahKomentar = (
    postId: number,
    komentarId: number,
    ubah: (k: Komentar) => Komentar
  ) => {
    setKomentarMap((lama) => ({
      ...lama,
      [postId]: (lama[postId] ?? []).map((k) =>
        k.id === komentarId ? ubah(k) : k
      ),
    }));
  };

  const kirimKomentar = async (p: Post) => {
    const text = (teksKomentar[p.id] ?? "").trim();
    if (!text) return;

    if (p.asli) {
      const res = await kirimJson(`/api/items/${p.id}/comments`, { text });
      if (res.status === 401) return router.push("/login");
      if (!res.ok) return;
    }

    const baru: Komentar = {
      id: Date.now(),
      penulis: t("Anda", "You"),
      teks: text,
      suka: 0,
      tidakSuka: 0,
      sudahSuka: false,
      sudahTidakSuka: false,
      dilaporkan: false,
      balasan: [],
    };

    setKomentarMap((lama) => ({
      ...lama,
      [p.id]: [...(lama[p.id] ?? []), baru],
    }));
    setTeksKomentar((lama) => ({ ...lama, [p.id]: "" }));

    if (p.asli) {
      await muatPost();
    } else {
      setDaftarPost((lama) =>
        lama.map((x) => (x.id === p.id ? { ...x, komentar: x.komentar + 1 } : x))
      );
    }
  };

  const sukaKomentar = (postId: number, komentarId: number) => {
    ubahKomentar(postId, komentarId, (k) =>
      k.sudahSuka
        ? { ...k, suka: Math.max(0, k.suka - 1), sudahSuka: false }
        : {
            ...k,
            suka: k.suka + 1,
            sudahSuka: true,
            tidakSuka: k.sudahTidakSuka
              ? Math.max(0, k.tidakSuka - 1)
              : k.tidakSuka,
            sudahTidakSuka: false,
          }
    );
  };

  const tidakSukaKomentar = (postId: number, komentarId: number) => {
    ubahKomentar(postId, komentarId, (k) =>
      k.sudahTidakSuka
        ? { ...k, tidakSuka: Math.max(0, k.tidakSuka - 1), sudahTidakSuka: false }
        : {
            ...k,
            tidakSuka: k.tidakSuka + 1,
            sudahTidakSuka: true,
            suka: k.sudahSuka ? Math.max(0, k.suka - 1) : k.suka,
            sudahSuka: false,
          }
    );
  };

  const laporKomentar = (postId: number, komentarId: number) => {
    ubahKomentar(postId, komentarId, (k) => ({ ...k, dilaporkan: true }));
  };

  const kirimBalasan = (postId: number, komentarId: number) => {
    const kunci = `${postId}-${komentarId}`;
    const text = (teksBalas[kunci] ?? "").trim();
    if (!text) return;
    ubahKomentar(postId, komentarId, (k) => ({
      ...k,
      balasan: [
        ...k.balasan,
        { id: Date.now(), penulis: t("Anda", "You"), teks: text },
      ],
    }));
    setTeksBalas((lama) => ({ ...lama, [kunci]: "" }));
    setBalasAktif(null);
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
              <button className={styles.tombolAksi} onClick={() => aksi(p, "suka")}>
                ♥ {t("Suka", "Like")} ({p.suka})
              </button>
              <button className={styles.tombolAksi} onClick={() => aksi(p, "tidakSuka")}>
                {t("Tidak Suka", "Dislike")} ({p.tidakSuka})
              </button>
              <button className={styles.tombolAksi} onClick={() => fokusKomentar(p.id)}>
                {t("Komentar", "Comments")} ({p.komentar})
              </button>
              <button className={styles.tombolAksi} onClick={() => aksi(p, "laporan")}>
                {t("Laporkan", "Report")} ({p.laporan})
              </button>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "18px" }}>
              <input
                id={`input-komentar-${p.id}`}
                className={styles.isiPost}
                value={teksKomentar[p.id] ?? ""}
                onChange={(e) =>
                  setTeksKomentar((lama) => ({ ...lama, [p.id]: e.target.value }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") kirimKomentar(p);
                }}
                placeholder={t("Tulis komentar...", "Write a comment...")}
                style={gayaKotakKomentar}
              />
              <button style={gayaTombolBiru} onClick={() => kirimKomentar(p)}>
                {t("Kirim", "Send")}
              </button>
            </div>

            {(komentarMap[p.id] ?? []).map((k) => {
              const kunci = `${p.id}-${k.id}`;
              return (
                <div key={k.id} style={gayaKartuKomentar}>
                  <strong
                    className={styles.judulPost}
                    style={{ display: "block", margin: 0, fontSize: "14px" }}
                  >
                    {k.penulis}
                  </strong>
                  <p
                    className={styles.isiPost}
                    style={{ margin: "4px 0 10px", fontSize: "14px" }}
                  >
                    {k.teks}
                  </p>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <button
                      className={styles.tombolAksi}
                      style={gayaTombolKecil}
                      onClick={() => sukaKomentar(p.id, k.id)}
                    >
                      {t("Suka", "Like")} ({k.suka})
                    </button>
                    <button
                      className={styles.tombolAksi}
                      style={gayaTombolKecil}
                      onClick={() => tidakSukaKomentar(p.id, k.id)}
                    >
                      {t("Tidak Suka", "Dislike")} ({k.tidakSuka})
                    </button>
                    <button
                      className={styles.tombolAksi}
                      style={gayaTombolKecil}
                      onClick={() =>
                        setBalasAktif(balasAktif === kunci ? null : kunci)
                      }
                    >
                      {t("Balas", "Reply")}
                    </button>
                    <button
                      className={styles.tombolAksi}
                      style={{
                        ...gayaTombolKecil,
                        opacity: k.dilaporkan ? 0.6 : 1,
                        cursor: k.dilaporkan ? "default" : "pointer",
                      }}
                      disabled={k.dilaporkan}
                      onClick={() => laporKomentar(p.id, k.id)}
                    >
                      {k.dilaporkan
                        ? t("Dilaporkan", "Reported")
                        : t("Laporkan", "Report")}
                    </button>
                  </div>

                  {balasAktif === kunci && (
                    <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                      <input
                        autoFocus
                        className={styles.isiPost}
                        value={teksBalas[kunci] ?? ""}
                        onChange={(e) =>
                          setTeksBalas((lama) => ({ ...lama, [kunci]: e.target.value }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") kirimBalasan(p.id, k.id);
                        }}
                        placeholder={`${t("Balas", "Reply to")} ${k.penulis}...`}
                        style={gayaKotakKomentar}
                      />
                      <button
                        style={gayaTombolBiru}
                        onClick={() => kirimBalasan(p.id, k.id)}
                      >
                        {t("Balas", "Reply")}
                      </button>
                    </div>
                  )}

                  {k.balasan.map((b) => (
                    <div key={b.id} style={gayaKartuBalasan}>
                      <strong
                        className={styles.judulPost}
                        style={{ display: "block", margin: 0, fontSize: "13px" }}
                      >
                        {b.penulis}
                      </strong>
                      <p
                        className={styles.isiPost}
                        style={{ margin: "2px 0 0", fontSize: "13px" }}
                      >
                        {b.teks}
                      </p>
                    </div>
                  ))}
                </div>
              );
            })}
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