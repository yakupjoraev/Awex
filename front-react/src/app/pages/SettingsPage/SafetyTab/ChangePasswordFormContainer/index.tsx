import { useState } from "react";
import { ChangePasswordError, ChangePasswordForm } from "../ChangePasswordForm";
import { ApiError, AuthenticatedService, CommonService } from "@awex-api";
import toast from "react-hot-toast";


export function ChangePasswordFormContainer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ChangePasswordError | null>(null);

  const handleChangePassword = (opts: {
    oldPassword: string;
    password: string;
  }) => {
    setLoading(true);
    AuthenticatedService.passwordSet({
      oldPassword: opts.oldPassword,
      password: opts.password,
    })
      .then(() => {
        toast("Пароль обновлен!");
      })
      .catch((error) => {
        if (error instanceof ApiError) {
          const body: unknown = error.body;
          console.log(body)
          if (
            typeof body === "object" &&
            body !== null &&
            "errors" in body &&
            body.errors instanceof Array &&
            body.errors.length &&
            typeof body.errors[0] === "string"
          ) {
            setError({
              type: "GENERAL",
              message: body.errors[0],
            });
          } else {
            setError({
              type: "GENERAL",
              message: "unexpected error",
            });
          }
        } else if (error instanceof Error) {
          setError({ type: "GENERAL", message: error.message });
        } else {
          setError({ type: "GENERAL", message: "unexpected error" });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <ChangePasswordForm
      loading={loading}
      error={error || undefined}
      onChangePassword={handleChangePassword}
    />
  );
}
