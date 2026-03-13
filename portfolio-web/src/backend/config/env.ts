// src/backend/config/env.ts
export const env = {
  MONGODB_URI: process.env.MONGODB_URI!,
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRES: process.env.JWT_EXPIRES || '1d',
};
