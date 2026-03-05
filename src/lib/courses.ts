export interface Course {
  image: string;
  title: string;
  desc: string;
  category: "quran" | "academic";
}

export const courses: Course[] = [
  { image: "/assets/images/courses/noorani-qaida.webp", title: "Learn Noorani Qaida Online", desc: "Start reading the Quran correctly with basic pronunciation rules.", category: "quran" },
  { image: "/assets/images/courses/quran-recitation.webp", title: "Quran Reading with Tajweed", desc: "Master the rules of Tajweed for precise Quran recitation.", category: "quran" },
  { image: "/assets/images/courses/quran-memorization.webp", title: "Memorize Quran Online", desc: "Memorize the Quran with personalized guidance from expert tutors.", category: "quran" },
  { image: "/assets/images/courses/tafsir.webp", title: "Learn Tafsir Online", desc: "Gain deep insights into the meanings behind Quranic verses.", category: "quran" },
  { image: "/assets/images/courses/arabic.webp", title: "Learn Arabic Online", desc: "Master classical Arabic to enhance your understanding of Quranic texts.", category: "quran" },
  { image: "/assets/images/courses/islamic-studies.webp", title: "Learn Islamic Studies Online", desc: "Explore Islamic studies from basics to advanced topics.", category: "quran" },
  { image: "/assets/images/courses/taleem-ul-islam.webp", title: "Taleem ul Islam", desc: "Understand the foundational principles and practices of Islam.", category: "quran" },
  { image: "/assets/images/courses/quran-translation.webp", title: "Quran Translation Course", desc: "Learn to translate Quranic Arabic to understand its messages clearly.", category: "quran" },
  { image: "/assets/images/courses/ijazah.webp", title: "Online Ijazah Course", desc: "Earn a certification in Quranic recitation and teaching.", category: "quran" },
  { image: "/assets/images/courses/quranic-arabic.webp", title: "Quranic Arabic Course", desc: "Learn Quranic Arabic to understand the Quran directly with grammar.", category: "quran" },
  { image: "/assets/images/courses/mathematics.webp", title: "Mathematics", desc: "Expert tutoring in Mathematics for all levels — from basics to advanced.", category: "academic" },
  { image: "/assets/images/courses/english.webp", title: "English", desc: "Improve your English reading, writing, and speaking skills with qualified tutors.", category: "academic" },
  { image: "/assets/images/courses/urdu.webp", title: "Urdu", desc: "Learn Urdu reading and writing with experienced language teachers.", category: "academic" },
  { image: "/assets/images/courses/science.webp", title: "Science", desc: "Comprehensive science tutoring covering Physics, Chemistry, and Biology.", category: "academic" },
  { image: "/assets/images/courses/other-sunjects.webp", title: "Other Subjects", desc: "Additional academic subjects available on request. Contact us for details.", category: "academic" },
];
