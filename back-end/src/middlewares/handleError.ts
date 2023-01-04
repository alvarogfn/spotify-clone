import { AxiosError } from "axios";
import { NextFunction, Request, Response } from "express";

export default function handleError(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AxiosError) {
    if (err.response?.status && err.response?.data)
      res.status(err.response.status).send({ ...err?.response.data });
    else res.status(500).send(err.message);
  } else if (err instanceof Error) {
    res.status(500).send({ err: err.message, err_name: err.name });
  } else {
    res.status(500).send({ ...err });
  }
}
