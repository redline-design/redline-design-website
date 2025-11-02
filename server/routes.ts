import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { handleChat } from "./chat";
import { insertReviewSchema, insertBlogPostSchema, updateBlogPostSchema } from "@shared/schema";
import { googleBusinessService } from "./google-business-api";
import { setupAuth, isAuthenticated } from "./replitAuth";

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

  app.post("/api/reviews/sync", async (req, res) => {
    try {
      const syncedCount = await googleBusinessService.syncFiveStarReviews();
      res.json({ 
        success: true, 
        message: `Synced ${syncedCount} five-star reviews from Google` 
      });
    } catch (error: any) {
      console.error("Error syncing reviews:", error);
      res.status(500).json({ 
        error: "Failed to sync reviews", 
        details: error.message 
      });
    }
  });

  // Blog post endpoints
  app.get("/api/blog/posts", async (req, res) => {
    try {
      const { category } = req.query;
      const posts = await storage.getBlogPosts({ 
        published: true,
        category: category as string | undefined
      });
      res.json(posts);
    } catch (error: any) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/posts/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.slug);
      if (!post) {
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

  const httpServer = createServer(app);

  return httpServer;
}
