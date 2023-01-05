import { config } from "dotenv";

config();

export const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID ?? null;
export const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET ?? null;

export const CALLBACK_APPLICATION_URL =
  process.env.CALLBACK_APPLICATION_URL ?? null;

export const SESSION_SECRET = process.env.SESSION_SECRET ?? null;
export const HOST = process.env.HOST ?? null;
export const PORT = parseInt(process.env.PORT ?? "3000");
export const DEVELOPMENT = process.env.DEVELOPMENT !== "false";
