import { MoonIcon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import { cn } from 'cn';

const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant='outline'
      size='icon'
      onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
      aria-label='تغییر پوسته'
      className={cn(className)}
    >
      {theme === 'dark' ? (
        <Sun className='size-4' />
      ) : (
        <MoonIcon className='size-4' />
      )}
    </Button>
  );
};
export default ThemeToggle;
