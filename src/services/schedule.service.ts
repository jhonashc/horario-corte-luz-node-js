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

    const findScheduleCounter = this.prisma.schedule.count();

    const findSchedules = this.prisma.schedule.findMany({
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
    });

    const [totalItems, schedules] = await Promise.all([
      findScheduleCounter,
      findSchedules,
    ]);

    return {
      status: true,
      page,
      limit,
      totalItems,
      data: schedules,
    };
  }
}
