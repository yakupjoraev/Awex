import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { TAdminOfficeAddressRequestForm } from ".";
import FileInput from "@components/Form/FileInput";

interface IProps {
  useFormInstance: UseFormReturn<TAdminOfficeAddressRequestForm>;
  onSubmit: (data: TAdminOfficeAddressRequestForm) => void;
}

const AdminOfficeAddressRequestForm: React.FC<IProps> = ({
  useFormInstance,
  onSubmit,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormInstance;

  return (
    <form id="AdminOfficeAddressRequestForm" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="request"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="invoice-project__group project-group invoice__group-textarea">
            <label className="invoice-project__label project-label">
              Запрос на предоставление дополнительной информации
            </label>

            <textarea
              className="invoice-project__textarea project-textarea"
              placeholder="Напишите запрос для мерчанта и комментарий"
              value={value}
              onChange={onChange}
            />
            {errors.request?.message && (
              <div className="project-error">{errors.request.message}</div>
            )}
          </div>
        )}
      />

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
    </form>
  );
};

export default AdminOfficeAddressRequestForm;
