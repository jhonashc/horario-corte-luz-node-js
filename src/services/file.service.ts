import { PrismaClient, Schedule } from "@prisma/client";

import { CustomError } from "../errors/custom.error";

export class FileService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async uploadSingle(file: Express.Multer.File) {
    if (!file) {
      throw CustomError.badRequest("Debe seleccionar un archivo.");
    }

    const schedulesAsString: string = file.buffer.toString();

    if (schedulesAsString.trim() === "") {
      throw CustomError.badRequest("El archivo JSON está vacío.");
    }

    const newSchedules: Schedule[] = JSON.parse(schedulesAsString);

    if (!Array.isArray(newSchedules)) {
      throw CustomError.badRequest(
        "El contenido proporcionado no cumple con el formato esperado de un arreglo de horarios."
      );
    }

    const scheduleCounter: number = newSchedules.length;

    const areTheFieldsValid: boolean = newSchedules.every(
      ({ city, sector, schedule }) => city && sector && schedule
    );

    if (scheduleCounter === 0 || !areTheFieldsValid) {
      throw CustomError.badRequest(
        "Asegúrese de incluir todas las propiedades requeridas en cada horario."
      );
    }

    const updatedSchedules: Promise<Schedule | null>[] = newSchedules.map(
      async (newSchedule) => {
        const scheduleFound = await this.prisma.schedule.findFirst({
          where: {
            city: {
              contains: newSchedule.city,
            },
            sector: {
              contains: newSchedule.sector,
            },
          },
        });

        if (!scheduleFound) return newSchedule;

        await this.prisma.schedule.update({
          where: {
            id: scheduleFound.id,
          },
          data: {
            schedule: newSchedule.schedule,
            lastUpdate: newSchedule.lastUpdate,
            link: newSchedule.link,
          },
        });

        return null;
      }
    );

    const mismatchedSchedules: Array<Schedule | null> = await Promise.all(
      updatedSchedules
    );

    const filteredMismatched = mismatchedSchedules.filter(
      Boolean
    ) as Schedule[];

    const updatedCounter: number = scheduleCounter - filteredMismatched.length;

    return {
      status: true,
      message: `Se han actualizado exitosamente ${updatedCounter} de ${scheduleCounter} horarios.`,
      data: filteredMismatched,
    };
  }
}
