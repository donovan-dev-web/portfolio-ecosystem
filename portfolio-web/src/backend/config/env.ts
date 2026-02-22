export const env = {
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_EXPIRES: process.env.JWT_EXPIRES ?? '24h',
};
