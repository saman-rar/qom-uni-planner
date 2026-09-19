"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  CalendarClock,
  CalendarDays,
  Check,
  CirclePlus,
  Clock3,
  Download,
  GraduationCap,
  Hash,
  Moon,
  Search,
  Share2,
  Sparkles,
  Sun,
  Trash2,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { courses, defaultSelected, faculties, groups, type Course } from "@/lib/mock-data";

const days = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه"];
const examWeekDays = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];
const hours = Array.from({ length: 13 }, (_, i) => i + 7);

const EXAM_MONTH = 10;
const EXAM_MONTH_DAYS = 30;
// ۱۴۰۵/۱۰/۰۱ برابر با سه‌شنبه است؛ شنبه اندیس صفر در تقویم قرار دارد.
const EXAM_MONTH_START_OFFSET = 3;

const colorMap: Record<string, string> = {
  cyan: "border-cyan-400/40 bg-cyan-500/15 text-cyan-950 dark:text-cyan-50",
  indigo: "border-indigo-400/40 bg-indigo-500/15 text-indigo-950 dark:text-indigo-50",
  emerald: "border-emerald-400/40 bg-emerald-500/15 text-emerald-950 dark:text-emerald-50",
  amber: "border-amber-400/40 bg-amber-500/15 text-amber-950 dark:text-amber-50",
  rose: "border-rose-400/40 bg-rose-500/15 text-rose-950 dark:text-rose-50",
  violet: "border-violet-400/40 bg-violet-500/15 text-violet-950 dark:text-violet-50",
  blue: "border-blue-400/40 bg-blue-500/15 text-blue-950 dark:text-blue-50",
  fuchsia: "border-fuchsia-400/40 bg-fuchsia-500/15 text-fuchsia-950 dark:text-fuchsia-50",
  teal: "border-teal-400/40 bg-teal-500/15 text-teal-950 dark:text-teal-50",
};

const toPersianDigits = (value: string | number) =>
  String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);

function hasConflict(course: Course, selected: Course[]) {
  return selected.some(
    (item) => item.day === course.day && Math.max(item.start, course.start) < Math.min(item.end, course.end),
  );
}

function parseExam(exam: string) {
  const match = exam.match(/(\d{4})\/(\d{2})\/(\d{2}).*?(\d{2}:\d{2})/);
  if (!match) return null;

  return {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
    time: match[4],
  };
}

function formatClassTime(value: number) {
  const hour = Math.floor(value);
  const minute = value % 1 === 0.5 ? "30" : "00";
  return `${String(hour).padStart(2, "0")}:${minute}`;
}

