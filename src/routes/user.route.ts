import { Router } from "express";

import { UserController } from "../controllers";

import { validateRequest } from "../middlewares";

import {
  getUserSchedulesSchema,
  userIdParamSchema,
  userScheduleSchema,
} from "../schemas";

import { UserService } from "../services";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const userService = new UserService();

    const controller = new UserController(userService);

    router.post(
      "/:userId/schedules",
      validateRequest(userIdParamSchema, "params"),
      validateRequest(userScheduleSchema, "body"),
      controller.createUserSchedule
    );

    router.get(
      "/:userId/schedules",
      validateRequest(userIdParamSchema, "params"),
      validateRequest(getUserSchedulesSchema, "query"),
      controller.getUserSchedules
    );

    return router;
  }
}
