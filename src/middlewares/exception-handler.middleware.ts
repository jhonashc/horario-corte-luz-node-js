import { NextFunction, Request, Response } from "express";

import { MulterError } from "multer";

import { CustomError } from "../errors/custom.error";

export const exceptionHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const defualtMessage: string =
    "Algo salió mal, inténtalo de nuevo más tarde.";

  if (error instanceof CustomError) {
    const { message, statusCode } = error;

    return res.status(statusCode).json({
      status: false,
      message: message.includes("|") ? message.split("|") : message,
    });
  } else if (error instanceof MulterError) {
    const isFileSize: boolean = error.code === "LIMIT_FILE_SIZE";

    return res.status(400).json({
      status: false,
      message: isFileSize
        ? "Lo sentimos, no es posible subir archivos de más de 5MB."
        : defualtMessage,
    });
  }

  return res.status(500).json({
    status: false,
    message: defualtMessage,
  });
};
