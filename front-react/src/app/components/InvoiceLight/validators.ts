import { MESSAGE_FIELD_REQUIRED } from "@constants/messages";
import { object, string, number } from "yup";

export const invoiceFormValidator = object({
  projectId: string().required(MESSAGE_FIELD_REQUIRED),
  amount: string()
  .transform((value) => {
    value = value.replace(/,/gi, '.')
    value = value.replace(/-/gi, '')
    const floatvalue = parseFloat(value)
    return typeof floatvalue === "number" && isNaN(floatvalue) ? undefined : value
  })
  .required(MESSAGE_FIELD_REQUIRED),
  currency: string().required("Валюта не выбрана.")
});
