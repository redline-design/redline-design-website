import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";

const DATABASE_URL = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!DATABASE_URL) {
    return res.status(500).json({ error: "Database not configured" });
  }
  try {
    const sql = neon(DATABASE_URL);
    const posts = await sql`SELECT * FROM blog_posts WHERE published = true ORDER BY published_at DESC NULLS LAST, created_at DESC`;
    return res.status(200).json(posts);
  } catch (error: any) {
    console.error("Error fetching blog posts:", error);
    return res.status(500).json({ error: "Failed to fetch blog posts" });
  }
}
