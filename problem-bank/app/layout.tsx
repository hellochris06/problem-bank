
import './globals.css';
import Nav from '@/components/Nav';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Problem Bank',
  description: 'A minimal, production-ready problem bank with Next.js + Supabase',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main className="container pb-14">{children}</main>
      </body>
    </html>
  );
}
