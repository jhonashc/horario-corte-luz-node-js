import { NextFunction, Request, Response } from "express";

import { Schema } from "joi";

import { JoiHelper } from "../helpers";

import { CustomError } from "../errors/custom.error";

export type RequestType = "body" | "params" | "query";

export const validateRequest = (schema: Schema, requestType: RequestType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const message: string | null = JoiHelper.validate(
        schema,
        req[requestType]
      );

      if (message) throw CustomError.badRequest(message);

      next();
    } catch (error) {
      next(error);
    }
  };
};
