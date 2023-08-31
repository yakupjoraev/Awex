import { object, string } from "yup";
import { MESSAGE_FIELD_REQUIRED } from "./messages";

export const recoverFormSchema = object({
  email: string().required(MESSAGE_FIELD_REQUIRED).email(),
});
