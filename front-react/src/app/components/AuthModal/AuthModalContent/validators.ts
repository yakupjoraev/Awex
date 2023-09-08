import { object, string } from "yup";
import { MESSAGE_FIELD_REQUIRED } from "./messages";

export const authFormSchema = object({
  login: string().required(MESSAGE_FIELD_REQUIRED),
  password: string().required(MESSAGE_FIELD_REQUIRED),
});
