import { object, string } from "yup";
import { MESSAGE_FIELD_REQUIRED } from "./messages";

export const addNewAddressRequisiteFormSchema = object({
  companyName: string().required(MESSAGE_FIELD_REQUIRED),
  address: string().required(MESSAGE_FIELD_REQUIRED),
});
