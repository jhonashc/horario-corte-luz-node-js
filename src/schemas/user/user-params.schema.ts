import Joi from "joi";

const userIdMessages = {
  "number.base": "El campo {#label} debe ser un número.",
  "number.integer": "El campo {#label} debe ser un número entero.",
  "number.positive": "El campo {#label} debe ser un número positivo.",
  "any.required": "El campo {#label} es obligatorio.",
};

export const userIdParamSchema = Joi.object()
  .keys({
    userId: Joi.number()
      .integer()
      .positive()
      .required()
      .messages(userIdMessages),
  })
  .options({ abortEarly: false, stripUnknown: true });
