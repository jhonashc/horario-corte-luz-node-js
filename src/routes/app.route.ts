import { Router } from "express";

import { Authroutes } from "./auth.route";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/v1/auth", Authroutes.routes);

    return router;
  }
}
