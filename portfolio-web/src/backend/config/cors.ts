const DEFAULT_ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:4200',
  'http://127.0.0.1:4200',
  'https://donovan-dev-web.vercel.app',
  'null',
];

function parseAllowedOrigins(value?: string) {
  if (!value) {
    return DEFAULT_ALLOWED_ORIGINS;
  }

  return value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export const corsConfig = {
  allowedOrigins: parseAllowedOrigins(process.env.CORS_ALLOWED_ORIGINS),
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export function isAllowedCorsOrigin(origin: string | null) {
  if (!origin) {
    return false;
  }

  return corsConfig.allowedOrigins.includes(origin);
}
