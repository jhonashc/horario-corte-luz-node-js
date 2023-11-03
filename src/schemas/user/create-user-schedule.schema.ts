import Joi from "joi";

const nameMessages = {
  "string.base": "El campo {#label} debe ser una cadena de texto.",
  "string.empty": "El campo {#label} no debe estar vacío.",
  "string.email": "El campo {#label} debe ser un correo electrónico válido.",
  "string.max": "El campo {#label} no debe exceder los {#limit} caracteres.",
  "any.required": "El campo {#label} es obligatorio.",
};

const scheduleIdMessages = {
  "number.base": "El campo {#label} debe ser un número.",
  "number.integer": "El campo {#label} debe ser un número entero.",
  "number.positive": "El campo {#label} debe ser un número positivo.",
  "any.required": "El campo {#label} es obligatorio.",
};

export const userScheduleSchema = Joi.object()
  .keys({
    name: Joi.string().max(255).required().messages(nameMessages),
    scheduleId: Joi.number()
      .integer()
      .positive()
      .required()
      .messages(scheduleIdMessages),
  })
  .options({ abortEarly: false, stripUnknown: true });