export function CoursePlanner() {
  const [selectedIds, setSelectedIds] = useState(defaultSelected);
  const [query, setQuery] = useState("");
  const [faculty, setFaculty] = useState("مهندسی و فناوری");
  const [group, setGroup] = useState("مهندسی کامپیوتر");
  const [view, setView] = useState<"week" | "exam">("week");
  const [dark, setDark] = useState(true);
  const [examDetail, setExamDetail] = useState<Course | null>(null);

  const selected = useMemo(() => courses.filter((course) => selectedIds.includes(course.id)), [selectedIds]);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesSearch =
        !normalized || `${course.title} ${course.code} ${course.professor}`.toLowerCase().includes(normalized);
      return matchesSearch && course.faculty === faculty && course.group === group;
    });
  }, [query, faculty, group]);

  const examsByDay = useMemo(() => {
    const result = new Map<number, Course[]>();

    selected.forEach((course) => {
      const exam = parseExam(course.exam);
      if (!exam || exam.month !== EXAM_MONTH) return;

      const current = result.get(exam.day) ?? [];
      current.push(course);
      result.set(exam.day, current);
    });

    return result;
  }, [selected]);

  const writtenExamCount = useMemo(
    () => selected.filter((course) => parseExam(course.exam)?.month === EXAM_MONTH).length,
    [selected],
  );

  const noWrittenExam = useMemo(() => selected.filter((course) => !parseExam(course.exam)), [selected]);
  const totalUnits = selected.reduce((sum, course) => sum + course.units, 0);

  useEffect(() => {
    if (!examDetail) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExamDetail(null);
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [examDetail]);

  const toggleCourse = (course: Course) => {
    setSelectedIds((prev) =>
      prev.includes(course.id) ? prev.filter((id) => id !== course.id) : [...prev, course.id],
    );
  };

  const autoPlan = () => {
    const next: string[] = [];
    for (const course of courses) {
      const selectedCourses = courses.filter((item) => next.includes(item.id));
      if (!hasConflict(course, selectedCourses) && next.length < 6) next.push(course.id);
    }
    setSelectedIds(next);
  };

  const examCalendarCells = Array.from({ length: 35 }, (_, index) => {
    const day = index - EXAM_MONTH_START_OFFSET + 1;
    return day >= 1 && day <= EXAM_MONTH_DAYS ? day : null;
  });

  return (
    <main className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground transition-colors">
        <div className="mx-auto flex min-h-screen max-w-[1700px] flex-col p-3 lg:p-5">
          <header className="mb-3 flex items-center justify-between rounded-3xl border border-border bg-card/80 px-4 py-3 shadow-sm backdrop-blur md:px-6">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                <GraduationCap className="size-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base font-extrabold md:text-lg">برنامه‌ریز انتخاب واحد دانشگاه قم</h1>
                  <Badge className="hidden md:inline-flex">نسخه دمو</Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">چیدمان آزمایشی نیمسال اول ۱۴۰۵–۱۴۰۶</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => setDark((v) => !v)} aria-label="تغییر پوسته">
                {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </Button>
              <Button variant="outline" className="hidden sm:inline-flex">
                <Share2 className="size-4" /> اشتراک
              </Button>
              <Button variant="outline" className="hidden sm:inline-flex">
                <Download className="size-4" /> خروجی
              </Button>
            </div>
          </header>

          <section className="grid min-h-0 flex-1 gap-3 xl:grid-cols-[minmax(0,1fr)_390px]">
            <Card className="order-2 min-h-[650px] overflow-hidden xl:order-1">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
                <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/35 p-1">
                  <Button size="sm" variant={view === "week" ? "default" : "ghost"} onClick={() => setView("week")}>
                    <CalendarDays className="size-4" /> برنامه هفتگی
                  </Button>
                  <Button size="sm" variant={view === "exam" ? "default" : "ghost"} onClick={() => setView("exam")}>
                    <CalendarClock className="size-4" /> برنامه امتحانی
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={autoPlan}>
                    <Sparkles className="size-4" /> چیدمان خودکار
                  </Button>
                  <Badge className="bg-primary/10 text-primary">{selected.length} درس · {totalUnits} واحد</Badge>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedIds([])} aria-label="حذف همه">
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </div>

              {view === "week" ? (
                <div className="overflow-auto">
                  <div className="min-w-[900px]">
                    <div className="grid grid-cols-[64px_repeat(6,minmax(130px,1fr))] border-b border-border bg-muted/25">
                      <div />
                      {days.map((day) => (
                        <div key={day} className="border-r border-border px-2 py-3 text-center text-sm font-bold first:border-r-0">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="relative grid grid-cols-[64px_repeat(6,minmax(130px,1fr))]" style={{ height: 780 }}>
                      <div className="relative border-l border-border bg-muted/10">
                        {hours.map((hour) => (
                          <div
                            key={hour}
                            className="absolute left-0 right-0 text-center text-[11px] text-muted-foreground"
                            style={{ top: `${((hour - 7) / 12) * 100}%`, transform: "translateY(-50%)" }}
                          >
                            {String(hour).padStart(2, "0")}:00
                          </div>
                        ))}
                      </div>
                      {days.map((day, dayIndex) => (
                        <div key={day} className="relative border-r border-border">
                          {hours.slice(0, -1).map((hour) => (
                            <div
                              key={hour}
                              className="absolute left-0 right-0 border-t border-border/80"
                              style={{ top: `${((hour - 7) / 12) * 100}%` }}
                            />
                          ))}
                          {selected
                            .filter((course) => course.day === dayIndex)
                            .map((course) => {
                              const top = ((course.start - 7) / 12) * 100;
                              const height = ((course.end - course.start) / 12) * 100;
                              return (
                                <button
                                  key={course.id}
                                  onClick={() => toggleCourse(course)}
                                  className={`absolute left-1.5 right-1.5 overflow-hidden rounded-xl border p-2 text-right shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${colorMap[course.color]}`}
                                  style={{ top: `calc(${top}% + 4px)`, height: `calc(${height}% - 7px)` }}
                                >
                                  <div className="text-xs font-extrabold leading-5">{course.title}</div>
                                  <div className="mt-1 truncate text-[10px] opacity-80">{course.professor}</div>
                                  <div className="mt-1 text-[10px] opacity-70">
                                    {formatClassTime(course.start)}-{formatClassTime(course.end)}
                                  </div>
                                </button>
                              );
                            })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3 md:p-5">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-base font-extrabold">تقویم امتحانات · دی ۱۴۰۵</h2>
                      <p className="mt-1 text-xs text-muted-foreground">
                        برای مشاهده جزئیات هر امتحان، روی عنوان درس داخل تقویم کلیک کنید.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{toPersianDigits(writtenExamCount)} آزمون</Badge>
                      <Badge className="bg-primary/10 text-primary">دی ۱۴۰۵</Badge>
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-border bg-card">
                    <div className="min-w-[880px]">
                      <div className="grid grid-cols-7 border-b border-border bg-muted/35">
                        {examWeekDays.map((day) => (
                          <div key={day} className="border-l border-border px-2 py-3 text-center text-xs font-extrabold last:border-l-0">
                            {day}
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-7">
                        {examCalendarCells.map((day, index) => {
                          const dayExams = day ? examsByDay.get(day) ?? [] : [];
                          const isFriday = index % 7 === 6;

                          return (
                            <div
                              key={index}
                              className={`aspect-square min-h-[118px] border-l border-b border-border p-2 last:border-l-0 ${
                                day ? "bg-card" : "bg-muted/15"
                              } ${isFriday && day ? "bg-destructive/[0.025]" : ""}`}
                            >
                              {day && (
                                <>
                                  <div className="mb-2 flex items-center justify-between">
                                    <span
                                      className={`flex size-7 items-center justify-center rounded-lg text-xs font-extrabold ${
                                        dayExams.length > 0
                                          ? "bg-primary text-primary-foreground"
                                          : "text-muted-foreground"
                                      }`}
                                    >
                                      {toPersianDigits(day)}
                                    </span>
                                    {dayExams.length > 1 && (
                                      <span className="text-[10px] font-medium text-muted-foreground">
                                        {toPersianDigits(dayExams.length)} امتحان
                                      </span>
                                    )}
                                  </div>

                                  <div className="space-y-1.5">
                                    {dayExams.map((course) => {
                                      const exam = parseExam(course.exam);
                                      return (
                                        <button
                                          key={course.id}
                                          type="button"
                                          onClick={() => setExamDetail(course)}
                                          className={`w-full rounded-xl border px-2 py-2 text-right shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${colorMap[course.color]}`}
                                        >
                                          <span className="block truncate text-[11px] font-extrabold leading-5">{course.title}</span>
                                          <span className="mt-0.5 flex items-center gap-1 text-[10px] opacity-75">
                                            <Clock3 className="size-3" />
                                            {exam ? toPersianDigits(exam.time) : "—"}
                                          </span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {noWrittenExam.length > 0 && (
                    <div className="mt-3 flex flex-wrap items-center gap-2 rounded-2xl border border-dashed border-border bg-muted/15 px-3 py-2.5 text-xs">
                      <span className="font-bold">بدون آزمون کتبی:</span>
                      {noWrittenExam.map((course) => (
                        <span key={course.id} className="rounded-full bg-muted px-2.5 py-1 text-muted-foreground">
                          {course.title}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2 border-t border-border bg-card px-4 py-3">
                <span className="text-xs font-medium text-muted-foreground">دروس انتخاب‌شده:</span>
                {selected.map((course) => (
                  <button
                    key={course.id}
                    onClick={() => toggleCourse(course)}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/40 px-2.5 py-1 text-xs hover:bg-muted"
                  >
                    <X className="size-3" />
                    {course.title}
                  </button>
                ))}
                {selected.length === 0 && <span className="text-xs text-muted-foreground">هنوز درسی اضافه نشده.</span>}
              </div>
            </Card>

            <Card className="order-1 flex max-h-[calc(100vh-118px)] min-h-[650px] flex-col overflow-hidden xl:order-2">
              <div className="border-b border-border p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h2 className="font-extrabold">دروس ارائه‌شده</h2>
                    <p className="mt-1 text-xs text-muted-foreground">داده آزمایشی برای دموی سامانه</p>
                  </div>
                  <CirclePlus className="size-5 text-primary" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <label className="space-y-1.5 text-xs text-muted-foreground">
                    دانشکده
                    <select
                      value={faculty}
                      onChange={(e) => setFaculty(e.target.value)}
                      className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none"
                    >
                      {faculties.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </label>
                  <label className="space-y-1.5 text-xs text-muted-foreground">
                    گروه آموزشی
                    <select
                      value={group}
                      onChange={(e) => setGroup(e.target.value)}
                      className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none"
                    >
                      {groups.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="relative mt-3">
                  <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="نام درس، کد یا استاد..."
                    className="pr-9"
                  />
                </div>
              </div>
              <div className="flex-1 space-y-2 overflow-y-auto p-3">
                {filtered.map((course) => {
                  const isSelected = selectedIds.includes(course.id);
                  const conflict = !isSelected && hasConflict(course, selected);
                  return (
                    <article key={course.id} className="rounded-2xl border border-border bg-muted/15 p-3 transition hover:bg-muted/30">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-extrabold">{course.title}</h3>
                            <span className="text-[10px] text-muted-foreground">{course.code}</span>
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">{course.professor}</p>
                        </div>
                        <Badge>{course.units} واحد</Badge>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
                        <span>
                          کلاس: {days[course.day]} {formatClassTime(course.start)}–{formatClassTime(course.end)}
                        </span>
                        <span>ظرفیت: {course.capacity}</span>
                        <span className="col-span-2">امتحان: {course.exam}</span>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className={`text-[11px] ${conflict ? "text-destructive" : "text-muted-foreground"}`}>
                          {conflict ? "تداخل زمانی با برنامه فعلی" : isSelected ? "به برنامه اضافه شده" : "آماده افزودن"}
                        </span>
                        <Button size="sm" variant={isSelected ? "outline" : "default"} onClick={() => toggleCourse(course)}>
                          {isSelected ? (
                            <>
                              <Check className="size-3.5" /> افزوده شد
                            </>
                          ) : (
                            "افزودن"
                          )}
                        </Button>
                      </div>
                    </article>
                  );
                })}
                {filtered.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                    درسی با این فیلتر پیدا نشد.
                  </div>
                )}
              </div>
              <div className="border-t border-border bg-muted/15 p-3 text-center text-xs text-muted-foreground">
                نسخه دمو — داده‌ها ماک هستند و بعداً با API دانشگاه جایگزین می‌شوند.
              </div>
            </Card>
          </section>
        </div>
      </div>

      {examDetail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setExamDetail(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="exam-detail-title"
            className="w-full max-w-xl overflow-hidden rounded-3xl border border-border bg-card text-card-foreground shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-border bg-muted/20 p-5">
              <div className="flex items-center gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <CalendarClock className="size-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-primary">جزئیات امتحان</p>
                  <h3 id="exam-detail-title" className="mt-1 text-lg font-extrabold">
                    {examDetail.title}
                  </h3>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setExamDetail(null)} aria-label="بستن جزئیات امتحان">
                <X className="size-5" />
              </Button>
            </div>

            <div className="p-5">
              {(() => {
                const exam = parseExam(examDetail.exam);
                return (
                  <>
                    <div className="mb-5 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-border bg-primary/[0.045] p-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CalendarDays className="size-4" /> تاریخ امتحان
                        </div>
                        <div className="mt-2 text-base font-extrabold">
                          {exam
                            ? `${toPersianDigits(exam.year)}/${toPersianDigits(String(exam.month).padStart(2, "0"))}/${toPersianDigits(String(exam.day).padStart(2, "0"))}`
                            : examDetail.exam}
                        </div>
                      </div>
                      <div className="rounded-2xl border border-border bg-primary/[0.045] p-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock3 className="size-4" /> ساعت شروع
                        </div>
                        <div className="mt-2 text-base font-extrabold">{exam ? toPersianDigits(exam.time) : "—"}</div>
                      </div>
                    </div>

                    <div className="grid gap-x-6 gap-y-4 text-sm sm:grid-cols-2">
                      <div className="flex items-start gap-2.5">
                        <UserRound className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">استاد</p>
                          <p className="mt-1 font-bold">{examDetail.professor}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Hash className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">کد درس</p>
                          <p className="mt-1 font-bold">{examDetail.code}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <BookOpen className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">تعداد واحد</p>
                          <p className="mt-1 font-bold">{toPersianDigits(examDetail.units)} واحد</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <UsersRound className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">ظرفیت کلاس</p>
                          <p className="mt-1 font-bold">{toPersianDigits(examDetail.capacity)}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5 sm:col-span-2">
                        <GraduationCap className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">دانشکده و گروه آموزشی</p>
                          <p className="mt-1 font-bold">
                            {examDetail.faculty} · {examDetail.group}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>

            <div className="flex justify-end border-t border-border bg-muted/15 px-5 py-4">
              <Button onClick={() => setExamDetail(null)}>بستن</Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
