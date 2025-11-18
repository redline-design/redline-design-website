# Integration Code for www.redlinedesignllc.com

This document contains the code you need to add to your website's backend to receive blog posts from Redline OS.

## 1. Create the API Endpoint

Add this file to your website's backend (e.g., `server/redline-routes.ts` or similar):

```typescript
import { Router } from 'express';
import type { Request, Response } from 'express';

const router = Router();

// Middleware to verify Redline OS API key
function verifyRedlineApiKey(req: Request, res: Response, next: Function) {
  const apiKey = req.headers['x-redline-api-key'];
  
  if (!apiKey) {
    return res.status(401).json({ error: 'Missing API key' });
  }
  
  // Verify the API key matches the one you set in Redline OS
  // For security, store this in an environment variable
  const expectedApiKey = process.env.REDLINE_API_KEY;
  
  if (apiKey !== expectedApiKey) {
    return res.status(401).json({ error: 'Invalid API key' });
  }
  
  next();
}

// Endpoint to receive blog posts from Redline OS
router.post('/api/redline/content', verifyRedlineApiKey, async (req: Request, res: Response) => {
  try {
    const {
      title,
      body,
      metaDescription,
      slug,
      imageUrl,
      idempotencyKey,
      remotePostId // Include this to support updates
    } = req.body;
    
    // Validate required fields
    if (!title || !body) {
      return res.status(400).json({ error: 'Missing required fields: title and body' });
    }
    
    // Sanitize HTML content (important for security!)
    // You might want to use a library like 'dompurify' or 'sanitize-html'
    const sanitizedBody = sanitizeHtml(body);
    
    // If remotePostId is provided, try to update the existing post
    if (remotePostId) {
      const existingPost = await db.posts.findUnique({
        where: { id: remotePostId }
      });
      
      if (existingPost) {
        // Update the existing post
        const updatedPost = await db.posts.update({
          where: { id: remotePostId },
          data: {
            title,
            body: sanitizedBody,
            metaDescription,
            slug: slug || generateSlug(title),
            imageUrl,
            idempotencyKey,
            updatedAt: new Date(),
          }
        });
        
        return res.json({ 
          postId: updatedPost.id,
          status: 'updated',
          url: `https://www.redlinedesignllc.com/blog/${updatedPost.slug}`
        });
      }
    }
    
    // Check for duplicate using idempotency key (prevents duplicate posts on retry)
    if (idempotencyKey) {
      const existingPost = await db.posts.findFirst({
        where: { idempotencyKey }
      });
      
      if (existingPost) {
        // Already created, return the existing post ID
        return res.json({ 
          postId: existingPost.id, 
          status: 'already_exists',
          url: `https://www.redlinedesignllc.com/blog/${existingPost.slug}`
        });
      }
    }
    
    // Create a new blog post in your database
    const newPost = await db.posts.create({
      data: {
        title,
        body: sanitizedBody,
        metaDescription,
        slug: slug || generateSlug(title),
        imageUrl,
        idempotencyKey,
        status: 'published',
        publishedAt: new Date(),
      }
    });
    
    // Return the created post ID so Redline OS can track it
    res.json({ 
      postId: newPost.id,
      status: 'created',
      url: `https://www.redlinedesignllc.com/blog/${newPost.slug}`
    });
    
  } catch (error) {
    console.error('Error creating/updating blog post from Redline OS:', error);
    res.status(500).json({ error: 'Failed to create/update blog post' });
  }
});

// Helper function to sanitize HTML
function sanitizeHtml(html: string): string {
  // Implement HTML sanitization here
  // You can use libraries like 'sanitize-html' or 'dompurify'
  return html; // Replace with actual sanitization
}

// Helper function to generate URL-friendly slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default router;
```

## 2. Register the Route

In your main server file (e.g., `server/index.ts`), import and use the route:

```typescript
import redlineRoutes from './redline-routes';

// ... other imports and setup

app.use(redlineRoutes);
```

## 3. Set the API Key Environment Variable

In your website's Replit secrets (or .env file), add:

```
REDLINE_API_KEY=your_client_api_key_from_redline_os
```

You'll copy this value from the Redline OS client detail page where the API key is displayed.

## 4. Install Dependencies (if needed)

If you're using HTML sanitization:

```bash
npm install sanitize-html
npm install @types/sanitize-html --save-dev
```

## Security Notes

1. **Always sanitize HTML** - User-generated content can contain malicious scripts
2. **Use HTTPS** - API key is sent in headers, ensure it's encrypted in transit
3. **Rate limiting** - Consider adding rate limiting to prevent abuse
4. **Log authentication attempts** - Track failed API key attempts for security monitoring
5. **Rotate keys regularly** - Redline OS allows you to regenerate API keys

## Testing the Endpoint

You can test the endpoint manually using curl:

```bash
curl -X POST https://www.redlinedesignllc.com/api/redline/content \
  -H "Content-Type: application/json" \
  -H "X-Redline-API-Key: your_api_key_here" \
  -d '{
    "title": "Test Blog Post",
    "body": "<p>This is a test post from Redline OS.</p>",
    "metaDescription": "A test post to verify the integration",
    "slug": "test-blog-post",
    "imageUrl": "https://example.com/image.jpg",
    "idempotencyKey": "test-12345"
  }'
```

Expected response:
```json
{
  "postId": "abc123",
  "status": "created",
  "url": "https://www.redlinedesignllc.com/blog/test-blog-post"
}
```
