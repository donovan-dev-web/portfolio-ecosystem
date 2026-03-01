import type { Metadata } from 'next';
import localFonts from 'next/font/local';
import { JetBrains_Mono } from 'next/font/google';

import { MainLayout } from '@/frontend/layouts/MainLayout';

import './globals.css';
import '@/frontend/style/main.scss';

const satochiFonts = localFonts({
  src: [
    {
      path: '../frontend/style/Fonts/WEB/fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../frontend/style/Fonts/WEB/fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../frontend/style/Fonts/WEB/fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-satochi',
});

const jetBrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jet',
});

export const metadata: Metadata = {
  title: 'Portfolio Web',
  description: 'Portfolio ecosystem web application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${satochiFonts.variable} ${jetBrains.variable}`}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
