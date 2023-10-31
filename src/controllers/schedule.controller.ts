import { Request, Response } from "express";

import { PaginationDto } from "../dtos";

import { ScheduleService } from "../services";

import { CustomError } from "../errors/custom.error";

export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res
      .status(500)
      .json({ error: "Algo salió mal, inténtalo de nuevo más tarde" });
  };

  getSchedules = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;

    const city = req.query.city as string;
    const sector = req.query.sector as string;

    const [error, paginationDto] = PaginationDto.create(+page, +limit);

    if (error) return res.status(400).json({ error });

    this.scheduleService
      .getSchedules(paginationDto!, city, sector)
      .then((schedules) => res.json(schedules))
      .catch((error) => this.handleError(error, res));
  };
}
