import formatClassTime from '@/lib/format-class-time';
import { Course } from '@/lib/mock-data';
import { useMemo } from 'react';

const hours = Array.from({ length: 13 }, (_, i) => i + 8);

interface WeekViewProps {
  days: string[];
  courses: Course[];
  selectedIds: string[];
  toggleCourse: (course: Course) => void;
  colorMap: Record<string, string>;
}

const WeekView = ({
  days,
  courses,
  selectedIds,
  toggleCourse,
  colorMap,
}: WeekViewProps) => {
  const selected = useMemo(
    () => courses.filter((course) => selectedIds.includes(course.id)),
    [selectedIds],
  );

  return (
    <div className='overflow-auto w-full'>
      <div className='w-full'>
        <div className='grid grid-cols-[64px_repeat(5,1fr)] bg-muted/25'>
          <div className='border-l border-border' />
          {days.map((day) => (
            <div
              key={day}
              className='border-r border-b border-border px-2 py-3 text-center text-sm font-bold bg-chart-1/35'
            >
              {day}
            </div>
          ))}
        </div>
        <div
          className='relative grid grid-cols-[64px_repeat(5,1fr)]'
          style={{ height: 780 }}
        >
          <div className='relative border-l border-border bg-muted/10'>
            {hours.map((hour) => (
              <div
                key={hour}
                className='absolute left-0 right-0 text-center text-[11px] text-muted-foreground'
                style={{
                  top: `${((hour - 8) / 12) * 100}%`,
                  transform: 'translateY(-50%)',
                }}
              >
                {String(hour).padStart(2, '0')}:00
              </div>
            ))}
          </div>
          {days.map((day, dayIndex) => (
            <div key={day} className='relative border-r border-border border-b'>
              {hours.slice(0, -1).map((hour) => (
                <div
                  key={hour}
                  className='absolute left-0 right-0 border-t border-border/80'
                  style={{ top: `${((hour - 8) / 12) * 100}%` }}
                />
              ))}
              {selected
                .filter((course) => course.day === dayIndex)
                .map((course) => {
                  const top = ((course.start - 8) / 12) * 100;
                  const height = ((course.end - course.start) / 12) * 100;
                  return (
                    <button
                      key={course.id}
                      onClick={() => toggleCourse(course)}
                      className={`absolute left-1.5 right-1.5 overflow-hidden rounded-xl border p-2 text-right shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${colorMap[course.color]}`}
                      style={{
                        top: `calc(${top}% + 4px)`,
                        height: `calc(${height}% - 7px)`,
                      }}
                    >
                      <div className='text-xs font-extrabold leading-5'>
                        {course.title}
                      </div>
                      <div className='mt-1 truncate text-[10px] opacity-80'>
                        {course.professor}
                      </div>
                      <div className='mt-1 text-[10px] opacity-70'>
                        {formatClassTime(course.start)}-
                        {formatClassTime(course.end)}
                      </div>
                    </button>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default WeekView;
