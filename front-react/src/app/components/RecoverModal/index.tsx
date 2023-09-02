import { useEffect, useId } from "react";
import { recoverFormSchema } from "./validators";
import { FieldErrors, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";

export type RecoverError = { type: "USER_NOT_FOUND" | "GENERAL" };

export interface RecoverModalProps {
  open: boolean;
  loading: boolean;
  error?: RecoverError;
  onClose: () => void;
  onRecover: (opts: { email: string }) => void;
}

interface RecoverModalFormData {
  email: string;
}

const DEFAULT_FORM_DATA = {
  email: "",
};

export function RecoverModal(props: RecoverModalProps) {
  const emailId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<RecoverModalFormData>({
    defaultValues: DEFAULT_FORM_DATA,
    resolver: yupResolver(recoverFormSchema),
  });

  useEffect(() => {
    reset();
  }, [props.open]);

  useEffect(() => {
    if (props.error) {
      if (props.error.type === "USER_NOT_FOUND") {
        setError("root", { message: "Пользователь не найден!" });
      } else {
        setError("root", { message: "Ошибка соединения с AWEX!" });
      }
    }
  }, [props.error]);

  const handleRecoverFormSumbit = handleSubmit((formData) => {
    props.onRecover({ email: formData.email });
  });

  return (
    <div className={classNames("modal modal-enter", { show: props.open })}>
      <form className="modal-content" onSubmit={handleRecoverFormSumbit}>
        <div className="modal-content__header">
          <div className="modal-content__header-logo">
            <img src="./img/icons/logo-mini.svg" alt="" />

            <h2>Сброс пароля</h2>
          </div>

          <button
            type="button"
            className="close-modal-btn"
            onClick={props.onClose}
          >
            <img src="./img/icons/close-modal.svg" alt="" />
          </button>
        </div>

        <div className="modal-content__main">
          <p className="modal-content__text">
            Введите email аккаунта. Новый пароль будет отправлен на указанную
            почту.
          </p>

          <div className="my-projects__group project-group">
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
              placeholder="Введите e-mail"
              disabled={props.loading}
              {...register("email")}
            />

            {renderFieldError(errors, "email")}
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
          Отправить пароль
        </button>
      </form>
    </div>
  );
}

function renderFieldError(
  errors: FieldErrors<RecoverModalFormData>,
  field: keyof RecoverModalFormData
) {
  const error = errors[field];
  if (!error || !error.message) {
    return null;
  }
  return <div className="project-error">{error.message}</div>;
}
