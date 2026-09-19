export type Course = {
  id: string;
  code: string;
  title: string;
  units: number;
  professor: string;
  capacity: string;
  faculty: string;
  group: string;
  day: number;
  start: number;
  end: number;
  exam: string;
  color: string;
};

export const faculties = ["مهندسی و فناوری", "علوم پایه", "ادبیات و علوم انسانی"];
export const groups = ["مهندسی کامپیوتر", "مهندسی صنایع", "ریاضی و علوم کامپیوتر"];

export const courses: Course[] = [
  { id: "db", code: "401112-01", title: "پایگاه داده‌ها", units: 3, professor: "دکتر مهدی حسینی", capacity: "24 از 30", faculty: "مهندسی و فناوری", group: "مهندسی کامپیوتر", day: 1, start: 13.5, end: 15, exam: "1405/10/21 — 09:00", color: "cyan" },
  { id: "analysis", code: "401221-02", title: "تحلیل و طراحی سیستم‌ها", units: 3, professor: "دکتر نرگس علیزاده", capacity: "18 از 25", faculty: "مهندسی و فناوری", group: "مهندسی کامپیوتر", day: 1, start: 15, end: 16.5, exam: "1405/10/23 — 11:00", color: "indigo" },
  { id: "english", code: "311006-03", title: "زبان تخصصی", units: 2, professor: "وحیده اصل‌منتظری", capacity: "17 از 30", faculty: "مهندسی و فناوری", group: "مهندسی کامپیوتر", day: 1, start: 16.5, end: 18.5, exam: "1405/10/25 — 13:00", color: "emerald" },
  { id: "revolution", code: "211010-01", title: "انقلاب اسلامی ایران", units: 2, professor: "کاظمی میرعلی", capacity: "27 از 35", faculty: "ادبیات و علوم انسانی", group: "مهندسی کامپیوتر", day: 2, start: 13, end: 15, exam: "1405/10/19 — 09:00", color: "amber" },
  { id: "sport", code: "121202-04", title: "ورزش ۱", units: 1, professor: "شهریار پورزاد", capacity: "20 از 25", faculty: "مهندسی و فناوری", group: "مهندسی کامپیوتر", day: 2, start: 15, end: 17, exam: "بدون آزمون کتبی", color: "rose" },
  { id: "oslab", code: "401330-02", title: "آزمایشگاه سیستم‌های عامل", units: 1, professor: "دکتر محمدرضا حسینی", capacity: "14 از 16", faculty: "مهندسی و فناوری", group: "مهندسی کامپیوتر", day: 3, start: 17, end: 19, exam: "1405/10/20 — 08:00", color: "violet" },
  { id: "algo", code: "401225-01", title: "طراحی الگوریتم‌ها", units: 3, professor: "دکتر علی اکبری", capacity: "21 از 30", faculty: "مهندسی و فناوری", group: "مهندسی کامپیوتر", day: 4, start: 9, end: 11, exam: "1405/10/26 — 08:00", color: "blue" },
  { id: "ai", code: "401451-01", title: "هوش مصنوعی", units: 3, professor: "دکتر سارا سلیمانی", capacity: "29 از 30", faculty: "مهندسی و فناوری", group: "مهندسی کامپیوتر", day: 5, start: 11, end: 13, exam: "1405/10/28 — 10:00", color: "fuchsia" },
  { id: "net", code: "401340-03", title: "شبکه‌های کامپیوتری", units: 3, professor: "دکتر حمید کریمی", capacity: "20 از 28", faculty: "مهندسی و فناوری", group: "مهندسی کامپیوتر", day: 4, start: 13, end: 15, exam: "1405/10/22 — 14:00", color: "teal" }
];

export const defaultSelected = ["db", "analysis", "english", "revolution", "sport", "oslab"];
