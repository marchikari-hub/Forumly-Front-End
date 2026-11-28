"use client";

import { useForumContent } from "../components/ForumContent";

const gayaKartu = {
  backgroundColor: "var(--bg-card)",
  border: "1px solid var(--border-color)",
  borderRadius: "12px",
  padding: "20px 24px",
  marginBottom: "16px",
} as const;

const gayaJudulKartu = {
  fontSize: "18px",
  fontWeight: 700,
  color: "var(--text-main)",
  margin: "0 0 10px",
} as const;

const gayaTeks = {
  fontSize: "14px",
  lineHeight: 1.7,
  color: "var(--text-muted)",
  margin: 0,
} as const;

export default function AboutPage() {
  const { t } = useForumContent();

  const fitur = [
    {
      judul: t("Diskusi per Topik", "Topic-Based Discussions"),
      isi: t(
        "Jelajahi diskusi berdasarkan genre seperti teknologi, karier, kampus, dan lainnya.",
        "Browse discussions by genre such as technology, career, campus life, and more."
      ),
    },
    {
      judul: t("Suka, Komentar, dan Balasan", "Likes, Comments, and Replies"),
      isi: t(
        "Beri reaksi pada postingan, tulis komentar, dan balas komentar teman dengan mudah.",
        "React to posts, write comments, and reply to your friends' comments with ease."
      ),
    },
    {
      judul: t("Komunitas", "Communities"),
      isi: t(
        "Gabung atau buat komunitas sesuai minatmu untuk berdiskusi lebih fokus.",
        "Join or create communities that match your interests for more focused discussions."
      ),
    },
    {
      judul: t("Laporan dan Moderasi", "Reports and Moderation"),
      isi: t(
        "Laporkan postingan atau komentar yang melanggar aturan agar forum tetap nyaman.",
        "Report posts or comments that break the rules to keep the forum a safe place."
      ),
    },
    {
      judul: t("Dua Bahasa dan Dua Tema", "Two Languages and Two Themes"),
      isi: t(
        "Ganti bahasa Indonesia atau Inggris, serta mode terang atau gelap, kapan saja dari sidebar.",
        "Switch between Indonesian and English, and light or dark mode, anytime from the sidebar."
      ),
    },
  ];

  return (
    <div style={{ padding: "8px 0 32px" }}>
      <h2
        style={{
          fontSize: "24px",
          fontWeight: 700,
          color: "var(--text-main)",
          margin: "0 0 16px",
        }}
      >
        {t("Tentang Forumly", "About Forumly")}
      </h2>

      <section style={gayaKartu}>
        <h3 style={gayaJudulKartu}>{t("Apa itu Forumly?", "What is Forumly?")}</h3>
        <p style={gayaTeks}>
          {t(
            "Forumly adalah platform diskusi untuk mahasiswa. Di sini kamu bisa bertanya, berbagi informasi perkuliahan, membahas teknologi, dan membangun komunitas bersama teman-teman.",
            "Forumly is a discussion platform for students. Here you can ask questions, share course information, talk about technology, and build communities with your friends."
          )}
        </p>
      </section>

      <section style={gayaKartu}>
        <h3 style={gayaJudulKartu}>{t("Misi Kami", "Our Mission")}</h3>
        <p style={gayaTeks}>
          {t(
            "Menyediakan ruang diskusi yang rapi, sopan, dan mudah ditemukan, supaya setiap pertanyaan mahasiswa punya tempat untuk dijawab.",
            "To provide an organized, respectful, and easy-to-find discussion space so every student's question has a place to be answered."
          )}
        </p>
      </section>

      <section style={gayaKartu}>
        <h3 style={gayaJudulKartu}>{t("Fitur Utama", "Key Features")}</h3>
        <div style={{ display: "grid", gap: "12px", marginTop: "12px" }}>
          {fitur.map((f) => (
            <div
              key={f.judul}
              style={{
                borderLeft: "3px solid var(--accent)",
                backgroundColor: "var(--input-bg)",
                borderRadius: "6px",
                padding: "10px 14px",
              }}
            >
              <strong
                style={{
                  display: "block",
                  fontSize: "14px",
                  color: "var(--text-main)",
                  marginBottom: "2px",
                }}
              >
                {f.judul}
              </strong>
              <span style={gayaTeks}>{f.isi}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={gayaKartu}>
        <h3 style={gayaJudulKartu}>{t("Dibuat Dengan", "Built With")}</h3>
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginTop: "12px",
          }}
        >
          {["Next.js", "React", "TypeScript", "Bootstrap", "Prisma", "SQLite"].map(
            (tek) => (
              <span
                key={tek}
                style={{
                  padding: "6px 14px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--accent)",
                  backgroundColor: "var(--accent-soft)",
                }}
              >
                {tek}
              </span>
            )
          )}
        </div>
      </section>

      <section style={gayaKartu}>
        <h3 style={gayaJudulKartu}>{t("Tim Pengembang", "Development Team")}</h3>
        <p style={gayaTeks}>
          {t(
            "Forumly dikembangkan oleh Gracia Christy Songgigilan,Jericho Steve Angdev,Brandon Wesley,Marchella Yonansyah,Joshua Eben Haezer.",
            "Forumly is developed by Gracia Christy Songgigilan,Jericho Steve Angdev,Brandon Wesley,Marchella Yonansyah,Joshua Eben Haezer."
          )}
        </p>
      </section>
    </div>
  );
}