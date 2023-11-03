import { NextFunction, Request, Response } from "express";

import { Schema } from "joi";
import { Schedule } from "@prisma/client";

import { CustomError } from "../errors/custom.error";

export const validateFile = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = req.file as Express.Multer.File | undefined;

      if (!file) {
        throw CustomError.badRequest("Debe seleccionar un archivo.");
      }

      const schedulesAsString: string = file.buffer.toString();

      if (schedulesAsString.trim() === "") {
        throw CustomError.badRequest("El archivo JSON está vacío.");
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

      for (const index in schedules) {
        const schedule = schedules[index];

        const { error } = schema.validate(schedule);

        if (error) {
          const { details } = error;

          const message: string = details
            .map(
              (detail) =>
                `${detail.message.replace(/['"]/g, "")} - [Posición]: ${
                  parseInt(index) + 1
                }`
            )
            .join("|");

          throw CustomError.badRequest(message);
        }
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
