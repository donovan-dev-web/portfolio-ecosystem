import { z } from 'zod';

export const DocSchema = z.object({
  kind: z.literal('cv'),
  name: z.string().min(1),
  url: z.url(),
  pathname: z.string().min(1),
  contentType: z.literal('application/pdf'),
  size: z.number().int().positive(),
  downloadCount: z.number().int().min(0).optional(),
  lastDownloadedAt: z.coerce.date().optional(),
});
