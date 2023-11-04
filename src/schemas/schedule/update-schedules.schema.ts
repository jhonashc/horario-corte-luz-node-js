import Joi from "joi";

const updateSchedulesMessage = {
  "date.base": "El campo {#label} debe ser una fecha válida.",
  "string.base": "El campo {#label} debe ser una cadena de texto.",
  "string.empty": "El campo {#label} no debe estar vacío.",
  "string.max": "El campo {#label} no debe exceder los {#limit} caracteres.",
  "object.base": "El objeto de horario en la posición {#label} no es válido.",
  "object.unknown": "La propiedad {#label} no está permitida en este objeto.",
  "any.required": "El campo {#label} es obligatorio.",
};

export const updateSchedulesSchema = Joi.array()
  .items(
    Joi.object({
      city: Joi.string().required(),
      sector: Joi.string().required(),
      schedule: Joi.string().required(),
      lastUpdate: Joi.date().optional(),
      link: Joi.string().optional(),
    })
  )
  .messages(updateSchedulesMessage)
  .options({ abortEarly: false });
