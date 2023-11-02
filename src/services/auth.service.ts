import { PrismaClient, User } from "@prisma/client";

import { LoginUserDto, RegisterUserDto } from "../dtos";

import { BcryptHelper } from "../helpers";

import { CustomError } from "../errors/custom.error";

export class AuthService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async registerUser(registerUserDto: RegisterUserDto) {
    const { username, email, password } = registerUserDto;

    const userFound: User | null = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userFound) {
      throw CustomError.conflict(
        "La dirección de correo electrónico ya se encuentra en uso."
      );
    }

    const encrytepPassword: string = await BcryptHelper.encryptPassword(
      password
    );

    const newUser: User = await this.prisma.user.create({
      data: {
        username,
        email,
        password: encrytepPassword,
      },
    });

    return {
      status: true,
      user: {
        id: newUser.id,
        username: newUser.username,
        isDarkModeOn: newUser.isDarkModeOn ?? null,
      },
    };
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const userFound: User | null = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!userFound) {
      throw CustomError.unauthorized(
        "El correo electrónico o la contraseña son incorrectos."
      );
    }

    const comparedPasswords: boolean = await BcryptHelper.comparePasswords(
      password,
      userFound.password
    );

    if (!comparedPasswords) {
      throw CustomError.unauthorized(
        "El correo electrónico o la contraseña son incorrectos."
      );
    }

    return {
      status: true,
      user: {
        id: userFound.id,
        username: userFound.username,
        isDarkModeOn: userFound.isDarkModeOn ?? null,
      },
    };
  }
}
