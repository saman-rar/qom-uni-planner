import toPersianDigits from '@/lib/format-digits';
import { Badge } from '../ui/badge';
import { Dispatch, SetStateAction, useMemo } from 'react';
import parseExam from '@/lib/parse-exam';
import { Course } from '@/lib/mock-data';
import { Clock3 } from 'lucide-react';

const EXAM_MONTH_DAYS = 30;
// ۱۴۰۵/۱۰/۰۱ برابر با سه‌شنبه است؛ شنبه اندیس صفر در تقویم قرار دارد.
const EXAM_MONTH_START_OFFSET = 3;
const EXAM_MONTH = 10;

const examWeekDays = [
  'شنبه',
  'یکشنبه',
  'دوشنبه',
  'سه‌شنبه',
  'چهارشنبه',
  'پنجشنبه',
  'جمعه',
];

interface MonthViewProps {
  courses: Course[];
  selectedIds: string[];
  setExamDetail: Dispatch<SetStateAction<Course | null>>;
  colorMap: Record<string, string>;
}

const MonthView = ({
  courses,
  selectedIds,
  setExamDetail,
  colorMap,
}: MonthViewProps) => {
  const examCalendarCells = Array.from({ length: 35 }, (_, index) => {
    const day = index - EXAM_MONTH_START_OFFSET + 1;
    return day >= 1 && day <= EXAM_MONTH_DAYS ? day : null;
  });

  const selected = useMemo(
    () => courses.filter((course) => selectedIds.includes(course.id)),
    [selectedIds],
  );

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

  const noWrittenExam = useMemo(
    () => selected.filter((course) => !parseExam(course.exam)),
    [selected],
  );

  const writtenExamCount = useMemo(
    () =>
      selected.filter((course) => parseExam(course.exam)?.month === EXAM_MONTH)
        .length,
    [selected],
  );

  return (
    <div className='p-3 md:p-5 min-w-160'>
      <div className='mb-4 flex flex-wrap items-center justify-between gap-3'>
        <div>
          <h2 className='text-base font-extrabold'>تقویم امتحانات · دی ۱۴۰۵</h2>
          <p className='mt-1 text-xs text-muted-foreground'>
            برای مشاهده جزئیات هر امتحان، روی عنوان درس داخل تقویم کلیک کنید.
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <Badge variant='outline'>
            {toPersianDigits(writtenExamCount)} آزمون
          </Badge>
          <Badge className='bg-primary/10 text-primary'>دی ۱۴۰۵</Badge>
        </div>
      </div>

      <div className='overflow-x-auto rounded-2xl border border-border bg-card'>
        <div className='w-full'>
          <div className='grid grid-cols-7 border-b border-border bg-muted/35'>
            {examWeekDays.map((day) => (
              <div
                key={day}
                className='border-l border-border px-2 py-3 text-center text-xs font-extrabold last:border-l-0'
              >
                {day}
              </div>
            ))}
          </div>

          <div className='grid grid-cols-7'>
            {examCalendarCells.map((day, index) => {
              const dayExams = day ? (examsByDay.get(day) ?? []) : [];
              const isFriday = index % 7 === 6;

              return (
                <div
                  key={index}
                  className={`min-h-20 border-l border-b border-border p-2 last:border-l-0 ${
                    day ? 'bg-card' : 'bg-muted/15'
                  } ${isFriday && day ? 'bg-destructive/[0.025]' : ''}`}
                >
                  {day && (
                    <>
                      <div className='mb-2 flex items-center justify-between'>
                        <span
                          className={`flex size-7 items-center justify-center rounded-lg text-xs font-extrabold ${
                            dayExams.length > 0
                              ? 'bg-primary text-primary-foreground'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {toPersianDigits(day)}
                        </span>
                        {dayExams.length > 1 && (
                          <span className='text-[10px] font-medium text-muted-foreground'>
                            {toPersianDigits(dayExams.length)} امتحان
                          </span>
                        )}
                      </div>

                      <div className='space-y-1.5'>
                        {dayExams.map((course) => {
                          const exam = parseExam(course.exam);
                          return (
                            <button
                              key={course.id}
                              type='button'
                              onClick={() => setExamDetail(course)}
                              className={`w-full rounded-xl border px-2 py-2 text-right shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${colorMap[course.color]}`}
                            >
                              <span className='block truncate text-[11px] font-extrabold leading-5'>
                                {course.title}
                              </span>
                              <span className='mt-0.5 flex items-center gap-1 text-[10px] opacity-75'>
                                <Clock3 className='size-3' />
                                {exam ? toPersianDigits(exam.time) : '—'}
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
        <div className='mt-3 flex flex-wrap items-center gap-2 rounded-2xl border border-dashed border-border bg-muted/15 px-3 py-2.5 text-xs'>
          <span className='font-bold'>بدون آزمون کتبی:</span>
          {noWrittenExam.map((course) => (
            <span
              key={course.id}
              className='rounded-full bg-muted px-2.5 py-1 text-muted-foreground'
            >
              {course.title}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
export default MonthView;
