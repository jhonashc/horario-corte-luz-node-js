import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import express, { Application } from "express";

class Server {
  private app: Application;
  private port: string;
  private apiRoutes = {};

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(cors());
    this.app.use(morgan("tiny"));
    this.app.use(express.json());
  }

  private routes() {}

  listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 App running on port ${this.port}`);
      console.log(`Running in ${process.env.NODE_ENV}`);
    });
  }
}

export default Server;
