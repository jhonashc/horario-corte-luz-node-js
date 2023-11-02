import multer from "multer";

import { MulterHelper } from "../helpers";

const storage = multer.memoryStorage();

export const uploader = multer({
  storage,
  fileFilter: MulterHelper.fileFilter,
});
