import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSupabasePublic } from "@/lib/supabasePublic";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { verifySessionToken } from "@/lib/adminSession";
import { defaultContent } from "@/lib/content";

export async function GET() {
  try {
    const supabase = getSupabasePublic();
    const { data, error } = await supabase
      .from("portfolio_content")
      .select("data")
      .eq("id", 1)
      .single();

    // If the table/row isn't set up yet, or the row is still the empty
    // seed ('{}'), fall back to the code defaults so the site never
    // shows a broken/empty page.
    if (error || !data?.data || Object.keys(data.data).length === 0) {
      return NextResponse.json(defaultContent);
    }
    return NextResponse.json(data.data);
  } catch (e) {
    console.error("GET /api/content failed, serving defaults:", e);
    return NextResponse.json(defaultContent);
  }
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;

  if (!verifySessionToken(session)) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from("portfolio_content")
      .upsert({ id: 1, data: body, updated_at: new Date().toISOString() });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}