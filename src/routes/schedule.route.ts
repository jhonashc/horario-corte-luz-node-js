import { Router } from "express";

import { ScheduleController } from "../controllers";

import {
  uploader,
  validateRequest,
  validateScheduleFile,
} from "../middlewares";

import { getSchedulesSchema, updateSchedulesSchema } from "../schemas";

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

    router.patch(
      "/",
      uploader.single("file"),
      validateScheduleFile(updateSchedulesSchema),
      controller.updateSchedules
    );

    return router;
  }
}
