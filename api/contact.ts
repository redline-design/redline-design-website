import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";

const DATABASE_URL = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!DATABASE_URL) {
    return res.status(500).json({ error: "Database not configured" });
  }
  try {
    const { name, email, phone, company, servicesInterested, message, smsConsent } = req.body;
    if (!name || !email || !phone || !servicesInterested || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const sql = neon(DATABASE_URL);
    const result = await sql`INSERT INTO contact_submissions (id, name, email, phone, services_interested, message, sms_consent, status, created_at) VALUES (gen_random_uuid(), ${name}, ${email}, ${phone}, ${servicesInterested}, ${message}, ${smsConsent || false}, 'new', NOW()) RETURNING *`;
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "Redline Design <noreply@redline.design>",
          to: "redline@redline.design",
          subject: "New Contact Form Submission from " + name,
          html: "<h2>New Contact</h2><p>Name: " + name + "</p><p>Email: " + email + "</p><p>Phone: " + phone + "</p><p>Services: " + servicesInterested + "</p><p>Message: " + message + "</p>"
        });
      } catch (e) { console.error("Email failed:", e); }
    }
    return res.status(201).json({ success: true, submission: result[0] });
  } catch (error: any) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Failed to submit" });
  }
}
