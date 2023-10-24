import { MESSAGE_FIELD_REQUIRED } from "@constants/messages";
import { object, string, number, bool } from "yup";

export const invoiceFormValidator = object({
  projectId: string(),
  name: string().required(MESSAGE_FIELD_REQUIRED).max(256),
  amount: number()
    .transform((value) =>
      typeof value === "number" && isNaN(value) ? undefined : value
    )
    .moreThan(0)
    .required(MESSAGE_FIELD_REQUIRED),
  currency: string().required("Валюта не выбрана."),
  useConvertTo: bool(),
  useDeposit: bool(),
  depositCurrency: string(),
  depositAmount: number()
    .transform((value) =>
      typeof value === "number" && isNaN(value) ? undefined : value
    )
    .when("useDeposit", {
      is: true,
      then: (schema) => schema.moreThan(0).required(MESSAGE_FIELD_REQUIRED),
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
