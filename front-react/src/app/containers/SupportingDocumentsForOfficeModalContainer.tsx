import { AuthorizedService } from "@awex-api";
import SupportingDocumentsForOfficeAddressModal from "@components/SupportingDocumentsForOfficeAddressModal";
import { useEffect, useState } from "react";

export interface SupportingDocumentsForOfficeModalContainerProps {
  addressId: string;
  address: string;
  companyName: string;
  open: boolean;
  onClose: () => void;
}

export function SupportingDocumentsForOfficeModalContainer(
  props: SupportingDocumentsForOfficeModalContainerProps
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
  }, [props.open]);

  const handleSubmitSupportingDocuments = (opts: { files: File[] }) => {
    setLoading(true);

    const formData = new FormData();

    opts?.files?.forEach((file) => {
      const fileObject = new Blob([file], { type: file.type });
      formData.append("upload", fileObject, file.name);
    });

    const uploadData = {
      upload: formData.getAll("upload") as Blob[],
    };

    console.log(uploadData);

    AuthorizedService.uploadOfficeAddressDocument(props.addressId, uploadData);

    AuthorizedService.requestOfficeAddressValidation(props?.addressId).then(
      (res) => {
        if (res.message) {
          props.onClose();
          setLoading(false);
        }
      }
    );
  };

  return (
    <SupportingDocumentsForOfficeAddressModal
      open={props.open}
      loading={loading}
      error={error || undefined}
      onClose={props.onClose}
      onSubmitSupportingDocuments={handleSubmitSupportingDocuments}
    />
  );
}
