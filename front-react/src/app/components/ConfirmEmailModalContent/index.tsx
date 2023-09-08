import { useEffect, useId } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { confirmFormSchema } from "./validators";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";

export interface ConfirmEmailModalContentProps {
  open: boolean;
  loading: boolean;
  title: string;
  error?: { type: "unknown"; message?: string };
  verifyEmail: string;
  onClose: () => void;
  onResendCode: () => void;
  onConfirmCode: (code: string) => void;
}

interface ConfirmModalFormData {
  code: string;
}

const DEFAULT_FORM_DATA: ConfirmModalFormData = {
  code: "",
};

export function ConfirmEmailModalContent(props: ConfirmEmailModalContentProps) {
  const codeId = useId();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<ConfirmModalFormData>({
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

  const handleResendCode = () => {
    if (props.loading) {
      return;
    }
    props.onResendCode();
  };

  const handleConfirmFormSubmit = handleSubmit((formData) => {
    props.onConfirmCode(formData.code);
  });

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
        <p className="modal-content__text">
          Мы отправили секретный код на e-mail <b>{props.verifyEmail}</b>.
          Пожалуйста, введите его для завершения регистрации.
          <button
            className="resend-btn"
            type="button"
            onClick={handleResendCode}
            disabled={props.loading}
          >
            Отправить повторно
          </button>
        </p>
        <div
          className={classNames("my-projects__group project-group", {
            "project-group--error": !!errors.code,
          })}
        >
          <label className="my-projects__label project-label" htmlFor={codeId}>
            Секретный код
          </label>
          <input
            className="my-projects__input project-input"
            id={codeId}
            type="text"
            placeholder="Введите секретный код"
            autoComplete="off"
            {...register("code")}
          />
          {renderFieldError(errors, "code")}
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
        Верифицировать и войти
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
  errors: FieldErrors<ConfirmModalFormData>,
  field: keyof ConfirmModalFormData
) {
  const error = errors[field];
  if (!error || !error.message) {
    return null;
  }
  return <div className="project-error">{error.message}</div>;
}
