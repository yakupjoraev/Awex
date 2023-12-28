import { object, string } from "yup"
import { msg } from "@constants/messages"

export const blockProfileFormSchema = object({
  login: string().required(msg.MESSAGE_FIELD_REQUIRED),
  secretWrod: string().required(msg.MESSAGE_FIELD_REQUIRED),
})