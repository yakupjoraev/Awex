import { MESSAGE_FIELD_REQUIRED } from "@constants/messages";
import { object, string } from "yup";

export const companyProfileFormSchema = object({
  companyName: string().required(MESSAGE_FIELD_REQUIRED),
  legalAddress: string().required(MESSAGE_FIELD_REQUIRED),
  country: string().required(MESSAGE_FIELD_REQUIRED),
  taxId: string().required(MESSAGE_FIELD_REQUIRED),
  phone: string().required(MESSAGE_FIELD_REQUIRED),
  web: string().required(MESSAGE_FIELD_REQUIRED),
  bankAccount: string().required(MESSAGE_FIELD_REQUIRED),
});
