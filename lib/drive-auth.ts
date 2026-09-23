import crypto from "crypto";

// Simple HMAC-signed token, same idea as your admin panel's session cookies.
// Token shape: "<expiryTimestamp>.<hmacSignature>"

const SECRET = process.env.DRIVE_AUTH_SECRET!; // set this in .env.local
const COOKIE_NAME = "drive_auth";
const SESSION_HOURS = 1;

function sign(payload: string): string {
  return crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
}

export function createDriveToken(): string {
  const expiry = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
  const payload = String(expiry);
  const sig = sign(payload);
  return `${payload}.${sig}`;
}

export function verifyDriveToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;

  const expected = sign(payload);
  const validSig =
    sig.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));

  if (!validSig) return false;

  const expiry = Number(payload);
  return Number.isFinite(expiry) && Date.now() < expiry;
}

export const DRIVE_COOKIE_NAME = COOKIE_NAME;
export const DRIVE_SESSION_HOURS = SESSION_HOURS;