import { z } from 'zod';

export const PushTokenSchema = z.object({
  token: z
    .string()
    .min(1, 'Token requis')
    .describe('Token Epo Generer par lapplication Mobile'),
  device: z
    .enum(['android', 'ios', 'web'])
    .optional()
    .describe("Type d'apppareil : android | IOS | Web"),
});

export type PushTokenInput = z.infer<typeof PushTokenSchema>;
