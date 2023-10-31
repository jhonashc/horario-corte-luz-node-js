import Joi from "joi";

const registerUserMessages = {
  "string.base": "El campo {#label} debe ser una cadena de texto.",
  "string.empty": "El campo {#label} no debe estar vacío.",
  "string.email": "El campo {#label} debe ser un correo electrónico válido.",
  "string.max": "El campo {#label} no debe exceder los {#limit} caracteres.",
  "any.required": "El campo {#label} es obligatorio.",
};

export const registerUserSchema = Joi.object()
  .keys({
    username: Joi.string().max(40).required(),
    email: Joi.string().email().max(255).required(),
    password: Joi.string().max(65).required(),
  })
  .messages(registerUserMessages)
  .options({ abortEarly: false });
