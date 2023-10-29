import cors from "cors";
import morgan from "morgan";
import express, { Application } from "express";

import { envs } from "./config/envs";

import { AppRoutes } from "./routes/app.route";

class Server {
  private app: Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = envs.PORT || 8000;

    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(cors());
    this.app.use(morgan("tiny"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private routes() {
    this.app.use(AppRoutes.routes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 App running on port ${this.port}`);
      console.log(`Running in ${envs.NODE_ENV}`);
    });
  }
}

export default Server;
