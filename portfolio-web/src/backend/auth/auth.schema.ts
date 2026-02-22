// src/backend/auth/auth.schema.ts
import { z } from 'zod';

export const SignupBody = z.object({
  email: z.string().email().describe("Email de l'utilisateur"),
  password: z.string().min(8).describe("Mot de passe de l'utilisateur"),
});

export const LoginBody = z.object({
  email: z.string().email().describe("Email de l'utilisateur"),
  password: z.string().min(8).describe("Mot de passe de l'utilisateur"),
});

export const SignupResponse = z.object({
  message: z.string().describe('Message de confirmation'),
});

export const LoginResponse = z.object({
  userId: z.string().describe("ID de l'utilisateur"),
  token: z.string().describe("JWT d'authentification"),
});
