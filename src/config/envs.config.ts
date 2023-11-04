import "dotenv/config";
import { get } from "env-var";

export const envs = {
  NODE_ENV: get("NODE_ENV").required().asString(),
  PORT: get("PORT").asPortNumber(),
  DATABASE_URL: get("DATABASE_URL").required().asString(),
  MYSQL_ROOT_PASSWORD: get("MYSQL_ROOT_PASSWORD").asString(),
  MYSQL_DATABASE: get("MYSQL_DATABASE").asString(),
  MYSQL_HOST: get("MYSQL_HOST").asString(),
  MYSQL_PORT: get("MYSQL_PORT").asPortNumber(),
};
