import { NextFunction, Request, Response } from "express";

import { GetSchedulesDto } from "../dtos";

import { ScheduleService } from "../services";

export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  getSchedules = (req: Request, res: Response, next: NextFunction) => {
    const { city, sector, page, limit } = req.query as GetSchedulesDto;

    this.scheduleService
      .getSchedules({
        city,
        sector,
        page: page && +page,
        limit: limit && +limit,
      })
      .then((schedules) => res.json(schedules))
      .catch((error) => next(error));
  };
}
