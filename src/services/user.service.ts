import { PrismaClient, Schedule, User, UserSchedule } from "@prisma/client";

import { CreateUserScheduleDto, GetUserSchedulesDto } from "../dtos";

import { CustomError } from "../errors/custom.error";

export class UserService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async createUserSchedule(
    userId: number,
    createUserScheduleDto: CreateUserScheduleDto
  ) {
    const { name, scheduleId } = createUserScheduleDto;

    const userFound: User | null = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!userFound) {
      throw CustomError.notFound(
        `No se ha encontrado al usuario con el ID ${userId}.`
      );
    }

    const scheduleFound: Schedule | null = await this.prisma.schedule.findFirst(
      {
        where: {
          id: scheduleId,
        },
      }
    );

    if (!scheduleFound) {
      throw CustomError.notFound(
        `No se ha encontrado el horario con el ID ${userId}.`
      );
    }

    const userScheduleFound: UserSchedule | null =
      await this.prisma.userSchedule.findFirst({
        where: {
          userId,
          scheduleId,
        },
      });

    if (userScheduleFound) {
      throw CustomError.conflict(
        "El horario ya ha sido previamente guardado por el usuario."
      );
    }

    await this.prisma.userSchedule.create({
      data: {
        name,
        userId,
        scheduleId,
      },
    });

    return {
      status: true,
      message: "El horario ha sido guardado con éxito.",
      data: {
        userId,
        name,
        schedule: scheduleFound,
      },
    };
  }

  public async getUserSchedules(
    userId: number,
    getUserSchedulesDto: GetUserSchedulesDto
  ) {
    const { name: nameToSearch, page = 1, limit = 20 } = getUserSchedulesDto;

    const [userSchedules, userSchedulesCounter] =
      await this.prisma.$transaction([
        this.prisma.userSchedule.findMany({
          where: {
            userId,
            name: {
              contains: nameToSearch,
            },
          },
          select: {
            userId: true,
            name: true,
            schedule: true,
          },
          take: limit,
          skip: (page - 1) * limit,
        }),
        this.prisma.userSchedule.count(),
      ]);

    return {
      status: true,
      page,
      limit,
      totalItems: userSchedulesCounter,
      data: userSchedules,
    };
  }
}
