
'use client';
import { createClient } from '@supabase/supabase-js';

// Simple browser client using anon key
export function supabaseBrowser() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
