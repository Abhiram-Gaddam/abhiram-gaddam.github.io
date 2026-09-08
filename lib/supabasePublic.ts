import { createClient } from "@supabase/supabase-js";

/**
 * Safe to use anywhere — this uses the public anon key, which Row Level
 * Security only permits to SELECT, never write.
 */
export function getSupabasePublic() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error("Missing Supabase public env vars (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)");
  }
  return createClient(url, anonKey, { auth: { persistSession: false } });
}