import { google } from 'googleapis';
import { storage } from './storage';
import type { InsertGoogleToken } from '@shared/schema';

// OAuth2 scopes for Google Business Profile API
const SCOPES = [
  'https://www.googleapis.com/auth/business.manage',
];

export class GoogleOAuthService {
  private oauth2Client;

  constructor() {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5000/api/google/callback';

    if (!clientId || !clientSecret) {
      console.warn('Google OAuth credentials not configured');
      this.oauth2Client = null as any;
      return;
    }

    this.oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUri
    );
  }

  /**
   * Generate OAuth authorization URL with CSRF protection
   */
  getAuthorizationUrl(state: string): string {
    if (!this.oauth2Client) {
      throw new Error('Google OAuth not configured');
    }

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
      prompt: 'consent', // Force consent to get refresh token
      state, // CSRF protection
    });
  }

  /**
   * Exchange authorization code for tokens
   */
  async getTokensFromCode(code: string): Promise<void> {
    if (!this.oauth2Client) {
      throw new Error('Google OAuth not configured');
    }

    try {
      const { tokens } = await this.oauth2Client.getToken(code);
      
      if (!tokens.access_token || !tokens.refresh_token) {
        throw new Error('Failed to obtain tokens');
      }

      // Save tokens to database
      const tokenData: InsertGoogleToken = {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresAt: new Date(tokens.expiry_date || Date.now() + 3600 * 1000),
        scope: tokens.scope || SCOPES.join(' '),
        tokenType: tokens.token_type || 'Bearer',
      };

      await storage.saveGoogleToken(tokenData);
      
      // Set credentials for future use
      this.oauth2Client.setCredentials(tokens);
      
      console.log('Google OAuth tokens saved successfully');
    } catch (error) {
      console.error('Error exchanging code for tokens:', error);
      throw error;
    }
  }

  /**
   * Get valid access token (refreshes if needed)
   */
  async getValidAccessToken(): Promise<string> {
    if (!this.oauth2Client) {
      throw new Error('Google OAuth not configured');
    }

    const savedToken = await storage.getGoogleToken();
    
    if (!savedToken) {
      throw new Error('No Google OAuth token found. Please authenticate first.');
    }

    // Set credentials
    this.oauth2Client.setCredentials({
      access_token: savedToken.accessToken,
      refresh_token: savedToken.refreshToken,
      expiry_date: savedToken.expiresAt.getTime(),
    });

    // Check if token is expired or will expire soon (within 5 minutes)
    const expiresIn = savedToken.expiresAt.getTime() - Date.now();
    const needsRefresh = expiresIn < 5 * 60 * 1000;

    if (needsRefresh) {
      console.log('Access token expired, refreshing...');
      try {
        const { credentials } = await this.oauth2Client.refreshAccessToken();
        
        if (!credentials.access_token) {
          throw new Error('Failed to refresh access token');
        }

        // Update stored token
        const tokenData: InsertGoogleToken = {
          accessToken: credentials.access_token,
          refreshToken: credentials.refresh_token || savedToken.refreshToken,
          expiresAt: new Date(credentials.expiry_date || Date.now() + 3600 * 1000),
          scope: savedToken.scope,
          tokenType: credentials.token_type || 'Bearer',
        };

        await storage.saveGoogleToken(tokenData);
        
        return credentials.access_token;
      } catch (error) {
        console.error('Error refreshing token:', error);
        throw new Error('Failed to refresh access token. Please re-authenticate.');
      }
    }

    return savedToken.accessToken;
  }

  /**
   * Check if OAuth is configured and we have valid tokens
   */
  async hasValidToken(): Promise<boolean> {
    try {
      const token = await storage.getGoogleToken();
      return !!token;
    } catch {
      return false;
    }
  }

  /**
   * Revoke access and delete tokens
   */
  async revokeAccess(): Promise<void> {
    try {
      const token = await storage.getGoogleToken();
      if (token) {
        if (this.oauth2Client) {
          await this.oauth2Client.revokeToken(token.accessToken);
        }
        await storage.deleteGoogleToken(token.id);
      }
    } catch (error) {
      console.error('Error revoking access:', error);
      throw error;
    }
  }
}

export const googleOAuthService = new GoogleOAuthService();
