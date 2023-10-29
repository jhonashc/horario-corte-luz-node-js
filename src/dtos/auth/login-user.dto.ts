import { regularExps } from "../../helpers";

export class LoginUserDto {
  private constructor(public email: string, public password: string) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;

    if (!email) return ["Debe ingresar un correo electrónico"];
    if (!regularExps.email.test(email))
      return ["El correo electrónico no es válido"];
    if (!password) return ["Debe ingresar una contraseña"];

    return [undefined, new LoginUserDto(email, password)];
  }
}
