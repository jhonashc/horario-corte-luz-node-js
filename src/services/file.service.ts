import { PrismaClient, Schedule } from "@prisma/client";

export class FileService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async uploadSingle({ buffer }: Express.Multer.File) {
    const newSchedules: Schedule[] = JSON.parse(buffer.toString());

    const updatedSchedules: Promise<Schedule | null>[] = newSchedules.map(
      async (newSchedule) => {
        const scheduleFound: Schedule | null =
          await this.prisma.schedule.findFirst({
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
            lastUpdate:
              newSchedule.lastUpdate && new Date(newSchedule.lastUpdate),
            link: newSchedule.link,
          },
        });

        return null;
      }
    );

    const mismatchedSchedules: (Schedule | null)[] = await Promise.all(
      updatedSchedules
    );

    const filteredMismatched = mismatchedSchedules.filter(
      Boolean
    ) as Schedule[];

    const scheduleCounter: number = newSchedules.length;
    const updatedCounter: number = scheduleCounter - filteredMismatched.length;

    return {
      status: true,
      message: `Se han actualizado exitosamente ${updatedCounter} de ${scheduleCounter} horarios.`,
      data: filteredMismatched,
    };
  }
}
