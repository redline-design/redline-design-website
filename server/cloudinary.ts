import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadResult {
  url: string;
  publicId: string;
}

export async function uploadToCloudinary(
  filePath: string,
  folder: string,
  options: { maxWidth?: number; quality?: number } = {}
): Promise<UploadResult> {
  const { maxWidth = 800, quality = 80 } = options;

  const result = await cloudinary.uploader.upload(filePath, {
    folder: `redline-design/${folder}`,
    resource_type: 'image',
    transformation: [
      { width: maxWidth, crop: 'limit' },
      { quality: quality, fetch_format: 'auto' }
    ],
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

export function isCloudinaryConfigured(): boolean {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
}

export default cloudinary;
