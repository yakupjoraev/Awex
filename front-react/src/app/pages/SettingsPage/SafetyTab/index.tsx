import { AddCodeWord } from "./AddCodeWord";
import { ChangePasswordFormContainer } from "./ChangePasswordFormContainer";
import { IPBinding } from "./IPBinding";
import { SessionList } from "./SessionList";

export function SafetyTab() {
  const handleClick = () => {
    alert("NOT IMPLEMENTED!");
  };

  return (
    <div className="settings-security__form">
      <div className="settings-profile__selects">
        <ChangePasswordFormContainer />
        <SessionList />
      </div>

      <div className="settings-profile__selects">
        <IPBinding />

        <div className="settings-profile__select ___not_implemented">
          <div className="settings-security__header">
            <h3 className="settings-security__title">Google 2FA</h3>
          </div>

          <div className="settings-security__middle">
            <p className="settings-security__text">
              Обязательный второй фактор для выполнения ответственных операций и
              авторизации на вашем аккаунте. После настройки, для подтверждения
              важных действий потребуется вводить коды, генерируемые в
              приложении.
            </p>
          </div>

          <button
            type="button"
            className="settings-security__btn main-btn"
            onClick={handleClick}
          >
            Привязать
          </button>
        </div>
      </div>

      <div className="settings-profile__selects">
        <AddCodeWord />
      </div>
    </div>
  )
}