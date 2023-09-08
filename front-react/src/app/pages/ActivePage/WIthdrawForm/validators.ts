import { object, string } from "yup";
import { MESSAGE_FIELD_REQUIRED } from "./messages";

export const withdrawFormSchema = object({
  address: string().required(MESSAGE_FIELD_REQUIRED),
});
