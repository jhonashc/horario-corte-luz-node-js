import Joi from "joi";

const loginUserMessages = {
  "string.base": "El campo {#label} debe ser un string",
  "string.empty": "El campo {#label} no debe estar vacío",
  "string.email": "El campo {#label} debe ser un correo electrónico válido",
  "string.max": "El campo {#label} no debe exceder los {#limit} caracteres",
  "any.required": "El campo {#label} es obligatorio",
};

export const loginUserSchema = Joi.object()
  .keys({
    email: Joi.string().email().max(255).required(),
    password: Joi.string().max(65).required(),
  })
  .messages(loginUserMessages)
  .options({ abortEarly: false });