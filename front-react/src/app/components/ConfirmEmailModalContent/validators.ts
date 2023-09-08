import { boolean, object, string } from "yup";
import { MESSAGE_FIELD_REQUIRED } from "./messages";

export const confirmFormSchema = object({
  code: string().required(MESSAGE_FIELD_REQUIRED),
});
