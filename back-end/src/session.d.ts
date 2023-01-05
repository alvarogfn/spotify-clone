import session from "express-session";

declare module "express-session" {
  export interface SessionData {
    STATE: string;
    authURL?: string;
    refreshToken: string;
  }
}
