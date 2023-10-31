import { Router } from "express";

import { ScheduleController } from "../controllers";

import { validateRequest } from "../middlewares";

import { getSchedulesSchema } from "../schemas";

import { ScheduleService } from "../services";

export class ScheduleRoutes {
  static get routes(): Router {
    const router = Router();

    const scheduleService = new ScheduleService();

    const controller = new ScheduleController(scheduleService);

    router.get(
      "/",
      validateRequest(getSchedulesSchema, "query"),
      controller.getSchedules
    );

    return router;
  }
}
