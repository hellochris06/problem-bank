
'use client';
import { useState } from 'react';

export default function AdminLoginPage() {
  const [secret, setSecret] = useState('');

  function submit(e: any) {
    e.preventDefault();
    if (!secret) return alert('Enter secret');
    document.cookie = `admin=${secret}; path=/; max-age=${60*60*24*30}`; // 30 days
    window.location.href = '/admin/problems/new';
  }

  return (
    <div className="card max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-2">Admin Login</h2>
      <p className="text-neutral-300 mb-3">Set the admin cookie to access editor pages.</p>
      <form onSubmit={submit} className="grid gap-2">
        <input className="input" type="password" placeholder="ADMIN_SECRET" value={secret} onChange={e=>setSecret(e.target.value)} />
        <button className="btn">Sign in</button>
      </form>
    </div>
  );
}
