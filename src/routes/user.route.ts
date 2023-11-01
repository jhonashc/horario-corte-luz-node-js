import { Router } from "express";

import { UserController } from "../controllers";

import { validateRequest } from "../middlewares";

import { userIdParamSchema, userScheduleSchema } from "../schemas";

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

    return router;
  }
}
