import bcrypt, { genSaltSync } from "bcrypt";

export const encryptPassword = (password: string): Promise<string> => {
  const salt = genSaltSync();
  return bcrypt.hash(password, salt);
};

export const comparePasswords = (
  password: string,
  receivedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, receivedPassword);
};
