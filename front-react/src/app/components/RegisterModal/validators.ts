import { boolean, object, string } from "yup";
import { MESSAGE_FIELD_REQUIRED } from "./messages";

export const registerFormSchema = object({
  email: string().required(MESSAGE_FIELD_REQUIRED).email(),
  password: string().required(MESSAGE_FIELD_REQUIRED),
  passwordRepeat: string().required(MESSAGE_FIELD_REQUIRED),
  agreement: boolean()
    .required(MESSAGE_FIELD_REQUIRED)
    .test({
      name: "agreementRequired",
      message: MESSAGE_FIELD_REQUIRED,
      test: (value) => value,
    }),
});
