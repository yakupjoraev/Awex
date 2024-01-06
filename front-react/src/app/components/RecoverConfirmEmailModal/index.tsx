import { useEffect, useId } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { confirmFormSchema } from "./validators";

export interface RecoverConfirmEmailModalProps {
  open: boolean;
  loading: boolean;
  title: string;
  error?: { type: "unknown"; message?: string };
  verifyEmail: string;
  onClose: () => void;
  onResendCode: () => void;
  onConfirmCode: (code: string) => void;
}

interface RecoverConfirmModalFormData {
  code: string;
}

const DEFAULT_FORM_DATA: RecoverConfirmModalFormData = {
  code: "",
};

export function RecoverConfirmEmailModal(props: RecoverConfirmEmailModalProps) {
  const codeId = useId();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<RecoverConfirmModalFormData>({
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
          Пожалуйста, введите его для восстановления пароля.
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
  errors: FieldErrors<RecoverConfirmModalFormData>,
  field: keyof RecoverConfirmModalFormData
) {
  const error = errors[field];
  if (!error || !error.message) {
    return null;
  }
  return <div className="project-error">{error.message}</div>;
}
