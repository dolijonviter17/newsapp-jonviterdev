export const JWT_EXPIRATION_TIME = "20s"; // 20 seconds
export const JWT_SECRET = process.env.JWT_SECRET!;
export const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
export const APP_SCHEME = process.env.EXPO_PUBLIC_SCHEME;
export const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
export const GOOGLE_REDIRECT_URI = `${process.env.EXPO_PUBLIC_BASE_URL}/api/auth/callback`;
export const REFRESH_TOKEN_EXPIRY = "30d"; // 30 days

export const API_URL = "https://newsapi.org";
export const API_KEY = "921ba5b747274facb0fa0541e919b455";
