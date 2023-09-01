import { object, string } from "yup";
import { MESSAGE_FIELD_REQUIRED } from "./messages";

export const describeProblemFormSchema = object({
  problem: string().required(MESSAGE_FIELD_REQUIRED),
});
