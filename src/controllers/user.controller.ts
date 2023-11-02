import { NextFunction, Request, Response } from "express";

import { CreateUserScheduleDto, GetUserSchedulesDto } from "../dtos";

import { UserService } from "../services";

export class UserController {
  constructor(private readonly userService: UserService) {}

  createUserSchedule = (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const { name, scheduleId } = req.body as CreateUserScheduleDto;

    const createUserScheduleDto: CreateUserScheduleDto = {
      name: name.trim(),
      scheduleId,
    };

    this.userService
      .createUserSchedule(+userId, createUserScheduleDto)
      .then((userSchedule) => res.status(201).json(userSchedule))
      .catch((error) => next(error));
  };

  getUserSchedules = (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const { name, page, limit } = req.query as GetUserSchedulesDto;

    const getUserSchedulesDto: GetUserSchedulesDto = {
      name: name?.trim(),
      page: page && +page,
      limit: limit && +limit,
    };

    this.userService
      .getUserSchedules(+userId, getUserSchedulesDto)
      .then((userSchedules) => res.json(userSchedules))
      .catch((error) => next(error));
  };
}
