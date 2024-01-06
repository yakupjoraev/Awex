import { CommonService } from "@awex-api";
import { DescribeProblemModal } from "@components/DescribeProblemModal";
import { RecoverModalContent } from "@components/RecoverModal/RecoverModalContent";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export interface DescribeProblemModalContainerProps {
  open: boolean;
  onClose: () => void;
}

export function DescribeProblemModalContainer(
  props: DescribeProblemModalContainerProps
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
  }, [props.open]);

  const handleSubmitProblem = (opts: { problem: string }) => {
    setError("not implemented");
  };

  return (
    <DescribeProblemModal
      open={props.open}
      loading={loading}
      error={error || undefined}
      onClose={props.onClose}
      onSubmitProblem={handleSubmitProblem}
    />
  );
}
