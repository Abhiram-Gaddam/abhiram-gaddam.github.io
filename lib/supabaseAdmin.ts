import { createClient } from "@supabase/supabase-js";

/**
 * Server-only. NEVER import this file from a Client Component or anything
 * that ships to the browser — the service role key bypasses Row Level
 * Security entirely and can write/read anything in the project.
 */
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error("Missing Supabase server env vars (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)");
  }
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}