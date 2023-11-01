import Joi from "joi";

import { paginationSchema } from "../shared/pagination.schema";

const getUserSchedulesMessages = {
  "string.base": "El campo {#label} debe ser una cadena de texto.",
  "string.empty": "El campo {#label} no debe estar vacío.",
};

export const getUserSchedulesSchema = paginationSchema
  .append({
    name: Joi.string().optional(),
  })
  .messages(getUserSchedulesMessages)
  .options({ abortEarly: false });
