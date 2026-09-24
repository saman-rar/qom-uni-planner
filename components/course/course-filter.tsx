import { CirclePlus, Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Dispatch, SetStateAction } from 'react';
import { faculties, groups } from '@/lib/mock-data';
import CustomComboBox from '../custom/custom-combobox';

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
    <div className='border-b border-border px-4 pb-4'>
      <div className='mb-3 flex items-center justify-between'>
        <div>
          <h2 className='font-extrabold'>دروس ارائه‌شده</h2>
          <p className='mt-1 text-xs text-muted-foreground'>
            داده آزمایشی برای دموی سامانه
          </p>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-2'>
        <label className='space-y-1.5 text-xs text-muted-foreground'>
          <CustomComboBox
            emptyText='هیچ دانکشده‌ای پیدا نشد.'
            placeholder='دانشکده'
            items={faculties}
          />
        </label>
        <label className='space-y-1.5 text-xs text-muted-foreground'>
          <CustomComboBox
            emptyText='هیچ رشته‌ای پیدا نشد.'
            placeholder='رشته تحصیلی'
            items={groups}
          />
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
