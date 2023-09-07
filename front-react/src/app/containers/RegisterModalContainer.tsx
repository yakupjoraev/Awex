import { ApiError, CommonService } from "@awex-api";
import {
  RegisterError,
  RegisterModal,
  RegisterStage,
} from "@components/RegisterModal";
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
  const [error, setError] = useState<RegisterError | null>(null);
  const [stage, setStage] = useState<RegisterStage>("register");
  const [authData, setAuthData] = useState<AuthData | null>(null);

  useEffect(() => {
    setLoading(false);
    setError(null);
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
        setError(makeRegisterError(error));
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
        dispatch(signIn({ login: authData.email, password: authData.password }))
          .unwrap()
          .then(() => {
            props.onClose();
          })
          .catch((error) => {
            let message = undefined;
            if (error && typeof error.message === "string") {
              message = error.message;
            }
            setError({ type: "GENERAL", message });
          });
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
      stage={stage}
      verifyEmail={authData ? authData.email : ""}
      onClose={props.onClose}
      onRegister={handleRegister}
      onConfirm={handleConfirm}
      onResendCode={handleResendCode}
    />
  );
}

function makeRegisterError(error: unknown): RegisterError {
  if (
    error instanceof ApiError &&
    typeof error.body === "object" &&
    error.body.errors instanceof Array &&
    error.body.errors.length
  ) {
    const firstError = error.body.errors[0];
    return { type: "GENERAL", message: firstError };
  }
  return { type: "GENERAL" };
}
