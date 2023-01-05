import axios, { AxiosError, AxiosResponse } from "axios";
import { Request, Response } from "express";
import randomString from "randomstring";
import { API } from "../API";
import { CLIENT_ID, APPLICATION_URL, HOST } from "../config";
import { TokenResponse } from "../models/auth/TokenResponse";
import { generateQueryURL } from "../utils/generateQueryURL";
import generateScope from "../utils/generateScope";

const REDIRECT_URI = axios
  .create({
    url: "/callback",
    baseURL: HOST,
  })
  .getUri();

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

export function auth(req: Request, res: Response) {
  const state = randomString.generate(16);
  const authURL = API.auth.getUri({
    url: "/authorize",
    params: {
      response_type: "code",
      client_id: CLIENT_ID,
      scope: SCOPE,
      redirect_uri: REDIRECT_URI,
      state,
    },
  });

  req.session.data = { state, authURL };

  res.redirect(authURL);
}

export function callback(req: Request, res: Response) {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const error = (req.query.error as string) || null;

  if (state === null || state !== req.session.data?.state) {
    const URL = axios
      .create({ url: APPLICATION_URL, params: { error: "state_mismatch" } })
      .getUri();

    return res.redirect(URL);
  }

  if (error !== null) {
    const URL = axios
      .create({ url: APPLICATION_URL, params: { error } })
      .getUri();

    return res.redirect(URL);
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
      return res.redirect(
        generateQueryURL(APPLICATION_URL, {
          token: response.data.access_token,
          expiration: response.data.expires_in.toString(),
        })
      );
    } catch (e: any) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data.body);
      }

      const url = axios
        .create({
          url: APPLICATION_URL,
          params: { error: "server_broken" },
        })
        .getUri();

      return res.redirect(url);
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
