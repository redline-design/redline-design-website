import { type User, type InsertUser, type Review, type InsertReview } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Review methods
  getReviews(): Promise<Review[]>;
  getFiveStarReviews(): Promise<Review[]>;
  getReviewByGoogleId(googleReviewId: string): Promise<Review | undefined>;
  createReview(review: InsertReview): Promise<Review>;
  upsertReview(review: InsertReview): Promise<Review>;
  deleteReview(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
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
}

import { db } from "./db";
import { reviews, users } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
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
}

export const storage = new DbStorage();
