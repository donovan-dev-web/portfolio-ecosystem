import { z } from 'zod';

export const MessagesSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().max(28).optional(),
  content: z.string().min(1).max(2000),
});

export const MessageReadSchema = z.object({
  read: z.literal(true),
  dateRead: z.coerce.date().optional(),
});
