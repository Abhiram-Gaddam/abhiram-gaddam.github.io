import crypto from "crypto";

const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("Missing ADMIN_SESSION_SECRET env var");
  return secret;
}

/** Creates a signed token: base64(expiry.hmac(expiry)). Verifying just
 * recomputes the HMAC — no database lookup, no session storage. */
export function createSessionToken(): string {
  const expiry = Date.now() + MAX_AGE_MS;
  const sig = crypto.createHmac("sha256", getSecret()).update(String(expiry)).digest("hex");
  return Buffer.from(`${expiry}.${sig}`).toString("base64url");
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const [expiryStr, sig] = decoded.split(".");
    const expiry = Number(expiryStr);
    if (!expiry || Number.isNaN(expiry) || Date.now() > expiry) return false;

    const expectedSig = crypto.createHmac("sha256", getSecret()).update(expiryStr).digest("hex");
    const a = Buffer.from(sig ?? "");
    const b = Buffer.from(expectedSig);
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}