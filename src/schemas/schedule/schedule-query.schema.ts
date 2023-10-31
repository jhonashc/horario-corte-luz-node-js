import Joi from "joi";

import { paginationSchema } from "../shared/pagination.schema";

const getSchedulesMessages = {
  "string.base": "El campo {#label} debe ser una cadena de texto.",
  "string.empty": "El campo {#label} no debe estar vacío.",
};

export const getSchedulesSchema = paginationSchema
  .append({
    city: Joi.string().optional(),
    sector: Joi.string().optional(),
  })
  .messages(getSchedulesMessages)
  .options({ abortEarly: false });
