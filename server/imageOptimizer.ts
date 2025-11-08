import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

export interface ImageOptimizationOptions {
  maxSizeKB?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
}

export async function optimizeImage(
  inputPath: string,
  outputPath: string,
  options: ImageOptimizationOptions = {}
): Promise<void> {
  const {
    maxSizeKB = 150,
    quality = 80,
    format = 'webp'
  } = options;

  const targetSizeBytes = maxSizeKB * 1024;

  try {
    let currentQuality = quality;
    let optimizedBuffer: Buffer;

    do {
      const pipeline = sharp(inputPath);

      if (format === 'webp') {
        pipeline.webp({ quality: currentQuality });
      } else if (format === 'jpeg') {
        pipeline.jpeg({ quality: currentQuality });
      } else {
        pipeline.png({ quality: currentQuality });
      }

      optimizedBuffer = await pipeline.toBuffer();

      if (optimizedBuffer.length > targetSizeBytes && currentQuality > 20) {
        currentQuality -= 5;
      } else {
        break;
      }
    } while (currentQuality > 20);

    await fs.writeFile(outputPath, optimizedBuffer);

    console.log(`Image optimized: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
    console.log(`Size: ${(optimizedBuffer.length / 1024).toFixed(2)}KB, Quality: ${currentQuality}`);
  } catch (error) {
    console.error(`Failed to optimize image ${inputPath}:`, error);
    throw error;
  }
}

export async function optimizeUploadedFile(
  file: Express.Multer.File,
  options: ImageOptimizationOptions = {}
): Promise<string> {
  const {
    format = 'webp'
  } = options;

  const inputPath = file.path;
  const outputDir = path.dirname(inputPath);
  const baseName = path.basename(inputPath, path.extname(inputPath));
  const outputPath = path.join(outputDir, `${baseName}.${format}`);

  await optimizeImage(inputPath, outputPath, options);

  if (inputPath !== outputPath) {
    try {
      await fs.unlink(inputPath);
    } catch (err) {
      console.warn(`Could not delete original file ${inputPath}:`, err);
    }
  }

  return outputPath;
}
