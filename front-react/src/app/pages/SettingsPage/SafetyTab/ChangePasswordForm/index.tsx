import { useEffect, useId, useState } from "react";
import { changePasswordFormSchema } from "./validators";
import { FieldErrors, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordStrength } from "check-password-strength";
import { useDebounce } from "usehooks-ts";
import classNames from "classnames";

export type ChangePasswordError = { type: "GENERAL"; message?: string };

export interface ChangePasswordFormProps {
  loading: boolean;
  error?: ChangePasswordError;
  onChangePassword: (opts: { oldPassword: string; password: string }) => void;
}

interface ChnagePasswordFormData {
  password: string;
  newPassword: string;
  newPasswordRepeat: string;
}

type PasswordStrength = "weak" | "medium" | "strong";

const DEFAULT_FORM_DATA: ChnagePasswordFormData = {
  password: "",
  newPassword: "",
  newPasswordRepeat: "",
};

export function ChangePasswordForm(props: ChangePasswordFormProps) {
  const oldPasswordId = useId();
  const newPasswordId = useId();
  const newPasswordRepeatId = useId();

  const [newPasswordVisisble, setNewPasswordVisible] = useState(false);
  const [newPasswordRepeatVisible, setNewPasswordRepeatVisible] =
    useState(false);

  const [newPassword, setNewPassword] = useState<string>("");
  const debouncedNewPassword = useDebounce(newPassword, 200);
  const [passwordStrength, setPasswordStrength] =
    useState<PasswordStrength | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<ChnagePasswordFormData>({
    defaultValues: DEFAULT_FORM_DATA,
    resolver: yupResolver(changePasswordFormSchema),
  });

  useEffect(() => {
    if (props.error) {
      setError("root", {
        message: props.error.message || "Ошибка соединения с AWEX!",
      });
    }
  }, [props.error]);

  useEffect(() => {
    if (debouncedNewPassword.length === 0) {
      setPasswordStrength(null);
      return;
    }
    const nextPasswordStrength = getPasswordStrength(debouncedNewPassword);
    setPasswordStrength(nextPasswordStrength);
  }, [debouncedNewPassword]);

  const handleChangePasswordFormSubmit = handleSubmit((formData) => {
    if (formData.newPassword !== formData.newPasswordRepeat) {
      setError("newPasswordRepeat", { message: "Пароль не совпадает!" });
      return;
    }
    const nextPasswordStrength = getPasswordStrength(formData.newPassword);
    if (passwordStrength === "weak") {
      setPasswordStrength(nextPasswordStrength);
      setError("newPassword", { type: "passwordStrength" });
      return;
    }

    props.onChangePassword({
      oldPassword: formData.password,
      password: formData.newPassword,
    });
  });

  const handleNewPasswordInputKeyUp = (
    ev: React.KeyboardEvent<HTMLInputElement>
  ) => {
    setNewPassword(ev.currentTarget.value);
  };

  return (
    <form
      className="settings-profile__select"
      onSubmit={handleChangePasswordFormSubmit}
    >
      <div className="settings-security__header">
        <h3 className="settings-security__title">Сменить пароль</h3>

        <button className="settings-security__header-btn settings-security__header-btn--password third-btn">
          Изменить
        </button>
      </div>

      <div className="settings-security__middle">
        <div
          className={classNames("my-projects__group project-group", {
            "project-group--error": !!errors.password,
          })}
        >
          <label
            className="my-projects__label project-label"
            htmlFor={oldPasswordId}
          >
            Старый пароль
          </label>

          <input
            className="my-projects__input project-input"
            id={oldPasswordId}
            type="password"
            placeholder="Введите старый пароль"
            disabled={props.loading}
            {...register("password")}
          />

          {renderFieldError(errors, "password")}
        </div>

        <div
          className={classNames(
            "my-projects__group project-group",
            getNewPasswordModifier(errors, passwordStrength)
          )}
        >
          <label
            className="my-projects__label project-label"
            htmlFor={newPasswordId}
          >
            Новый пароль
          </label>

          <input
            className="my-projects__input project-input"
            id={newPasswordId}
            type={newPasswordVisisble ? "text" : "password"}
            placeholder="Введите новый пароль"
            disabled={props.loading}
            onKeyUp={handleNewPasswordInputKeyUp}
            {...register("newPassword")}
          />

          <button
            type="button"
            className="project-input__see"
            onClick={() => void setNewPasswordVisible(!newPasswordVisisble)}
          >
            <img
              src={
                newPasswordVisisble
                  ? "/img/icons/eye-close.svg"
                  : "/img/icons/eye-open.svg"
              }
              alt=""
            />
          </button>

          {renderFieldError(errors, "newPassword")}
        </div>

        {renderPasswordStrengthLabel(passwordStrength)}

        <div
          className={classNames("my-projects__group project-group", {
            "project-group--error": !!errors.newPasswordRepeat,
          })}
        >
          <label
            className="my-projects__label project-label"
            htmlFor={newPasswordRepeatId}
          >
            Повторите новый пароль
          </label>

          <input
            className="my-projects__input project-input"
            id={newPasswordRepeatId}
            type={newPasswordRepeatVisible ? "text" : "password"}
            placeholder="Повторите новый пароль"
            disabled={props.loading}
            {...register("newPasswordRepeat")}
          />

          <button
            type="button"
            className="project-input__see"
            onClick={() =>
              void setNewPasswordRepeatVisible(!newPasswordRepeatVisible)
            }
          >
            <img
              src={
                newPasswordRepeatVisible
                  ? "/img/icons/eye-close.svg"
                  : "/img/icons/eye-open.svg"
              }
              alt=""
            />
          </button>

          {renderFieldError(errors, "newPasswordRepeat")}
        </div>

        {errors.root && errors.root.message && (
          <div className="my-projects__error">{errors.root.message}</div>
        )}
      </div>
      <button
        type="submit"
        className="settings-security__btn main-btn"
        disabled={props.loading}
      >
        Сохранить
      </button>
    </form>
  );
}

