'use client';

import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { Card } from '../ui/card';
import CourseFilter from './course-filter';
import CourseList from './course-list';
import { Course } from '@/lib/mock-data';
import { cn } from 'cn';

interface CourseSelectProps {
  courses: Course[];
  selectedIds: string[];
  days: string[];
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
  className?: string;
}

const CourseSelect = ({
  courses,
  days,
  selectedIds,
  setSelectedIds,
  className,
}: CourseSelectProps) => {
  const [query, setQuery] = useState('');
  const [faculty, setFaculty] = useState('مهندسی و فناوری');
  const [group, setGroup] = useState('مهندسی کامپیوتر');

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesSearch =
        !normalized ||
        `${course.title} ${course.code} ${course.professor}`
          .toLowerCase()
          .includes(normalized);
      return (
        matchesSearch && course.faculty === faculty && course.group === group
      );
    });
  }, [query, faculty, group]);

  return (
    <Card
      className={cn('flex min-h-[650px] flex-col overflow-hidden', className)}
    >
      <CourseFilter
        faculty={faculty}
        setFaculty={setFaculty}
        group={group}
        setGroup={setGroup}
        query={query}
        setQuery={setQuery}
      />
      <CourseList
        courses={courses}
        filtered={filtered}
        days={days}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />
    </Card>
  );
};
export default CourseSelect;
