import { Dispatch, SetStateAction, useState } from 'react';
import { Card } from '../ui/card';
import FooterView from './footer-view';
import HeaderView from './header-view';
import MonthView from './month-view';
import WeekView from './week-view';
import { Course } from '@/lib/mock-data';

const colorMap: Record<string, string> = {
  cyan: 'border-cyan-400/40 bg-cyan-500/70 text-cyan-950 dark:text-cyan-50',
  indigo:
    'border-indigo-400/40 bg-indigo-500/70 text-indigo-950 dark:text-indigo-50',
  emerald:
    'border-emerald-400/40 bg-emerald-500/70 text-emerald-950 dark:text-emerald-50',
  amber:
    'border-amber-400/40 bg-amber-500/70 text-amber-950 dark:text-amber-50',
  rose: 'border-rose-400/40 bg-rose-500/70 text-rose-950 dark:text-rose-50',
  violet:
    'border-violet-400/40 bg-violet-500/70 text-violet-950 dark:text-violet-50',
  blue: 'border-blue-400/40 bg-blue-500/70 text-blue-950 dark:text-blue-50',
  fuchsia:
    'border-fuchsia-400/40 bg-fuchsia-500/70 text-fuchsia-950 dark:text-fuchsia-50',
  teal: 'border-teal-400/40 bg-teal-500/70 text-teal-950 dark:text-teal-50',
};

interface ViewProps {
  courses: Course[];
  selectedIds: string[];
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
  setCourseDetail: Dispatch<SetStateAction<Course | null>>;
  days: string[];
}

const View = ({
  courses,
  selectedIds,
  setSelectedIds,
  setCourseDetail,
  days,
}: ViewProps) => {
  const [view, setView] = useState<'week' | 'month'>('week');

  return (
    <Card className='order-2 min-h-[650px] overflow-hidden xl:order-1'>
      <HeaderView
        courses={courses}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        setView={setView}
        view={view}
      />

      {view === 'week' ? (
        <WeekView
          colorMap={colorMap}
          classes={courses}
          days={days}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          setClassDetail={setCourseDetail}
        />
      ) : (
        <MonthView
          colorMap={colorMap}
          courses={courses}
          selectedIds={selectedIds}
          setExamDetail={setCourseDetail}
        />
      )}

      <FooterView
        courses={courses}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />
    </Card>
  );
};
export default View;
