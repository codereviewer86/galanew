import { config } from 'dotenv';
config({ path: `.env` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;

export const EMAIL_CONFIG = {
  user: process.env.EMAIL_USER || '',
  password: process.env.EMAIL_PASSWORD || '',
  recipientEmail: process.env.RECIPIENT_EMAIL || 'info@turkmengala.com'
};
