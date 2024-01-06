import { useEffect, useId, useState } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordStrength } from "check-password-strength";
import classNames from "classnames";
import { confirmFormSchema } from "./validators";

export interface NewPasswordModalProps {
  open: boolean;
  loading: boolean;
  title: string;
  error?: { type: "unknown"; message?: string };
  onClose: () => void;
  onSubmitNewPassword: (opt: { password: string }) => void;
}

type PasswordStrength = "weak" | "medium" | "strong";

interface NewPasswordModalFormData {
  password: string;
  confirmPassword: string;
}

const DEFAULT_FORM_DATA: NewPasswordModalFormData = {
  password: "",
  confirmPassword: "",
};

export function NewPasswordModal(props: NewPasswordModalProps) {
  const passwordId = useId();
  const passwordRepeatId = useId();
  const [passwordStrength, setPasswordStrength] =
    useState<PasswordStrength | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordRepeatVisible, setPasswordRepeatVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<NewPasswordModalFormData>({
    defaultValues: DEFAULT_FORM_DATA,
    resolver: yupResolver(confirmFormSchema),
  });

  useEffect(() => {
    if (props.error) {
      setError("root", {
        message: props.error.message || "Ошибка верификации!",
      });
    }
  }, [props.error]);

  useEffect(() => {
    reset();
  }, [props.open]);

  const handleConfirmFormSubmit = handleSubmit((formData) => {
    const nextPasswordStrength = getPasswordStrength(formData.password);
    if (passwordStrength === "weak") {
      setPasswordStrength(nextPasswordStrength);
      setError("password", { type: "passwordStrength" });
      return;
    }

    props.onSubmitNewPassword({ password: formData.password });
  });

  const handlePasswordInputKeyUp = (
    ev: React.KeyboardEvent<HTMLInputElement>
  ) => {
    setCurrentPassword(ev.currentTarget.value);
  };

  return (
    <form className="modal-content" onSubmit={handleConfirmFormSubmit}>
      <div className="modal-content__header">
        <div className="modal-content__header-logo">
          <img src="/img/icons/logo-mini.svg" alt="" />
          <h2>{props.title}</h2>
        </div>
        <button className="close-modal-btn" onClick={props.onClose}>
          <img src="/img/icons/close-modal.svg" alt="" />
        </button>
      </div>
      <div className="modal-content__main">
        <p className="modal-content__text">Пожалуйста, введите новый пароль</p>
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
            "project-group--error": !!errors.confirmPassword,
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
            {...register("confirmPassword")}
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
          {renderFieldError(errors, "confirmPassword")}
        </div>
      </div>

      <button
        type="submit"
        className="modal-content__btn second-btn"
        disabled={props.loading}
      >
        Подтвердить
      </button>
      <button
        type="button"
        className="modal-content__btn third-btn"
        onClick={props.onClose}
      >
        Отмена
      </button>
    </form>
  );
}

function renderFieldError(
  errors: FieldErrors<NewPasswordModalFormData>,
  field: keyof NewPasswordModalFormData
) {
  const error = errors[field];
  if (!error || !error.message) {
    return null;
  }
  return <div className="project-error">{error.message}</div>;
}

function getPasswordInputModifier(
  errors: FieldErrors<NewPasswordModalFormData>,
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
