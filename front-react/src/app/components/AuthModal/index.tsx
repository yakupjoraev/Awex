import classNames from "classnames"
import { AuthModalContent, AuthStage } from "./AuthModalContent"
import { ConfirmEmailModalContent } from "@components/ConfirmEmailModalContent"


export { type AuthStage } from "./AuthModalContent"


export interface AuthModalProps {
  open: boolean
  stage: AuthStage
  loading: boolean
  signInError?: { type: "unknown" | "auth" }
  verifyEmail: string
  verifyError?: { type: "unknown"; message?: string }
  onClose: () => void
  onSignIn: (opts: { login: string; password: string }) => void
  onNavRegister: () => void
  onNavRecover: () => void
  onNavDescribeProblem: () => void
  onNavBlockProfile: () => void
  onConfirmCode: (code: string) => void
  onResendCode: () => void
}


export function AuthModal(props: AuthModalProps) {
  let modalContent
  switch (props.stage) {
    case "auth": {
      modalContent = (
        <AuthModalContent
          open={props.open}
          loading={props.loading}
          error={props.signInError}
          onClose={props.onClose}
          onSignIn={props.onSignIn}
          onNavRegister={props.onNavRegister}
          onNavRecover={props.onNavRecover}
          onNavDescribeProblem={props.onNavDescribeProblem}
          onNavBlockProfile={props.onNavBlockProfile}
        />
      )
      break
    }
    case "verify": {
      modalContent = (
        <ConfirmEmailModalContent
          open={props.open}
          loading={props.loading}
          title="Вход"
          error={props.verifyError}
          verifyEmail={props.verifyEmail}
          onClose={props.onClose}
          onConfirmCode={props.onConfirmCode}
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