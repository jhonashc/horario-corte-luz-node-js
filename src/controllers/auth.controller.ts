import { NextFunction, Request, Response } from "express";

import { LoginUserDto, RegisterUserDto } from "../dtos";

import { AuthService } from "../services";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  registerUser = (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body as RegisterUserDto;

    this.authService
      .registerUser({ username, email, password })
      .then((user) => res.json(user))
      .catch((error) => next(error));
  };

  loginUser = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as LoginUserDto;

    this.authService
      .loginUser({ email, password })
      .then((user) => res.json(user))
      .catch((error) => next(error));
  };
}
