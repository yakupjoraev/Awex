import { MESSAGE_FIELD_REQUIRED } from "@constants/messages"
import { object, string, number, bool, boolean } from "yup"

export const paymentFormValidator = object({
  amount: string(), //.required(MESSAGE_FIELD_REQUIRED),
  currency: string(), //.required(MESSAGE_FIELD_REQUIRED),
  userChain: string(), //.required(MESSAGE_FIELD_REQUIRED),
  useDeposit: bool(),
  withdrawCurrency: string()
    .when("useDeposit", {
      is: true,
      then: (schema) => schema.required(MESSAGE_FIELD_REQUIRED),
    }),
  withdrawNet: string()
  .when("useDeposit", {
    is: true,
    then: (schema) => schema.required(MESSAGE_FIELD_REQUIRED),
  }),
  withdrawWalletId: string()
  .when("useDeposit", {
    is: true,
    then: (schema) => schema.required(MESSAGE_FIELD_REQUIRED),
  }),
  withdrawEmail: string(),
})
