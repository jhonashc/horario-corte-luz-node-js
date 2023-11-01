import { Router } from "express";

import { AuthRoutes } from "./auth.route";
import { ScheduleRoutes } from "./schedule.route";
import { UserRoutes } from "./user.route";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/schedules", ScheduleRoutes.routes);
    router.use("/api/users", UserRoutes.routes);

    return router;
  }
}
