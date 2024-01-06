import { boolean, object, string, ref } from "yup";
import { MESSAGE_FIELD_NOT_MATCH, MESSAGE_FIELD_REQUIRED } from "./messages";

export const confirmFormSchema = object({
  password: string().required(MESSAGE_FIELD_REQUIRED),
  confirmPassword: string()
    .oneOf([ref("password")], MESSAGE_FIELD_NOT_MATCH)
    .required(MESSAGE_FIELD_REQUIRED),
});
