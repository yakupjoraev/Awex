import classNames from "classnames";
import { RegisterModalContent } from "./RegisterModalContent";
import { ConfirmModalContent } from "./ConfirmModalContent";

export type RegisterError = { type: "GENERAL", message?: string };

export type RegisterStage = "register" | "verify";

export interface RegisterModalProps {
  open: boolean;
  loading: boolean;
  error: RegisterError | null;
  stage: RegisterStage;
  verifyEmail: string;
  onClose: () => void;
  onRegister: (opts: { email: string; password: string }) => void;
  onConfirm: (code: string) => void;
  onResendCode: () => void;
}

export function RegisterModal(props: RegisterModalProps) {
  let modalContent;
  switch (props.stage) {
    case "register": {
      modalContent = (
        <RegisterModalContent
          open={props.open}
          loading={props.loading}
          error={props.error}
          onClose={props.onClose}
          onRegister={props.onRegister}
        />
      );
      break;
    }
    case "verify": {
      modalContent = (
        <ConfirmModalContent
          open={props.open}
          loading={props.loading}
          error={props.error}
          verifyEmail={props.verifyEmail}
          onClose={props.onClose}
          onConfirm={props.onConfirm}
          onResendCode={props.onResendCode}
        />
      );
      break;
    }
  }

  return (
    <div className={classNames("modal modal-enter", { show: props.open })}>
      {modalContent}
    </div>
  );
}
