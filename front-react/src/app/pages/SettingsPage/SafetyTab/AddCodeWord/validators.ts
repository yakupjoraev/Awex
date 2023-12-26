import { string, object } from "yup"
import { MESSAGE_FIELD_REQUIRED } from "@constants/messages"

export const addCodeWordFormSchema = object({
  codeWord: string().required(MESSAGE_FIELD_REQUIRED),
  repeatCodeWord: string().required(MESSAGE_FIELD_REQUIRED),
})