import Link from "next/link";

interface PageProps {
  params: Promise<{ genre: string }>;
}

export default async function ExploreGenrePage({ params }: PageProps) {
  const { genre } = await params;

  const genreName = genre.charAt(0).toUpperCase() + genre.slice(1);

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <Link href="/explore" className="explore-btn" style={{ fontSize: "12px" }}>
          ← Kembali ke Explore
        </Link>
      </div>

      <h2 className="feed-title">Genre: {genreName}</h2>

      <div className="post-card">
        <div className="post-header">
          <span className="post-author">Komunitas {genreName}</span> - Diskusi Unggulan
        </div>
        <h3 className="post-title">
          Topik pembahasan seputar genre {genreName} dan perkembangannya saat ini.
        </h3>
        <p className="post-excerpt">
          Belum ada diskusi aktif pada kategori ini. Jadilah mahasiswa pertama yang memulai topik baru!
        </p>
        <div className="post-actions">
          <button type="button" className="btn-action">Suka (0)</button>
          <button type="button" className="btn-action">Tidak Suka (0)</button>
          <button type="button" className="btn-action">Komentar (0)</button>
        </div>
      </div>
    </div>
  );
}