
'use client';
import { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/browser';

export default function QuizPage() {
  const sb = supabaseBrowser();
  const [problems, setProblems] = useState<any[]>([]);
  const [idx, setIdx] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // fetch 10 random
    (async () => {
      const { data } = await sb.from('problems').select('*').limit(50);
      const shuffled = (data || []).sort(()=>Math.random()-0.5).slice(0, 10);
      setProblems(shuffled);
    })();
  }, []);

  if (!problems.length) return <div className="card">Loading...</div>;
  const problem = problems[idx];

  function submit() {
    if (choice === null) return;
    const correct = choice === problem.answer;
    setScore(s => s + (correct ? 1 : 0));
    setChoice(null);
    if (idx + 1 >= problems.length) setDone(true);
    else setIdx(i => i + 1);
  }

  if (done) return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-2">Quiz Finished</h2>
      <p>Your score: {score} / {problems.length}</p>
    </div>
  );

  return (
    <div className="card">
      <h2 className="text-lg font-semibold">{problem.title}</h2>
      <p className="mt-3 whitespace-pre-wrap">{problem.question}</p>
      <div className="mt-3 grid gap-2">
        {problem.options.map((opt: string, i: number) => (
          <label key={i} className={`flex items-start gap-2 p-3 rounded-xl border ${choice===i? 'border-neutral-400' : 'border-neutral-700'} cursor-pointer`}>
            <input type="radio" className="mt-1" name="opt" onChange={() => setChoice(i)} />
            <span className="whitespace-pre-wrap">{opt}</span>
          </label>
        ))}
      </div>
      <div className="mt-4">
        <button className="btn" onClick={submit} disabled={choice===null}>Submit</button>
      </div>
    </div>
  );
}
