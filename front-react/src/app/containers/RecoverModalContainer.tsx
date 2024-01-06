import { ApiError, CommonService } from "@awex-api";
import { RecoverModal } from "@components/RecoverModal";
import { RecoverError } from "@components/RecoverModal/RecoverModalContent";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export interface RecoverModalContainerProps {
  open: boolean;
  onClose: () => void;
}

export function RecoverModalContainer(props: RecoverModalContainerProps) {
  const [stage, setStage] = useState<"email" | "verify" | "reset">("email");
  const [authData, setAuthData] = useState<{ email: string }>({ email: "" });
  const [loading, setLoading] = useState(false);
  const [recoverError, setRecoverError] = useState<RecoverError | null>(null);
  const [verifyError, setVerifyError] = useState<{
    type: "unknown";
    message?: string;
  } | null>(null);
  const [newPasswordError, setNewPasswordError] = useState<{
    type: "unknown";
    message?: string;
  } | null>(null);
  const [resetToken, setResetToken] = useState<string | null>(null);

  useEffect(() => {
    setRecoverError(null);
    setVerifyError(null);
    setNewPasswordError(null);
    setResetToken(null);
    setStage("email");
  }, [props.open]);

  const handleRecover = (opts: { email: string }) => {
    setLoading(true);
    CommonService.send(opts)
      .then(() => {
        setStage("verify");
        setAuthData({ email: opts.email });
      })
      .catch((error) => {
        console.error(error);
        setRecoverError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleConfirm = (code: string) => {
    setLoading(true);
    CommonService.resetConfirm({ code })
      .then((res) => {
        setResetToken(res?.resetToken!);
        setStage("reset");
      })
      .catch((error) => {
        console.error(error);
        setVerifyError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleNewPassword = (opt: { password: string }) => {
    // setLoading(true);
    // CommonService.resetPassword({ password: opt.password })
    //   .then(() => {
    //     toast.success("Пароль успешно изменен!");
    //     props.onClose();
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     setNewPasswordError(error);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
    toast.error("NOT IMPLEMENTED!");
  };

  const handleResendCode = () => {
    toast.error("NOT IMPLEMENTED!");
  };

  return (
    <RecoverModal
      open={props.open}
      stage={stage}
      verifyEmail={authData?.email}
      verifyError={verifyError!}
      recoverError={recoverError!}
      newPasswordError={newPasswordError!}
      loading={loading}
      onClose={props.onClose}
      onRecover={handleRecover}
      onConfirm={handleConfirm}
      onNewPassword={handleNewPassword}
      onResendCode={handleResendCode}
    />
  );
}
