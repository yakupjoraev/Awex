import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldErrors, useForm } from "react-hook-form";
import { adminRejectOfficeAddressFormSchema } from "./validators";
import classNames from "classnames";

export interface AdminRejectOfficeAddressModalProps {
  open: boolean;
  loading: boolean;
  error?: string;
  onClose: () => void;
  onSubmitReject: (opts: { reason: string }) => void;
}

export type AdminRejectOfficeAddressModalFormData = {
  reason: string;
};

const DEFAULT_FORM_DATA: AdminRejectOfficeAddressModalFormData = {
  reason: "",
};

export function AdminRejectOfficeAddressModal(
  props: AdminRejectOfficeAddressModalProps
) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<AdminRejectOfficeAddressModalFormData>({
    defaultValues: DEFAULT_FORM_DATA,
    resolver: yupResolver(adminRejectOfficeAddressFormSchema),
  });

  useEffect(() => {
    reset();
  }, [props.open]);

  const handleAdminRejectOfficeAddressFormSubmit = handleSubmit((formData) => {
    props.onSubmitReject({ reason: formData.reason });
  });

  return (
    <div className={classNames("modal modal-enter", { show: props.open })}>
      <form
        className="modal-content"
        onSubmit={handleAdminRejectOfficeAddressFormSubmit}
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
  errors: FieldErrors<AdminRejectOfficeAddressModalFormData>,
  field: keyof AdminRejectOfficeAddressModalFormData
) {
  const error = errors[field];
  if (!error || !error.message) {
    return null;
  }
  return <div className="project-error">{error.message}</div>;
}
