import { NextFunction, Request, Response } from "express";
import { API } from "../API";

export function currentUser(req: Request, res: Response, next: NextFunction) {
  (async () => {
    try {
      const { data, status } = await API.resources.get(`/me/playlists`, {
        headers: { authorization: req.headers.authorization },
      });

      res.status(status).send(data);
    } catch (e) {
      next(e);
    }
  })();
}

export function getById(req: Request, res: Response, next: NextFunction) {
  (async () => {
    try {
      const { data, status } = await API.resources.get(
        `playlists/${req.params.id}`,
        { headers: { authorization: req.headers.authorization } }
      );

      res.status(status).send(data);
    } catch (e) {
      next(e);
    }
  })();
}

export default {
  getById,
  currentUser,
};
