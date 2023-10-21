import { MESSAGE_FIELD_REQUIRED } from "@constants/messages";
import { object, string, number } from "yup";

export const invoiceFormValidator = object({
  projectId: string().required(MESSAGE_FIELD_REQUIRED),
  name: string().required(MESSAGE_FIELD_REQUIRED).max(256),
  amount: number().moreThan(0).required(MESSAGE_FIELD_REQUIRED),
  currency: string().required("Валюта не выбрана."),
});
