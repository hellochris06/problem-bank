
'use client';
import { useState } from 'react';
import { createProblem } from './actions';

export default function NewProblemForm() {
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['','','','']);
  const [answer, setAnswer] = useState(0);
  const [explanation, setExplanation] = useState('');
  const [category, setCategory] = useState('Other');
  const [difficulty, setDifficulty] = useState(3);

  async function submit(e: any) {
    e.preventDefault();
    const res = await createProblem({ title, question, options, answer, explanation, category, difficulty });
    if (res?.error) alert(res.error);
    else window.location.href = `/problems/${res.id}`;
  }

  return (
    <form className="grid gap-3" onSubmit={submit}>
      <h2 className="text-lg font-semibold">Create Problem</h2>
      <input className="input" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
      <textarea className="input min-h-40" placeholder="Question" value={question} onChange={e=>setQuestion(e.target.value)} required />
      <div className="grid gap-2">
        {options.map((o, i) => (
          <input key={i} className="input" placeholder={`Option ${i+1}`} value={o} onChange={e=>setOptions(prev=>prev.map((p,idx)=>idx===i?e.target.value:p))} required />
        ))}
      </div>
      <div className="grid gap-2 md:grid-cols-3">
        <label className="flex items-center gap-2">Answer index(0~3): <input className="input" type="number" min={0} max={3} value={answer} onChange={e=>setAnswer(Number(e.target.value))} /></label>
        <select className="select" value={category} onChange={e=>setCategory(e.target.value)}>
          <option>Math</option><option>Korean</option><option>Science</option><option>Ethics</option><option>Health</option><option>Other</option>
        </select>
        <label className="flex items-center gap-2">Difficulty: <input className="input" type="number" min={1} max={5} value={difficulty} onChange={e=>setDifficulty(Number(e.target.value))} /></label>
      </div>
      <textarea className="input min-h-24" placeholder="Explanation (optional)" value={explanation} onChange={e=>setExplanation(e.target.value)} />
      <button className="btn">Save</button>
    </form>
  );
}
