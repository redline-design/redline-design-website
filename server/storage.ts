import { 
  type User, 
  type UpsertUser, 
  type Review, 
  type InsertReview,
  type BlogPost,
  type InsertBlogPost,
  type UpdateBlogPost
} from "@shared/schema";
import { randomUUID } from "crypto";

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
  upsertReview(review: InsertReview): Promise<Review>;
  deleteReview(id: string): Promise<void>;

  // Blog post methods
  getBlogPosts(filters?: { published?: boolean; category?: string }): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: UpdateBlogPost): Promise<BlogPost>;
  deleteBlogPost(id: string): Promise<void>;
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
}

import { db } from "./db";
import { reviews, users, blogPosts } from "@shared/schema";
import { eq, desc, and, sql } from "drizzle-orm";

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
}

export const storage = new DbStorage();
