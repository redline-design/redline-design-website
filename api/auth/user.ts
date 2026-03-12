import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";

const SECRET = process.env.ADMIN_PASSWORD || "fallback-secret";

function verifyToken(token: string): boolean {
  try {
    const [timestamp, signature] = token.split(".");
    if (!timestamp || !signature) return false;

    const hmac = crypto.createHmac("sha256", SECRET);
    hmac.update("admin:" + timestamp);
    const expectedSignature = hmac.digest("hex");

    if (signature !== expectedSignature) return false;

    // Check if token is less than 24 hours old
    const tokenAge = Date.now() - parseInt(timestamp);
    if (tokenAge > 86400000) return false;

    return true;
  } catch {
    return false;
  }
}

function parseCookies(cookieHeader: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  cookieHeader.split(";").forEach((cookie) => {
    const [name, ...rest] = cookie.trim().split("=");
    if (name) cookies[name] = rest.join("=");
  });
  return cookies;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const cookieHeader = req.headers.cookie || "";
  const cookies = parseCookies(cookieHeader);
  const token = cookies.admin_token;

  if (!token || !verifyToken(token)) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  return res.status(200).json({ id: 1, username: "admin" });
}
