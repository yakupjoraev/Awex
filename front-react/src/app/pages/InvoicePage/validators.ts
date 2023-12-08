import { MESSAGE_FIELD_REQUIRED } from "@constants/messages";
import { object, string, number, bool } from "yup";

export const invoiceFormValidator = object({
  projectId: string(),
  name: string().required(MESSAGE_FIELD_REQUIRED).max(256),
  amount: string()
    .transform((value) => {
      value = value.replace(/,/gi, '.')
      value = value.replace(/-/gi, '')
      const floatvalue = parseFloat(value)
      return typeof floatvalue === "number" && isNaN(floatvalue) ? undefined : value
    })
    .required(MESSAGE_FIELD_REQUIRED),
  currency: string().required("Валюта не выбрана."),
  useConvertTo: bool(),
  useDeposit: bool(),
  depositCurrency: string(),
  depositAmount: string()
    .transform((value) => {
      value = value.replace(/,/gi, '.')
      value = value.replace(/-/gi, '')
      const floatvalue = parseFloat(value)
      return typeof floatvalue === "number" && isNaN(floatvalue) ? undefined : value
    })
    .when("useDeposit", {
      is: true,
      then: (schema) => schema.required(MESSAGE_FIELD_REQUIRED),
    }),
  depositReturnAt: number()
    .transform((value) =>
      typeof value === "number" && isNaN(value) ? undefined : value
    )
    .when("useDeposit", {
      is: true,
      then: (schema) => schema.moreThan(0).required(MESSAGE_FIELD_REQUIRED),
    }),
});
