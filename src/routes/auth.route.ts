import { Router } from "express";

import { AuthController } from "../controllers";

import { AuthService } from "../services";

export class Authroutes {
  static get routes(): Router {
    const router = Router();

    const authService = new AuthService();

    const controller = new AuthController(authService);

    router.post("/register", controller.registerUser);

    router.post("/login", controller.loginUser);

    return router;
  }
}
