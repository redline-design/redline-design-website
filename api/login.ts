import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SECRET = process.env.ADMIN_PASSWORD || "fallback-secret";

function signToken(data: string): string {
  const hmac = crypto.createHmac("sha256", SECRET);
  hmac.update(data);
  return hmac.digest("hex");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!ADMIN_PASSWORD) {
    return res.status(500).json({ error: "Admin password not configured" });
  }

  try {
    const { password } = req.body;

    if (!password || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const timestamp = Date.now().toString();
    const signature = signToken("admin:" + timestamp);
    const token = timestamp + "." + signature;

    res.setHeader("Set-Cookie", `admin_token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400; Secure`);

    return res.status(200).json({ user: { id: 1, username: "admin" } });
  } catch (error: any) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Login failed" });
  }
}
