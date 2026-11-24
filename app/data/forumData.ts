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
    countId: "0 diskusi aktif",
    countEn: "0 active discussions",
  },
];

export const INITIAL_POSTS: ForumPost[] = [
  {
    id: "post-1",
    author: "Budi Setiawan",
    timeId: "2 jam lalu",
    timeEn: "2 hours ago",
    genreSlug: "teknologi",
    genreId: "Teknologi & Pemrograman",
    genreEn: "Technology & Coding",
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
    genreId: "Anime & Komik Jepang",
    genreEn: "Anime & Manga",
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
    id: "post-5",
    author: "Nadia Kusuma",
    timeId: "9 jam lalu",
    timeEn: "9 hours ago",
    genreSlug: "finance",
    genreId: "Keuangan & Investasi",
    genreEn: "Finance & Investing",
    titleId: "Strategi menabung dan DCA rutin untuk mahasiswa dengan uang saku terbatas",
    titleEn: "Savings and steady DCA strategies for students on a tight allowance",
    excerptId:
      "Bagaimana membagi pos dana darurat, kebutuhan harian, dan investasi jangka panjang tanpa bikin pusing akhir bulan?",
    excerptEn:
      "How do you split emergency funds, daily expenses, and long-term investing without stressing at the end of the month?",
    imageUrl:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80",
    likes: 34,
    dislikes: 1,
    comments: [
      {
        id: "c-105",
        author: "Dimas",
        text: "Sisihkan di awal bulan begitu kiriman masuk, jangan tunggu sisa akhir bulan.",
        likes: 7,
        dislikes: 0,
        replies: [],
      },
    ],
  },
  {
    id: "post-6",
    author: "Fajar Ramadhan",
    timeId: "11 jam lalu",
    timeEn: "11 hours ago",
    genreSlug: "finance",
    genreId: "Keuangan & Investasi",
    genreEn: "Finance & Investing",
    titleId: "Pengalaman membandingkan reksa dana pasar uang dan ETF indeks jangka panjang",
    titleEn: "Comparing money market funds vs long-term index ETFs for beginners",
    excerptId:
      "Untuk tujuan 1-2 tahun versus 5+ tahun, mana yang lebih cocok dari sisi likuiditas dan fluktuasi?",
    excerptEn:
      "For 1-2 year goals versus 5+ years, which fits better regarding liquidity and volatility?",
    likes: 25,
    dislikes: 0,
    comments: [],
  },
  {
    id: "post-7",
    author: "Darius Haris",
    timeId: "12 jam lalu",
    timeEn: "12 hours ago",
    genreSlug: "teknologi",
    genreId: "Teknologi & Pemrograman",
    genreEn: "Technology & Coding",
    titleId: "Struktur folder Next.js + Prisma + SQLite yang paling rapi untuk proyek skala menengah",
    titleEn: "Clean folder structure for Next.js + Prisma + SQLite in medium-sized projects",
    excerptId:
      "Berbagi pengalaman memisahkan service layer, validasi input, dan komponen UI agar mudah di-maintain tim.",
    excerptEn:
      "Sharing experience separating service layers, input validation, and UI components for easier team maintenance.",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
    likes: 41,
    dislikes: 0,
    comments: [
      {
        id: "c-107",
        author: "Adrian",
        text: "Memisahkan query database ke modul khusus bikin gampang di-debug pas ada error relasi.",
        likes: 6,
        dislikes: 0,
        replies: [],
      },
    ],
  },
  {
    id: "post-8",
    author: "Adrian Wijaya",
    timeId: "14 jam lalu",
    timeEn: "14 hours ago",
    genreSlug: "teknologi",
    genreId: "Teknologi & Pemrograman",
    genreEn: "Technology & Coding",
    titleId: "Mengatasi error cache build di Windows saat folder proyek tersinkronisasi cloud",
    titleEn: "Fixing build cache errors on Windows when project folders sync with cloud storage",
    excerptId:
      "Tips membersihkan folder cache build dan menghindari file lock saat menjalankan server pengembangan.",
    excerptEn:
      "Tips for clearing build cache folders and avoiding file locks while running the dev server.",
    likes: 19,
    dislikes: 0,
    comments: [],
  },
  {
    id: "post-9",
    author: "Sinta Dewi",
    timeId: "15 jam lalu",
    timeEn: "15 hours ago",
    genreSlug: "karir",
    genreId: "Karier & Magang",
    genreEn: "Career & Internships",
    titleId: "Portofolio proyek kuliah seperti apa yang paling dilirik rekruter posisi magang?",
    titleEn: "What kind of college projects catch recruiters' eyes for internship roles?",
    excerptId:
      "Apakah lebih baik 2 proyek lengkap yang berjalan mulus atau banyak repositori kecil yang belum selesai?",
    excerptEn:
      "Is it better to have 2 polished, working projects or many small unfinished repositories?",
    likes: 37,
    dislikes: 0,
    comments: [],
  },
  {
    id: "post-10",
    author: "Rizky Pratama",
    timeId: "17 jam lalu",
    timeEn: "17 hours ago",
    genreSlug: "karir",
    genreId: "Karier & Magang",
    genreEn: "Career & Internships",
    titleId: "Persiapan teknis wawancara magang frontend & fullstack untuk mahasiswa tingkat akhir",
    titleEn: "Technical interview prep for frontend & fullstack internships as a senior student",
    excerptId:
      "Topik apa saja yang sering ditanyakan: state management, REST API, SQL, atau sistem autentikasi?",
    excerptEn:
      "Which topics come up most often: state management, REST APIs, SQL, or authentication flows?",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    likes: 29,
    dislikes: 1,
    comments: [],
  },
  {
    id: "post-11",
    author: "Yovan Santoso",
    timeId: "19 jam lalu",
    timeEn: "19 hours ago",
    genreSlug: "sport",
    genreId: "Olahraga",
    genreEn: "Sports",
    titleId: "Jadwal main minisoccer / futsal mingguan mahasiswa sekitar Jakarta Barat & Tangerang",
    titleEn: "Weekly minisoccer / futsal session schedule for students around West Jakarta & Tangerang",
    excerptId:
      "Yuk atur jadwal main santai sore atau malam hari biar stamina tetap terjaga di tengah padatnya kuliah.",
    excerptEn:
      "Let's organize casual afternoon or evening games to keep stamina up during busy semesters.",
    imageUrl:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=80",
    likes: 16,
    dislikes: 0,
    comments: [],
  },
  {
    id: "post-12",
    author: "Bagas Nugroho",
    timeId: "21 jam lalu",
    timeEn: "21 hours ago",
    genreSlug: "sport",
    genreId: "Olahraga",
    genreEn: "Sports",
    titleId: "Tips pemanasan dan pencegahan cedera lutut/pergelangan saat lari pagi",
    titleEn: "Warm-up tips and knee/ankle injury prevention for morning runs",
    excerptId:
      "Latihan mobilitas singkat sebelum mulai lari jarak 3-5 km agar tidak cepat pegal atau cedera.",
    excerptEn:
      "Quick mobility drills before a 3-5 km run to avoid soreness or injuries.",
    likes: 21,
    dislikes: 0,
    comments: [],
  },
  {
    id: "post-13",
    author: "Ayu Lestari",
    timeId: "1 hari lalu",
    timeEn: "1 day ago",
    genreSlug: "kampus",
    genreId: "Kehidupan Kampus",
    genreEn: "Campus Life",
    titleId: "Tips cari sponsor dan menyusun proposal kegiatan pengabdian masyarakat / kepanitiaan",
    titleEn: "Tips for finding sponsors and writing proposals for community service or events",
    excerptId:
      "Bagaimana menyusun paket sponsorship yang jelas dan komunikasi yang sopan ke calon mitra?",
    excerptEn:
      "How do you structure clear sponsorship tiers and write polite outreach to potential partners?",
    likes: 31,
    dislikes: 0,
    comments: [],
  },
  {
    id: "post-14",
    author: "Hendra Wijaya",
    timeId: "1 hari lalu",
    timeEn: "1 day ago",
    genreSlug: "kampus",
    genreId: "Kehidupan Kampus",
    genreEn: "Campus Life",
    titleId: "Rekomendasi tempat makan cepat & murah sekitar kampus buat makan siang di sela kelas",
    titleEn: "Quick and budget-friendly lunch spots near campus between classes",
    excerptId:
      "Butuh tempat yang pelayanannya cepat supaya nggak telat masuk kelas sesi berikutnya.",
    excerptEn:
      "Looking for places with fast service so we don't miss the next lecture.",
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
    likes: 44,
    dislikes: 1,
    comments: [],
  },
  {
    id: "post-15",
    author: "Ransley Pratama",
    timeId: "2 hari lalu",
    timeEn: "2 days ago",
    genreSlug: "desain-kreatif",
    genreId: "Desain & Kreatif",
    genreEn: "Design & Creative",
    titleId: "Workflow aset 3D / voxel untuk game indie biar ukuran file tetap ringan",
    titleEn: "3D / voxel asset workflow for indie games to keep file sizes lightweight",
    excerptId:
      "Bagaimana mengatur jumlah poligon, palet warna, dan ekspor tekstur agar tetap tajam tapi ramah performa?",
    excerptEn:
      "How do you balance polygon count, color palettes, and texture exports so visuals stay crisp yet performance-friendly?",
    imageUrl:
      "https://images.unsplash.com/photo-1558655146-9f40138edfcb?auto=format&fit=crop&w=900&q=80",
    likes: 27,
    dislikes: 0,
    comments: [],
  },
 {
    id: "post-16",
    author: "Aldi Pratama",
    timeId: "2 hari lalu",
    timeEn: "2 days ago",
    genreSlug: "gaming",
    genreId: "Permainan & Kompetisi",
    genreEn: "Gaming & eSports",
    titleId: "Cuplikan gameplay & pengaturan FPS stabil untuk game aksi di laptop/PC menengah",
    titleEn: "Gameplay clip & stable FPS settings for action games on mid-range laptops/PCs",
    excerptId:
      "Kombinasi pengaturan grafis mana yang paling terasa bedanya di input lag dan frame time?",
    excerptEn:
      "Which graphics settings make the biggest difference for input lag and frame times?",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    likes: 23,
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

export interface CommunityItem {
  id: string;
  slug: string;
  nameId: string;
  nameEn: string;
  descId: string;
  descEn: string;
  categoryId: string;
  categoryEn: string;
  members: number;
  joined?: boolean;
}

export const INITIAL_COMMUNITIES: CommunityItem[] = [
  {
    id: "comm-1",
    slug: "dev-kampus",
    nameId: "Komunitas Pengembang & Web",
    nameEn: "Developers & Web Builders",
    descId: "Diskusi proyek Next.js, struktur data, tugas kuliah, dan kolaborasi kode.",
    descEn: "Discussions on Next.js projects, data structures, coursework, and code collaboration.",
    categoryId: "Teknologi",
    categoryEn: "Technology",
    members: 184,
    joined: true,
  },
  {
    id: "comm-2",
    slug: "finansial-muda",
    nameId: "Finansial & Investasi Mahasiswa",
    nameEn: "Student Finance & Investing",
    descId: "Berbagi tips anggaran bulanan, dana darurat, dan strategi investasi jangka panjang.",
    descEn: "Sharing monthly budgeting tips, emergency funds, and long-term investing strategies.",
    categoryId: "Keuangan",
    categoryEn: "Finance",
    members: 129,
    joined: false,
  },
  {
    id: "comm-3",
    slug: "anime-kreatif",
    nameId: "Klub Anime, Gim & Kreatif",
    nameEn: "Anime, Gaming & Creative Club",
    descId: "Nobar/diskusi anime, turnamen santai, serta pameran aset desain dan 3D.",
    descEn: "Anime discussions, casual tournaments, and design/3D asset showcases.",
    categoryId: "Komunitas",
    categoryEn: "Community",
    members: 215,
    joined: false,
  },
];