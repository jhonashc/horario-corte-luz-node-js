import Joi from "joi";

const minLimit = 5;
const maxLimit = 20;

const paginationMessages = {
  "number.base": "El campo {#label} debe ser un número.",
  "number.integer": "El campo {#label} debe ser un número entero.",
  "number.positive": "El campo {#label} debe ser un número positivo.",
  "number.min": `El campo {#label} debe ser como mínimo ${minLimit}.`,
  "number.max": `El campo {#label} no puede ser mayor de ${maxLimit}.`,
};

export const paginationSchema = Joi.object()
  .keys({
    page: Joi.number().integer().positive().optional(),
    limit: Joi.number().integer().min(minLimit).max(maxLimit).optional(),
  })
  .messages(paginationMessages)
  .options({ abortEarly: false });
