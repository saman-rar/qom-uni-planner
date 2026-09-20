import { Check } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Course } from '@/lib/mock-data';
import { Dispatch, SetStateAction, useMemo } from 'react';
import formatClassTime from '@/lib/format-class-time';

interface CourseListProps {
  courses: Course[];
  filtered: Course[];
  selectedIds: string[];
  days: string[];
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
}

const CourseList = ({
  filtered,
  selectedIds,
  setSelectedIds,
  courses,
  days,
}: CourseListProps) => {
  const selected = useMemo(
    () => courses.filter((course) => selectedIds.includes(course.id)),
    [selectedIds],
  );

  const toggleCourse = (course: Course) => {
    setSelectedIds((prev) =>
      prev.includes(course.id)
        ? prev.filter((id) => id !== course.id)
        : [...prev, course.id],
    );
  };

  function hasConflict(course: Course, selected: Course[]) {
    return selected.some(
      (item) =>
        item.day === course.day &&
        Math.max(item.start, course.start) < Math.min(item.end, course.end),
    );
  }

  return (
    <div className='flex-1 space-y-2 overflow-y-auto p-3'>
      {filtered.map((course) => {
        const isSelected = selectedIds.includes(course.id);
        const conflict = !isSelected && hasConflict(course, selected);
        return (
          <article
            key={course.id}
            className='rounded-2xl border border-border bg-muted/15 p-3 transition hover:bg-muted/30'
          >
            <div className='flex items-start justify-between gap-3'>
              <div>
                <div className='flex flex-wrap items-center gap-2'>
                  <h3 className='text-sm font-extrabold'>{course.title}</h3>
                  <span className='text-[10px] text-muted-foreground'>
                    {course.code}
                  </span>
                </div>
                <p className='mt-1 text-xs text-muted-foreground'>
                  {course.professor}
                </p>
              </div>
              <Badge>{course.units} واحد</Badge>
            </div>
            <div className='mt-3 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground'>
              <span>
                کلاس: {days[course.day]} {formatClassTime(course.start)}–
                {formatClassTime(course.end)}
              </span>
              <span>ظرفیت: {course.capacity}</span>
              <span className='col-span-2'>امتحان: {course.exam}</span>
            </div>
            <div className='mt-3 flex items-center justify-between'>
              <span
                className={`text-[11px] ${conflict ? 'text-destructive' : 'text-muted-foreground'}`}
              >
                {conflict
                  ? 'تداخل زمانی با برنامه فعلی'
                  : isSelected
                    ? 'به برنامه اضافه شده'
                    : 'آماده افزودن'}
              </span>
              <Button
                size='sm'
                variant={isSelected ? 'outline' : 'default'}
                onClick={() => toggleCourse(course)}
              >
                {isSelected ? (
                  <>
                    <Check className='size-3.5' /> افزوده شد
                  </>
                ) : (
                  'افزودن'
                )}
              </Button>
            </div>
          </article>
        );
      })}
      {filtered.length === 0 && (
        <div className='rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground'>
          درسی با این فیلتر پیدا نشد.
        </div>
      )}
    </div>
  );
};
export default CourseList;
