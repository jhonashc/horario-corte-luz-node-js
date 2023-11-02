import { Request } from "express";

import { CustomError } from "../errors/custom.error";

export class MulterHelper {
  static fileFilter(
    req: Request,
    file: Express.Multer.File,
    callback: Function
  ) {
    const validExtensions: string[] = ["json"];
    const fileExtension: string = file.mimetype.split("/")[1];

    if (!validExtensions.includes(fileExtension)) {
      return callback(
        CustomError.badRequest(
          "El archivo que intentó cargar no es un archivo JSON válido."
        ),
        false
      );
    }

    return callback(null, true);
  }
}
