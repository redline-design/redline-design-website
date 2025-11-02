import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { handleChat } from "./chat";
import { insertReviewSchema } from "@shared/schema";
import { googleBusinessService } from "./google-business-api";

export async function registerRoutes(app: Express): Promise<Server> {
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

  const httpServer = createServer(app);

  return httpServer;
}
