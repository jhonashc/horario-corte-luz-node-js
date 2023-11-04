import { Schema } from "joi";

export class JoiHelper {
  static validate(schema: Schema, dataToValidate: any): string | null {
    const { error } = schema.validate(dataToValidate);

    if (error) {
      const { details } = error;

      const message: string = details
        .map((detail) => detail.message.replace(/['"]/g, ""))
        .join("|");

      return message;
    }

    return null;
  }
}
