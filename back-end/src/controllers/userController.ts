import { NextFunction, Request, Response } from "express";
import { API } from "../API";

export function me(req: Request, res: Response, next: NextFunction) {
  (async () => {
    try {
      const { data, status } = await API.resources.get(`/me`, {
        headers: { authorization: req.headers.authorization },
      });

      res.status(status).send(data);
    } catch (e) {
      next(e);
    }
  })();
}

export default { me };
