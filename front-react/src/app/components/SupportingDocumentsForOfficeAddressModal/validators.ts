import { object, array, mixed } from "yup";
import { MESSAGE_FIELD_REQUIRED } from "./messages";

export const SupportingDocumentsForOfficeFormSchema = object({
  files: array().of(mixed()).required(MESSAGE_FIELD_REQUIRED),
});
