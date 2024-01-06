import classNames from "classnames";
import { ConfirmEmailModalContent } from "@components/ConfirmEmailModalContent";
import { RecoverConfirmEmailModal } from "@components/RecoverConfirmEmailModal";
import { RecoverError, RecoverModalContent } from "./RecoverModalContent";
import { NewPasswordModal } from "@components/NewPasswordModal";

export type RecoverStage = "email" | "verify" | "reset";

export interface RecoverModalProps {
  open: boolean;
  stage: RecoverStage;
  loading: boolean;
  recoverError?: RecoverError;
  verifyEmail: string;
  verifyError?: { type: "unknown"; message?: string };
  newPasswordError?: { type: "unknown"; message?: string };
  onClose: () => void;
  onRecover: (opts: { email: string }) => void;
  onConfirm: (code: string) => void;
  onResendCode: () => void;
  onNewPassword: (opt: { password: string }) => void;
}

export function RecoverModal(props: RecoverModalProps) {
  let modalContent;
  switch (props.stage) {
    case "email": {
      modalContent = (
        <RecoverModalContent
          open={props.open}
          loading={props.loading}
          error={props.recoverError}
          onClose={props.onClose}
          onRecover={props.onRecover}
        />
      );
      break;
    }
    case "verify": {
      modalContent = (
        <RecoverConfirmEmailModal
          open={props.open}
          loading={props.loading}
          title="Восстановление пароля"
          error={props.verifyError}
          verifyEmail={props.verifyEmail}
          onClose={props.onClose}
          onConfirmCode={props.onConfirm}
          onResendCode={props.onResendCode}
        />
      );
      break;
    }
    case "reset": {
      modalContent = (
        <NewPasswordModal
          open={props.open}
          loading={props.loading}
          title="Новый пароль"
          error={props.newPasswordError}
          onClose={props.onClose}
          onSubmitNewPassword={props.onNewPassword}
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
