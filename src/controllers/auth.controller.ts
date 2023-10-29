import { Request, Response } from "express";

import { LoginUserDto, RegisterUserDto } from "../dtos";

import { AuthService } from "../services";

import { CustomError } from "../errors/custom.error";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res
      .status(500)
      .json({ error: "Algo salió mal, inténtalo de nuevo más tarde" });
  };

  registerUser = (req: Request, res: Response) => {
    const [error, registerDto] = RegisterUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    this.authService
      .registerUser(registerDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  };

  loginUser = (req: Request, res: Response) => {
    const [error, loginDto] = LoginUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    this.authService
      .loginUser(loginDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  };
}
