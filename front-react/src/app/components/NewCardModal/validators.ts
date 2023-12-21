import { object, string, number } from "yup";
import { MESSAGE_FIELD_REQUIRED, MESSAGE_EXPIRED_INCORRECT } from "./messages";

export const newCardFormSchema = object({
  cardName: string().required(MESSAGE_FIELD_REQUIRED),
  cardNumber: string().required(MESSAGE_FIELD_REQUIRED),
  cardMonth: number()
    .min(1, MESSAGE_EXPIRED_INCORRECT)
    .max(12, MESSAGE_EXPIRED_INCORRECT)
    .transform((value, originalValue) => {
      // If the value is an empty string, return it as-is
      if (originalValue === "") {
        return undefined;
      }
      // Otherwise, attempt to convert the string to a number
      const parsedValue = parseInt(value, 10);
      return isNaN(parsedValue) ? undefined : parsedValue;
    })
    .nullable()
    .required(MESSAGE_FIELD_REQUIRED),
  cardYear: number()
    .min(new Date().getFullYear(), MESSAGE_EXPIRED_INCORRECT)
    .max(new Date().getFullYear() + 10, MESSAGE_EXPIRED_INCORRECT)
    .transform((value, originalValue) => {
      // If the value is an empty string, return it as-is
      if (originalValue === "") {
        return undefined;
      }
      // Otherwise, attempt to convert the string to a number
      const parsedValue = parseInt(value, 10);
      return isNaN(parsedValue) ? undefined : parsedValue;
    })
    .nullable()
    .required(MESSAGE_FIELD_REQUIRED),
});
