import { CommonService } from "@awex-api";
import { RegisterError, RegisterModal } from "@components/RegisterModal";
import { unwrapResult } from "@reduxjs/toolkit";
import { signIn } from "@store/auth/slice";
import { useAppDispatch } from "@store/hooks";
import { useEffect, useState } from "react";

export interface RegisterModalContainerProps {
  open: boolean;
  onClose: () => void;
}

export function RegisterModalContainer(props: RegisterModalContainerProps) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<RegisterError | null>(null);

  useEffect(() => {
    setLoading(false);
    setError(null);
  }, [props.open]);

  const handleRegister = (opts: { email: string; password: string }) => {
    setLoading(true);
    CommonService.registration({ email: opts.email, password: opts.password })
      .then(() => {
        return dispatch(signIn({ login: opts.email, password: opts.password }));
      })
      .then(unwrapResult)
      .then(() => {
        props.onClose();
      })
      .catch((error) => {
        setError({ type: "GENERAL" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <RegisterModal
      open={props.open}
      loading={loading}
      error={error}
      onClose={props.onClose}
      onRegister={handleRegister}
    />
  );
}
