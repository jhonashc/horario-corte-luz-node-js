import { Router } from "express";

import { FileController } from "../controllers";

import { uploader, validateFile } from "../middlewares";

import { uploadFileSchema } from "../schemas";

import { FileService } from "../services";

export class FileRoutes {
  static get routes(): Router {
    const router = Router();

    const fileService = new FileService();

    const controller = new FileController(fileService);

    router.post(
      "/",
      uploader.single("file"),
      validateFile(uploadFileSchema),
      controller.uploadFile
    );

    return router;
  }
}
