import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "برنامه‌ریز انتخاب واحد دانشگاه قم",
  description: "نمونه اولیه برنامه‌ریزی دروس دانشگاه قم"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
