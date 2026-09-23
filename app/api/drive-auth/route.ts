import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createDriveToken, DRIVE_COOKIE_NAME, DRIVE_SESSION_HOURS } from "@/lib/drive-auth";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const correct = process.env.DRIVE_PASSWORD!;

  const a = Buffer.from(String(password ?? ""));
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