import { PrismaClient, User } from "@prisma/client";

import { LoginUserDto, RegisterUserDto } from "../dtos";

import { comparePasswords, encryptPassword } from "../helpers";

import { CustomError } from "../errors/custom.error";

export class AuthService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async registerUser(registerUserDto: RegisterUserDto) {
    const userFound: User | null = await this.prisma.user.findFirst({
      where: {
        email: registerUserDto.email,
      },
    });

    if (userFound) {
      throw CustomError.badRequest("El correo electrónico ya está ocupado");
    }

    try {
      const newUser: User = await this.prisma.user.create({
        data: {
          ...registerUserDto,
          password: await encryptPassword(registerUserDto.password),
        },
      });

      return {
        username: newUser.username,
        isDarkModeOn: newUser.isDarkModeOn ?? null,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    const userFound: User | null = await this.prisma.user.findFirst({
      where: {
        email: loginUserDto.email,
      },
    });

    if (!userFound) {
      throw CustomError.badRequest(
        "El correo electrónico o la contraseña son incorrectos"
      );
    }

    const comparedPasswords: boolean = await comparePasswords(
      loginUserDto.password,
      userFound.password
    );

    if (!comparedPasswords) {
      throw CustomError.badRequest(
        "El correo electrónico o la contraseña son incorrectos"
      );
    }

    return {
      username: userFound.username,
      isDarkModeOn: userFound.isDarkModeOn ?? null,
    };
  }
}
