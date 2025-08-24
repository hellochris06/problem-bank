
import Link from 'next/link';
import { supabaseServer } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function ProblemsPage({ searchParams }: { searchParams: { q?: string; category?: string; diff?: string } }) {
  const supabase = supabaseServer();
  const q = searchParams.q ?? '';
  const category = searchParams.category ?? '';
  const diff = searchParams.diff ?? '';

  let query = supabase.from('problems').select('id,title,category,difficulty,created_at').order('created_at', { ascending: false });

  if (q) query = query.ilike('title', `%${q}%`);
  if (category) query = query.eq('category', category);
  if (diff) query = query.eq('difficulty', Number(diff));

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  return (
    <div className="grid gap-4">
      <form className="card grid gap-3 md:grid-cols-4">
        <input className="input" name="q" placeholder="Search title..." defaultValue={q} />
        <select className="select" name="category" defaultValue={category}>
          <option value="">All Categories</option>
          <option>Math</option>
          <option>Korean</option>
          <option>Science</option>
          <option>Ethics</option>
          <option>Health</option>
          <option>Other</option>
        </select>
        <select className="select" name="diff" defaultValue={diff}>
          <option value="">Any Difficulty</option>
          {[1,2,3,4,5].map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <button className="btn">Filter</button>
      </form>

      {data.length === 0 && <div className="card">No problems found.</div>}

      <div className="grid gap-3">
        {data.map((p: any) => (
          <Link key={p.id} href={`/problems/${p.id}`} className="card block">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{p.title}</h3>
              <div className="flex gap-2 text-xs">
                <span className="badge">{p.category ?? 'Uncategorized'}</span>
                <span className="badge">★ {p.difficulty ?? '—'}</span>
              </div>
            </div>
            <div className="text-neutral-400 text-sm">{new Date(p.created_at).toLocaleString()}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
