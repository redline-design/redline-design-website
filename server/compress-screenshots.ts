import { optimizeImage } from './imageOptimizer';
import { promises as fs } from 'fs';
import path from 'path';

async function compressExistingScreenshots() {
  const screenshotsDir = path.join(process.cwd(), 'attached_assets', 'portfolio_screenshots');
  
  try {
    const files = await fs.readdir(screenshotsDir);
    
    for (const file of files) {
      if (!file.endsWith('.png') && !file.endsWith('.jpg') && !file.endsWith('.jpeg')) {
        continue;
      }
      
      const inputPath = path.join(screenshotsDir, file);
      const stats = await fs.stat(inputPath);
      const sizeKB = stats.size / 1024;
      
      if (sizeKB < 200) {
        console.log(`Skipping ${file} (already ${sizeKB.toFixed(2)}KB)`);
        continue;
      }
      
      console.log(`Processing ${file} (${sizeKB.toFixed(2)}KB)...`);
      
      const baseName = path.basename(file, path.extname(file));
      const outputPath = path.join(screenshotsDir, `${baseName}.webp`);
      
      await optimizeImage(inputPath, outputPath, {
        maxSizeKB: 150,
        quality: 80,
        format: 'webp'
      });
      
      if (inputPath !== outputPath) {
        await fs.unlink(inputPath);
        console.log(`Deleted original: ${file}`);
      }
    }
    
    console.log('✅ Screenshot compression complete!');
  } catch (error) {
    console.error('Error compressing screenshots:', error);
    process.exit(1);
  }
}

compressExistingScreenshots();
