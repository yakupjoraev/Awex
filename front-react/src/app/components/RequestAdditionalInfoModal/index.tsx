import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldErrors, useForm } from "react-hook-form";
import { requestAdditionalInfoFormSchema } from "./validators";
import classNames from "classnames";

export interface RequestAdditionalInfoModalProps {
  open: boolean;
  loading: boolean;
  error?: string;
  onClose: () => void;
  onSubmitRequest: (opts: { message: string }) => void;
}

export type RequestAdditionalInfoModalFormData = {
  message: string;
};

const DEFAULT_FORM_DATA: RequestAdditionalInfoModalFormData = {
  message: "",
};

export function RequestAdditionalInfoModal(
  props: RequestAdditionalInfoModalProps
) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<RequestAdditionalInfoModalFormData>({
    defaultValues: DEFAULT_FORM_DATA,
    resolver: yupResolver(requestAdditionalInfoFormSchema),
  });

  useEffect(() => {
    reset();
  }, [props.open]);

  useEffect(() => {
    if (props.error) {
      setError("root", { message: "NOT IMPLEMENTED!" });
    }
  }, [props.error]);

  const handleRequestAdditionalInfoFormSubmit = handleSubmit((formData) => {
    props.onSubmitRequest({ message: formData.message });
  });

  return (
    <div className={classNames("modal modal-enter", { show: props.open })}>
      <form
        className="modal-content"
        onSubmit={handleRequestAdditionalInfoFormSubmit}
      >
        <div className="modal-content__header">
          <div className="modal-content__header-logo">
            <img src="/img/icons/logo-mini.svg" alt="" />

            <h2>Опишите запрашиваемые данные</h2>
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
          <div className="my-projects__group project-group">
            <textarea
              className="my-projects__input project-textarea"
              placeholder="Опишите запрашиваемые данные"
              disabled={props.loading}
              {...register("message")}
            ></textarea>
            {renderFieldError(errors, "message")}
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
          Отправить
        </button>
      </form>
    </div>
  );
}

function renderFieldError(
  errors: FieldErrors<RequestAdditionalInfoModalFormData>,
  field: keyof RequestAdditionalInfoModalFormData
) {
  const error = errors[field];
  if (!error || !error.message) {
    return null;
  }
  return <div className="project-error">{error.message}</div>;
}
