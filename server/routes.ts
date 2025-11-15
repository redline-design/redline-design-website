import type { Express, RequestHandler } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { handleChat } from "./chat";
import { insertReviewSchema, insertBlogPostSchema, updateBlogPostSchema, insertPortfolioItemSchema, updatePortfolioItemSchema } from "@shared/schema";
import { setupAuth, isAuthenticated } from "./replitAuth";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { optimizeUploadedFile } from "./imageOptimizer";

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
  app.patch("/api/portfolio/:id/display-order", isAuthenticated, async (req, res) => {
    try {
      const { displayOrder } = req.body;
      if (typeof displayOrder !== 'number') {
        return res.status(400).json({ error: "Display order must be a number" });
      }
      
      const updatedItem = await storage.updatePortfolioItem(req.params.id, { displayOrder });
      if (!updatedItem) {
        return res.status(404).json({ error: "Portfolio item not found" });
      }
      
      res.json(updatedItem);
    } catch (error: any) {
      console.error("Error updating display order:", error);
      res.status(500).json({ error: "Failed to update display order" });
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

  app.post("/api/portfolio/:id/upload-logo", isAuthenticated, upload.single('logo'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const optimizedPath = await optimizeUploadedFile(req.file, { 
        maxSizeKB: 100,
        format: 'webp'
      });
      
      const filename = path.basename(optimizedPath);
      const logoWebPath = `/attached_assets/portfolio_logos/${filename}`;
      const updatedItem = await storage.updatePortfolioItem(req.params.id, {
        logoUrl: logoWebPath
      });

      if (!updatedItem) {
        await fs.unlink(optimizedPath);
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

      const optimizedPath = await optimizeUploadedFile(req.file, { 
        maxSizeKB: 150,
        format: 'webp'
      });
      
      const filename = path.basename(optimizedPath);
      const screenshotWebPath = `/attached_assets/portfolio_screenshots/${filename}`;
      const updatedItem = await storage.updatePortfolioItem(req.params.id, {
        screenshotUrl: screenshotWebPath
      });

      if (!updatedItem) {
        await fs.unlink(optimizedPath);
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

  // SEO Checker endpoint
  app.post("/api/seo-checker", async (req, res) => {
    try {
      const { url } = req.body;
      
      if (!url) {
        return res.status(400).json({ error: "URL is required" });
      }

      // Validate URL format
      let targetUrl: URL;
      try {
        targetUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
      } catch {
        return res.status(400).json({ error: "Invalid URL format" });
      }

      // Fetch the webpage
      const response = await fetch(targetUrl.toString(), {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; RedlineDesignBot/1.0; +https://redlinedesignllc.com)'
        }
      });

      if (!response.ok) {
        return res.status(400).json({ error: `Failed to fetch URL: ${response.statusText}` });
      }

      const html = await response.text();
      const { load } = await import('cheerio');
      const $ = load(html);

      // SEO Analysis
      const analysis: any = {
        url: targetUrl.toString(),
        timestamp: new Date().toISOString(),
        issues: [],
        warnings: [],
        passed: [],
        score: 0
      };

      let totalChecks = 0;
      let passedChecks = 0;

      // Title tag check
      totalChecks++;
      const title = $('title').text().trim();
      if (!title) {
        analysis.issues.push({ type: 'title', message: 'Missing title tag', severity: 'critical' });
      } else if (title.length < 30) {
        analysis.warnings.push({ type: 'title', message: `Title is too short (${title.length} chars). Recommended: 50-60 characters.`, value: title });
        passedChecks += 0.5;
      } else if (title.length > 60) {
        analysis.warnings.push({ type: 'title', message: `Title is too long (${title.length} chars). It may be truncated in search results.`, value: title });
        passedChecks += 0.5;
      } else {
        analysis.passed.push({ type: 'title', message: 'Title tag is well-optimized', value: title });
        passedChecks++;
      }

      // Meta description check
      totalChecks++;
      const description = $('meta[name="description"]').attr('content')?.trim();
      if (!description) {
        analysis.issues.push({ type: 'meta-description', message: 'Missing meta description', severity: 'critical' });
      } else if (description.length < 120) {
        analysis.warnings.push({ type: 'meta-description', message: `Meta description is too short (${description.length} chars). Recommended: 150-160 characters.`, value: description });
        passedChecks += 0.5;
      } else if (description.length > 160) {
        analysis.warnings.push({ type: 'meta-description', message: `Meta description is too long (${description.length} chars). It may be truncated.`, value: description });
        passedChecks += 0.5;
      } else {
        analysis.passed.push({ type: 'meta-description', message: 'Meta description is well-optimized', value: description });
        passedChecks++;
      }

      // H1 tag check
      totalChecks++;
      const h1Tags = $('h1');
      if (h1Tags.length === 0) {
        analysis.issues.push({ type: 'h1', message: 'No H1 tag found', severity: 'critical' });
      } else if (h1Tags.length > 1) {
        analysis.warnings.push({ type: 'h1', message: `Multiple H1 tags found (${h1Tags.length}). Best practice is to use only one H1 per page.`, count: h1Tags.length });
        passedChecks += 0.5;
      } else {
        analysis.passed.push({ type: 'h1', message: 'Single H1 tag found', value: h1Tags.first().text().trim() });
        passedChecks++;
      }

      // Heading hierarchy check
      totalChecks++;
      const h2Count = $('h2').length;
      const h3Count = $('h3').length;
      if (h2Count > 0 || h3Count > 0) {
        analysis.passed.push({ type: 'headings', message: `Good heading structure: ${h2Count} H2 tags, ${h3Count} H3 tags` });
        passedChecks++;
      } else {
        analysis.warnings.push({ type: 'headings', message: 'No H2 or H3 tags found. Consider adding subheadings for better content structure.' });
      }

      // Image alt text check
      totalChecks++;
      const images = $('img');
      const imagesWithoutAlt = images.filter((i, img) => !$(img).attr('alt')).length;
      if (images.length === 0) {
        analysis.warnings.push({ type: 'images', message: 'No images found on page' });
      } else if (imagesWithoutAlt > 0) {
        analysis.warnings.push({ type: 'images', message: `${imagesWithoutAlt} out of ${images.length} images missing alt text` });
        passedChecks += 0.5;
      } else {
        analysis.passed.push({ type: 'images', message: `All ${images.length} images have alt text` });
        passedChecks++;
      }

      // Open Graph tags check
      totalChecks++;
      const ogTitle = $('meta[property="og:title"]').attr('content');
      const ogDescription = $('meta[property="og:description"]').attr('content');
      const ogImage = $('meta[property="og:image"]').attr('content');
      if (ogTitle && ogDescription && ogImage) {
        analysis.passed.push({ type: 'open-graph', message: 'Open Graph tags present for social media sharing' });
        passedChecks++;
      } else {
        const missing = [];
        if (!ogTitle) missing.push('og:title');
        if (!ogDescription) missing.push('og:description');
        if (!ogImage) missing.push('og:image');
        analysis.warnings.push({ type: 'open-graph', message: `Missing Open Graph tags: ${missing.join(', ')}` });
      }

      // Canonical URL check
      totalChecks++;
      const canonical = $('link[rel="canonical"]').attr('href');
      if (canonical) {
        analysis.passed.push({ type: 'canonical', message: 'Canonical URL is set', value: canonical });
        passedChecks++;
      } else {
        analysis.warnings.push({ type: 'canonical', message: 'No canonical URL specified. This can lead to duplicate content issues.' });
      }

      // Viewport meta tag check (mobile-friendly)
      totalChecks++;
      const viewport = $('meta[name="viewport"]').attr('content');
      if (viewport) {
        analysis.passed.push({ type: 'viewport', message: 'Mobile-friendly viewport tag present' });
        passedChecks++;
      } else {
        analysis.issues.push({ type: 'viewport', message: 'Missing viewport meta tag. Page may not be mobile-friendly.', severity: 'high' });
      }

      // HTTPS check
      totalChecks++;
      if (targetUrl.protocol === 'https:') {
        analysis.passed.push({ type: 'https', message: 'Site uses secure HTTPS protocol' });
        passedChecks++;
      } else {
        analysis.issues.push({ type: 'https', message: 'Site is not using HTTPS. This affects SEO and user trust.', severity: 'critical' });
      }

      // Content length check
      totalChecks++;
      const textContent = $('body').text().replace(/\s+/g, ' ').trim();
      const wordCount = textContent.split(' ').length;
      if (wordCount < 300) {
        analysis.warnings.push({ type: 'content', message: `Page has only ${wordCount} words. Consider adding more content (500+ words recommended).` });
      } else {
        analysis.passed.push({ type: 'content', message: `Good content length: ${wordCount} words` });
        passedChecks++;
      }

      // Calculate final score
      analysis.score = Math.round((passedChecks / totalChecks) * 100);
      analysis.summary = {
        totalChecks,
        passed: analysis.passed.length,
        warnings: analysis.warnings.length,
        issues: analysis.issues.length
      };

      res.json(analysis);
    } catch (error: any) {
      console.error("Error analyzing SEO:", error);
      res.status(500).json({ error: "Failed to analyze URL", details: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
