import { NextFunction, Request, Response } from "express";

import { CreateUserScheduleDto, GetUserSchedulesDto } from "../dtos";

import { UserService } from "../services";

export class UserController {
  constructor(private readonly userService: UserService) {}

  createUserSchedule = (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const { name, scheduleId } = req.body;

    const createUserScheduleDto = {
      name,
      scheduleId,
    } as CreateUserScheduleDto;

    this.userService
      .createUserSchedule(+userId, createUserScheduleDto)
      .then((userSchedule) => res.status(201).json(userSchedule))
      .catch((error) => next(error));
  };

  getUserSchedules = (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const { name, page, limit } = req.query;

    const getUserSchedulesDto = {
      name,
      page: page && +page,
      limit: limit && +limit,
    } as GetUserSchedulesDto;

    this.userService
      .getUserSchedules(+userId, getUserSchedulesDto)
      .then((userSchedules) => res.json(userSchedules))
      .catch((error) => next(error));
  };
}
