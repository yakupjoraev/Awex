import { object, string } from "yup";
import { MESSAGE_FIELD_REQUIRED } from "@constants/messages";

export const adminAuthFormSchema = object({
  login: string().required(MESSAGE_FIELD_REQUIRED),
  password: string().required(MESSAGE_FIELD_REQUIRED),
});
