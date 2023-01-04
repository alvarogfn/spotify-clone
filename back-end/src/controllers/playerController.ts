import { NextFunction, Request, Response } from "express";
import { API } from "../API";

export function playback(req: Request, res: Response, next: NextFunction) {
  (async () => {
    try {
      const { data, status } = await API.resources.get(`/me/player`, {
        headers: { authorization: req.headers.authorization },
      });

      res.status(status).send(data);
    } catch (e) {
      next(e);
    }
  })();
}

export function start(req: Request, res: Response, next: NextFunction) {
  (async () => {
    try {
      const { data, status } = await API.resources.put(
        `/me/player/play`,
        req?.body,
        {
          headers: { authorization: req.headers.authorization },
        }
      );

      res.status(status).send(data);
    } catch (e) {
      next(e);
    }
  })();
}

export function pause(req: Request, res: Response, next: NextFunction) {
  (async () => {
    try {
      const { data, status } = await API.resources.put(
        `/me/player/pause`,
        req.body,
        {
          headers: { authorization: req.headers.authorization },
        }
      );

      res.status(status).send(data);
    } catch (e) {
      next(e);
    }
  })();
}

export function seekToPosition(
  req: Request,
  res: Response,
  next: NextFunction
) {
  (async () => {
    try {
      const { data, status } = await API.resources.put(
        `/me/player/seek`,
        req.body,
        {
          headers: { authorization: req.headers.authorization },
          params: { ...req.query },
        }
      );

      res.status(status).send(data);
    } catch (e) {
      next(e);
    }
  })();
}

export function shuffle(req: Request, res: Response, next: NextFunction) {
  (async () => {
    try {
      const { data, status } = await API.resources.put(
        `/me/player/shuffle`,
        req.body,
        {
          headers: { authorization: req.headers.authorization },
          params: { ...req.params },
        }
      );

      res.status(status).send(data);
    } catch (e) {
      next(e);
    }
  })();
}

export function recentlyPlayed(
  req: Request,
  res: Response,
  next: NextFunction
) {
  (async () => {
    try {
      const { data, status } = await API.resources.get(
        "/me/player/recently-played",
        {
          headers: {
            authorization: req.headers.authorization,
          },
          params: { ...req.query },
        }
      );

      res.status(status).send(data);
    } catch (e) {
      next(e);
    }
  })();
}

export function currentlyPlaying(
  req: Request,
  res: Response,
  next: NextFunction
) {
  (async () => {
    try {
      const { data, status } = await API.resources.get(
        `/me/player/currently-playing`,
        {
          headers: { authorization: req.headers.authorization },
        }
      );

      res.status(status).send(data);
    } catch (e) {
      next(e);
    }
  })();
}

export default {
  currentlyPlaying,
  pause,
  playback,
  recentlyPlayed,
  shuffle,
  seekToPosition,
  start,
};
