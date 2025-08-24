
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/', label: 'Home' },
  { href: '/problems', label: 'Problems' },
  { href: '/quiz', label: 'Quiz' },
  { href: '/dashboard', label: 'Dashboard' },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="container my-6 flex items-center justify-between">
      <Link href="/" className="text-xl font-semibold">ProblemBank</Link>
      <div className="flex gap-2">
        {tabs.map(t => (
          <Link key={t.href} href={t.href}
            className={`btn ${pathname===t.href ? 'bg-neutral-800' : ''}`}>
            {t.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
