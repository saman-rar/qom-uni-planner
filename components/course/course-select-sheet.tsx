import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import CourseSelect from './course-select';
import { Course } from '@/lib/mock-data';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { cn } from 'cn';

interface CourseSelectSheetProps {
  courses: Course[];
  selectedIds: string[];
  days: string[];
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
  className?: string;
  children: ReactNode;
}

export default function CourseSelectSheet({
  courses,
  days,
  selectedIds,
  setSelectedIds,
  className,
  children,
}: CourseSelectSheetProps) {
  return (
    <Sheet modal>
      <SheetTrigger asChild className={cn(className)}>
        <Button variant='secondary'>{children}</Button>
      </SheetTrigger>
      <SheetContent dir='rtl' side='left' className='rounded-xl'>
        <CourseSelect
          courses={courses}
          days={days}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
        />
      </SheetContent>
    </Sheet>
  );
}
