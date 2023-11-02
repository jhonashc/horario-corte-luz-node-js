import { NextFunction, Request, Response } from "express";

import { LoginUserDto, RegisterUserDto } from "../dtos";

import { AuthService } from "../services";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  registerUser = (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body as RegisterUserDto;

    const registerUserDto: RegisterUserDto = {
      username: username.trim(),
      email: email.toLowerCase().trim(),
      password: password.trim(),
    };

    this.authService
      .registerUser(registerUserDto)
      .then((user) => res.json(user))
      .catch((error) => next(error));
  };

  loginUser = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as LoginUserDto;

    const loginUserDto: LoginUserDto = {
      email: email.toLowerCase().trim(),
      password: password.trim(),
    };

    this.authService
      .loginUser(loginUserDto)
      .then((user) => res.json(user))
      .catch((error) => next(error));
  };
}
