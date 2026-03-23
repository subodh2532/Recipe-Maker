import type { Metadata } from 'next';
import './globals.css';

import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Recipe Maker',
  description: 'A modern recipe-sharing MVP built with Next.js, Tailwind, shadcn-style UI, and Supabase.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
