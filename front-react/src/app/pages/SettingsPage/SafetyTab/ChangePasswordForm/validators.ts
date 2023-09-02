import { object, string } from "yup";
import { MESSAGE_FIELD_REQUIRED } from "./messages";

export const changePasswordFormSchema = object({
  password: string().required(MESSAGE_FIELD_REQUIRED),
  newPassword: string().required(MESSAGE_FIELD_REQUIRED),
  newPasswordRepeat: string().required(MESSAGE_FIELD_REQUIRED),
});
