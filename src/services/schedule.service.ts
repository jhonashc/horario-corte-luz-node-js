import { PrismaClient, Schedule } from "@prisma/client";

import { PaginationDto } from "../dtos";

import { CustomError } from "../errors/custom.error";

export class ScheduleService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getSchedules(paginationDto: PaginationDto) {
    try {
      const { page, limit } = paginationDto;

      const findScheduleCounter = this.prisma.schedule.count();

      const findSchedules = this.prisma.schedule.findMany({
        take: limit,
        skip: (page - 1) * limit,
      });

      const [totalItems, schedules] = await Promise.all([
        findScheduleCounter,
        findSchedules,
      ]);

      return {
        page,
        limit,
        totalItems,
        data: schedules,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
