import {
  BookOpen,
  CalendarClock,
  CalendarDays,
  Clock3,
  GraduationCap,
  Hash,
  UserRound,
  UsersRound,
  X,
} from 'lucide-react';
import { Button } from './ui/button';
import parseExam from '@/lib/parse-exam';
import toPersianDigits from '@/lib/format-digits';
import { Course } from '@/lib/mock-data';
import { Dispatch, SetStateAction } from 'react';

const CourseDetailModal = ({
  courseDetail,
  setCourseDetail,
  setSelectedIds,
}: {
  courseDetail: Course | null;
  setCourseDetail: Dispatch<SetStateAction<Course | null>>;
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
}) => {
  if (!courseDetail) return;

  const toggleCourse = () => {
    setSelectedIds((prev) =>
      prev.includes(courseDetail.id)
        ? prev.filter((id) => id !== courseDetail.id)
        : [...prev, courseDetail.id],
    );
    setCourseDetail(null);
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm'
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setCourseDetail(null);
      }}
    >
      <div
        role='dialog'
        aria-modal='true'
        aria-labelledby='exam-detail-title'
        className='w-full max-w-xl overflow-hidden rounded-3xl border border-border bg-card text-card-foreground shadow-2xl'
      >
        <div className='flex items-start justify-between gap-4 border-b border-border bg-muted/20 p-5'>
          <div className='flex items-center gap-3'>
            <div className='flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
              <CalendarClock className='size-5' />
            </div>
            <div>
              <p className='text-xs font-medium text-primary'>جزئیات امتحان</p>
              <h3
                id='exam-detail-title'
                className='mt-1 text-lg font-extrabold'
              >
                {courseDetail.title}
              </h3>
            </div>
          </div>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setCourseDetail(null)}
            aria-label='بستن جزئیات امتحان'
          >
            <X className='size-5' />
          </Button>
        </div>

        <div className='p-5'>
          {(() => {
            const exam = parseExam(courseDetail.exam);
            return (
              <>
                <div className='mb-5 grid gap-3 sm:grid-cols-2'>
                  <div className='rounded-2xl border border-border bg-primary/[0.045] p-4'>
                    <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                      <CalendarDays className='size-4' /> تاریخ امتحان
                    </div>
                    <div className='mt-2 text-base font-extrabold'>
                      {exam
                        ? `${toPersianDigits(exam.year)}/${toPersianDigits(String(exam.month).padStart(2, '0'))}/${toPersianDigits(String(exam.day).padStart(2, '0'))}`
                        : courseDetail.exam}
                    </div>
                  </div>
                  <div className='rounded-2xl border border-border bg-primary/[0.045] p-4'>
                    <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                      <Clock3 className='size-4' /> ساعت شروع
                    </div>
                    <div className='mt-2 text-base font-extrabold'>
                      {exam ? toPersianDigits(exam.time) : '—'}
                    </div>
                  </div>
                </div>

                <div className='grid gap-x-6 gap-y-4 text-sm sm:grid-cols-2'>
                  <div className='flex items-start gap-2.5'>
                    <UserRound className='mt-0.5 size-4 shrink-0 text-muted-foreground' />
                    <div>
                      <p className='text-xs text-muted-foreground'>استاد</p>
                      <p className='mt-1 font-bold'>{courseDetail.professor}</p>
                    </div>
                  </div>
                  <div className='flex items-start gap-2.5'>
                    <Hash className='mt-0.5 size-4 shrink-0 text-muted-foreground' />
                    <div>
                      <p className='text-xs text-muted-foreground'>کد درس</p>
                      <p className='mt-1 font-bold'>{courseDetail.code}</p>
                    </div>
                  </div>
                  <div className='flex items-start gap-2.5'>
                    <BookOpen className='mt-0.5 size-4 shrink-0 text-muted-foreground' />
                    <div>
                      <p className='text-xs text-muted-foreground'>
                        تعداد واحد
                      </p>
                      <p className='mt-1 font-bold'>
                        {toPersianDigits(courseDetail.units)} واحد
                      </p>
                    </div>
                  </div>
                  <div className='flex items-start gap-2.5'>
                    <UsersRound className='mt-0.5 size-4 shrink-0 text-muted-foreground' />
                    <div>
                      <p className='text-xs text-muted-foreground'>
                        ظرفیت کلاس
                      </p>
                      <p className='mt-1 font-bold'>
                        {toPersianDigits(courseDetail.capacity)}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-start gap-2.5 sm:col-span-2'>
                    <GraduationCap className='mt-0.5 size-4 shrink-0 text-muted-foreground' />
                    <div>
                      <p className='text-xs text-muted-foreground'>
                        دانشکده و گروه آموزشی
                      </p>
                      <p className='mt-1 font-bold'>
                        {courseDetail.faculty} · {courseDetail.group}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
        </div>

        <div className='flex border-t border-border bg-muted/15 px-3 py-2 gap-2'>
          <Button
            variant={'outline'}
            className='flex-1 py-4 rounded-xl'
            onClick={() => setCourseDetail(null)}
          >
            بستن
          </Button>
          <Button
            variant={'destructive'}
            className='flex-1 py-4 rounded-xl'
            onClick={toggleCourse}
          >
            حذف
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CourseDetailModal;
