export type Lang = "id" | "en";

export interface CommentReply {
  id: string;
  author: string;
  text: string;
  likes: number;
  likedByMe?: boolean;
}

export interface CommentItem {
  id: string;
  author: string;
  text: string;
  likes: number;
  dislikes: number;
  likedByMe?: boolean;
  dislikedByMe?: boolean;
  reported?: boolean;
  replies: CommentReply[];
}

export interface PollOption {
  id: string;
  labelId: string;
  labelEn: string;
  votes: number;
}

export interface ForumPost {
  id: string;
  author: string;
  timeId: string;
  timeEn: string;
  genreSlug: string;
  genreId: string;
  genreEn: string;
  titleId: string;
  titleEn: string;
  excerptId: string;
  excerptEn: string;
  imageUrl?: string;
  videoUrl?: string;
  pollQuestionId?: string;
  pollQuestionEn?: string;
  pollOptions?: PollOption[];
  votedOptionId?: string | null;
  likes: number;
  dislikes: number;
  likedByMe?: boolean;
  dislikedByMe?: boolean;
  reported?: boolean;
  comments: CommentItem[];
}

export interface GenreTopic {
  slug: string;
  nameId: string;
  nameEn: string;
  descId: string;
  descEn: string;
  countId: string;
  countEn: string;
}

export const GENRE_TOPICS: GenreTopic[] = [
  {
    slug: "teknologi",
    nameId: "Teknologi & Pemrograman",
    nameEn: "Technology & Coding",
    descId: "Pemrograman, struktur data, pengembangan web, dan tugas kuliah.",
    descEn: "Programming, data structures, web development, and coursework.",
    countId: "210 diskusi",
    countEn: "210 discussions",
  },
  {
    slug: "anime",
    nameId: "Anime & Komik Jepang",
    nameEn: "Anime & Manga",
    descId: "Rekomendasi anime, ulasan bab terbaru, dan teori cerita.",
    descEn: "Anime recommendations, latest chapter reviews, and story theories.",
    countId: "142 diskusi",
    countEn: "142 discussions",
  },
  {
    slug: "gaming",
    nameId: "Permainan & Kompetisi",
    nameEn: "Gaming & eSports",
    descId: "Penjelajahan gim, turnamen kampus, dan diskusi performa perangkat.",
    descEn: "Game exploration, campus tournaments, and PC/mobile performance talks.",
    countId: "175 diskusi",
    countEn: "175 discussions",
  },
  {
    slug: "finance",
    nameId: "Keuangan & Investasi",
    nameEn: "Finance & Investing",
    descId: "Perencanaan keuangan mahasiswa, reksa dana indeks, investasi, dan ekonomi.",
    descEn: "Student financial planning, index ETFs, investing, and economics.",
    countId: "89 diskusi",
    countEn: "89 discussions",
  },
  {
    slug: "sport",
    nameId: "Olahraga",
    nameEn: "Sports",
    descId: "Sepak bola, bulu tangkis, lari, dan analisis pertandingan.",
    descEn: "Football, badminton, running, and match analysis.",
    countId: "67 diskusi",
    countEn: "67 discussions",
  },
  {
    slug: "karir",
    nameId: "Karier & Magang",
    nameEn: "Career & Internships",
    descId: "Tips riwayat hidup, persiapan wawancara, lowongan magang, dan kerja jarak jauh.",
    descEn: "CV tips, interview prep, internship openings, and remote work.",
    countId: "94 diskusi",
    countEn: "94 discussions",
  },
  {
    slug: "musik-film",
    nameId: "Musik & Film",
    nameEn: "Music & Movies",
    descId: "Rekomendasi daftar putar belajar, ulasan film bioskop, dan konser.",
    descEn: "Study playlist recommendations, movie reviews, and concerts.",
    countId: "53 diskusi",
    countEn: "53 discussions",
  },
  {
    slug: "kampus",
    nameId: "Kehidupan Kampus",
    nameEn: "Campus Life",
    descId: "Info organisasi, kepanitiaan, beasiswa, dan rekomendasi tempat makan.",
    descEn: "Student organizations, committees, scholarships, and food spots.",
    countId: "118 diskusi",
    countEn: "118 discussions",
  },
  {
    slug: "desain-kreatif",
    nameId: "Desain & Kreatif",
    nameEn: "Design & Creative",
    descId: "UI/UX, desain grafis, aset 3D/voxel, dan penyuntingan konten visual.",
    descEn: "UI/UX, graphic design, 3D/voxel assets, and visual content editing.",
    countId: "64 diskusi",
    countEn: "64 discussions",
  },
  {
    slug: "sains-riset",
    nameId: "Sains & Riset",
    nameEn: "Science & Research",
    descId: "Metodologi penelitian, eksperimen data, jurnal ilmiah, dan diskusi riset.",
    descEn: "Research methodology, data experiments, academic papers, and research talks.",
    countId: "58 diskusi",
    countEn: "58 discussions",
  },
];

