import { z } from 'zod';

export const PushTokenSchema = z.object({
  token: z.string().min(1, 'Token requis'),
  device: z.enum(['android', 'ios', 'web']).optional(),
});

export type PushTokenInput = z.infer<typeof PushTokenSchema>;
