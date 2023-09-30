import { MESSAGE_FIELD_REQUIRED } from "@constants/messages";
import { object, string, boolean } from "yup";

export const editProjectFormValidator = object({
  companyId: string().required(MESSAGE_FIELD_REQUIRED),
  name: string().required(MESSAGE_FIELD_REQUIRED),
  description: string().required(MESSAGE_FIELD_REQUIRED),
  feePayee: boolean().required(MESSAGE_FIELD_REQUIRED),
  paymentBills: boolean().required(MESSAGE_FIELD_REQUIRED),
  paymentWeb: boolean().required(MESSAGE_FIELD_REQUIRED),
  paymentTelegram: boolean().required(MESSAGE_FIELD_REQUIRED),
  activity: string().required(MESSAGE_FIELD_REQUIRED),
  convertTo: string().required(MESSAGE_FIELD_REQUIRED),
  urlWeb: string().required(MESSAGE_FIELD_REQUIRED),
  urlNotification: string().required(MESSAGE_FIELD_REQUIRED),
  urlPaymentSuccess: string().required(MESSAGE_FIELD_REQUIRED),
  urlPaymentFailure: string().required(MESSAGE_FIELD_REQUIRED),
});
