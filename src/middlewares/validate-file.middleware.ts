import { NextFunction, Request, Response } from "express";

import { Schema } from "joi";
import { Schedule } from "@prisma/client";

import { JoiHelper } from "../helpers";

import { CustomError } from "../errors/custom.error";

export const validateScheduleFile = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = req.file as Express.Multer.File | undefined;

      if (!file) {
        throw CustomError.badRequest("Debe seleccionar un archivo.");
      }

      const schedulesAsString: string = file.buffer.toString();

      if (schedulesAsString.trim().length === 0) {
        throw CustomError.badRequest(
          "Lo sentimos, pero el archivo JSON que se ha proporcionado no es válido."
        );
      }

      const schedules: Schedule[] = JSON.parse(schedulesAsString);

      if (!Array.isArray(schedules)) {
        throw CustomError.badRequest(
          "El contenido proporcionado no cumple con el formato esperado de un arreglo de horarios."
        );
      }

      if (schedules.length === 0) {
        throw CustomError.badRequest(
          "Por favor, asegúrese de que el archivo de horarios no esté vacío."
        );
      }

      const message: string | null = JoiHelper.validate(schema, schedules);

      if (message) throw CustomError.badRequest(message);

      next();
    } catch (error) {
      next(error);
    }
  };
};
