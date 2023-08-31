import { AuthModal } from "@components/AuthModal";
import { SIGN_IN_ERROR_CODE } from "@store/auth/errors";
import { signIn } from "@store/auth/slice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect, useState } from "react";

export interface AuthModalContainerProps {
  open: boolean;
  onClose: () => void;
  onNavRegister: () => void;
  onNavRecover: () => void;
}

export function AuthModalContainer(props: AuthModalContainerProps) {
  const dispatch = useAppDispatch();
  const [currentSignInError, setCurrentSignInError] = useState<{
    code: SIGN_IN_ERROR_CODE;
    message?: string;
  } | null>(null);
  const loading = useAppSelector(
    (state) => state.auth.signInStatus === "pending"
  );
  const signInError = useAppSelector((state) => state.auth.signInError);

  useEffect(() => {
    if (props.open) {
      setCurrentSignInError(signInError || null);
    } else {
      setCurrentSignInError(null);
    }
  }, [props.open, signInError]);

  const handleSignIn = (opts: { login: string; password: string }) => {
    dispatch(signIn({ login: opts.login, password: opts.password })).then(
      (result) => {
        if (result.meta.requestStatus === "fulfilled") {
          props.onClose();
        }
      }
    );
  };

  return (
    <AuthModal
      open={props.open}
      loading={loading}
      signInError={currentSignInError || undefined}
      onClose={props.onClose}
      onSignIn={handleSignIn}
      onNavRegister={props.onNavRegister}
      onNavRecover={props.onNavRecover}
    />
  );
}
