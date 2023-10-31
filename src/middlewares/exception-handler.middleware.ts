import { NextFunction, Request, Response } from "express";

import { CustomError } from "../errors/custom.error";

export const exceptionHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    const { message, statusCode } = error;

    return res.status(statusCode).json({
      status: false,
      message: message.split(","),
    });
  }

  return res.status(500).json({
    status: false,
    message: "Algo salió mal, inténtalo de nuevo más tarde",
  });
};
