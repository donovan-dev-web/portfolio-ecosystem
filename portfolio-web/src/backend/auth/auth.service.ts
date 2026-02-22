// src/backend/auth/auth.service.ts
import { User } from './user.model';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { env } from '@/backend/config/env';
import type { StringValue } from 'ms';

export async function signupService(
  email: string,
  password: string
): Promise<string> {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('UserAlreadyExists');
  }

  const hashedPassword = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 131072,
    timeCost: 2,
    parallelism: 4,
  });

  const user = new User({ email, password: hashedPassword });
  await user.save();

  return 'Utilisateur créé avec succès';
}

export async function loginService(email: string, password: string) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('InvalidCredentials');

  const isValid = await argon2.verify(user.password, password);
  if (!isValid) throw new Error('InvalidCredentials');

  const token = jwt.sign({ userId: user._id.toString() }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES as StringValue,
  });

  return { userId: user._id.toString(), token };
}
