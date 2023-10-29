import { regularExps } from "../../helpers";

export class RegisterUserDto {
  private constructor(
    public username: string,
    public email: string,
    public password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { username, email, password } = object;

    if (!username) return ["Debe ingresar un nombre de usuario"];
    if (!email) return ["Debe ingresar un correo electr´ónico"];
    if (!regularExps.email.test(email))
      return ["El correo electrónico no es válido"];
    if (!password) return ["Debe ingresar una contraseña"];

    return [undefined, new RegisterUserDto(username, email, password)];
  }
}
