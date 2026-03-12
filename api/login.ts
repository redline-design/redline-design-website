import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SECRET = process.env.ADMIN_PASSWORD || "fallback-secret";

function signToken(data: string): string {
  const hmac = crypto.createHmac("sha256", SECRET);
  hmac.update(data);
  return hmac.digest("hex");
}

const LOGIN_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - Redline Design</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: system-ui, sans-serif; background: #0a0a0a; color: #fff; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
        .container { background: #1a1a1a; padding: 2rem; border-radius: 12px; width: 100%; max-width: 400px; border: 1px solid #333; }
        h1 { font-size: 1.5rem; margin-bottom: 0.5rem; color: #ef4444; }
        p { color: #888; margin-bottom: 1.5rem; font-size: 0.9rem; }
        label { display: block; margin-bottom: 0.5rem; font-size: 0.875rem; color: #ccc; }
        input { width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid #333; background: #0a0a0a; color: #fff; font-size: 1rem; outline: none; }
        input:focus { border-color: #ef4444; }
        button { width: 100%; padding: 0.75rem; border-radius: 8px; border: none; background: #ef4444; color: #fff; font-size: 1rem; cursor: pointer; margin-top: 1rem; font-weight: 600; }
        button:hover { background: #dc2626; }
        .error { color: #ef4444; font-size: 0.875rem; margin-top: 0.5rem; display: none; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Admin Login</h1>
        <p>Enter your password to access the admin panel.</p>
        <form id="loginForm">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter admin password" required autofocus />
            <div class="error" id="error">Invalid password. Please try again.</div>
            <button type="submit">Sign In</button>
        </form>
    </div>
    <script>
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const password = document.getElementById('password').value;
            const errorEl = document.getElementById('error');
            errorEl.style.display = 'none';
            try {
                const res = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password }),
                    credentials: 'include'
                });
                if (res.ok) {
                    window.location.href = '/admin';
                } else {
                    errorEl.style.display = 'block';
                }
            } catch (err) {
                errorEl.style.display = 'block';
            }
        });
    </script>
</body>
</html>`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    res.setHeader("Content-Type", "text/html");
    return res.status(200).send(LOGIN_HTML);
  }

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

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Login failed" });
  }
}
