import { AuthorizedService } from "@awex-api";
import { NewAddressRequisiteModal } from "@components/NewAddressRequisiteForm";
import { useEffect, useState } from "react";

export interface NewAddressRequisiteContainerProps {
  open: boolean;
  onClose: () => void;
}

export function NewAddressRequisiteModalContainer(
  props: NewAddressRequisiteContainerProps
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
  }, [props.open]);

  const handleSubmitNewAddress = (opts: {
    companyName: string;
    address: string;
  }) => {
    setLoading(true);
    AuthorizedService.createOfficeAddress({
      companyName: opts.companyName,
      address: opts.address,
    }).then((res) => {
      if (res.message) {
        props.onClose();
        setLoading(false);
      }
    });
  };

  return (
    <NewAddressRequisiteModal
      open={props.open}
      loading={loading}
      error={error || undefined}
      onClose={props.onClose}
      onSubmitNewAddress={handleSubmitNewAddress}
    />
  );
}
