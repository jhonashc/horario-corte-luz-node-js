import { Router } from "express";

import { ScheduleController } from "../controllers";

import { ScheduleService } from "../services";

export class ScheduleRoutes {
  static get routes(): Router {
    const router = Router();

    const scheduleService = new ScheduleService();

    const controller = new ScheduleController(scheduleService);

    router.get("/", controller.getSchedules);

    return router;
  }
}
