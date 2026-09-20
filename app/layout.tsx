import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/lib/providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'برنامه‌ریز انتخاب واحد دانشگاه قم',
  description: 'نمونه اولیه برنامه‌ریزی دروس دانشگاه قم',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang='fa'
      dir='rtl'
      suppressHydrationWarning
      className={cn('font-sans', inter.variable)}
    >
      <body>
        <ThemeProvider attribute={'class'} defaultTheme='system' enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
