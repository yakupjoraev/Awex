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

    opts?.files?.forEach((file) => {
      const formData = new FormData();

      const fileObject = new Blob([file], { type: file.type });
      formData.append("upload", fileObject, file.name);

      const uploadData = {
        upload: formData.get("upload") as Blob,
      };

      AuthorizedService.uploadOfficeAddressDocument(
        props.addressId,
        uploadData
      );
    });

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
