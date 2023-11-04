import { PrismaClient, Schedule } from "@prisma/client";

import { GetSchedulesDto, UpdateSchedulesDto } from "../dtos";

export class ScheduleService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getSchedules(getSchedulesDto: GetSchedulesDto) {
    const {
      city: cityToSearch,
      sector: sectorToSearch,
      page = 1,
      limit = 20,
    } = getSchedulesDto;

    const [schedules, scheduleCounter] = await this.prisma.$transaction([
      this.prisma.schedule.findMany({
        where: {
          city: {
            contains: cityToSearch,
          },
          sector: {
            contains: sectorToSearch,
          },
        },
        take: limit,
        skip: (page - 1) * limit,
      }),
      this.prisma.schedule.count(),
    ]);

    return {
      status: true,
      page,
      limit,
      totalItems: scheduleCounter,
      data: schedules,
    };
  }

  public async updateSchedules(updateSchedulesDto: UpdateSchedulesDto) {
    const { schedules } = updateSchedulesDto;

    const updatedSchedules: Promise<Schedule | null>[] = schedules.map(
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
            lastUpdate: newSchedule.lastUpdate && new Date(newSchedule.lastUpdate),
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

    const scheduleCounter: number = schedules.length;
    const updatedCounter: number = scheduleCounter - filteredMismatched.length;

    return {
      status: true,
      message: `Se han actualizado exitosamente ${updatedCounter} de ${scheduleCounter} horarios.`,
      data: filteredMismatched,
    };
  }
}
