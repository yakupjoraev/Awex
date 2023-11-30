import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldErrors, useForm } from "react-hook-form";
import { adminRejectProjectFormSchema } from "./validators";
import classNames from "classnames";

export interface AdminRejectProjectModalProps {
  open: boolean;
  loading: boolean;
  error?: string;
  onClose: () => void;
  onSubmitReject: (opts: { reason: string }) => void;
}

export type AdminRejectProjectModalFormData = {
  reason: string;
};

const DEFAULT_FORM_DATA: AdminRejectProjectModalFormData = {
  reason: "",
};

export function AdminRejectProjectModal(props: AdminRejectProjectModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<AdminRejectProjectModalFormData>({
    defaultValues: DEFAULT_FORM_DATA,
    resolver: yupResolver(adminRejectProjectFormSchema),
  });

  useEffect(() => {
    reset();
  }, [props.open]);

  const handleAdminRejectProjectFormSubmit = handleSubmit((formData) => {
    props.onSubmitReject({ reason: formData.reason });
  });

  return (
    <div className={classNames("modal modal-enter", { show: props.open })}>
      <form
        className="modal-content"
        onSubmit={handleAdminRejectProjectFormSubmit}
      >
        <div className="modal-content__header">
          <div className="modal-content__header-logo">
            <img src="/img/icons/logo-mini.svg" alt="" />

            <h2>Опишите причину отказа</h2>
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
              placeholder="Опишите причину отказа"
              disabled={props.loading}
              {...register("reason")}
            ></textarea>
            {renderFieldError(errors, "reason")}
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
  errors: FieldErrors<AdminRejectProjectModalFormData>,
  field: keyof AdminRejectProjectModalFormData
) {
  const error = errors[field];
  if (!error || !error.message) {
    return null;
  }
  return <div className="project-error">{error.message}</div>;
}
