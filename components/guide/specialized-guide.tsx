import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

type CourseTable = {
  id: number;
  name: string;
  type: 'تخصصی الزامی' | 'پایه' | 'عمومی' | 'مهارتی';
  prereq: string;
  amali: number;
  nazari: 3;
};

// داده‌های استخراج شده از فایل PDF
const semestersData = {
  'نیمسال اول': [
    {
      id: 1,
      name: 'مبانی کامپیوتر و برنامه سازی',
      type: 'تخصصی الزامی',
      prereq: '-',
      amali: 0,
      nazari: 3,
    },
    {
      id: 2,
      name: 'کارگاه کامپیوتر',
      type: 'تخصصی الزامی',
      prereq: '-',
      amali: 1,
      nazari: 0,
    },
    {
      id: 3,
      name: 'ریاضی عمومی ۱',
      type: 'پایه',
      prereq: '-',
      amali: 0,
      nazari: 3,
    },
    { id: 4, name: 'فیزیک', type: 'پایه', prereq: '-', amali: 0, nazari: 3 },
    {
      id: 5,
      name: 'زبان انگلیسی',
      type: 'عمومی',
      prereq: '-',
      amali: 0,
      nazari: 3,
    },
    {
      id: 6,
      name: 'زبان فارسی',
      type: 'عمومی',
      prereq: '-',
      amali: 0,
      nazari: 3,
    },
    {
      id: 7,
      name: 'تربیت بدنی',
      type: 'عمومی',
      prereq: '-',
      amali: 1,
      nazari: 0,
    },
    {
      id: 8,
      name: 'آشنایی با صنعت کامپیوتر',
      type: 'مهارتی',
      prereq: '-',
      amali: 1,
      nazari: 0,
    },
  ],
  'نیمسال دوم': [
    {
      id: 1,
      name: 'ریاضیات گسسته',
      type: 'تخصصی الزامی',
      prereq: '-',
      amali: 0,
      nazari: 3,
    },
    {
      id: 2,
      name: 'برنامه سازی پیشرفته',
      type: 'تخصصی الزامی',
      prereq: 'مبانی کامپیوتر و برنامه سازی',
      amali: 0,
      nazari: 3,
    },
    {
      id: 3,
      name: 'کارگاه عمومی',
      type: 'پایه',
      prereq: '-',
      amali: 1,
      nazari: 0,
    },
    {
      id: 4,
      name: 'زبان تخصصی کامپیوتر',
      type: 'تخصصی الزامی',
      prereq: 'زبان انگلیسی، کارگاه کامپیوتر',
      amali: 0,
      nazari: 2,
    },
    {
      id: 5,
      name: 'ریاضی عمومی ۲',
      type: 'پایه',
      prereq: 'ریاضی عمومی ۱',
      amali: 0,
      nazari: 3,
    },
    {
      id: 6,
      name: 'فیزیک ۲',
      type: 'پایه',
      prereq: 'فیزیک ۱',
      amali: 0,
      nazari: 3,
    },
    {
      id: 7,
      name: 'ورزش ۱',
      type: 'عمومی',
      prereq: 'تربیت بدنی',
      amali: 1,
      nazari: 0,
    },
    {
      id: 8,
      name: 'درس عمومی',
      type: 'عمومی',
      prereq: '-',
      amali: 0,
      nazari: 2,
    },
  ],
  'نیمسال سوم': [
    {
      id: 1,
      name: 'مدارهای منطقی',
      type: 'تخصصی الزامی',
      prereq: '-',
      amali: 0,
      nazari: 3,
    },
    {
      id: 2,
      name: 'مدارهای الکتریکی و الکترونیکی',
      type: 'تخصصی الزامی',
      prereq: 'فیزیک ۲، معادلات دیفرانسیل',
      amali: 0,
      nazari: 3,
    },
    {
      id: 3,
      name: 'داده ساختارها و الگوریتم ها',
      type: 'تخصصی الزامی',
      prereq: 'ریاضیات گسسته، برنامه سازی پیشرفته',
      amali: 0,
      nazari: 3,
    },
    {
      id: 4,
      name: 'معادلات دیفرانسیل',
      type: 'پایه',
      prereq: '-',
      amali: 0,
      nazari: 3,
    },
    {
      id: 5,
      name: 'آز فیزیک ۲',
      type: 'پایه',
      prereq: 'فیزیک ۲',
      amali: 1,
      nazari: 0,
    },
    {
      id: 6,
      name: 'مهارتهای نرم شغلی',
      type: 'مهارتی',
      prereq: 'برنامه نویسی پیشرفته',
      amali: 0,
      nazari: 2,
    },
    {
      id: 7,
      name: 'درس عمومی',
      type: 'عمومی',
      prereq: '-',
      amali: 0,
      nazari: 2,
    },
  ],
  'نیمسال چهارم': [
    {
      id: 1,
      name: 'آز مدارهای منطقی',
      type: 'تخصصی الزامی',
      prereq: 'مدارهای منطقی',
      amali: 1,
      nazari: 0,
    },
    {
      id: 2,
      name: 'آز مدارهای الکتریکی و الکترونیکی',
      type: 'تخصصی الزامی',
      prereq: 'مدارهای الکتریکی و الکترونیکی',
      amali: 1,
      nazari: 0,
    },
    {
      id: 3,
      name: 'معماری کامپیوتر',
      type: 'تخصصی الزامی',
      prereq: 'مدارهای منطقی',
      amali: 0,
      nazari: 3,
    },
    {
      id: 4,
      name: 'آمار و احتمال مهندسی',
      type: 'پایه',
      prereq: 'ریاضی عمومی ۱',
      amali: 0,
      nazari: 3,
    },
    {
      id: 5,
      name: 'نظریه زبان ها و ماشین ها',
      type: 'تخصصی الزامی',
      prereq: 'داده ساختارها و الگوریتم ها',
      amali: 0,
      nazari: 3,
    },
    {
      id: 6,
      name: 'طراحی الگوریتم ها',
      type: 'تخصصی انتخابی',
      prereq: 'داده ساختارها، ریاضیات گسسته',
      amali: 0,
      nazari: 3,
    },
    {
      id: 7,
      name: 'جبر خطی',
      type: 'تخصصی الزامی',
      prereq: 'ریاضی عمومی ۲',
      amali: 0,
      nazari: 3,
    },
    {
      id: 8,
      name: 'درس عمومی',
      type: 'عمومی',
      prereq: '-',
      amali: 0,
      nazari: 2,
    },
  ],
  'نیمسال پنجم': [
    {
      id: 1,
      name: 'آز معماری کامپیوتر',
      type: 'تخصصی الزامی',
      prereq: 'معماری کامپیوتر، آز مدارهای منطقی',
      amali: 1,
      nazari: 0,
    },
    {
      id: 2,
      name: 'طراحی سیستمهای دیجیتال',
      type: 'تخصصی الزامی',
      prereq: 'معماری کامپیوتر (همنیاز)',
      amali: 0,
      nazari: 3,
    },
    {
      id: 3,
      name: 'سیستم های عامل',
      type: 'تخصصی الزامی',
      prereq: 'معماری کامپیوتر',
      amali: 0,
      nazari: 3,
    },
    {
      id: 4,
      name: 'طراحی پایگاه داده ها',
      type: 'تخصصی انتخابی',
      prereq: 'داده ساختارها و الگوریتم ها',
      amali: 0,
      nazari: 3,
    },
    {
      id: 5,
      name: 'مبانی ساخت بازی های رایانه ای',
      type: 'تخصصی اختیاری',
      prereq: 'برنامه سازی پیشرفته',
      amali: 0,
      nazari: 3,
    },
    {
      id: 6,
      name: 'تحلیل و طراحی نرم افزار',
      type: 'تخصصی الزامی',
      prereq: 'داده ساختارها و الگوریتم ها',
      amali: 0,
      nazari: 3,
    },
    {
      id: 7,
      name: 'درس عمومی',
      type: 'عمومی',
      prereq: '-',
      amali: 0,
      nazari: 2,
    },
  ],
  'نیمسال ششم': [
    {
      id: 1,
      name: 'شبکه های کامپیوتری',
      type: 'تخصصی الزامی',
      prereq: 'سیستم های عامل (همنیاز)',
      amali: 0,
      nazari: 3,
    },
    {
      id: 2,
      name: 'مهندسی نرم افزار',
      type: 'تخصصی انتخابی',
      prereq: 'تحلیل و طراحی نرم افزار',
      amali: 0,
      nazari: 3,
    },
    {
      id: 3,
      name: 'سیگنالها و سیستم ها',
      type: 'تخصصی انتخابی',
      prereq: 'مدارهای الکتریکی و الکترونیکی',
      amali: 0,
      nazari: 3,
    },
    {
      id: 4,
      name: 'بازیابی اطلاعات',
      type: 'تخصصی انتخابی',
      prereq: 'داده ساختارها و الگوریتم ها',
      amali: 0,
      nazari: 3,
    },
    {
      id: 5,
      name: 'روش پژوهش و ارائه',
      type: 'تخصصی الزامی',
      prereq: 'زبان تخصصی کامپیوتر نیمسال ۵ به بالا',
      amali: 0,
      nazari: 3,
    },
    {
      id: 6,
      name: 'آز سیستم عامل',
      type: 'تخصصی الزامی',
      prereq: 'سیستم های عامل',
      amali: 1,
      nazari: 0,
    },
    {
      id: 7,
      name: 'سیستم های نهفته و بی درنگ',
      type: 'تخصصی الزامی',
      prereq: 'معماری کامپیوتر',
      amali: 0,
      nazari: 3,
    },
  ],
  'نیمسال هفتم': [
    {
      id: 1,
      name: 'هوش مصنوعی',
      type: 'تخصصی الزامی',
      prereq: 'داده ساختارها، آمار و احتمال مهندسی',
      amali: 0,
      nazari: 3,
    },
    {
      id: 2,
      name: 'انتقال داده ها',
      type: 'تخصصی اختیاری',
      prereq: 'سیگنالها و سیستم ها',
      amali: 0,
      nazari: 3,
    },
    {
      id: 3,
      name: 'مدیریت پروژه های فناوری اطلاعات',
      type: 'تخصصی انتخابی',
      prereq: 'تحلیل و طراحی نرم افزار',
      amali: 0,
      nazari: 3,
    },
    {
      id: 4,
      name: 'مبانی اینترنت اشیاء',
      type: 'تخصصی اختیاری',
      prereq: 'شبکه های کامپیوتری',
      amali: 0,
      nazari: 3,
    },
    {
      id: 5,
      name: 'درس عمومی',
      type: 'عمومی',
      prereq: '-',
      amali: 0,
      nazari: 2,
    },
    {
      id: 6,
      name: 'آز شبکه های کامپیوتری',
      type: 'تخصصی الزامی',
      prereq: 'شبکه های کامپیوتری',
      amali: 1,
      nazari: 0,
    },
    {
      id: 7,
      name: 'پروژه کارشناسی',
      type: 'پروژه (الزامی)',
      prereq: 'روش پژوهش و ارائه',
      amali: 0,
      nazari: 3,
    },
    {
      id: 8,
      name: 'آز مهندسی نرم افزار',
      type: 'تخصصی اختیاری',
      prereq: 'مهندسی نرم افزار',
      amali: 1,
      nazari: 0,
    },
  ],
  'نیمسال هشتم': [
    {
      id: 1,
      name: 'داده کاوی',
      type: 'تخصصی انتخابی',
      prereq: 'داده ساختارها، آمار و احتمال مهندسی',
      amali: 0,
      nazari: 3,
    },
    {
      id: 2,
      name: 'امنیت سیستم های کامپیوتری',
      type: 'تخصصی الزامی',
      prereq: 'شبکه های کامپیوتری',
      amali: 0,
      nazari: 3,
    },
    {
      id: 3,
      name: 'برنامه نویسی وب',
      type: 'تخصصی',
      prereq: 'طراحی پایگاه داده ها',
      amali: 0,
      nazari: 3,
    },
    {
      id: 4,
      name: 'درس عمومی',
      type: 'عمومی',
      prereq: '-',
      amali: 0,
      nazari: 2,
    },
    {
      id: 5,
      name: 'کارآموزی (تابستان)',
      type: 'مهارتی',
      prereq: 'روش پژوهش و ارائه',
      amali: 2,
      nazari: 0,
    },
    {
      id: 6,
      name: 'درس عمومی',
      type: 'عمومی',
      prereq: '-',
      amali: 0,
      nazari: 2,
    },
  ],
};

