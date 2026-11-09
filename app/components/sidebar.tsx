export default function Home() {
  return (
    <div>
      <div className="mb-4">
        <form className="d-flex gap-2">
          <input
            type="text"
            placeholder="Cari diskusi, pertanyaan, atau topik..."
            className="form-control bg-secondary text-light border-0"
          />
          <button type="submit" className="btn btn-primary">
            Cari
          </button>
        </form>
      </div>

      <div>
        <h2 className="h4 fw-bold mb-4">Diskusi Terbaru</h2>

        {/* Kartu Diskusi 1 */}
        <div className="card bg-dark text-light border border-secondary p-3 mb-3">
          <div className="small text-muted mb-2">
            <span className="fw-bold text-light">Budi Setiawan</span> - 2 jam lalu dalam <span className="text-info">Teknologi</span>
          </div>
          <h3 className="h5 fw-bold">Tips belajar struktur data dan algoritma untuk persiapan praktikum minggu depan?</h3>
          <p className="text-secondary small">
            Lagi persiapan ujian modul pohon (tree) dan graf. Ada saran visualisasi algoritma atau metode latihan yang efektif?
          </p>
          <div className="d-flex gap-2 mt-2">
            <button className="btn btn-sm btn-outline-secondary text-light"> Suka (14)</button>
            <button className="btn btn-sm btn-outline-secondary text-light">Tidak Suka (1)</button>
            <button className="btn btn-sm btn-outline-secondary text-light">Komentar (0)</button>
          </div>
        </div>

        {/* Kartu Diskusi 2 */}
        <div className="card bg-dark text-light border border-secondary p-3 mb-3">
          <div className="small text-muted mb-2">
            <span className="fw-bold text-light">Rian Pratama</span> - 4 jam lalu dalam <span className="text-info">Anime</span>
          </div>
          <h3 className="h5 fw-bold">Anime Spring Season mana yang paling worth buat diikuti?</h3>
          <p className="text-secondary small">
            Musim ini lumayan banyak rilis sekuel dan adaptasi baru. Mau minta rekomendasi anime genre misteri atau slice of life.
          </p>
          <div className="d-flex gap-2 mt-2">
            <button className="btn btn-sm btn-outline-secondary text-light"> Suka (28)</button>
            <button className="btn btn-sm btn-outline-secondary text-light">Tidak Suka (0)</button>
            <button className="btn btn-sm btn-outline-secondary text-light">Komentar (2)</button>
          </div>
        </div>
      </div>
    </div>
  );
}