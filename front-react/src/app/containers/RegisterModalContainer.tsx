import { ApiError, CommonService } from "@awex-api";
import { RegisterModal, RegisterStage } from "@components/RegisterModal";
import { signIn } from "@store/auth/slice";
import { useAppDispatch } from "@store/hooks";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface AuthData {
  email: string;
  password: string;
}

export interface RegisterModalContainerProps {
  open: boolean;
  onClose: () => void;
}

export function RegisterModalContainer(props: RegisterModalContainerProps) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState<RegisterStage>("register");
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const [registerError, setRegisterError] = useState<
    { type: "unknown"; message?: string } | undefined
  >(undefined);
  const [verifyError, setVerifyError] = useState<
    { type: "unknown"; message?: string } | undefined
  >(undefined);

  useEffect(() => {
    setLoading(false);
    setRegisterError(undefined);
    setStage("register");
    setAuthData(null);
  }, [props.open]);

  const handleRegister = (opts: { email: string; password: string }) => {
    if (stage !== "register") {
      console.error('state error: "register" stage required');
      return;
    }
    setLoading(true);
    CommonService.registration({ email: opts.email, password: opts.password })
      .then(() => {
        setStage("verify");
        setAuthData({ email: opts.email, password: opts.password });
      })
      .catch((error) => {
        console.error(error);
        setRegisterError(makeUnknownError(error));
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

  const handleConfirm = (code: string) => {
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
            setRegisterError({ type: "unknown", message });
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
    <RegisterModal
      open={props.open}
      loading={loading}
      registerError={registerError}
      stage={stage}
      verifyEmail={authData ? authData.email : ""}
      verifyError={verifyError}
      onClose={props.onClose}
      onRegister={handleRegister}
      onConfirm={handleConfirm}
      onResendCode={handleResendCode}
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
