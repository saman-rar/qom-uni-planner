import { CalendarClock, CalendarDays, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { Course } from '@/lib/mock-data';

interface HeaderViewProps {
  view: 'week' | 'month';
  setView: Dispatch<SetStateAction<'week' | 'month'>>;
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
  courses: Course[];
  selectedIds: string[];
}

const HeaderView = ({
  view,
  setView,
  setSelectedIds,
  courses,
  selectedIds,
}: HeaderViewProps) => {
  const selected = useMemo(
    () => courses.filter((course) => selectedIds.includes(course.id)),
    [selectedIds],
  );

  const totalUnits = selected.reduce((sum, course) => sum + course.units, 0);

  return (
    <div className='flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3'>
      <div className='flex items-center gap-2 rounded-xl border border-border bg-muted/35 p-1'>
        <Button
          size='sm'
          variant={view === 'week' ? 'default' : 'ghost'}
          onClick={() => setView('week')}
        >
          <CalendarDays className='size-4' /> برنامه هفتگی
        </Button>
        <Button
          size='sm'
          variant={view === 'month' ? 'default' : 'ghost'}
          onClick={() => setView('month')}
        >
          <CalendarClock className='size-4' /> برنامه امتحانی
        </Button>
      </div>
      <div className='flex items-stretch gap-2'>
        <Badge className='bg-primary/10 h-auto text-muted-foreground'>
          {selected.length} درس · {totalUnits} واحد
        </Badge>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => setSelectedIds([])}
          aria-label='حذف همه'
        >
          <Trash2 className='size-4 text-destructive' />
        </Button>
      </div>
    </div>
  );
};
export default HeaderView;
