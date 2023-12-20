import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldErrors, useForm } from "react-hook-form";
import { addNewAddressRequisiteFormSchema } from "./validators";
import classNames from "classnames";

export interface NewAddressRequisiteModalProps {
  open: boolean;
  loading: boolean;
  error?: string;
  onClose: () => void;
  onSubmitNewAddress: (opts: { companyName: string; address: string }) => void;
}

export type NewAddressRequisiteModalFormData = {
  companyName: string;
  address: string;
};

const DEFAULT_FORM_DATA: NewAddressRequisiteModalFormData = {
  companyName: "",
  address: "",
};

export function NewAddressRequisiteModal(props: NewAddressRequisiteModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<NewAddressRequisiteModalFormData>({
    defaultValues: DEFAULT_FORM_DATA,
    resolver: yupResolver(addNewAddressRequisiteFormSchema),
  });

  useEffect(() => {
    reset();
  }, [props.open]);

  const handleAddNewAddressRequisiteFormSubmit = handleSubmit((formData) => {
    props.onSubmitNewAddress({
      companyName: formData.companyName,
      address: formData.address,
    });
  });

  return (
    <div className={classNames("modal modal-enter", { show: props.open })}>
      <form
        className="modal-content"
        onSubmit={handleAddNewAddressRequisiteFormSubmit}
      >
        <div className="modal-content__header">
          <div className="modal-content__header-logo">
            <img src="/img/icons/logo-mini.svg" alt="" />

            <h2>Укажите полный адрес</h2>
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
            <input
              className="my-projects__input project-input"
              placeholder="Укажите название компании"
              disabled={props.loading}
              {...register("companyName")}
            ></input>
            {renderFieldError(errors, "companyName")}
          </div>

          <div className="my-projects__group project-group">
            <input
              className="my-projects__input project-input"
              placeholder="Укажите полный адрес"
              disabled={props.loading}
              {...register("address")}
            ></input>
            {renderFieldError(errors, "address")}
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
          Добавить
        </button>
      </form>
    </div>
  );
}

function renderFieldError(
  errors: FieldErrors<NewAddressRequisiteModalFormData>,
  field: keyof NewAddressRequisiteModalFormData
) {
  const error = errors[field];
  if (!error || !error.message) {
    return null;
  }
  return <div className="project-error">{error.message}</div>;
}
