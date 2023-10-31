import { Router } from "express";

import { AuthController } from "../controllers";

import { validateRequest } from "../middlewares";

import { loginUserSchema, registerUserSchema } from "../schemas";

import { AuthService } from "../services";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const authService = new AuthService();

    const controller = new AuthController(authService);

    router.post(
      "/register",
      validateRequest(registerUserSchema, "body"),
      controller.registerUser
    );

    router.post(
      "/login",
      validateRequest(loginUserSchema, "body"),
      controller.loginUser
    );

    return router;
  }
}
