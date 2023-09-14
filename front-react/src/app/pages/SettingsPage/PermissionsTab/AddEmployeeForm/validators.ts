import { object, string, array, boolean } from "yup";
import { MESSAGE_FIELD_REQUIRED } from "./messages";

export const addEmployeeFormSchema = object({
  name: string().required(MESSAGE_FIELD_REQUIRED),
  email: string().required(MESSAGE_FIELD_REQUIRED).email(),
  label: string().required(MESSAGE_FIELD_REQUIRED),
  permissions: array(string().required()).min(1).required(),
});
