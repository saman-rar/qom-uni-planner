'use client';

import { useEffect, useState } from 'react';
import { courses, defaultSelected, type Course } from '@/lib/mock-data';
import Header from './layout/header';
import View from './view/view';
import CourseSelect from './course/course-select';
import CourseDetailModal from './course-detail-modal';
import { Button } from './ui/button';
import SelectionGuide from './guide/guide';

const days = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه'];

export function CoursePlanner() {
  const [selectedIds, setSelectedIds] = useState(defaultSelected);
  const [courseDetail, setCoureDetail] = useState<Course | null>(null);
  const [selectionGuide, setSelectionGuide] = useState<
    'general' | 'special' | null
  >(null);

  useEffect(() => {
    if (!courseDetail) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setCoureDetail(null);
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [courseDetail]);

  return (
    <main>
      <div className='min-h-screen bg-background text-foreground transition-colors'>
        <div className='mx-auto flex min-h-screen max-w-[1700px] flex-col p-3 lg:p-5'>
          <Header />

          <section className='grid min-h-0 flex-1 gap-3 xl:grid-cols-[minmax(0,1fr)_390px]'>
            <View
              courses={courses}
              days={days}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
              setCourseDetail={setCoureDetail}
            />

            <div>
              <div className='flex gap-2 mb-3 text-sm lg:text-md'>
                <Button
                  onClick={() => setSelectionGuide('special')}
                  className='flex-1 py-5'
                  variant={'secondary'}
                >
                  چارت هشت ترم
                </Button>
                <Button
                  onClick={() => setSelectionGuide('general')}
                  className='flex-1 py-5'
                  variant={'secondary'}
                >
                  راهنمای دروس عمومی
                </Button>
              </div>
              <CourseSelect
                courses={courses}
                days={days}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
              />
            </div>
          </section>
        </div>
      </div>

      <CourseDetailModal
        courseDetail={courseDetail}
        setCourseDetail={setCoureDetail}
        setSelectedIds={setSelectedIds}
      />
      <SelectionGuide guide={selectionGuide} setGuide={setSelectionGuide} />
    </main>
  );
}
