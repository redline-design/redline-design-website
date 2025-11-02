import { storage } from "./storage";
import type { InsertReview } from "@shared/schema";

interface GoogleReviewData {
  name: string;
  reviewId: string;
  reviewer: {
    displayName: string;
    profilePhotoUrl?: string;
  };
  starRating: string;
  comment?: string;
  createTime: string;
}

export class GoogleBusinessProfileService {
  private apiKey: string;
  private accountId: string;
  private locationId: string;

  constructor() {
    this.apiKey = process.env.GOOGLE_BUSINESS_API_KEY || "";
    this.accountId = process.env.GOOGLE_BUSINESS_ACCOUNT_ID || "";
    this.locationId = process.env.GOOGLE_BUSINESS_LOCATION_ID || "";
  }

  /**
   * Fetch reviews from Google Business Profile API
   * https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews/list
   */
  async fetchReviews(): Promise<GoogleReviewData[]> {
    if (!this.apiKey || !this.accountId || !this.locationId) {
      console.warn("Google Business API credentials not configured");
      return [];
    }

    try {
      const url = `https://mybusiness.googleapis.com/v4/accounts/${this.accountId}/locations/${this.locationId}/reviews?key=${this.apiKey}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Google API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.reviews || [];
    } catch (error) {
      console.error("Error fetching Google reviews:", error);
      throw error;
    }
  }

  /**
   * Sync 5-star reviews from Google to database
   */
  async syncFiveStarReviews(): Promise<number> {
    try {
      const googleReviews = await this.fetchReviews();
      
      // Filter for 5-star reviews only
      const fiveStarReviews = googleReviews.filter(
        (review) => review.starRating === "FIVE"
      );

      let syncedCount = 0;

      for (const googleReview of fiveStarReviews) {
        // Skip reviews without reviewer name
        if (!googleReview.reviewer?.displayName) {
          console.warn("Skipping review without reviewer name:", googleReview.reviewId);
          continue;
        }

        const reviewData: InsertReview = {
          googleReviewId: googleReview.reviewId,
          name: googleReview.reviewer.displayName,
          role: "Customer",
          company: "Google Review",
          content: googleReview.comment || "",
          rating: 5,
          profilePhotoUrl: googleReview.reviewer.profilePhotoUrl || null,
          reviewDate: new Date(googleReview.createTime),
        };

        await storage.upsertReview(reviewData);
        syncedCount++;
      }

      console.log(`Synced ${syncedCount} five-star reviews from Google`);
      return syncedCount;
    } catch (error) {
      console.error("Error syncing reviews:", error);
      throw error;
    }
  }
}

export const googleBusinessService = new GoogleBusinessProfileService();
