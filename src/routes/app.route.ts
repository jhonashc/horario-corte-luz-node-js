import { Router } from "express";

import { AuthRoutes } from "./auth.route";
import { ScheduleRoutes } from "./schedule.route";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/schedules", ScheduleRoutes.routes);

    return router;
  }
}
