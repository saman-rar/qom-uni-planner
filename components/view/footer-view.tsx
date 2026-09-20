import { Course } from '@/lib/mock-data';
import { X } from 'lucide-react';
import { Dispatch, SetStateAction, useMemo } from 'react';

interface FooterViewProps {
  courses: Course[];
  selectedIds: string[];
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
}

const FooterView = ({
  courses,
  selectedIds,
  setSelectedIds,
}: FooterViewProps) => {
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

  return (
    <div className='flex flex-wrap items-center gap-2 border-t border-border bg-card px-4 py-3'>
      <span className='text-xs font-medium text-muted-foreground'>
        دروس انتخاب‌شده:
      </span>
      {selected.map((course) => (
        <button
          key={course.id}
          onClick={() => toggleCourse(course)}
          className='inline-flex items-center gap-1 rounded-full border border-border bg-muted/40 px-2.5 py-1 text-xs hover:bg-muted'
        >
          <X className='size-3' />
          {course.title}
        </button>
      ))}
      {selected.length === 0 && (
        <span className='text-xs text-muted-foreground'>
          هنوز درسی اضافه نشده.
        </span>
      )}
    </div>
  );
};
export default FooterView;
