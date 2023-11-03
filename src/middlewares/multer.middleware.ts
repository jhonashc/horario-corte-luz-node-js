import multer from "multer";

import { MulterHelper } from "../helpers";

const storage = multer.memoryStorage();

const maxSize = 5 * 1024 * 1024; /* 5MB */

export const uploader = multer({
  storage,
  fileFilter: MulterHelper.fileFilter,
  limits: { fileSize: maxSize },
});
