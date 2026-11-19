import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "./supabaseAdmin";

export async function checkLoginRateLimit(scope: "admin" | "drive") {
  try {
    const { data, error } = await getSupabaseAdmin().rpc("consume_portfolio_login_attempt", {
      login_scope: scope,
    });
    if (error) throw error;
    if (data === 0) return null;
    if (typeof data !== "number" || data < 1) throw new Error("Invalid login limit response");

    return NextResponse.json(
      { error: "Too many login attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(data) } },
    );
  } catch (error) {
    console.error("Login rate limiter unavailable", error);
    return NextResponse.json({ error: "Sign-in is temporarily unavailable." }, { status: 503 });
  }
}
