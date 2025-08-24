
import 'server-only';
import { createClient } from '@supabase/supabase-js';

export function supabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, anon, { auth: { persistSession: false } });
}

export function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY!; // server only
  return createClient(url, service, { auth: { persistSession: false } });
}

export function isAdminEmail(email?: string | null) {
  const allow = (process.env.ADMIN_EMAILS || "").split(",").map(s=>s.trim()).filter(Boolean);
  if (!email) return false;
  return allow.includes(email);
}
