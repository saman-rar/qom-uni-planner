import { CirclePlus, Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Dispatch, SetStateAction } from 'react';
import { faculties, groups } from '@/lib/mock-data';

interface CourseFilterProps {
  faculty: string;
  setFaculty: Dispatch<SetStateAction<string>>;
  group: string;
  setGroup: Dispatch<SetStateAction<string>>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

const CourseFilter = ({
  faculty,
  setFaculty,
  group,
  setGroup,
  query,
  setQuery,
}: CourseFilterProps) => {
  return (
    <div className='border-b border-border p-4'>
      <div className='mb-3 flex items-center justify-between'>
        <div>
          <h2 className='font-extrabold'>دروس ارائه‌شده</h2>
          <p className='mt-1 text-xs text-muted-foreground'>
            داده آزمایشی برای دموی سامانه
          </p>
        </div>
        <CirclePlus className='size-5 text-primary' />
      </div>
      <div className='grid grid-cols-2 gap-2'>
        <label className='space-y-1.5 text-xs text-muted-foreground'>
          دانشکده
          <select
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
            className='h-10 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none'
          >
            {faculties.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className='space-y-1.5 text-xs text-muted-foreground'>
          گروه آموزشی
          <select
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            className='h-10 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none'
          >
            {groups.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
      <div className='relative mt-3'>
        <Search className='absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='نام درس، کد یا استاد...'
          className='pr-9'
        />
      </div>
    </div>
  );
};
export default CourseFilter;
