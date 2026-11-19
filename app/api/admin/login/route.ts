import { NextRequest, NextResponse } from "next/server";
import { createSessionToken } from "@/lib/adminSession";
import { checkLoginRateLimit } from "@/lib/loginRateLimit";

export async function POST(req: NextRequest) {
  const limited = await checkLoginRateLimit("admin");
  if (limited) return limited;

  const body = await req.json().catch(() => null);
  const password = body?.password;

  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json({ error: "Sign-in is temporarily unavailable." }, { status: 503 });
  }
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const token = createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return res;
}
