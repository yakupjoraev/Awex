import { AuthorizedService } from "@awex-api";
import { AdminRejectProjectModal } from "@components/AdminRejectProjectModal";
import { NewCardModal } from "@components/NewCardModal";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "src/generated/awex-api/models/Card";

export interface NewCardContainerProps {
  open: boolean;
  onClose: () => void;
}

export function NewCardModalContainer(props: NewCardContainerProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
  }, [props.open]);

  const handleSubmitNewCard = (opts: Card) => {
    AuthorizedService.addNewCard(opts).then((res) => {
      if (res.message) {
        props.onClose();
      }
    });
  };

  return (
    <NewCardModal
      open={props.open}
      loading={loading}
      error={error || undefined}
      onClose={props.onClose}
      onSubmit={handleSubmitNewCard}
    />
  );
}
