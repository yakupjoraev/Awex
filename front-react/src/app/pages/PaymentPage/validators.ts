import { MESSAGE_FIELD_REQUIRED } from "@constants/messages"
import { object, string, number, bool } from "yup"

export const paymentFormValidator = object({
  amount: string().required(MESSAGE_FIELD_REQUIRED),
  currency: string().required(MESSAGE_FIELD_REQUIRED),
  withdrawCurrency: string(),
  withdrawNet: string(),
  withdrawEmail: string(),
  withdrawWalletId: string(),
})
