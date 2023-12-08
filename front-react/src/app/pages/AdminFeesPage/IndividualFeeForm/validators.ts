import { MESSAGE_FIELD_REQUIRED } from "@constants/messages";
import { object, string, date } from "yup";

export const individualFeeFormSchema = object({
  nextFee: string()
    .test("is-percentage", "Неверный ввод. Привер ввода: 1.33%.", (val) => {
      if (val === undefined) {
        return undefined;
      } else if (val.startsWith(".")) {
        return /^\.\d+%$/.test(val);
      } else {
        return /^\d+(|\.\d+)%$/.test(val);
      }
    })
    .required(MESSAGE_FIELD_REQUIRED),
  startAt: date(),
});
