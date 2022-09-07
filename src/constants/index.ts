export const IS_DEV = process.env.NODE_ENV === 'development';
export const IS_PROD = process.env.NODE_ENV === 'production';
export const ROOT_DIR = process.cwd();

export const ENV = {
  DB_URI: process.env.DB_URI,
  AUDIENCE: process.env.AUDIENCE || 'http://localhost:8080',
  ISSUER_BASE_URL: process.env.ISSUER_BASE_URL,
};
