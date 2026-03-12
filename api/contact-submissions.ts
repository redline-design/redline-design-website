import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";
import crypto from "crypto";

const DATABASE_URL = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;
const SECRET = process.env.ADMIN_PASSWORD || "fallback-secret";

function verifyToken(token: string): boolean {
  try {
    const [timestamp, signature] = token.split(".");
    if (!timestamp || !signature) return false;
    const hmac = crypto.createHmac("sha256", SECRET);
    hmac.update("admin:" + timestamp);
    const expectedSignature = hmac.digest("hex");
    if (signature !== expectedSignature) return false;
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
  // Verify authentication
  const cookieHeader = req.headers.cookie || "";
  const cookies = parseCookies(cookieHeader);
  const token = cookies.admin_token;

  if (!token || !verifyToken(token)) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  if (!DATABASE_URL) {
    return res.status(500).json({ error: "Database not configured" });
  }

  const sql = neon(DATABASE_URL);

  if (req.method === "GET") {
    try {
      const submissions = await sql`SELECT * FROM contact_submissions ORDER BY created_at DESC`;
      return res.status(200).json(submissions);
    } catch (error: any) {
      console.error("Error fetching contact submissions:", error);
      return res.status(500).json({ error: "Failed to fetch submissions" });
    }
  }

  if (req.method === "DELETE") {
    // Extract ID from URL path: /api/contact-submissions/[id]
    const url = new URL(req.url || "", `http://${req.headers.host}`);
    const pathParts = url.pathname.split("/");
    const id = pathParts[pathParts.length - 1];

    if (!id || id === "contact-submissions") {
      return res.status(400).json({ error: "Missing submission ID" });
    }

    try {
      await sql`DELETE FROM contact_submissions WHERE id = ${id}`;
      return res.status(200).json({ success: true });
    } catch (error: any) {
      console.error("Error deleting submission:", error);
      return res.status(500).json({ error: "Failed to delete submission" });
    }
  }

  if (req.method === "PATCH") {
    const url = new URL(req.url || "", `http://${req.headers.host}`);
    const pathParts = url.pathname.split("/");
    const id = pathParts[pathParts.length - 2] || pathParts[pathParts.length - 1];
    const { status } = req.body || {};

    if (!status) {
      return res.status(400).json({ error: "Missing status" });
    }

    try {
      const result = await sql`UPDATE contact_submissions SET status = ${status} WHERE id = ${id} RETURNING *`;
      return res.status(200).json(result[0]);
    } catch (error: any) {
      console.error("Error updating submission:", error);
      return res.status(500).json({ error: "Failed to update submission" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
