import Joi from "joi";

const uploadFileMessages = {
  "date.base": "El campo {#label} debe ser una fecha válida.",
  "string.base": "El campo {#label} debe ser una cadena de texto.",
  "string.empty": "El campo {#label} no debe estar vacío.",
  "string.max": "El campo {#label} no debe exceder los {#limit} caracteres.",
  "any.required": "El campo {#label} es obligatorio.",
};

export const uploadFileSchema = Joi.object()
  .keys({
    city: Joi.string().max(255).required(),
    sector: Joi.string().max(255).required(),
    schedule: Joi.string().max(120).required(),
    link: Joi.string().optional(),
    lastUpdate: Joi.date().optional(),
  })
  .messages(uploadFileMessages)
  .options({ abortEarly: false, stripUnknown: true });
