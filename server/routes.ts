import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { handleChat } from "./chat";

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat endpoint for AI assistant
  app.post("/api/chat", handleChat);

  const httpServer = createServer(app);

  return httpServer;
}
