
import Link from 'next/link';

export default function Page() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section className="card">
        <h2 className="text-lg font-semibold mb-2">What is this?</h2>
        <p className="text-neutral-300">
          A clean, deployable problem bank. Create problems, categorize them, let users solve,
          and track correctness. Auth by Supabase; admin via allowlist.
        </p>
        <div className="mt-4 flex gap-2">
          <Link href="/problems" className="btn">Browse Problems</Link>
          <Link href="/admin/problems/new" className="btn">Add a Problem</Link>
        </div>
      </section>
      <section className="card">
        <h2 className="text-lg font-semibold mb-2">Quick Start</h2>
        <ol className="list-decimal ml-6 space-y-1 text-neutral-300">
          <li>Create a Supabase project</li>
          <li>Run the SQL from <code>supabase/schema.sql</code></li>
          <li>Set env vars (<code>NEXT_PUBLIC_SUPABASE_URL</code>, <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, <code>SUPABASE_SERVICE_ROLE_KEY</code>, <code>ADMIN_EMAILS</code>)</li>
          <li>Deploy on Vercel</li>
        </ol>
      </section>
    </div>
  );
}
