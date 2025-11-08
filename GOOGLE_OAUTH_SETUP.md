# Google Business Profile OAuth Setup

This guide will help you set up Google OAuth authentication to sync 5-star reviews from your Google Business Profile.

## Prerequisites

- A Google Business Profile with reviews
- Admin access to your Google Business Profile
- Access to Google Cloud Console

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note your Project ID for later

## Step 2: Enable Google Business Profile API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google Business Profile API"  
3. Click "Enable"

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. If prompted, configure the OAuth consent screen:
   - User Type: External
   - App name: Redline Design LLC Website
   - User support email: Your email
   - Developer contact: Your email
   - Scopes: Add `https://www.googleapis.com/auth/business.manage`
   - Test users: Add your email (required for testing)
4. Select application type: "Web application"
5. Add authorized redirect URIs:
   - For development: `http://localhost:5000/api/google/callback`
   - For production: `https://your-domain.replit.app/api/google/callback`
6. Click "Create"
7. Copy your Client ID and Client Secret

## Step 4: Find Your Location ID

1. Go to [Google Business Profile Manager](https://business.google.com/)
2. Select your business
3. The URL will look like: `https://business.google.com/locations/{location_id}`
4. Copy the `location_id` from the URL

You'll also need your account ID, which you can find via the API:
- Use the [Google Business Profile API Explorer](https://developers.google.com/my-business/reference/accountmanagement/rest/v1/accounts/list)
- Or run: `GET https://mybusinessaccountmanagement.googleapis.com/v1/accounts`

## Step 5: Configure Environment Variables in Replit

Add these secrets in your Replit project (Secrets tab):

```
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REDIRECT_URI=https://your-repl-name.repl.co/api/google/callback
GOOGLE_BUSINESS_LOCATION=accounts/{account_id}/locations/{location_id}
```

**Important**: Replace the values with your actual credentials from the steps above.

## Step 6: Connect in Admin Dashboard

1. Navigate to `/admin` on your website
2. Expand the "Google Reviews" section
3. Click "Connect Google Account"
4. You'll be redirected to Google to authorize access
5. After authorization, you'll be redirected back to your admin panel
6. Click "Sync Reviews" to fetch your 5-star reviews

## Troubleshooting

### Error: "Access blocked: This app's request is invalid"
- Make sure you've added your email as a test user in the OAuth consent screen
- Verify the redirect URI matches exactly (including http/https)

### Error: "No Google OAuth token found"
- Complete the OAuth flow by clicking "Connect Google Account"
- Make sure all environment variables are set correctly

### Error: "GOOGLE_BUSINESS_LOCATION not configured"
- Set the `GOOGLE_BUSINESS_LOCATION` environment variable
- Format must be: `accounts/{account_id}/locations/{location_id}`

### No reviews appear after syncing
- Verify your Google Business Profile has reviews
- Check that you have 5-star reviews specifically
- Review the console logs for API errors

## API Limits

- Google Business Profile API has rate limits
- Recommended sync frequency: Once per day
- The OAuth token will auto-refresh when needed

## Security Notes

- Never commit your Client Secret to version control
- Use Replit Secrets to store sensitive credentials
- **Important**: OAuth tokens are stored in the database. Ensure your database has proper access controls
- The OAuth flow includes CSRF protection via cryptographically secure state parameters
- Revoke access anytime from the admin panel
- Only authenticated admin users can initiate the OAuth flow
- Tokens automatically refresh when expired

### For Production Deployments

For production use, consider these additional security measures:
- Implement at-rest encryption for refresh tokens in the database
- Use a secrets vault (like HashiCorp Vault or AWS Secrets Manager) for token storage
- Set up database encryption at rest
- Implement audit logging for OAuth token access
- Regularly rotate credentials
