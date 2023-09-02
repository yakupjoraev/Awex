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
  onNavDescribeProblem: () => void;
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

  useEffect(() => {
    setCurrentSignInError(null);
  }, [props.open]);

  const handleSignIn = (opts: { login: string; password: string }) => {
    dispatch(signIn({ login: opts.login, password: opts.password }))
      .unwrap()
      .then((result) => {
        props.onClose();
        setCurrentSignInError(null);
      })
      .catch((error) => {
        setCurrentSignInError(makeSignInError(error));
      });
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
      onNavDescribeProblem={props.onNavDescribeProblem}
    />
  );
}

function makeSignInError(error: unknown): {
  code: SIGN_IN_ERROR_CODE;
  message?: string;
} {
  if (typeof error === "object" && error !== null) {
    if (
      "name" in error &&
      typeof error.name === "string" &&
      error.name === "ApiError"
    ) {
      if (
        "code" in error &&
        typeof error.code === "string" &&
        (error.code === "GENERAL_SIGN_IN_ERROR" ||
          error.code === "AUTH_SIGN_IN_ERROR")
      ) {
        if (
          "message" in error &&
          (typeof error.message === "string" ||
            typeof error.message === "undefined")
        ) {
          return {
            code: error.code,
            message: error.message,
          };
        }
      }
    }
  }

  return { code: "GENERAL_SIGN_IN_ERROR" };
}
