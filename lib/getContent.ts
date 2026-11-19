import { getSupabasePublic } from "@/lib/supabasePublic";
import { Content, defaultContent } from "@/lib/content";
import { parseContent } from "@/lib/parseContent";
import { connection } from "next/server";

/**
 * Single source of truth for "read the live content, falling back to code
 * defaults if the database is empty or unreachable." Used by both the
 * /api/content GET route and the root layout's server-side render, so the
 * fallback behavior can't drift between the two call sites.
 */
export async function getContent(): Promise<Content> {
  await connection();
  try {
    const supabase = getSupabasePublic();
    const { data, error } = await supabase
      .from("portfolio_content")
      .select("data")
      .eq("id", 1)
      .single();

    if (error) {
      return defaultContent;
    }
    return parseContent(data?.data, defaultContent.personal.journey) ?? defaultContent;
  } catch (e) {
    console.error("getContent() failed, serving defaults:", e);
    return defaultContent;
  }
}
