import { AuthorizedService } from "@awex-api";
import { RequestAdditionalInfoModal } from "@components/RequestAdditionalInfoModal";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export interface RequestAdditionalInfoModalContainerProps {
  open: boolean;
  onClose: () => void;
}

export function RequestAdditionalInfoModalContainer(
  props: RequestAdditionalInfoModalContainerProps
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { projectId } = useParams<{ projectId: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    setError(null);
  }, [props.open]);

  const handleSubmitRequest = (opts: { message: string }) => {
    AuthorizedService.administratorProjectRequest(projectId!, {
      request: opts.message,
    }).then((res) => {
      if (res.message) {
        props.onClose();
        navigate(-1);
      }
    });
  };

  return (
    <RequestAdditionalInfoModal
      open={props.open}
      loading={loading}
      error={error || undefined}
      onClose={props.onClose}
      onSubmitRequest={handleSubmitRequest}
    />
  );
}
