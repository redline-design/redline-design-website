import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, index, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export const reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  googleReviewId: text("google_review_id").unique(),
  name: text("name").notNull(),
  role: text("role"),
  company: text("company"),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
  profilePhotoUrl: text("profile_photo_url"),
  reviewDate: timestamp("review_date"),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true,
});

export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;

export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  category: text("category").notNull(),
  author: text("author"),
  readTime: text("read_time").notNull(),
  featured: boolean("featured").default(false).notNull(),
  published: boolean("published").default(false).notNull(),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  publishedAt: z.union([z.string(), z.date(), z.null()]).transform((val) => {
    if (val === null) return null;
    if (typeof val === 'string') return new Date(val);
    return val;
  }).optional(),
}).partial();

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type UpdateBlogPost = z.infer<typeof updateBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

export const portfolioItems = pgTable("portfolio_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  url: text("url").notNull(),
  screenshotUrl: text("screenshot_url"),
  logoUrl: text("logo_url"),
  description: text("description"),
  category: text("category").notNull(),
  featured: boolean("featured").default(false).notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
});

export const insertPortfolioItemSchema = createInsertSchema(portfolioItems).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updatePortfolioItemSchema = createInsertSchema(portfolioItems).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial();

export type InsertPortfolioItem = z.infer<typeof insertPortfolioItemSchema>;
export type UpdatePortfolioItem = z.infer<typeof updatePortfolioItemSchema>;
export type PortfolioItem = typeof portfolioItems.$inferSelect;

export const googleTokens = pgTable("google_tokens", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  scope: text("scope").notNull(),
  tokenType: text("token_type").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
});

export const insertGoogleTokenSchema = createInsertSchema(googleTokens).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertGoogleToken = z.infer<typeof insertGoogleTokenSchema>;
export type GoogleToken = typeof googleTokens.$inferSelect;
