import { SupportingDocumentsForOfficeAddressModalFormData } from "@components/SupportingDocumentsForOfficeAddressModal";
import React, { useRef } from "react";
import { FieldErrors } from "react-hook-form";
import FileList from "./FileList";

interface IProps {
  className?: string;
  label?: string;
  errors: FieldErrors<SupportingDocumentsForOfficeAddressModalFormData>;
  value: File[];
  onChange: (files: File[] | null) => void;
}

const FileInput: React.FC<IProps> = ({
  className,
  label,
  errors,
  value,
  ...props
}) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    ref.current?.click();
  };

  const removeImageHandler = (image: File | string) => {
    const filteredImages = value?.filter(
      (file: any) => file?.name !== (image as File)?.name
    );
    if (filteredImages?.length === 0) {
      props?.onChange!([]);
    } else {
      props?.onChange!(filteredImages);
    }
  };

  const handleChangeImages = () => {
    const files = Array.from(ref.current?.files ?? []);
    const getNewFileValue = (prev: any) => {
      if (prev) return [...prev, ...files];
      return files;
    };
    const newFileValue = getNewFileValue(value);
    props?.onChange!(newFileValue);
  };

  return (
    <div className="my-projects__group project-group">
      <label className="my-projects__label project-label">
        {label || "Прикрепить файлы"}
      </label>
      <div className="my-projects__input project-input">
        <div>
          <div
            onClick={handleClick}
            style={{
              cursor: "pointer",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "14px",
              marginBottom: value.length > 0 ? "20px" : "0px",
            }}
          >
            <span>Нажмите, чтобы прикрепить</span>
            <img src="/img/icons/file.svg" alt="" />
          </div>
          <FileList files={value} onRemove={removeImageHandler} />
        </div>
      </div>
      <input
        className="my-projects__input project-input"
        type="file"
        ref={ref}
        hidden
        multiple
        onChange={handleChangeImages}
      />
      {renderFieldError(errors, "files")}
    </div>
  );
};

export default FileInput;

function renderFieldError(
  errors: FieldErrors<SupportingDocumentsForOfficeAddressModalFormData>,
  field: keyof SupportingDocumentsForOfficeAddressModalFormData
) {
  const error = errors[field];
  if (!error || !error.message) {
    return null;
  }
  return <div className="project-error">{error.message}</div>;
}
