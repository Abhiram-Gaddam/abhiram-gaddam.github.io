import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createDriveToken, DRIVE_COOKIE_NAME, DRIVE_SESSION_HOURS } from "@/lib/drive-auth";
import { checkLoginRateLimit } from "@/lib/loginRateLimit";

export async function POST(req: NextRequest) {
  const limited = await checkLoginRateLimit("drive");
  if (limited) return limited;

  const body = await req.json().catch(() => null);
  const password = body?.password;
  const correct = process.env.DRIVE_PASSWORD;
  if (!correct || !process.env.DRIVE_AUTH_SECRET) {
    return NextResponse.json({ error: "Sign-in is temporarily unavailable." }, { status: 503 });
  }
  if (typeof password !== "string") {
    return NextResponse.json({ error: "Password is required." }, { status: 400 });
  }

  const a = Buffer.from(password);
  const b = Buffer.from(correct);
  const match = a.length === b.length && crypto.timingSafeEqual(a, b);

  if (!match) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(DRIVE_COOKIE_NAME, createDriveToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: DRIVE_SESSION_HOURS * 60 * 60,
  });
  return res;
}