export const INITIAL_POSTS: ForumPost[] = [
  {
    id: "post-1",
    author: "Budi Setiawan",
    timeId: "2 jam lalu",
    timeEn: "2 hours ago",
    genreSlug: "teknologi",
    genreId: "Teknologi",
    genreEn: "Technology",
    titleId: "Tips belajar struktur data dan algoritma untuk persiapan praktikum minggu depan?",
    titleEn: "Tips for learning data structures and algorithms for next week's lab exam?",
    excerptId:
      "Lagi persiapan ujian modul pohon dan graf. Ada saran visualisasi algoritma atau metode latihan yang efektif?",
    excerptEn:
      "Preparing for tree and graph module exams. Any suggestions for algorithm visualizers or effective practice methods?",
    likes: 14,
    dislikes: 1,
    comments: [
      {
        id: "c-101",
        author: "Rian",
        text: "Coba latihan visualisasi penelusuran lebar dan dalam sambil menggambar langsung di kertas biar paham alurnya.",
        likes: 4,
        dislikes: 0,
        replies: [
          {
            id: "r-201",
            author: "Budi Setiawan",
            text: "@Rian setuju, menggambar langkah antrean dan tumpukan sangat membantu.",
            likes: 2,
          },
        ],
      },
    ],
  },
  {
    id: "post-2",
    author: "Rian Pratama",
    timeId: "4 jam lalu",
    timeEn: "4 hours ago",
    genreSlug: "anime",
    genreId: "Anime",
    genreEn: "Anime",
    titleId: "Anime musim semi mana yang paling layak untuk diikuti?",
    titleEn: "Which Spring Season anime is most worth following?",
    excerptId:
      "Musim ini lumayan banyak rilis lanjutan dan adaptasi baru. Mau minta rekomendasi anime bergenre misteri atau kehidupan sehari-hari.",
    excerptEn:
      "Lots of sequels and new adaptations released this season. Looking for mystery or slice-of-life recommendations.",
    imageUrl:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=900&q=80",
    likes: 28,
    dislikes: 0,
    comments: [
      {
        id: "c-102",
        author: "Brandon",
        text: "Menurutku yang alur misterinya rapi dan ritmenya santai paling enak buat ditonton pas akhir pekan.",
        likes: 5,
        dislikes: 0,
        replies: [
          {
            id: "r-202",
            author: "Rian",
            text: "Setuju, pacing yang pas bikin nggak gampang bosan.",
            likes: 2,
          },
        ],
      },
    ],
  },
  {
    id: "post-3",
    author: "Kevin Pratama",
    timeId: "6 jam lalu",
    timeEn: "6 hours ago",
    genreSlug: "gaming",
    genreId: "Permainan & Kompetisi",
    genreEn: "Gaming & eSports",
    titleId: "Pemungutan suara: Format turnamen antar fakultas semester ini pakai apa?",
    titleEn: "Poll: Which tournament format should we use for this semester's inter-faculty gaming event?",
    excerptId: "Pilih format yang paling adil dan efisien untuk jadwal kuliah mahasiswa.",
    excerptEn: "Vote for the fairest and most efficient format for students' class schedules.",
    pollQuestionId: "Pilih format pertandingan utama:",
    pollQuestionEn: "Choose the main match format:",
    pollOptions: [
      { id: "opt-a", labelId: "Sistem Gugur Langsung", labelEn: "Single Elimination (Knockout)", votes: 19 },
      { id: "opt-b", labelId: "Babak Grup dan Gugur", labelEn: "Group Stage + Playoff", votes: 31 },
      { id: "opt-c", labelId: "Sistem Gugur Ganda", labelEn: "Double Elimination", votes: 12 },
    ],
    votedOptionId: null,
    likes: 22,
    dislikes: 1,
    comments: [],
  },
  {
    id: "post-4",
    author: "Bryan Saputra",
    timeId: "8 jam lalu",
    timeEn: "8 hours ago",
    genreSlug: "musik-film",
    genreId: "Musik & Film",
    genreEn: "Music & Movies",
    titleId: "Cuplikan video suasana santai buat teman begadang mengerjakan tugas",
    titleEn: "Relaxing ambient & visual video clip for late-night study sessions",
    excerptId: "Cocok diputar pelan saat sedang memperbaiki kode atau menyusun laporan praktikum.",
    excerptEn: "Great to play softly while debugging or writing lab reports.",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    likes: 17,
    dislikes: 0,
    comments: [],
  },
  {
    id: "post-17",
    author: "Ransley Pratama",
    timeId: "3 jam lalu",
    timeEn: "3 hours ago",
    genreSlug: "desain-kreatif",
    genreId: "Desain & Kreatif",
    genreEn: "Design & Creative",
    titleId: "Workflow aset 3D / voxel untuk game indie biar ukuran file tetap ringan",
    titleEn: "3D / voxel asset workflow for indie games to keep file sizes lightweight",
    excerptId:
      "Bagaimana mengatur jumlah poligon, palet warna, dan ekspor tekstur agar tetap tajam tapi ramah performa?",
    excerptEn:
      "How do you balance polygon count, color palettes, and texture exports so visuals stay crisp yet performance-friendly?",
    likes: 27,
    dislikes: 0,
    comments: [],
  },
  {
    id: "post-18",
    author: "Darius Haris",
    timeId: "5 jam lalu",
    timeEn: "5 hours ago",
    genreSlug: "sains-riset",
    genreId: "Sains & Riset",
    genreEn: "Science & Research",
    titleId: "Tips menyusun evaluasi model dan pembagian data time-series untuk tugas akhir",
    titleEn: "Tips for structuring model evaluation and time-series splits for thesis research",
    excerptId:
      "Metrik apa saja yang paling informatif selain akurasi dasar saat menguji prediksi data berurutan?",
    excerptEn:
      "Which metrics are most informative beyond basic accuracy when evaluating sequential time-series predictions?",
    likes: 32,
    dislikes: 0,
    comments: [],
  },
];

export function getLocalizedPost(post: ForumPost, lang: Lang) {
  const isId = lang === "id";
  return {
    time: isId ? post.timeId : post.timeEn,
    genre: isId ? post.genreId : post.genreEn,
    title: isId ? post.titleId : post.titleEn,
    excerpt: isId ? post.excerptId : post.excerptEn,
    pollQuestion: isId ? post.pollQuestionId : post.pollQuestionEn,
    pollOptions: (post.pollOptions ?? []).map((opt) => ({
      id: opt.id,
      label: isId ? opt.labelId : opt.labelEn,
      votes: opt.votes,
    })),
  };
}