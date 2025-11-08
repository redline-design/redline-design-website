import { 
  type User, 
  type UpsertUser, 
  type Review, 
  type InsertReview,
  type BlogPost,
  type InsertBlogPost,
  type UpdateBlogPost,
  type PortfolioItem,
  type InsertPortfolioItem,
  type UpdatePortfolioItem,
  reviews,
  users,
  blogPosts,
  portfolioItems
} from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq, desc, and, sql } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods (Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Review methods
  getReviews(): Promise<Review[]>;
  getFiveStarReviews(): Promise<Review[]>;
  getReviewByGoogleId(googleReviewId: string): Promise<Review | undefined>;
  createReview(review: InsertReview): Promise<Review>;
  updateReview(id: string, review: Partial<InsertReview>): Promise<Review>;
  upsertReview(review: InsertReview): Promise<Review>;
  deleteReview(id: string): Promise<void>;

  // Blog post methods
  getBlogPosts(filters?: { published?: boolean; category?: string }): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: UpdateBlogPost): Promise<BlogPost>;
  deleteBlogPost(id: string): Promise<void>;

  // Portfolio methods
  getPortfolioItems(): Promise<PortfolioItem[]>;
  getPortfolioItemById(id: string): Promise<PortfolioItem | null>;
  createPortfolioItem(data: InsertPortfolioItem): Promise<PortfolioItem>;
  updatePortfolioItem(id: string, data: UpdatePortfolioItem): Promise<PortfolioItem | null>;
  deletePortfolioItem(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async upsertUser(user: UpsertUser): Promise<User> {
    const id = user.id || randomUUID();
    const now = new Date();
    const fullUser: User = { 
      id,
      email: user.email ?? null,
      firstName: user.firstName ?? null,
      lastName: user.lastName ?? null,
      profileImageUrl: user.profileImageUrl ?? null,
      createdAt: user.createdAt ?? now,
      updatedAt: now
    };
    this.users.set(id, fullUser);
    return fullUser;
  }

  async getReviews(): Promise<Review[]> {
    throw new Error("Reviews not implemented in MemStorage");
  }

  async getFiveStarReviews(): Promise<Review[]> {
    throw new Error("Reviews not implemented in MemStorage");
  }

  async getReviewByGoogleId(googleReviewId: string): Promise<Review | undefined> {
    throw new Error("Reviews not implemented in MemStorage");
  }

  async createReview(review: InsertReview): Promise<Review> {
    throw new Error("Reviews not implemented in MemStorage");
  }

  async updateReview(id: string, review: Partial<InsertReview>): Promise<Review> {
    throw new Error("Reviews not implemented in MemStorage");
  }

  async upsertReview(review: InsertReview): Promise<Review> {
    throw new Error("Reviews not implemented in MemStorage");
  }

  async deleteReview(id: string): Promise<void> {
    throw new Error("Reviews not implemented in MemStorage");
  }

  async getBlogPosts(filters?: { published?: boolean; category?: string }): Promise<BlogPost[]> {
    throw new Error("Blog posts not implemented in MemStorage");
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    throw new Error("Blog posts not implemented in MemStorage");
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    throw new Error("Blog posts not implemented in MemStorage");
  }

  async updateBlogPost(id: string, post: UpdateBlogPost): Promise<BlogPost> {
    throw new Error("Blog posts not implemented in MemStorage");
  }

  async deleteBlogPost(id: string): Promise<void> {
    throw new Error("Blog posts not implemented in MemStorage");
  }

  async getPortfolioItems(): Promise<PortfolioItem[]> {
    throw new Error("Portfolio items not implemented in MemStorage");
  }

  async getPortfolioItemById(id: string): Promise<PortfolioItem | null> {
    throw new Error("Portfolio items not implemented in MemStorage");
  }

  async createPortfolioItem(data: InsertPortfolioItem): Promise<PortfolioItem> {
    throw new Error("Portfolio items not implemented in MemStorage");
  }

  async updatePortfolioItem(id: string, data: UpdatePortfolioItem): Promise<PortfolioItem | null> {
    throw new Error("Portfolio items not implemented in MemStorage");
  }

  async deletePortfolioItem(id: string): Promise<boolean> {
    throw new Error("Portfolio items not implemented in MemStorage");
  }
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const result = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return result[0];
  }

  async getReviews(): Promise<Review[]> {
    return await db.select().from(reviews).orderBy(desc(reviews.createdAt));
  }

  async getFiveStarReviews(): Promise<Review[]> {
    return await db.select().from(reviews)
      .where(eq(reviews.rating, 5))
      .orderBy(desc(reviews.createdAt));
  }

  async getReviewByGoogleId(googleReviewId: string): Promise<Review | undefined> {
    const result = await db.select().from(reviews)
      .where(eq(reviews.googleReviewId, googleReviewId));
    return result[0];
  }

  async createReview(review: InsertReview): Promise<Review> {
    const result = await db.insert(reviews).values(review).returning();
    return result[0];
  }

  async updateReview(id: string, review: Partial<InsertReview>): Promise<Review> {
    const result = await db.update(reviews)
      .set(review)
      .where(eq(reviews.id, id))
      .returning();
    return result[0];
  }

  async upsertReview(review: InsertReview): Promise<Review> {
    const existing = review.googleReviewId 
      ? await this.getReviewByGoogleId(review.googleReviewId)
      : undefined;

    if (existing) {
      const result = await db.update(reviews)
        .set(review)
        .where(eq(reviews.id, existing.id))
        .returning();
      return result[0];
    } else {
      return await this.createReview(review);
    }
  }

  async deleteReview(id: string): Promise<void> {
    await db.delete(reviews).where(eq(reviews.id, id));
  }

  async getBlogPosts(filters?: { published?: boolean; category?: string }): Promise<BlogPost[]> {
    let query = db.select().from(blogPosts);
    
    const conditions = [];
    if (filters?.published !== undefined) {
      conditions.push(eq(blogPosts.published, filters.published));
    }
    if (filters?.category) {
      conditions.push(eq(blogPosts.category, filters.category));
    }
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }
    
    return await query.orderBy(desc(blogPosts.publishedAt), desc(blogPosts.createdAt));
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return result[0];
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const result = await db.insert(blogPosts).values(post).returning();
    return result[0];
  }

  async updateBlogPost(id: string, post: UpdateBlogPost): Promise<BlogPost> {
    const result = await db
      .update(blogPosts)
      .set({
        ...post,
        updatedAt: new Date(),
      })
      .where(eq(blogPosts.id, id))
      .returning();
    return result[0];
  }

  async deleteBlogPost(id: string): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  async getPortfolioItems(): Promise<PortfolioItem[]> {
    return await db.select().from(portfolioItems).orderBy(portfolioItems.displayOrder, desc(portfolioItems.createdAt));
  }

  async getPortfolioItemById(id: string): Promise<PortfolioItem | null> {
    const result = await db.select().from(portfolioItems).where(eq(portfolioItems.id, id));
    return result[0] || null;
  }

  async createPortfolioItem(data: InsertPortfolioItem): Promise<PortfolioItem> {
    const result = await db.insert(portfolioItems).values(data).returning();
    return result[0];
  }

  async updatePortfolioItem(id: string, data: UpdatePortfolioItem): Promise<PortfolioItem | null> {
    const result = await db
      .update(portfolioItems)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(portfolioItems.id, id))
      .returning();
    return result[0] || null;
  }

  async deletePortfolioItem(id: string): Promise<boolean> {
    const result = await db.delete(portfolioItems).where(eq(portfolioItems.id, id));
    return true;
  }
}

export const storage = new DbStorage();
