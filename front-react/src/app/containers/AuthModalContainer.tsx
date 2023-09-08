import { ApiError, CommonService } from "@awex-api";
import { AuthModal, AuthStage } from "@components/AuthModal";
import { AUTH_SIGN_IN_ERROR, VER_REQ_SIGN_IN_ERROR } from "@store/auth/errors";
import { signIn } from "@store/auth/slice";
import { useAppDispatch } from "@store/hooks";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface AuthData {
  email: string;
  password: string;
}

export interface AuthModalContainerProps {
  open: boolean;
  onClose: () => void;
  onNavRegister: () => void;
  onNavRecover: () => void;
  onNavDescribeProblem: () => void;
}

export function AuthModalContainer(props: AuthModalContainerProps) {
  const dispatch = useAppDispatch();
  const [stage, setStage] = useState<AuthStage>("auth");
  const [loading, setLoading] = useState(false);
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const [signInError, setSignInError] = useState<
    { type: "unknown" | "auth" } | undefined
  >(undefined);
  const [verifyError, setVerifyError] = useState<
    { type: "unknown"; message?: string } | undefined
  >(undefined);

  useEffect(() => {
    setStage("auth");
    setAuthData(null);
    setSignInError(undefined);
  }, [props.open]);

  const handleSignIn = (opts: { login: string; password: string }) => {
    setLoading(true);
    dispatch(signIn({ login: opts.login, password: opts.password }))
      .unwrap()
      .then(() => {
        setSignInError(undefined);
        props.onClose();
      })
      .catch((error) => {
        if (error && error.code === AUTH_SIGN_IN_ERROR) {
          setSignInError({ type: "auth" });
          return;
        }
        if (error && error.code === VER_REQ_SIGN_IN_ERROR) {
          setStage("verify");
          setAuthData({ email: opts.login, password: opts.password });
          return;
        }
        setSignInError({ type: "unknown" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleResendCode = () => {
    if (stage !== "verify") {
      console.error('state error: "verify" stage required');
      return;
    }
    if (authData === null) {
      console.log("state error: auth data required");
      return;
    }
    if (loading) {
      return;
    }
    setLoading(true);
    CommonService.resend({ email: authData.email })
      .then(() => {
        toast.success("E-mail отправлен!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Не удалось отправить e-mail!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleConfirmCode = (code: string) => {
    if (stage !== "verify") {
      console.error('state error: "verify" stage required');
      return;
    }
    if (authData === null) {
      console.log("state error: auth data required");
      return;
    }
    if (loading) {
      return;
    }
    setLoading(true);
    CommonService.confirm({ code: code })
      .then(() => {
        return dispatch(
          signIn({ login: authData.email, password: authData.password })
        )
          .unwrap()
          .then(() => {
            props.onClose();
          })
          .catch((error) => {
            let message = undefined;
            if (error && typeof error.message === "string") {
              message = error.message;
            }
            setVerifyError({ type: "unknown", message });
          });
      })
      .catch((error) => {
        console.error(error);
        setVerifyError(makeUnknownError(error));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <AuthModal
      open={props.open}
      loading={loading}
      signInError={signInError}
      stage={stage}
      onClose={props.onClose}
      verifyEmail={authData ? authData.email : ""}
      verifyError={verifyError}
      onSignIn={handleSignIn}
      onNavRegister={props.onNavRegister}
      onNavRecover={props.onNavRecover}
      onNavDescribeProblem={props.onNavDescribeProblem}
      onResendCode={handleResendCode}
      onConfirmCode={handleConfirmCode}
    />
  );
}

function makeUnknownError(error: unknown): {
  type: "unknown";
  message?: string;
} {
  if (
    error instanceof ApiError &&
    typeof error.body === "object" &&
    error.body.errors instanceof Array &&
    error.body.errors.length
  ) {
    const firstError = error.body.errors[0];
    return { type: "unknown", message: firstError };
  }
  return { type: "unknown" };
}
