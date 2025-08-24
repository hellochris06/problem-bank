
import { supabaseServer } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const sb = supabaseServer();
  const { data: counts } = await sb.rpc('problem_counts_by_category').catch(()=>({ data: [] as any[] }));
  const { count } = await sb.from('problems').select('*', { count: 'exact', head: true });

  return (
    <div className="grid gap-4">
      <div className="card flex items-center justify-between">
        <div className="text-lg font-semibold">Problems</div>
        <div className="text-2xl">{count ?? 0}</div>
      </div>
      <div className="card">
        <h2 className="text-lg font-semibold mb-2">By Category</h2>
        <div className="grid gap-2">
          {(counts || []).map((row: any) => (
            <div key={row.category} className="flex justify-between">
              <span>{row.category ?? 'Uncategorized'}</span>
              <span className="badge">{row.count}</span>
            </div>
          ))}
          {!counts?.length && <div className="text-neutral-400 text-sm">Add some problems to see stats.</div>}
        </div>
      </div>
    </div>
  );
}
