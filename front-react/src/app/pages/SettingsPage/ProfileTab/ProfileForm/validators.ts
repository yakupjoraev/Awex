import { object, string } from "yup";
import { MESSAGE_FIELD_REQUIRED, MESSAGE_TG_URL_REQUIRED } from "./messages";

export const profileFormSchema = object().shape({
  name: string().required(MESSAGE_FIELD_REQUIRED),
  email: string().email().required(MESSAGE_FIELD_REQUIRED),
  telegram: string()
    .url()
    .test("is-tg", MESSAGE_TG_URL_REQUIRED, (value) => {
      if (value && value.length) {
        return /(https?:\/\/)?(www[.])?(telegram|t)\.me\/([a-zA-Z0-9_-]*)\/?$/.test(
          value
        );
      }
      return true;
    }),
  currency: string().required(MESSAGE_FIELD_REQUIRED),
});
