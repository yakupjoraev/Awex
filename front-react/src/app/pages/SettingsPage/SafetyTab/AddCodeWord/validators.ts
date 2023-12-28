import { string, object } from "yup"
import { MESSAGE_FIELD_REQUIRED, msg } from "@constants/messages"

export const addCodeWordFormSchema = object({
  oldWord: string(),
  codeWord: string().required(MESSAGE_FIELD_REQUIRED).min(12, msg.LENGTH_WORD_12_ERROR),
  repeatCodeWord: string().required(MESSAGE_FIELD_REQUIRED).min(12, msg.LENGTH_WORD_12_ERROR),
})