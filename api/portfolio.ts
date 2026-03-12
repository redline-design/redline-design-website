import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";

const DATABASE_URL = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;

function snakeToCamel(obj: any): any {
  if (Array.isArray(obj)) return obj.map(snakeToCamel);
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc: any, key: string) => {
      const camelKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
      acc[camelKey] = obj[key];
      return acc;
    }, {});
  }
  return obj;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!DATABASE_URL) {
    return res.status(500).json({ error: "Database not configured" });
  }
  try {
    const sql = neon(DATABASE_URL);
    const items = await sql`SELECT * FROM portfolio_items ORDER BY display_order ASC, created_at DESC`;
    return res.status(200).json(snakeToCamel(items));
  } catch (error: any) {
    console.error("Error fetching portfolio:", error);
    return res.status(500).json({ error: "Failed to fetch portfolio" });
  }
}
