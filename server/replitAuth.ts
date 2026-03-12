import session from "express-session";
import type { Express, RequestHandler } from "express";
import connectPg from "connect-pg-simple";

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions",
  });
  return session({
    secret: process.env.SESSION_SECRET!,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: sessionTtl,
    },
  });
}

const LOGIN_HTML = `<!DOCTYPE html><html><head><title>Admin Login - Redline Design</title><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:system-ui,-apple-system,sans-serif;background:#0a0a0a;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh}.card{background:#111;border:1px solid #222;border-radius:12px;padding:2rem;width:100%;max-width:400px}h1{font-size:1.5rem;margin-bottom:1.5rem;text-align:center}input{width:100%;padding:.75rem 1rem;background:#1a1a1a;border:1px solid #333;border-radius:8px;color:#fff;font-size:1rem;margin-bottom:1rem}input:focus{outline:none;border-color:#e11d48}button{width:100%;padding:.75rem;background:#e11d48;color:#fff;border:none;border-radius:8px;font-size:1rem;cursor:pointer}button:hover{background:#be123c}button:disabled{opacity:.5}.error{color:#ef4444;font-size:.875rem;margin-bottom:1rem}</style></head><body><div class="card"><h1>Admin Login</h1><form id="f"><input type="password" name="password" placeholder="Enter password" required autofocus><div id="e" class="error"></div><button type="submit">Login</button></form><script>document.getElementById('f').onsubmit=async function(e){e.preventDefault();var b=document.querySelector('button');b.disabled=true;b.textContent='Logging in...';document.getElementById('e').textContent='';try{var r=await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:new FormData(e.target).get('password')}),credentials:'include'});var d=await r.json();if(r.ok){window.location.href='/admin'}else{document.getElementById('e').textContent=d.error||'Login failed';b.disabled=false;b.textContent='Login'}}catch(x){document.getElementById('e').textContent='Network error';b.disabled=false;b.textContent='Login'}}</script></div></body></html>`;

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());

  // GET login page
  app.get("/api/login", (req, res) => {
    if ((req.session as any)?.authenticated) {
      return res.redirect("/admin");
    }
    res.type("html").send(LOGIN_HTML);
  });

  // POST login
  app.post("/api/login", (req, res) => {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return res.status(500).json({ error: "Admin password not configured on server" });
    }

    if (password !== adminPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Set session as authenticated
    (req.session as any).authenticated = true;
    (req.session as any).user = {
      claims: { sub: "admin" },
      email: "admin@redlinedesignllc.com",
    };

    req.session.save((err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to save session" });
      }
      res.json({ success: true });
    });
  });

  // Auth status check
  app.get("/api/auth/user", (req, res) => {
    if ((req.session as any)?.authenticated) {
      return res.json({
        id: "admin",
        email: "admin@redlinedesignllc.com",
        firstName: "Admin",
        lastName: "",
      });
    }
    res.status(401).json({ message: "Not authenticated" });
  });

  // Logout
  app.get("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      res.redirect("/");
    });
  });
}

export const isAuthenticated: RequestHandler = (req, res, next) => {
  if ((req.session as any)?.authenticated) {
    (req as any).user = {
      claims: { sub: "admin" },
    };
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
};
