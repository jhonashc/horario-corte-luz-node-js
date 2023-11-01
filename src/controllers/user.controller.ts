import { NextFunction, Request, Response } from "express";

import { CreateUserScheduleDto } from "../dtos";

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
}
