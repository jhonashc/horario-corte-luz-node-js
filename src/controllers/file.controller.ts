import { NextFunction, Request, Response } from "express";

import { FileService } from "../services";

export class FileController {
  constructor(private readonly fileService: FileService) {}

  uploadFile = (req: Request, res: Response, next: NextFunction) => {
    const file = req.file as Express.Multer.File;

    this.fileService
      .uploadSingle(file)
      .then((data) => res.json(data))
      .catch((error) => next(error));
  };
}
