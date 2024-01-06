import { AddCodeWord } from "./AddCodeWord";
import { ChangePasswordFormContainer } from "./ChangePasswordFormContainer";
import GoogleTwoFA from "./GoogleTwoFA";
import { IPBinding } from "./IPBinding";
import { SessionList } from "./SessionList";

export function SafetyTab() {

  return (
    <div className="settings-security__form">
      <div className="settings-profile__selects">
        <ChangePasswordFormContainer />
        <SessionList />
      </div>

      <div className="settings-profile__selects">
        <IPBinding />

        <GoogleTwoFA />
      </div>

      <div className="settings-profile__selects">
        <AddCodeWord />
      </div>
    </div>
  )
}