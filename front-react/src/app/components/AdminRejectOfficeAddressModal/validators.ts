import { object, string } from "yup";
import { MESSAGE_FIELD_REQUIRED } from "./messages";

export const adminRejectOfficeAddressFormSchema = object({
  reason: string().required(MESSAGE_FIELD_REQUIRED),
});
