import classNames from "classnames"
import { RegisterModalContent } from "./RegisterModalContent"
import { ConfirmEmailModalContent } from "@components/ConfirmEmailModalContent"


export type RegisterStage = "register" | "verify"

export interface RegisterModalProps {
  open: boolean
  stage: RegisterStage
  loading: boolean
  registerError?: { type: "unknown"; message?: string }
  verifyEmail: string
  verifyError?: { type: "unknown"; message?: string }
  onClose: () => void
  onRegister: (opts: { email: string; password: string }) => void
  onConfirm: (code: string) => void
  onResendCode: () => void
}


export function RegisterModal(props: RegisterModalProps) {
  let modalContent
  switch (props.stage) {
    case "register": {
      modalContent = (
        <RegisterModalContent
          open={props.open}
          loading={props.loading}
          error={props.registerError}
          onClose={props.onClose}
          onRegister={props.onRegister}
        />
      )
      break
    }
    case "verify": {
      modalContent = (
        <ConfirmEmailModalContent
          open={props.open}
          loading={props.loading}
          title="Регистрация"
          error={props.verifyError}
          verifyEmail={props.verifyEmail}
          onClose={props.onClose}
          onConfirmCode={props.onConfirm}
          onResendCode={props.onResendCode}
        />
      )
      break
    }
  }

  return (
    <div className={classNames("modal modal-enter", { show: props.open })}>
      {modalContent}
    </div>
  )
}
