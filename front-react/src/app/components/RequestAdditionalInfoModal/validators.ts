import { object, string } from "yup";
import { MESSAGE_FIELD_REQUIRED } from "./messages";

export const requestAdditionalInfoFormSchema = object({
  message: string().required(MESSAGE_FIELD_REQUIRED),
});
