// src/backend/auth/auth.service.ts
import { User } from './user.model';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { env } from '@/backend/config/env';
import type { StringValue } from 'ms';
import {
  countUsers,
  createUser,
  deleteUser,
  findUserByEmail,
  findUserById,
  listUsers,
  updateUser,
} from './auth.queries';
import { AuthSettings } from './auth-settings.model';

async function hashPassword(password: string) {
  return argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 131072,
    timeCost: 2,
    parallelism: 4,
  });
}

function sanitizeUser(user: {
  _id?: { toString(): string };
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}) {
  return {
    id: user._id?.toString() || '',
    email: user.email,
    createdAt: user.createdAt?.toISOString(),
    updatedAt: user.updatedAt?.toISOString(),
  };
}

async function getOrCreateAuthSettings() {
  let settings = await AuthSettings.findOne();

  if (!settings) {
    settings = await AuthSettings.create({ signupEnabled: true });
  }

  return settings;
}

export async function signupService(
  email: string,
  password: string
): Promise<string> {
  const settings = await getOrCreateAuthSettings();

  if (!settings.signupEnabled) {
    throw new Error('SIGNUP_DISABLED');
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error('UserAlreadyExists');
  }

  const hashedPassword = await hashPassword(password);

  await createUser(email, hashedPassword);

  return 'Utilisateur créé avec succès';
}

export async function loginService(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user) throw new Error('InvalidCredentials');

  const isValid = await argon2.verify(user.password, password);
  if (!isValid) throw new Error('InvalidCredentials');

  const token = jwt.sign({ userId: user._id.toString() }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES as StringValue,
  });

  return { userId: user._id.toString(), email: user.email, token };
}

export async function listUsersService() {
  const users = await listUsers();
  return users.map((user) => sanitizeUser(user));
}

export async function updateUserService(
  id: string,
  payload: { email: string; password?: string }
) {
  const existingByEmail = await findUserByEmail(payload.email);

  if (existingByEmail && existingByEmail._id.toString() !== id) {
    throw new Error('UserAlreadyExists');
  }

  const nextPayload: { email: string; password?: string } = {
    email: payload.email,
  };

  if (payload.password) {
    nextPayload.password = await hashPassword(payload.password);
  }

  const updated = await updateUser(id, nextPayload);

  if (!updated) {
    return null;
  }

  return sanitizeUser(updated);
}

export async function deleteUserService(id: string) {
  const totalUsers = await countUsers();

  if (totalUsers <= 1) {
    throw new Error('LAST_USER_DELETE_FORBIDDEN');
  }

  return deleteUser(id);
}

export async function changePasswordService(
  userId: string,
  oldPassword: string,
  newPassword: string
) {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error('USER_NOT_FOUND');
  }

  const isValid = await argon2.verify(user.password, oldPassword);

  if (!isValid) {
    throw new Error('INVALID_OLD_PASSWORD');
  }

  user.password = await hashPassword(newPassword);
  await user.save();

  return 'Mot de passe mis a jour avec succes';
}

export async function getSignupStatusService() {
  const settings = await getOrCreateAuthSettings();
  return { signupEnabled: settings.signupEnabled };
}

export async function updateSignupStatusService(signupEnabled: boolean) {
  const settings = await getOrCreateAuthSettings();
  settings.signupEnabled = signupEnabled;
  await settings.save();

  return { signupEnabled: settings.signupEnabled };
}
