export const PORT = process.env.PORT
export const DATABASE_URL = process.env.DATABASE_URL
export const JWT_SECRET = process.env.JWT_SECRET
export const BASE_URL = process.env.BASE_URL
export const NODE_ENV = process.env.NODE_ENV
export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS

// AWS S3
export const AWS_REGION = process.env.AWS_REGION || "ap-south-1";
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || "";
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || "";
export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || "";
export const S3_BASE_URL = process.env.S3_BASE_URL || "";
export const S3_FOLDER_NAME = process.env.S3_FOLDER_NAME || "celebrate-wedding";

// Email
export const EMAIL = process.env.EMAIL || "";
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD || "";
export const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";