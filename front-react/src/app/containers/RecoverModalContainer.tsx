import { ApiError, CommonService } from "@awex-api";
import { RecoverError, RecoverModal } from "@components/RecoverModal";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export interface RecoverModalContainerProps {
  open: boolean;
  onClose: () => void;
}

export function RecoverModalContainer(props: RecoverModalContainerProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<RecoverError | null>(null);

  useEffect(() => {
    setError(null);
  }, [props.open]);

  const handleRecover = (opts: { email: string }) => {
    setLoading(true);
    CommonService.send({ email: opts.email })
      .then(() => {
        toast("Пароль отправлен на почту.");
        props.onClose();
      })
      .catch((error) => {
        if (error instanceof ApiError && error.status === 404) {
          setError({ type: "USER_NOT_FOUND" });
        } else {
          setError({ type: "GENERAL" });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <RecoverModal
      open={props.open}
      loading={loading}
      error={error || undefined}
      onClose={props.onClose}
      onRecover={handleRecover}
    />
  );
}