export default function SpecialGuide({
  isOpen = null,
  setIsOpen,
}: {
  isOpen: 'general' | 'special' | null;
  setIsOpen: React.Dispatch<React.SetStateAction<'general' | 'special' | null>>;
}) {
  const [selectedSemester, setSelectedSemester] = useState('نیمسال اول');
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  if (isOpen !== 'special') return;

  // @ts-expect-error
  const currentData: CourseTable[] = semestersData[selectedSemester];

  // محاسبه مجموع واحدهای عملی و نظری داینامیک
  const totalAmali = currentData.reduce((sum, item) => sum + item.amali, 0);
  const totalNazari = currentData.reduce((sum, item) => sum + item.nazari, 0);

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 backdrop-blur-sm'
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setIsOpen(null);
      }}
    >
      {/* مدال */}
      <div className='relative w-full max-w-4xl bg-card rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]'>
        {/* هدر مدال */}
        <div className='flex items-center justify-between p-6 border-b'>
          <h2 className='text-xl font-semibold text-chart-3'>
            برنامه ترمیک مهندسی کامپیوتر ورودی ۱۴۰۳ به بعد
          </h2>
          <button
            onClick={() => setIsOpen(null)}
            className='p-1 rounded-full hover:bg-foreground/10 transition-colors'
          >
            <X className='w-5 h-5 text-muted-foreground' />
          </button>
        </div>

        {/* بدنه مدال */}
        <div className='p-6 overflow-y-auto'>
          {/* Select شبیه‌سازی شده Shadcn */}
          <div className='flex mb-6 relative'>
            <div
              className='relative flex items-center justify-between w-full px-3 py-2 text-sm bg-popover border border-gray-300 rounded-md cursor-pointer hover:bg-popover/50 focus:outline-none focus:ring-2 focus:ring-blue-500'
              onClick={() => setIsSelectOpen(!isSelectOpen)}
            >
              <span>{selectedSemester}</span>
              <ChevronDown className='w-4 h-4 text-muted-foreground' />
            </div>

            {isSelectOpen && (
              <div className='absolute z-10 w-full mt-1 bg-popover border border-gray-200 rounded-md shadow-lg top-full max-h-60 overflow-auto'>
                {Object.keys(semestersData).map((semester) => (
                  <div
                    key={semester}
                    className={`px-3 py-2 text-sm cursor-pointer hover:bg-accent ${
                      selectedSemester === semester
                        ? 'bg-accent text-chart-1 font-medium'
                        : 'text-muted-foreground'
                    }`}
                    onClick={() => {
                      setSelectedSemester(semester);
                      setIsSelectOpen(false);
                    }}
                  >
                    {semester}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Table شبیه‌سازی شده Shadcn */}
          <div className='border rounded-md overflow-x-auto overflow-hidden min-w-150'>
            <table className='w-full text-sm text-right text-muted-foreground'>
              <thead className='text-xs text-foreground bg-accent border-b'>
                <tr>
                  <th className='px-4 py-3 font-medium'>ردیف</th>
                  <th className='px-4 py-3 font-medium'>نام درس</th>
                  <th className='px-4 py-3 font-medium'>واحد نظری</th>
                  <th className='px-4 py-3 font-medium'>واحد عملی</th>
                  <th className='px-4 py-3 font-medium'>پیشنیاز / همنیاز</th>
                  <th className='px-4 py-3 font-medium'>نوع درس</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-border'>
                {currentData.map((course) => (
                  <tr
                    key={course.id}
                    className='bg-card group hover:bg-card-foreground transition-colors'
                  >
                    <td className='px-4 py-3'>{course.id}</td>
                    <td className='px-4 py-3 font-medium text-foreground group-hover:text-background'>
                      {course.name}
                    </td>
                    <td className='px-4 py-3 text-muted-foreground group-hover:text-muted'>
                      {course.nazari > 0 ? course.nazari : '-'}
                    </td>
                    <td className='px-4 py-3 text-muted-foreground group-hover:text-muted'>
                      {course.amali > 0 ? course.amali : '-'}
                    </td>
                    <td className='px-4 py-3 text-muted-foreground group-hover:text-muted'>
                      {course.prereq}
                    </td>
                    <td className='px-4 py-3 text-muted-foreground group-hover:text-muted'>
                      {course.type}
                    </td>
                  </tr>
                ))}

                {/* ردیف جمع */}
                <tr className='bg-accent font-bold text-foreground border-t-2 border-gray-300'>
                  <td colSpan={2} className='px-4 py-4 text-left'>
                    جمع واحدها:
                  </td>
                  <td className='px-4 py-4 text-chart-3'>{totalNazari}</td>
                  <td className='px-4 py-4 text-chart-3'>{totalAmali}</td>
                  <td colSpan={2} className='px-4 py-4 text-foreground'>
                    مجموع کل: {totalNazari + totalAmali} واحد
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