function renderFieldError(
  errors: FieldErrors<ChnagePasswordFormData>,
  field: keyof ChnagePasswordFormData
) {
  const error = errors[field];
  if (!error || !error.message) {
    return null;
  }
  return <div className="project-error">{error.message}</div>;
}

function getNewPasswordModifier(
  errors: FieldErrors<ChnagePasswordFormData>,
  passwordStrength: PasswordStrength | null
): string | null {
  if (errors.newPassword) {
    return "project-group--error";
  }

  switch (passwordStrength) {
    case "weak": {
      return "project-group--error";
    }
    case "medium":
    case "strong": {
      return "project-group--successfully";
    }
    case null: {
      return null;
    }
  }
}

function renderPasswordStrengthLabel(
  passwordStrength: PasswordStrength | null
) {
  switch (passwordStrength) {
    case "weak": {
      return (
        <div className="settings-security__input-error project-password__complexity project-password__complexity--bad">
          <div className="project-password__complexity-circle"></div>
          <p className="project-password__complexity-text">Плохой пароль</p>
        </div>
      );
    }
    case "medium": {
      return (
        <div className="settings-security__input-error project-password__complexity project-password__complexity--middle">
          <div className="project-password__complexity-circle"></div>
          <p className="project-password__complexity-text">Средний пароль</p>
        </div>
      );
    }
    case "strong": {
      return (
        <div className="settings-security__input-error project-password__complexity project-password__complexity--perfect">
          <div className="project-password__complexity-circle"></div>
          <p className="project-password__complexity-text">Хороший пароль</p>
        </div>
      );
    }
    case null: {
      return null;
    }
  }
}

function getPasswordStrength(password: string): PasswordStrength {
  const strength = passwordStrength(password);
  switch (strength.id) {
    case 0:
    case 1: {
      return "weak";
    }
    case 2: {
      return "medium";
    }
    default: {
      return "strong";
    }
  }
}
