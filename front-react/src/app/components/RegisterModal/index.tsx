import { useEffect, useId, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import classNames from "classnames";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerFormSchema } from "./validators";
import { passwordStrength } from "check-password-strength";
import { useDebounce } from "usehooks-ts";

export interface RegisterModalProps {
  open: boolean;
  loading: boolean;
  error: string | null;
  onClose: () => void;
  onRegister: (opts: { email: string; password: string }) => void;
}

export type RegisterModalFormData = {
  email: string;
  password: string;
  passwordRepeat: string;
  agreement: boolean;
};

type PasswordStrength = "weak" | "medium" | "strong";

const DEFAULT_FORM_DATA: RegisterModalFormData = {
  email: "",
  password: "",
  passwordRepeat: "",
  agreement: false,
};

export function RegisterModal(props: RegisterModalProps) {
  const emailId = useId();
  const passwordId = useId();
  const passwordRepeatId = useId();
  const agreementId = useId();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordRepeatVisible, setPasswordRepeatVisible] = useState(false);

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const debouncedCurrentPassword = useDebounce(currentPassword, 200);
  const [passwordStrength, setPasswordStrength] =
    useState<PasswordStrength | null>(null);

  useEffect(() => {
    if (props.error) {
      setError("root", { message: "Ошибка рагистации!" });
    }
  }, [props.error]);

  useEffect(() => {
    if (debouncedCurrentPassword.length === 0) {
      setPasswordStrength(null);
      return;
    }
    const nextPasswordStrength = getPasswordStrength(debouncedCurrentPassword);
    setPasswordStrength(nextPasswordStrength);
  }, [debouncedCurrentPassword]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<RegisterModalFormData>({
    defaultValues: DEFAULT_FORM_DATA,
    resolver: yupResolver(registerFormSchema),
  });

  useEffect(() => {
    reset();
    setPasswordStrength(null);
  }, [props.open]);

  const handleRegisterFormSumbit = handleSubmit((formData) => {
    if (formData.password !== formData.passwordRepeat) {
      setError("passwordRepeat", { message: "Пароль не совпадает!" });
      return;
    }

    const nextPasswordStrength = getPasswordStrength(formData.password);
    if (passwordStrength === "weak") {
      setPasswordStrength(nextPasswordStrength);
      setError("password", { type: "passwordStrength" });
      return;
    }

    props.onRegister({ email: formData.email, password: formData.password });
  });

  const handlePasswordInputKeyUp = (
    ev: React.KeyboardEvent<HTMLInputElement>
  ) => {
    setCurrentPassword(ev.currentTarget.value);
  };

  return (
    <div className={classNames("modal modal-enter", { show: props.open })}>
      <form className="modal-content" onSubmit={handleRegisterFormSumbit}>
        <div className="modal-content__header">
          <div className="modal-content__header-logo">
            <img src="/img/icons/logo-mini.svg" alt="" />

            <h2>Регистрация</h2>
          </div>

          <button
            type="button"
            className="close-modal-btn"
            onClick={props.onClose}
          >
            <img src="/img/icons/close-modal.svg" alt="" />
          </button>
        </div>

        <div className="modal-content__main">
          <div
            className={classNames("my-projects__group project-group", {
              "project-group--error": !!errors.email,
            })}
          >
            <label
              className="my-projects__label project-label"
              htmlFor={emailId}
            >
              E-mail
            </label>

            <input
              className="my-projects__input project-input"
              id={emailId}
              type="email"
              autoComplete="username"
              placeholder="Введите e-mail"
              disabled={props.loading}
              {...register("email")}
            />
            {renderFieldError(errors, "email")}
          </div>

          <div
            className={classNames(
              "my-projects__group project-group",
              getPasswordInputModifier(errors, passwordStrength)
            )}
          >
            <label
              className="my-projects__label project-label"
              htmlFor={passwordId}
            >
              Пароль
            </label>

            <input
              className="my-projects__input project-input"
              id={passwordId}
              type={passwordVisible ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Введите пароль"
              disabled={props.loading}
              onKeyUp={handlePasswordInputKeyUp}
              {...register("password")}
            />

            <button
              type="button"
              className="project-input__see"
              onClick={() => void setPasswordVisible(!passwordVisible)}
            >
              <img
                src={
                  passwordVisible
                    ? "/img/icons/eye-close.svg"
                    : "/img/icons/eye-open.svg"
                }
                alt=""
              />
            </button>

            {renderFieldError(errors, "password")}
          </div>

          {renderPasswordStrengthLabel(passwordStrength)}

          <div
            className={classNames("my-projects__group project-group", {
              "project-group--error": !!errors.passwordRepeat,
            })}
          >
            <label
              className="my-projects__label project-label"
              htmlFor={passwordRepeatId}
            >
              Повторите пароль
            </label>

            <input
              className="my-projects__input project-input"
              id={passwordRepeatId}
              type={passwordRepeatVisible ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Введите пароль"
              disabled={props.loading}
              {...register("passwordRepeat")}
            />

            <button
              type="button"
              className="project-input__see"
              onClick={() =>
                void setPasswordRepeatVisible(!passwordRepeatVisible)
              }
            >
              <img
                src={
                  passwordRepeatVisible
                    ? "/img/icons/eye-close.svg"
                    : "/img/icons/eye-open.svg"
                }
                alt=""
              />
            </button>
            {renderFieldError(errors, "passwordRepeat")}
          </div>

          <div className="my-projects__checkbox-view checkbox-group modal-content__checkbox">
            <input
              className="my-projects__checkbox-checkbox checkbox-input"
              id={agreementId}
              type="checkbox"
              {...register("agreement")}
            />

            <label
              className="my-projects__checkbox-label checkbox-label"
              htmlFor={agreementId}
            >
              <div className="my-projects__checkbox-decor checkbox-decor"></div>
              <div className="my-projects__checkbox-text checkbox-text">
                Я принимаю{" "}
                <a href="#" target="_blank">
                  Условия пользовательского соглашения
                </a>
              </div>
            </label>
            {renderFieldError(errors, "agreement")}
          </div>

          {errors.root && errors.root.message && (
            <div className="modal-content__error">{errors.root.message}</div>
          )}
        </div>

        <button
          type="submit"
          className="modal-content__btn second-btn"
          disabled={props.loading}
        >
          Создать аккаунт
        </button>
      </form>
    </div>
  );
}

function renderFieldError(
  errors: FieldErrors<RegisterModalFormData>,
  field: keyof RegisterModalFormData
) {
  const error = errors[field];
  if (!error || !error.message) {
    return null;
  }
  return <div className="my-projects__error">{error.message}</div>;
}

function getPasswordInputModifier(
  errors: FieldErrors<RegisterModalFormData>,
  passwordStrength: PasswordStrength | null
): string | null {
  if (errors.password) {
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
        <div className="project-password__complexity project-password__complexity--bad">
          <div className="project-password__complexity-circle"></div>
          <p className="project-password__complexity-text">Плохой пароль</p>
        </div>
      );
    }
    case "medium": {
      return (
        <div className="project-password__complexity project-password__complexity--middle">
          <div className="project-password__complexity-circle"></div>
          <p className="project-password__complexity-text">Средний пароль</p>
        </div>
      );
    }
    case "strong": {
      return (
        <div className="project-password__complexity project-password__complexity--perfect">
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
