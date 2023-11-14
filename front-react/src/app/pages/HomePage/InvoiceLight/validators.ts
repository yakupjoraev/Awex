import { MESSAGE_FIELD_REQUIRED } from "@constants/messages";
import { object, string, number } from "yup";

export const invoiceFormValidator = object({
  projectId: string().required(MESSAGE_FIELD_REQUIRED),
  amount: number()
    .transform((value) =>
      typeof value === "number" && isNaN(value) ? undefined : value
    )
    .moreThan(0)
    .required(MESSAGE_FIELD_REQUIRED),
  currency: string().required("Валюта не выбрана.")
});
