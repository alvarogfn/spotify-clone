import { AxiosError } from "axios";
import { NextFunction, Request, Response } from "express";

export default function logError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AxiosError) {
    console.log(err.response?.data);
    console.log(err.message);
  } else console.log(err);
  next(err);
}
