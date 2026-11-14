export default function Home() {
  return (
    <div>
      <div className="top-header mb-4">
        <form className="search-form">
          <input
            type="text"
            placeholder="Cari diskusi, pertanyaan, atau topik..."
            className="search-input"
          />
          <button type="submit" className="btn btn-primary">
            Cari
          </button>
        </form>
      </div>

      <div>
        <h2 className="feed-title">Diskusi Terbaru</h2>

        <div className="post-card">
          <div className="post-header">
            <span className="post-author">Budi Setiawan</span> - 2 jam lalu dalam{" "}
            <a href="#" style={{ color: "var(--accent)" }}>Teknologi</a>
          </div>
          <h3 className="post-title">
            Tips belajar struktur data dan algoritma untuk persiapan praktikum minggu depan?
          </h3>
          <p className="post-excerpt">
            Lagi persiapan ujian modul pohon (tree) dan graf. Ada saran visualisasi algoritma atau metode latihan yang efektif?
          </p>
          <div className="post-actions">
            <button type="button" className="btn-action">Suka (14)</button>
            <button type="button" className="btn-action">Tidak Suka (1)</button>
            <button type="button" className="btn-action">Komentar (0)</button>
          </div>
        </div>

        <div className="post-card">
          <div className="post-header">
            <span className="post-author">Rian Pratama</span> - 4 jam lalu dalam{" "}
            <a href="#" style={{ color: "var(--accent)" }}>Anime</a>
          </div>
          <h3 className="post-title">
            Anime Spring Season mana yang paling worth buat diikuti?
          </h3>
          <p className="post-excerpt">
            Musim ini lumayan banyak rilis sekuel dan adaptasi baru. Mau minta rekomendasi anime genre misteri atau slice of life.
          </p>
          <div className="post-actions">
            <button type="button" className="btn-action">Suka (28)</button>
            <button type="button" className="btn-action">Tidak Suka (0)</button>
            <button type="button" className="btn-action">Komentar (2)</button>
          </div>
        </div>
      </div>
    </div>
  );
}