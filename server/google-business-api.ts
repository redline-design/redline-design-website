import { storage } from "./storage";
import { googleOAuthService } from "./google-oauth";
import type { InsertReview } from "@shared/schema";
import { google } from 'googleapis';

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
  private locationName: string;

  constructor() {
    // Format: accounts/{account_id}/locations/{location_id}
    this.locationName = process.env.GOOGLE_BUSINESS_LOCATION || "";
  }

  /**
   * Fetch reviews from Google Business Profile API with pagination
   * https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews/list
   */
  async fetchReviews(): Promise<GoogleReviewData[]> {
    if (!this.locationName) {
      throw new Error("GOOGLE_BUSINESS_LOCATION not configured. Please set it to: accounts/{account_id}/locations/{location_id}");
    }

    try {
      // Get valid OAuth access token
      const accessToken = await googleOAuthService.getValidAccessToken();
      
      // Initialize Google My Business API client
      const auth = new google.auth.OAuth2();
      auth.setCredentials({ access_token: accessToken });
      
      // Fetch all reviews with pagination
      const allReviews: GoogleReviewData[] = [];
      let pageToken: string | undefined;

      do {
        const url = new URL(`https://mybusinessaccountmanagement.googleapis.com/v1/${this.locationName}/reviews`);
        if (pageToken) {
          url.searchParams.append('pageToken', pageToken);
        }
        url.searchParams.append('pageSize', '50'); // Max page size
        
        const response = await fetch(url.toString(), {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Google API error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        if (data.reviews) {
          allReviews.push(...data.reviews);
        }
        pageToken = data.nextPageToken;
      } while (pageToken);

      return allReviews;
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
