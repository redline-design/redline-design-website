/**
 * Seed script to populate database with existing Google reviews
 * Run with: tsx server/seed-reviews.ts
 */

import { storage } from "./storage";
import type { InsertReview } from "@shared/schema";

const existingReviews: InsertReview[] = [
  {
    googleReviewId: "pete-gallego-review",
    name: "Pete Gallego",
    role: "Business Owner",
    company: "Google Review",
    content: "I met Ryan through a very good friend, and we were searching for someone or a company to generate leads for us. At the time I met Ryan, we were only getting about two leads a week. Once Ryan got involved and started designing our ads, everything changed. We've launched record-breaking months and even opened new stores!",
    rating: 5,
    profilePhotoUrl: "https://lh3.googleusercontent.com/a/ACg8ocJFWWvhmvtuZ64ZHj4Eb4P9eA4gxSB70FAgJse_hzfm6wI6cQ=w36-h36-p-rp-mo-br100",
    reviewDate: new Date("2025-01-09"),
  },
  {
    googleReviewId: "mason-small-review",
    name: "Mason Small",
    role: "Business Owner",
    company: "Google Review",
    content: "This is an amazing option to grow your business. Ryan has been nothing but helpful in walking me through all the steps and making my dreams come true. He's made an amazing platform to track every step of your business's growth and overcoming issues to continue growing.",
    rating: 5,
    profilePhotoUrl: "https://lh3.googleusercontent.com/a/ACg8ocKj8cNNvXMJ078TK48KfsWh3uUdxEg1HvmjxuHTGmvS83vgKg=w36-h36-p-rp-mo-br100",
    reviewDate: new Date("2025-01-02"),
  },
  {
    googleReviewId: "emily-check-review",
    name: "Emily Check",
    role: "Store Owner",
    company: "Google Review",
    content: "I'm a complete ditz when it comes to marketing and advertising and trying to get people to actually VISIT my website. I was pretty lost and frustrated but these guys helped get traffic to my store that beyond surpassed my expectations! They made digital marketing clear, effective, and profitable.",
    rating: 5,
    profilePhotoUrl: "https://lh3.googleusercontent.com/a-/ALV-UjUA6l9za8c6Baey4TL-L34Wch2_wdQb3Ku7n1HTTLaCupYgKn4U=w36-h36-p-rp-mo-ba2-br100",
    reviewDate: new Date("2025-01-02"),
  },
];

async function seedReviews() {
  console.log("Seeding reviews...");
  
  for (const review of existingReviews) {
    try {
      await storage.upsertReview(review);
      console.log(`✓ Added review from ${review.name}`);
    } catch (error) {
      console.error(`✗ Error adding review from ${review.name}:`, error);
    }
  }
  
  console.log("\nReviews seeded successfully!");
  process.exit(0);
}

seedReviews().catch((error) => {
  console.error("Fatal error seeding reviews:", error);
  process.exit(1);
});
