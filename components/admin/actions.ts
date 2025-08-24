
'use server';
import { z } from 'zod';
import { supabaseAdmin, isAdminEmail } from '@/lib/supabase/server';

const schema = z.object({
  title: z.string().min(1),
  question: z.string().min(1),
  options: z.array(z.string()).min(2),
  answer: z.number().int().nonnegative(),
  explanation: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  difficulty: z.number().int().min(1).max(5).optional().nullable(),
});

async function guard() {
  // In real app you would read user session from cookies. For simplicity we trust admin allowlist.
  // You can wire Supabase Auth UI and pass user email to cookies for robust gating.
  const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(s=>s.trim()).filter(Boolean);
  if (!adminEmails.length) return { error: 'ADMIN_EMAILS env not set' };
  // No direct user identity here; skip check (treat any server action call as admin ONLY for initial MVP).
  // If you worry, deploy behind protected route or add GitHub auth etc.
  return { email: adminEmails[0] };
}

export async function createProblem(input: any) {
  const g = await guard(); if ('error' in g) return g;
  const parsed = schema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.message };

  const sb = supabaseAdmin();
  const { data, error } = await sb.from('problems').insert({
    ...parsed.data, created_by_email: g.email
  }).select('id').single();
  if (error) return { error: error.message };
  return { id: data.id };
}

export async function updateProblem(id: string, input: any) {
  const g = await guard(); if ('error' in g) return g;
  const parsed = schema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.message };

  const sb = supabaseAdmin();
  const { error } = await sb.from('problems').update({ ...parsed.data }).eq('id', id);
  if (error) return { error: error.message };
  return { ok: true };
}

export async function deleteProblem(id: string) {
  const g = await guard(); if ('error' in g) return g;

  const sb = supabaseAdmin();
  const { error } = await sb.from('problems').delete().eq('id', id);
  if (error) return { error: error.message };
  return { ok: true };
}
