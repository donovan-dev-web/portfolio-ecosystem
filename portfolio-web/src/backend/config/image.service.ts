// src/backend/config/image.service.ts
import sharp from 'sharp';
import { put, del } from '@vercel/blob';
import { randomUUID } from 'crypto';

const SIZES = {
  small: 768,
  medium: 1280,
  large: 1920,
};

type ImageVariants = {
  small: string;
  medium: string;
  large: string;
};

const VARIANT_KEYS = ['small', 'medium', 'large'] as const;

function buildSiblingVariantUrls(url: string): string[] {
  try {
    const parsed = new URL(url);
    const match = parsed.pathname.match(/^(.*)-(small|medium|large)(\.[^.]+)$/);

    if (!match) {
      return [url];
    }

    const [, basePath, , ext] = match;

    return VARIANT_KEYS.map((variant) => {
      const sibling = new URL(parsed.toString());
      sibling.pathname = `${basePath}-${variant}${ext}`;
      return sibling.toString();
    });
  } catch {
    return [url];
  }
}

export const ImageService = {
  async processAndUpload(file: File, folder: string) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const id = randomUUID();

    const variants: Record<string, string> = {};

    for (const [key, width] of Object.entries(SIZES)) {
      const resized = await sharp(buffer)
        .resize({
          width,
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: 85 })
        .toBuffer();

      const blob = await put(`${folder}/${id}-${key}.webp`, resized, {
        access: 'public',
      });

      variants[key] = blob.url;
    }

    return variants;
  },

  async deleteImageVariants(variants?: ImageVariants | null) {
    if (!variants) return;

    const urls = new Set<string>();

    for (const url of [variants.small, variants.medium, variants.large]) {
      if (!url) continue;
      for (const siblingUrl of buildSiblingVariantUrls(url)) {
        urls.add(siblingUrl);
      }
    }

    await Promise.allSettled(
      Array.from(urls).map(async (url) => {
        await del(url);
      })
    );
  },
};
