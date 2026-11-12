import Link from "next/link";

const CATEGORIES = [
  {
    slug: "anime",
    name: "Anime & Manga",
    desc: "Diskusi rekomendasi anime, ulasan chapter terbaru, dan teori cerita.",
    count: "142 diskusi",
  },
  {
    slug: "finance",
    name: "Finance & Keuangan",
    desc: "Perencanaan keuangan mahasiswa, investasi pemula, dan ekonomi.",
    count: "89 diskusi",
  },
  {
    slug: "sport",
    name: "Olahraga",
    desc: "Sepakbola, badminton, eSports, dan analisis pertandingan.",
    count: "67 diskusi",
  },
  {
    slug: "teknologi",
    name: "Teknologi & Coding",
    desc: "Pemrograman, struktur data, pengembangan web, dan tugas kuliah.",
    count: "210 diskusi",
  },
];

export default function ExplorePage() {
  return (
    <div>
      <h2 className="feed-title">Eksplorasi Topik</h2>

      <div className="explore-grid">
        {CATEGORIES.map((item) => (
          <div key={item.slug} className="post-card">
            <h3 className="post-title">{item.name}</h3>
            <p className="post-excerpt">{item.desc}</p>
            <div className="post-actions" style={{ justifyContent: "space-between", alignItems: "center" }}>
              <span className="post-header" style={{ margin: 0 }}>{item.count}</span>
              <Link href={`/explore/${item.slug}`} className="btn-action">
                Buka Topik
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}