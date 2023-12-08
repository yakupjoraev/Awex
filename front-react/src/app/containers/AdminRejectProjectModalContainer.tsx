import { AuthorizedService } from "@awex-api";
import { AdminRejectProjectModal } from "@components/AdminRejectProjectModal";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export interface AdminRejectProjectContainerProps {
  open: boolean;
  onClose: () => void;
}

export function AdminRejectProjectModalContainer(
  props: AdminRejectProjectContainerProps
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { projectId } = useParams<{ projectId: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    setError(null);
  }, [props.open]);

  const handleSubmitReject = (opts: { reason: string }) => {
    AuthorizedService.administratorProjectReject(projectId!, {
      reason: opts.reason,
    }).then((res) => {
      if (res.message) {
        props.onClose();
        navigate(-1);
      }
    });
  };

  return (
    <AdminRejectProjectModal
      open={props.open}
      loading={loading}
      error={error || undefined}
      onClose={props.onClose}
      onSubmitReject={handleSubmitReject}
    />
  );
}
