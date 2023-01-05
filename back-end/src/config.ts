import { config } from "dotenv";

config();

export const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID ?? null;
export const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET ?? null;
export const HOSTNAME = "localhost";
export const PORT = process.env.PORT ? +process.env.PORT : 3000;
export const APPLICATION_URL = process.env.APPLICATION_WEBSITE ?? null;
export const SESSION_SECRET = process.env.SESSION_SECRET ?? null;
export const HOST = process.env.HOST ?? null;