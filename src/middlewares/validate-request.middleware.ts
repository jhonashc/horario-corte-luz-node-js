import { NextFunction, Request, Response } from "express";

import { Schema } from "joi";

import { CustomError } from "../errors/custom.error";

export type RequestType = "body" | "params" | "query";

export const validateRequest = (schema: Schema, requestType: RequestType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req[requestType]);

      if (error) {
        const { details } = error;

        const message: string = details
          .map((detail) => detail.message.replace(/['"]/g, ""))
          .join("|");

        throw CustomError.badRequest(message);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
