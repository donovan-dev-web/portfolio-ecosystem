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
  email: z.string().email().describe("Email de l'utilisateur"),
  token: z.string().describe("JWT d'authentification"),
});

export const UserResponse = z.object({
  id: z.string().describe("ID de l'utilisateur"),
  email: z.string().email().describe("Email de l'utilisateur"),
  createdAt: z.string().optional().describe('Date de creation'),
  updatedAt: z.string().optional().describe('Date de mise a jour'),
});

export const UsersListResponse = z.array(UserResponse);

export const UpdateUserBody = z.object({
  email: z.string().email().describe("Nouvel email de l'utilisateur"),
  password: z
    .string()
    .min(8)
    .optional()
    .describe("Nouveau mot de passe optionnel"),
});

export const ChangePasswordBody = z.object({
  oldPassword: z
    .string()
    .min(8)
    .describe("Ancien mot de passe de l'utilisateur"),
  newPassword: z
    .string()
    .min(8)
    .describe("Nouveau mot de passe de l'utilisateur"),
});

export const SignupStatusResponse = z.object({
  signupEnabled: z.boolean().describe('Etat d activation de la route signup'),
});
