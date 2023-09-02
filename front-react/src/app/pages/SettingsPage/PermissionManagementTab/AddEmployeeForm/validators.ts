import { object, string } from "yup";
import { MESSAGE_FIELD_REQUIRED } from "./messages";

export const addEmployeeFormSchema = object({
  email: string().required(MESSAGE_FIELD_REQUIRED).email(),
  role: string()
    .oneOf(["worker", "manager", "admin"])
    .required(MESSAGE_FIELD_REQUIRED),
});
