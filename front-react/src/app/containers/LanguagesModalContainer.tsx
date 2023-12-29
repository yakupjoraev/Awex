import LanguagesModal from "@components/LanguagesModal";
import { useState } from "react";

export interface LanguagesModalContainerProps {
  open: boolean;
  onClose: () => void;
}

const LanguagesModalContainer: React.FC<LanguagesModalContainerProps> = (
  props
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <LanguagesModal
      open={props.open}
      loading={loading}
      error={error || undefined}
      onClose={props.onClose}
    />
  );
};

export default LanguagesModalContainer;
