import "dotenv/config";
import { get } from "env-var";

export const envs = {
  NODE_ENV: get("NODE_ENV").required().asString(),
  PORT: get("PORT").required().asPortNumber(),
  MYSQL_HOST: get("MYSQL_HOST").required().asString(),
  MYSQL_ROOT_PASSWORD: get("MYSQL_ROOT_PASSWORD").required().asString(),
  MYSQL_DATABASE: get("MYSQL_DATABASE").required().asString(),
  MYSQL_PORT: get("MYSQL_PORT").required().asPortNumber(),
};
