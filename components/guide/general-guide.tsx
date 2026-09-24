import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

type GeneralCourseTable = {
  id: number;
  subject: string;
  name: string;
  units: number;
  desc: string;
};

// داده‌های استخراج شده از تصویر عناوین دروس عمومی
const generalCoursesData = {
  'دروس پیش نیاز': [
    {
      id: 1,
      subject: 'دروس پیش نیاز',
      name: 'علوم و معارف دفاع مقدس و مقاومت',
      units: 2,
      desc: 'یکبار در طول کل دوره تحصیل برای دانشجویان کارشناسی، کارشناسی ارشد و دکتری',
    },
    {
      id: 2,
      subject: 'دروس پیش نیاز',
      name: 'آمادگی در برابر حوادث و سوانح',
      units: 1,
      desc: 'خودخوان و امتحان از طریق آموزشهای آزاد دانشگاه. یکبار در طول کل دوره...',
    },
  ],
  'دروس عمومی الزامی': [
    {
      id: 1,
      subject: 'مبانی نظری اسلام',
      name: 'اندیشه اسلامی ۱ (مبدأ و معاد)',
      units: 2,
      desc: 'الزامی برای کلیه دانشجویان',
    },
    {
      id: 2,
      subject: 'مبانی نظری اسلام',
      name: 'اندیشه اسلامی ۲ (نبوت و امامت)',
      units: 2,
      desc: 'از بین این دو درس یک درس انتخاب شود',
    },
    {
      id: 3,
      subject: 'مبانی نظری اسلام',
      name: 'انسان در اسلام',
      units: 2,
      desc: 'از بین این دو درس یک درس انتخاب شود',
    },
    {
      id: 4,
      subject: 'اخلاق اسلامی',
      name: 'اخلاق اسلامی (مبانی و مفاهیم)',
      units: 2,
      desc: 'از بین این دو درس یک درس انتخاب شود',
    },
    {
      id: 5,
      subject: 'اخلاق اسلامی',
      name: 'آیین زندگی (اخلاق کاربردی)',
      units: 2,
      desc: 'از بین این دو درس یک درس انتخاب شود',
    },
    {
      id: 6,
      subject: 'آشنایی با منابع اسلامی',
      name: 'تفسیر موضوعی قرآن',
      units: 2,
      desc: 'از بین این دو درس یک درس انتخاب شود',
    },
    {
      id: 7,
      subject: 'آشنایی با منابع اسلامی',
      name: 'تفسیر موضوعی نهج البلاغه',
      units: 2,
      desc: 'از بین این دو درس یک درس انتخاب شود',
    },
    {
      id: 8,
      subject: 'تاریخ و تمدن اسلامی',
      name: 'تاریخ فرهنگ و تمدن اسلام و ایران',
      units: 2,
      desc: 'از بین این دو درس یک درس انتخاب شود',
    },
    {
      id: 9,
      subject: 'تاریخ و تمدن اسلامی',
      name: 'تاریخ امامت',
      units: 2,
      desc: 'از بین این دو درس یک درس انتخاب شود',
    },
    {
      id: 10,
      subject: 'انقلاب اسلامی',
      name: 'انقلاب اسلامی ایران',
      units: 2,
      desc: 'الزامی برای کلیه دانشجویان',
    },
    {
      id: 11,
      subject: '-',
      name: 'دانش خانواده و جمعیت',
      units: 2,
      desc: 'الزامی برای کلیه دانشجویان',
    },
    {
      id: 12,
      subject: '-',
      name: 'زبان فارسی',
      units: 3,
      desc: 'الزامی برای کلیه دانشجویان',
    },
    {
      id: 13,
      subject: '-',
      name: 'زبان انگلیسی',
      units: 3,
      desc: 'الزامی برای کلیه دانشجویان',
    },
    {
      id: 14,
      subject: '-',
      name: 'تربیت بدنی',
      units: 1,
      desc: 'الزامی برای کلیه دانشجویان',
    },
    {
      id: 15,
      subject: '-',
      name: 'ورزش',
      units: 1,
      desc: 'الزامی برای کلیه دانشجویان',
    },
  ],
  'دروس عمومی اختیاری': [
    {
      id: 1,
      subject: '-',
      name: 'شناخت محیط زیست',
      units: 2,
      desc: 'از بین این ۴ درس ۲ درس انتخاب شود',
    },
    {
      id: 2,
      subject: '-',
      name: 'کارآفرینی',
      units: 2,
      desc: 'از بین این ۴ درس ۲ درس انتخاب شود',
    },
    {
      id: 3,
      subject: '-',
      name: 'مهارت های زندگی دانشجویی',
      units: 2,
      desc: 'از بین این ۴ درس ۲ درس انتخاب شود',
    },
    {
      id: 4,
      subject: '-',
      name: 'هوش مصنوعی و تحول دیجیتال',
      units: 2,
      desc: 'از بین این ۴ درس ۲ درس انتخاب شود',
    },
  ],
};

