import cors from "cors";
import morgan from "morgan";
import express, { Application } from "express";

import { envs } from "./config/envs.config";

import { exceptionHandler } from "./middlewares";

import { AppRoutes } from "./routes/app.route";

class Server {
  private app: Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = envs.PORT || 8000;

    this.middlewares();
    this.routes();
    this.customMiddlewares();
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private customMiddlewares(): void {
    this.app.use(exceptionHandler);
  }

  private routes(): void {
    this.app.use(AppRoutes.routes);
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`🚀 App running on port ${this.port}`);
      console.log(`Running in ${envs.NODE_ENV}`);
    });
  }
}

export default Server;
