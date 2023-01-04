import { AxiosError, AxiosResponse } from "axios";
import { Request, Response } from "express";
import randomString from "randomstring";
import { API } from "../API";
import { HOSTNAME, PORT, CLIENT_ID, APPLICATION_URL } from "../config";
import { TokenResponse } from "../models/auth/TokenResponse";
import { generateQueryURL } from "../utils/generateQueryURL";
import generateScope from "../utils/generateScope";
import { generateURL } from "../utils/generateURL";

const REDIRECT_URI = generateURL({
  path: "/callback",
  base: HOSTNAME,
  port: PORT,
});

const SCOPE = generateScope(
  "user-read-recently-played",
  "user-read-playback-position",
  "user-read-currently-playing",
  "user-modify-playback-state",
  "user-library-read",
  "user-read-playback-state",
  "playlist-read-collaborative",
  "playlist-read-private"
);

const SPOTIFY_AUTH_ENDPOINT = "https://accounts.spotify.com";

export function auth(req: Request, res: Response) {
  const state = randomString.generate(16);

  const authURL = generateQueryURL(`${SPOTIFY_AUTH_ENDPOINT}/authorize`, {
    response_type: "code",
    client_id: CLIENT_ID,
    scope: SCOPE,
    redirect_uri: REDIRECT_URI,
    state,
  });

  req.session.data = { state, authURL };

  res.redirect(authURL);
}

export function callback(req: Request, res: Response) {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const error = (req.query.error as string) || null;

  if (state === null || state !== req.session.data?.state)
    return res.redirect(
      generateQueryURL(APPLICATION_URL, { error: "state_mismatch" })
    );

  if (error !== null) {
    return res.redirect(generateQueryURL(APPLICATION_URL, { error }));
  }

  const body = {
    redirect_uri: REDIRECT_URI,
    code: code as string,
    grant_type: "authorization_code",
    code_verifier: state,
    client_id: CLIENT_ID,
  };

  (async () => {
    let response: AxiosResponse<TokenResponse>;
    try {
      response = await API.auth.post<TokenResponse>(
        "/api/token",
        new URLSearchParams(body).toString()
      );
      if (response.data && req.session.data?.refreshToken)
        req.session.data.refreshToken = response.data.refresh_token;
      res.redirect(
        generateQueryURL(APPLICATION_URL, {
          token: response.data.access_token,
          expiration: response.data.expires_in.toString(),
        })
      );
    } catch (e: any) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data.body);
      }
      res.redirect(
        generateQueryURL(APPLICATION_URL, {
          error: "server_broken",
        })
      );
    }
  })();
}

export function refresh(req: Request, res: Response) {
  const body = {
    grant_type: "refresh_token",
    client_id: CLIENT_ID,
    refresh_token: req.session.data?.refreshToken,
  };

  (async () => {
    let response: AxiosResponse<TokenResponse>;
    try {
      response = await API.auth.post<TokenResponse>("/api/token", body);

      if (response.data && req.session.data?.refreshToken)
        req.session.data.refreshToken = response.data.refresh_token;

      res.send({
        token: response.data.access_token,
        token_expiration: response.data.expires_in,
      });
    } catch (e) {
      res.sendStatus(500);
    }
  })();
}

export default {
  auth,
  callback,
  refresh,
};