export default function GeneralGuide({
  isOpen = null,
  setIsOpen,
}: {
  isOpen: 'general' | 'special' | null;
  setIsOpen: React.Dispatch<React.SetStateAction<'general' | 'special' | null>>;
}) {
  const [selectedCategory, setSelectedCategory] = useState('دروس عمومی الزامی');
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  // تغییر شرط برای مطابقت با مدال دوم
  if (isOpen !== 'general') return null;

  const currentData: GeneralCourseTable[] =
    // @ts-expect-error
    generalCoursesData[selectedCategory];

  // محاسبه سقف واحدهای انتخابی به جای جمع کل ردیف‌ها (چون برخی دروس انتخابی بین دو گزینه هستند)
  let displayedTotal = 0;
  if (selectedCategory === 'دروس عمومی الزامی') displayedTotal = 22;
  else if (selectedCategory === 'دروس پیش نیاز') displayedTotal = 3;
  else if (selectedCategory === 'دروس عمومی اختیاری') displayedTotal = 4;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 backdrop-blur-sm'
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setIsOpen(null);
      }}
      dir='rtl'
    >
      {/* مدال */}
      <div className='relative w-full max-w-5xl bg-card rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]'>
        {/* هدر مدال */}
        <div className='flex items-center justify-between p-6 border-b border-border'>
          <h2 className='text-xl font-semibold text-chart-3'>
            عناوین دروس عمومی - الزامی از ورودی ۱۴۰۳ به بعد
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
          {/* Select */}
          <div className='flex mb-6 relative w-72'>
            <div
              className='relative flex items-center justify-between w-full px-3 py-2 text-sm bg-popover border border-input rounded-md cursor-pointer hover:bg-popover/50 focus:outline-none focus:ring-2 focus:ring-ring'
              onClick={() => setIsSelectOpen(!isSelectOpen)}
            >
              <span className='text-foreground'>{selectedCategory}</span>
              <ChevronDown className='w-4 h-4 text-muted-foreground' />
            </div>
            {isSelectOpen && (
              <div className='absolute z-10 w-full mt-1 bg-popover border border-border rounded-md shadow-lg top-full max-h-60 overflow-auto'>
                {Object.keys(generalCoursesData).map((category) => (
                  <div
                    key={category}
                    className={`px-3 py-2 text-sm cursor-pointer hover:bg-accent ${
                      selectedCategory === category
                        ? 'bg-accent text-chart-1 font-medium'
                        : 'text-muted-foreground'
                    }`}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsSelectOpen(false);
                    }}
                  >
                    {category}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Table */}
          <div className='border border-border rounded-md overflow-auto min-w-150'>
            <table className='w-full text-sm text-right text-muted-foreground'>
              <thead className='text-xs text-foreground bg-accent border-b border-border'>
                <tr>
                  <th className='px-4 py-3 font-medium'>ردیف</th>
                  <th className='px-4 py-3 font-medium'>موضوع</th>
                  <th className='px-4 py-3 font-medium'>عنوان درس</th>
                  <th className='px-4 py-3 font-medium'>تعداد واحد</th>
                  <th className='px-4 py-3 font-medium'>توضیحات</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-border'>
                {currentData.map((course) => (
                  <tr
                    key={course.id}
                    className='bg-card group hover:bg-card-foreground/5 transition-colors'
                  >
                    <td className='px-4 py-3'>{course.id}</td>
                    <td className='px-4 py-3 text-muted-foreground group-hover:text-foreground'>
                      {course.subject}
                    </td>
                    <td className='px-4 py-3 font-medium text-foreground'>
                      {course.name}
                    </td>
                    <td className='px-4 py-3 text-muted-foreground group-hover:text-foreground font-semibold'>
                      {course.units}
                    </td>
                    <td className='px-4 py-3 text-muted-foreground text-xs leading-relaxed group-hover:text-foreground max-w-xs'>
                      {course.desc}
                    </td>
                  </tr>
                ))}

                {/* ردیف جمع */}
                <tr className='bg-accent font-bold text-foreground border-t-2 border-border'>
                  <td colSpan={3} className='px-4 py-4 text-left'>
                    جمع کل واحدهای الزامی در این بخش:
                  </td>
                  <td className='px-4 py-4 text-chart-3 text-lg'>
                    {displayedTotal}
                  </td>
                  <td className='px-4 py-4 text-muted-foreground text-xs font-normal'>
                    {selectedCategory === 'دروس عمومی الزامی'
                      ? 'برخی دروس ۲ واحدی به صورت انتخابی (یکی از دو درس) می‌باشند.'
                      : ''}
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
