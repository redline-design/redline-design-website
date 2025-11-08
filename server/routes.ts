import type { Express, RequestHandler } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { handleChat } from "./chat";
import { insertReviewSchema, insertBlogPostSchema, updateBlogPostSchema, insertPortfolioItemSchema, updatePortfolioItemSchema } from "@shared/schema";
import { setupAuth, isAuthenticated } from "./replitAuth";
import multer from "multer";
import path from "path";
import fs from "fs/promises";

// API key middleware for external integrations
const requireApiKey: RequestHandler = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const validApiKey = process.env.BLOG_API_KEY;
  
  if (!validApiKey) {
    return res.status(500).json({ error: "API key not configured on server" });
  }
  
  if (apiKey !== validApiKey) {
    return res.status(401).json({ error: "Invalid or missing API key" });
  }
  
  next();
};

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), 'attached_assets', 'portfolio_logos');
const multerStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    await fs.mkdir(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'logo-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: multerStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|svg|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Chat endpoint for AI assistant
  app.post("/api/chat", handleChat);

  // Reviews endpoints
  app.get("/api/reviews", async (req, res) => {
    try {
      const reviews = await storage.getFiveStarReviews();
      res.json(reviews);
    } catch (error: any) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertReviewSchema.parse({
        ...req.body,
        rating: 5, // Always 5 stars for manually created reviews
        googleReviewId: null, // No Google ID for manual reviews
      });
      const review = await storage.createReview(validatedData);
      res.json(review);
    } catch (error: any) {
      console.error("Error creating review:", error);
      res.status(400).json({ error: "Failed to create review", details: error.message });
    }
  });

  app.patch("/api/reviews/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertReviewSchema.partial().parse({
        ...req.body,
        rating: 5, // Keep rating at 5 stars
        googleReviewId: null, // Manual reviews don't have Google IDs
      });
      
      const review = await storage.updateReview(id, validatedData);
      res.json(review);
    } catch (error: any) {
      console.error("Error updating review:", error);
      res.status(400).json({ error: "Failed to update review", details: error.message });
    }
  });

  app.delete("/api/reviews/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteReview(id);
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error deleting review:", error);
      res.status(500).json({ error: "Failed to delete review" });
    }
  });

  // Blog post endpoints
  app.get("/api/blog/posts", async (req: any, res) => {
    try {
      const { category, includeUnpublished } = req.query;
      
      // Require authentication to view unpublished posts
      if (includeUnpublished === 'true') {
        if (!req.user || !req.user.claims) {
          return res.status(401).json({ error: "Authentication required to view unpublished posts" });
        }
      }
      
      const filters: any = {
        category: category as string | undefined
      };
      
      if (includeUnpublished !== 'true') {
        filters.published = true;
      }
      
      const posts = await storage.getBlogPosts(filters);
      res.json(posts);
    } catch (error: any) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/posts/:slug", async (req: any, res) => {
    try {
      const post = await storage.getBlogPost(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      
      // Don't allow unauthenticated users to view unpublished posts
      if (!post.published && (!req.user || !req.user.claims)) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      
      res.json(post);
    } catch (error: any) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  app.post("/api/blog/posts", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.status(201).json(post);
    } catch (error: any) {
      console.error("Error creating blog post:", error);
      res.status(400).json({ error: "Failed to create blog post", details: error.message });
    }
  });

  app.put("/api/blog/posts/:id", isAuthenticated, async (req, res) => {
    try {
      const validatedData = updateBlogPostSchema.parse(req.body);
      const post = await storage.updateBlogPost(req.params.id, validatedData);
      res.json(post);
    } catch (error: any) {
      console.error("Error updating blog post:", error);
      res.status(400).json({ error: "Failed to update blog post", details: error.message });
    }
  });

  app.delete("/api/blog/posts/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deleteBlogPost(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });

  // External API endpoint for automated blog post creation/updates
  app.post("/api/external/blog/posts", requireApiKey, async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      
      // Check if post with this slug already exists
      const existingPost = await storage.getBlogPost(validatedData.slug);
      
      let post;
      if (existingPost) {
        // Update existing post
        post = await storage.updateBlogPost(existingPost.id, validatedData);
        res.json({ action: "updated", post });
      } else {
        // Create new post
        post = await storage.createBlogPost(validatedData);
        res.status(201).json({ action: "created", post });
      }
    } catch (error: any) {
      console.error("Error upserting blog post via external API:", error);
      res.status(400).json({ error: "Failed to upsert blog post", details: error.message });
    }
  });

  // Portfolio endpoints
  app.patch("/api/portfolio/reorder", isAuthenticated, async (req, res) => {
    try {
      const { items } = req.body;
      if (!Array.isArray(items)) {
        return res.status(400).json({ error: "Items must be an array" });
      }
      
      console.log(`Reordering ${items.length} portfolio items:`, items);
      
      // Update display order for all items in parallel
      const results = await Promise.all(
        items.map(async (item) => {
          const result = await storage.updatePortfolioItem(item.id, { displayOrder: item.displayOrder });
          console.log(`Updated item ${item.id} to displayOrder ${item.displayOrder}, result:`, result?.displayOrder);
          return result;
        })
      );
      
      console.log(`Reorder complete. Updated ${results.length} items.`);
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error reordering portfolio items:", error);
      res.status(400).json({ error: "Failed to reorder portfolio items", details: error.message });
    }
  });

  app.get("/api/portfolio", async (req, res) => {
    try {
      const items = await storage.getPortfolioItems();
      res.json(items);
    } catch (error: any) {
      console.error("Error fetching portfolio items:", error);
      res.status(500).json({ error: "Failed to fetch portfolio items" });
    }
  });

  app.get("/api/portfolio/:id", async (req, res) => {
    try {
      const item = await storage.getPortfolioItemById(req.params.id);
      if (!item) {
        return res.status(404).json({ error: "Portfolio item not found" });
      }
      res.json(item);
    } catch (error: any) {
      console.error("Error fetching portfolio item:", error);
      res.status(500).json({ error: "Failed to fetch portfolio item" });
    }
  });

  app.post("/api/portfolio", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertPortfolioItemSchema.parse(req.body);
      const item = await storage.createPortfolioItem(validatedData);
      res.status(201).json(item);
    } catch (error: any) {
      console.error("Error creating portfolio item:", error);
      res.status(400).json({ error: "Failed to create portfolio item", details: error.message });
    }
  });

  app.patch("/api/portfolio/:id", isAuthenticated, async (req, res) => {
    try {
      const validatedData = updatePortfolioItemSchema.parse(req.body);
      const item = await storage.updatePortfolioItem(req.params.id, validatedData);
      if (!item) {
        return res.status(404).json({ error: "Portfolio item not found" });
      }
      res.json(item);
    } catch (error: any) {
      console.error("Error updating portfolio item:", error);
      res.status(400).json({ error: "Failed to update portfolio item", details: error.message });
    }
  });

  app.delete("/api/portfolio/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deletePortfolioItem(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      console.error("Error deleting portfolio item:", error);
      res.status(500).json({ error: "Failed to delete portfolio item" });
    }
  });

  app.post("/api/portfolio/:id/screenshot", isAuthenticated, async (req, res) => {
    try {
      const item = await storage.getPortfolioItemById(req.params.id);
      if (!item) {
        return res.status(404).json({ error: "Portfolio item not found" });
      }

      const screenshotApiKey = process.env.SCREENSHOTONE_API_KEY;
      if (!screenshotApiKey) {
        return res.status(500).json({ error: "Screenshot API key not configured" });
      }

      const screenshotUrl = `https://api.screenshotone.com/take?url=${encodeURIComponent(item.url)}&access_key=${screenshotApiKey}&block_cookie_banners=true&full_page=false&viewport_width=1920&viewport_height=1080&format=png&ignore_host_errors=true&delay=5&wait_until=networkidle0&timeout=30`;
      
      const response = await fetch(screenshotUrl);
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Screenshot API error for ${item.url}: ${response.status} - ${errorText}`);
        throw new Error(`Screenshot API error: ${response.status} - ${errorText}`);
      }

      const buffer = await response.arrayBuffer();
      const screenshotDir = path.join(process.cwd(), 'attached_assets', 'portfolio_screenshots');
      await fs.mkdir(screenshotDir, { recursive: true });
      
      const filename = `screenshot-${item.id}-${Date.now()}.png`;
      const filepath = path.join(screenshotDir, filename);
      await fs.writeFile(filepath, Buffer.from(buffer));

      const screenshotWebPath = `/attached_assets/portfolio_screenshots/${filename}`;
      const updatedItem = await storage.updatePortfolioItem(req.params.id, {
        screenshotUrl: screenshotWebPath
      });

      res.json(updatedItem);
    } catch (error: any) {
      console.error("Error capturing screenshot:", error);
      res.status(500).json({ error: "Failed to capture screenshot", details: error.message });
    }
  });

  app.post("/api/portfolio/:id/upload-logo", isAuthenticated, upload.single('logo'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const logoWebPath = `/attached_assets/portfolio_logos/${req.file.filename}`;
      const updatedItem = await storage.updatePortfolioItem(req.params.id, {
        logoUrl: logoWebPath
      });

      if (!updatedItem) {
        await fs.unlink(req.file.path);
        return res.status(404).json({ error: "Portfolio item not found" });
      }

      res.json(updatedItem);
    } catch (error: any) {
      console.error("Error uploading logo:", error);
      if (req.file) {
        await fs.unlink(req.file.path).catch(console.error);
      }
      res.status(500).json({ error: "Failed to upload logo", details: error.message });
    }
  });

  const screenshotUpload = multer({
    storage: multer.diskStorage({
      destination: async (req, file, cb) => {
        const uploadDir = path.join(process.cwd(), 'attached_assets', 'portfolio_screenshots');
        await fs.mkdir(uploadDir, { recursive: true });
        cb(null, uploadDir);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `screenshot-${req.params.id}-${uniqueSuffix}${path.extname(file.originalname)}`);
      }
    }),
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      const allowedExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
      const ext = path.extname(file.originalname).toLowerCase();
      
      if (allowedMimes.includes(file.mimetype) && allowedExts.includes(ext)) {
        cb(null, true);
      } else {
        cb(new Error('Only image files (JPEG, PNG, GIF, WebP) are allowed'));
      }
    }
  });

  app.post("/api/portfolio/:id/upload-screenshot", isAuthenticated, screenshotUpload.single('screenshot'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const screenshotWebPath = `/attached_assets/portfolio_screenshots/${req.file.filename}`;
      const updatedItem = await storage.updatePortfolioItem(req.params.id, {
        screenshotUrl: screenshotWebPath
      });

      if (!updatedItem) {
        await fs.unlink(req.file.path);
        return res.status(404).json({ error: "Portfolio item not found" });
      }

      res.json(updatedItem);
    } catch (error: any) {
      console.error("Error uploading screenshot:", error);
      if (req.file) {
        await fs.unlink(req.file.path).catch(console.error);
      }
      res.status(500).json({ error: "Failed to upload screenshot", details: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
