import axios from "axios";
import { NextFunction, Request, Response } from "express";
import {
  CALLBACK_APPLICATION_URL,
  CLIENT_ID,
  DEVELOPMENT,
  HOST,
  PORT,
} from "../config";
import generateScope from "../utils/generateScope";
import randomString from "randomstring";
import { HTTPError } from "../Errors/Errors";
import { spotify } from "../api/spotify";

declare module "express-session" {
  export interface SessionData {
    STATE: string;
    authURL?: string;
    refreshToken: string;
  }
}

const REDIRECT_URI = axios.getUri({
  baseURL: DEVELOPMENT ? "http://localhost:" + PORT : HOST,
  url: "/callback",
});

const SCOPE = generateScope(
  "user-read-recently-played",
  "user-read-playback-position",
  "user-read-currently-playing",
  "user-modify-playback-state",
  "user-library-read",
  "user-read-playback-state",
  "playlist-read-collaborative"
);

export function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const state = randomString.generate(16);

    const authURL = spotify.getUri({
      baseURL: "https://accounts.spotify.com/",
      url: "/authorize",
      params: {
        response_type: "code",
        client_id: CLIENT_ID,
        scope: SCOPE,
        redirect_uri: REDIRECT_URI,
        state,
      },
    });

    req.session.STATE = state;
    req.session.authURL = authURL;
    req.session.save();

    return res.redirect(authURL);
  } catch (e) {
    next(e);
  }
}

export function callback(
  req: Request<{}, {}, {}, { code: string; state: string; error: string }>,
  res: Response,
  next: NextFunction
) {
  return (async () => {
    try {
      const code = req.query.code;
      const state = req.query.state;
      const error = req.query.error;

      if (error) {
        throw new HTTPError("Something went wrong", 500);
      }

      if (state !== req.session.STATE) {
        throw new HTTPError("State mismatch", 400);
      }

      const body = {
        redirect_uri: REDIRECT_URI,
        code,
        grant_type: "authorization_code",
        code_verifier: state,
        client_id: CLIENT_ID,
      };

      const response = await spotify.post<{}>(
        "/token",
        new URLSearchParams(body).toString()
      );

      const redirect = axios.getUri({
        baseURL: CALLBACK_APPLICATION_URL,
        params: response.data,
      });

      return res.redirect(redirect);
    } catch (e) {
      next(e);
    }
  })();
}

export function refresh(
  req: Request<{}, {}, {}, { refresh_token: string }>,
  res: Response,
  next: NextFunction
) {
  (async () => {
    try {
      const body = {
        grant_type: "refresh_token",
        client_id: CLIENT_ID,
        refresh_token: req.query.refresh_token,
      };

      const response = await spotify.post(
        "/token",
        new URLSearchParams(body).toString()
      );

      res.send(response.data);
    } catch (e) {
      next(e);
    }
  })();
}
