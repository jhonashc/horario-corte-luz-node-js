import { Router } from "express";

import { FileController } from "../controllers";

import { uploader } from "../middlewares";

import { FileService } from "../services";

export class FileRoutes {
  static get routes(): Router {
    const router = Router();

    const fileService = new FileService();

    const controller = new FileController(fileService);

    router.post("/single", uploader.single("file"), controller.uploadFile);

    return router;
  }
}
