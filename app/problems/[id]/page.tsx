
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { supabaseBrowser } from '@/lib/supabase/browser';

type Problem = {
  id: string;
  title: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string | null;
  category: string | null;
  difficulty: number | null;
};

export default function ProblemPage() {
  const params = useParams();
  const id = params?.id as string;
  const [problem, setProblem] = useState<Problem | null>(null);
  const [choice, setChoice] = useState<number | null>(null);
  const [result, setResult] = useState<null | boolean>(null);
  const supabase = supabaseBrowser();

  useEffect(() => {
    supabase.from('problems').select('*').eq('id', id).single().then(({ data, error }) => {
      if (error) console.error(error);
      setProblem(data as any);
    });
  }, [id]);

  async function submit() {
    if (!problem || choice === null) return;
    const correct = choice === problem.answer;
    setResult(correct);
    // store solution
    await supabase.from('solutions').insert({ problem_id: problem.id, selected: choice, correct });
  }

  if (!problem) return <div className="card">Loading...</div>;

  return (
    <div className="grid gap-4">
      <div className="card">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold">{problem.title}</h1>
            <div className="text-sm text-neutral-400">{problem.category ?? 'Uncategorized'} • ★ {problem.difficulty ?? '—'}</div>
          </div>
          <Link href={`/admin/problems/${problem.id}`} className="btn">Edit</Link>
        </div>
        <p className="mt-4 whitespace-pre-wrap">{problem.question}</p>
        <div className="mt-4 grid gap-2">
          {problem.options?.map((opt, idx) => (
            <label key={idx} className={`flex items-start gap-2 p-3 rounded-xl border ${choice===idx? 'border-neutral-400' : 'border-neutral-700'} cursor-pointer`}>
              <input type="radio" className="mt-1" name="opt" onChange={() => setChoice(idx)} />
              <span className="whitespace-pre-wrap">{opt}</span>
            </label>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <button className="btn" onClick={submit} disabled={choice===null}>Submit</button>
          <Link className="btn" href="/problems">Back</Link>
        </div>
      </div>

      {result !== null && (
        <div className="card">
          <div className={`text-lg font-semibold ${result ? 'text-emerald-400' : 'text-red-400'}`}>
            {result ? 'Correct ✅' : 'Incorrect ❌'}
          </div>
          {problem.explanation && (
            <div className="mt-2 whitespace-pre-wrap text-neutral-200">
              {problem.explanation}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
