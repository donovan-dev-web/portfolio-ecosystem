const DEFAULT_ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:4200',
  'http://127.0.0.1:4200',
  'https://donovan-dev-web.vercel.app',
  'null',
];

function parseAllowedOrigins(value) {
  if (!value) {
    return DEFAULT_ALLOWED_ORIGINS;
  }

  return value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

const corsConfig = {
  allowedOrigins: parseAllowedOrigins(process.env.CORS_ALLOWED_ORIGINS),
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content', 'Accept', 'Content-Type', 'Authorization'],
};

function isAllowedOrigin(origin) {
  if (!origin) {
    return false;
  }

  return corsConfig.allowedOrigins.includes(origin);
}

module.exports = {
  corsConfig,
  isAllowedOrigin,
};
