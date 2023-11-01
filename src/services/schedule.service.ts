import { PrismaClient } from "@prisma/client";

import { GetSchedulesDto } from "../dtos";

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
}
