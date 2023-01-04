import { config } from "dotenv";

config();

export const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID ?? "";
export const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET ?? "";
export const HOSTNAME = process.env.HOSTNAME;
export const PORT = process.env.PORT ? +process.env.PORT : undefined;
export const APPLICATION_URL = process.env.APPLICATION_WEBSITE ?? "";
