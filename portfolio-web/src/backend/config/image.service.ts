// src/backend/config/image.service.ts
import sharp from 'sharp';
import { put, del } from '@vercel/blob';
import { randomUUID } from 'crypto';

const SIZES = {
  small: 768,
  medium: 1280,
  large: 1920,
};

export const ImageService = {
  async processAndUpload(file: File, folder: string) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const id = randomUUID();

    const variants: Record<string, string> = {};

    for (const [key, width] of Object.entries(SIZES)) {
      const resized = await sharp(buffer)
        .resize({ width })
        .webp({ quality: 85 })
        .toBuffer();

      const blob = await put(`${folder}/${id}-${key}.webp`, resized, {
        access: 'public',
      });

      variants[key] = blob.url;
    }

    return variants;
  },

  async deleteImageVariants(variants: {
    small: string;
    medium: string;
    large: string;
  }) {
    await Promise.all([
      del(variants.small),
      del(variants.medium),
      del(variants.large),
    ]);
  },
};
