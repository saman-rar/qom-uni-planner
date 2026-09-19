import { Download, GraduationCap, MoonIcon, Share2, Sun } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useTheme } from 'next-themes';

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className='mb-3 flex items-center justify-between rounded-3xl border border-border bg-card/80 px-4 py-3 shadow-sm backdrop-blur md:px-6'>
      <div className='flex items-center gap-3'>
        <div className='flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20'>
          <GraduationCap className='size-6' />
        </div>
        <div>
          <div className='flex items-center gap-2'>
            <h1 className='text-base font-extrabold md:text-lg'>
              برنامه‌ریز انتخاب واحد دانشگاه قم
            </h1>
            <Badge className='hidden md:inline-flex'>نسخه دمو</Badge>
          </div>
          <p className='mt-1 text-xs text-muted-foreground'>
            چیدمان آزمایشی نیمسال اول ۱۴۰۵–۱۴۰۶
          </p>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <Button
          variant='outline'
          size='icon'
          onClick={() =>
            setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
          }
          aria-label='تغییر پوسته'
        >
          {theme === 'dark' ? (
            <Sun className='size-4' />
          ) : (
            <MoonIcon className='size-4' />
          )}
        </Button>
        <Button variant='outline' className='hidden sm:inline-flex'>
          <Share2 className='size-4' /> اشتراک
        </Button>
        <Button variant='outline' className='hidden sm:inline-flex'>
          <Download className='size-4' /> خروجی
        </Button>
      </div>
    </header>
  );
};
export default Header;
