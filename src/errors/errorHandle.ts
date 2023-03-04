import { Response, Request, NextFunction } from "express";
import { AppError } from "./AppError";

const errorHandle = (
  err: Error,
  request: Response,
  response: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
      statusCode: err.statusCode,
    });
  }
  return response.status(500).json({
    statusCode: 500,
    message: `Internal Error ${err.message}`,
  });
};

export { errorHandle };
