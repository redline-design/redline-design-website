import { db } from './db';
import { portfolioItems } from '@shared/schema';
import { sql } from 'drizzle-orm';

async function updateScreenshotPaths() {
  try {
    console.log('Updating screenshot paths from .png/.jpg to .webp...');
    
    const result = await db
      .update(portfolioItems)
      .set({
        screenshotUrl: sql`REPLACE(REPLACE(screenshot_url, '.png', '.webp'), '.jpg', '.webp')`
      })
      .where(sql`screenshot_url IS NOT NULL AND (screenshot_url LIKE '%.png' OR screenshot_url LIKE '%.jpg')`);
    
    console.log('✅ Screenshot paths updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating screenshot paths:', error);
    process.exit(1);
  }
}

updateScreenshotPaths();
