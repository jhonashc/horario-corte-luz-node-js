import { NextFunction, Request, Response } from "express";

import { Schedule } from "@prisma/client";

import { GetSchedulesDto, UpdateSchedulesDto } from "../dtos";

import { ScheduleService } from "../services";

export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  getSchedules = (req: Request, res: Response, next: NextFunction) => {
    const { city, sector, page, limit } = req.query as GetSchedulesDto;

    const getSchedulesDto: GetSchedulesDto = {
      city: city?.trim(),
      sector: sector?.trim(),
      page: page && +page,
      limit: limit && +limit,
    };

    this.scheduleService
      .getSchedules(getSchedulesDto)
      .then((schedules) => res.json(schedules))
      .catch((error) => next(error));
  };

  updateSchedules = (req: Request, res: Response, next: NextFunction) => {
    const { buffer } = req.file as Express.Multer.File;

    const schedules: Schedule[] = JSON.parse(buffer.toString());

    const updateSchedulesDto: UpdateSchedulesDto = {
      schedules,
    };

    this.scheduleService
      .updateSchedules(updateSchedulesDto)
      .then((schedules) => res.json(schedules))
      .catch((error) => next(error));
  };
}
