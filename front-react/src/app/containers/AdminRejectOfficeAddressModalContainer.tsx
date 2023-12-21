import { AuthorizedService } from "@awex-api";
import { AdminRejectOfficeAddressModal } from "@components/AdminRejectOfficeAddressModal";
import { AdminRejectProjectModal } from "@components/AdminRejectProjectModal";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export interface AdminRejectOfficeAddressContainerProps {
  open: boolean;
  onClose: () => void;
}

export function AdminRejectOfficeAddressModalContainer(
  props: AdminRejectOfficeAddressContainerProps
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { applicationId } = useParams<{ applicationId: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    setError(null);
  }, [props.open]);

  const handleSubmitReject = (opts: { reason: string }) => {
    setLoading(true);
    AuthorizedService.administratorOfficeAddressReject(applicationId!, {
      reason: opts.reason,
    }).then((res) => {
      if (res.message) {
        props.onClose();
        setLoading(false);
        navigate(-1);
      }
    });
  };

  return (
    <AdminRejectOfficeAddressModal
      open={props.open}
      loading={loading}
      error={error || undefined}
      onClose={props.onClose}
      onSubmitReject={handleSubmitReject}
    />
  );
}
