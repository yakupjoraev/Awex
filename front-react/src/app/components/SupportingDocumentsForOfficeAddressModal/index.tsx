import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { SupportingDocumentsForOfficeFormSchema } from "./validators";
import classNames from "classnames";
import FileInput from "@components/Form/FileInput";

export interface SupportingDocumentsForOfficeAddressModalProps {
  open: boolean;
  loading: boolean;
  error?: string;
  onClose: () => void;
  onSubmitSupportingDocuments: (opts: { files: File[] }) => void;
}

export type SupportingDocumentsForOfficeAddressModalFormData = {
  files: any[];
};

const DEFAULT_FORM_DATA: SupportingDocumentsForOfficeAddressModalFormData = {
  files: [],
};

const SupportingDocumentsForOfficeAddressModal: React.FC<
  SupportingDocumentsForOfficeAddressModalProps
> = ({ open, loading, error, onClose, onSubmitSupportingDocuments }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    control,
  } = useForm<SupportingDocumentsForOfficeAddressModalFormData>({
    defaultValues: DEFAULT_FORM_DATA,
    resolver: yupResolver(SupportingDocumentsForOfficeFormSchema),
  });

  useEffect(() => {
    reset();
  }, [open]);

  const handleAddNewAddressRequisiteFormSubmit = handleSubmit((formData) => {
    onSubmitSupportingDocuments({ files: formData.files });
  });

  return (
    <div className={classNames("modal modal-enter", { show: open })}>
      <form
        className="modal-content"
        onSubmit={handleAddNewAddressRequisiteFormSubmit}
      >
        <div className="modal-content__header">
          <div className="modal-content__header-logo">
            <img src="/img/icons/logo-mini.svg" alt="" />

            <h2>Добавьте подтверждающие документы</h2>
          </div>

          <button type="button" className="close-modal-btn" onClick={onClose}>
            <img src="/img/icons/close-modal.svg" alt="" />
          </button>
        </div>

        <div className="modal-content__main">
          <Controller
            name="files"
            control={control}
            render={({ field: { value, onChange } }) => (
              <FileInput
                label="Прикрепить документы"
                errors={errors}
                value={value}
                onChange={onChange}
              />
            )}
          />

          {errors.root && errors.root.message && (
            <div className="modal-content__error">{errors.root.message}</div>
          )}
        </div>

        <button
          type="submit"
          className="modal-content__btn second-btn"
          disabled={loading}
        >
          Отправить
        </button>
      </form>
    </div>
  );
};

export default SupportingDocumentsForOfficeAddressModal;
