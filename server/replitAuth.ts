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

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());

  // Simple password-based login
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
    // Attach user-like object for compatibility with existing routes
    (req as any).user = {
      claims: { sub: "admin" },
    };
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
};
