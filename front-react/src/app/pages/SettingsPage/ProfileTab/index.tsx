import { signOut } from "@store/auth/slice"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { NotificationsForm } from "./NotificationsForm"
import { AuthenticatedService, Notification } from "@awex-api"
import { useEffect, useState } from "react"
import { ThemeSelector } from "./ThemeSelector"
import { LanguageSelector } from "./LanguageSelector"
import { ProfileFormContainer } from "./ProfileFormContainer"
import { getAccountProfile } from "@store/accountProfile/slice"


const DEFAULT_NOTIFICATION_SETTINGS: Notification = {
  email: false,
  telegram: false,
  vk: false,
  google: false,
  apple: false,
}


export function ProfileTab() {
  const dispatch = useAppDispatch()
  const [notificationSettings, setNotificationSettings] = useState(DEFAULT_NOTIFICATION_SETTINGS)
  const [notificationSettingsLoading, setNotificationSettingsLoading] = useState(true)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const userName = useAppSelector((state) => state.accountProfile.data?.name)
  const userId = useAppSelector((state) => state.accountProfile.data?.id)


  useEffect(() => {
    setNotificationSettingsLoading(false)
    AuthenticatedService.notificationsGet()
      .then((notifications) => {
        setNotificationSettings(notifications)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setNotificationSettingsLoading(false)
      })
  }, [])

  useEffect(() => {
    dispatch(getAccountProfile())
  }, [])


  const hanldeLogoutBtnClick = () => {
    dispatch(signOut())
  }

  const handleUpdateNotificationSettings = (
    nextNotificationSettings: Notification
  ) => {
    if (notificationSettingsLoading) return
    setNotificationSettingsLoading(true)
    setNotificationSettings(nextNotificationSettings)
    AuthenticatedService.notificationsSet(nextNotificationSettings)
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setNotificationSettingsLoading(false)
      })
  }

  const handleChangeTheme = (theme: "light" | "dark") => {
    setTheme(theme)
  }


  return (
    <>
      <div className="settings-profile__user">
        <div className="settings-profile__user-infos">
          <div className="settings-profile__user-icon">
            <img src="/img/icons/user-alt.svg" alt="" />
          </div>

          <div className="settings-profile__user-info">
            <p className="settings-profile__user-name">{userName}</p>
            <p className="settings-profile__user-code">(#{ userId })</p>
          </div>
        </div>

        <div
          className="settings-profile__user-back"
          role="button"
          onClick={hanldeLogoutBtnClick}
        >
          <img src="/img/icons/log-out.svg" alt="log-out" />
          Выйти
        </div>
      </div>

      <ProfileFormContainer />

      <NotificationsForm
        loading={notificationSettingsLoading}
        notificationSettings={notificationSettings}
        onUpdate={handleUpdateNotificationSettings}
      />

      <div className="settings-profile__selects">
        <LanguageSelector />
        <ThemeSelector theme={theme} onChange={handleChangeTheme} />
      </div>

      <div className="settings-profile__selects">
        <div className="settings-profile__select">
          <div className="settings-profile__included">
            <p className="settings-profile__included-label">
              Подключенные аккаунты
            </p>

            <ul className="settings-profile__included-list">
              <li className="settings-profile__included-item">
                <img
                  className="settings-profile__included-icon"
                  src="/img/icons/mail.svg"
                  alt=""
                />

                <p className="settings-profile__included-text">
                  ivanov.i@mail.ru
                </p>

                <div className="settings-profile__included-edit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                  >
                    <path
                      d="M20.9441 5.78406L18.7161 3.55603C18.1951 3.03603 17.5441 2.749 16.7681 2.75C16.0321 2.751 15.341 3.03906 14.823 3.56006L2.46899 15.971C2.32799 16.1119 2.25 16.302 2.25 16.5V21.5C2.25 21.914 2.586 22.25 3 22.25H8C8.198 22.25 8.38905 22.171 8.52905 22.032L20.9399 9.677C21.4609 9.158 21.749 8.46706 21.75 7.73206C21.751 6.99606 21.4651 6.30406 20.9441 5.78406ZM7.68994 20.75H3.75V16.8101L12.7429 7.776L16.7251 11.757L7.68994 20.75ZM19.8821 8.61402L17.7881 10.699L13.801 6.71302L15.886 4.61804C16.122 4.38104 16.436 4.251 16.771 4.25H16.772C17.106 4.25 17.42 4.37997 17.657 4.61597L19.885 6.844C20.121 7.081 20.251 7.39498 20.251 7.72998C20.25 8.06398 20.1191 8.37802 19.8821 8.61402Z"
                      fill="#D1D1D1"
                    ></path>
                  </svg>
                </div>
              </li>

              <li className="settings-profile__included-item">
                <img
                  className="settings-profile__included-icon"
                  src="/img/icons/telegram.svg"
                  alt=""
                />

                <p className="settings-profile__included-text">ivanov</p>

                <div className="settings-profile__included-edit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                  >
                    <path
                      d="M20.9441 5.78406L18.7161 3.55603C18.1951 3.03603 17.5441 2.749 16.7681 2.75C16.0321 2.751 15.341 3.03906 14.823 3.56006L2.46899 15.971C2.32799 16.1119 2.25 16.302 2.25 16.5V21.5C2.25 21.914 2.586 22.25 3 22.25H8C8.198 22.25 8.38905 22.171 8.52905 22.032L20.9399 9.677C21.4609 9.158 21.749 8.46706 21.75 7.73206C21.751 6.99606 21.4651 6.30406 20.9441 5.78406ZM7.68994 20.75H3.75V16.8101L12.7429 7.776L16.7251 11.757L7.68994 20.75ZM19.8821 8.61402L17.7881 10.699L13.801 6.71302L15.886 4.61804C16.122 4.38104 16.436 4.251 16.771 4.25H16.772C17.106 4.25 17.42 4.37997 17.657 4.61597L19.885 6.844C20.121 7.081 20.251 7.39498 20.251 7.72998C20.25 8.06398 20.1191 8.37802 19.8821 8.61402Z"
                      fill="#D1D1D1"
                    ></path>
                  </svg>
                </div>
              </li>

              <li className="settings-profile__included-item">
                <img
                  className="settings-profile__included-icon"
                  src="/img/icons/vk.svg"
                  alt=""
                />

                <p className="settings-profile__included-text">ivanov111</p>

                <div className="settings-profile__included-edit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                  >
                    <path
                      d="M20.9441 5.78406L18.7161 3.55603C18.1951 3.03603 17.5441 2.749 16.7681 2.75C16.0321 2.751 15.341 3.03906 14.823 3.56006L2.46899 15.971C2.32799 16.1119 2.25 16.302 2.25 16.5V21.5C2.25 21.914 2.586 22.25 3 22.25H8C8.198 22.25 8.38905 22.171 8.52905 22.032L20.9399 9.677C21.4609 9.158 21.749 8.46706 21.75 7.73206C21.751 6.99606 21.4651 6.30406 20.9441 5.78406ZM7.68994 20.75H3.75V16.8101L12.7429 7.776L16.7251 11.757L7.68994 20.75ZM19.8821 8.61402L17.7881 10.699L13.801 6.71302L15.886 4.61804C16.122 4.38104 16.436 4.251 16.771 4.25H16.772C17.106 4.25 17.42 4.37997 17.657 4.61597L19.885 6.844C20.121 7.081 20.251 7.39498 20.251 7.72998C20.25 8.06398 20.1191 8.37802 19.8821 8.61402Z"
                      fill="#D1D1D1"
                    ></path>
                  </svg>
                </div>
              </li>

              <li className="settings-profile__included-item">
                <img
                  className="settings-profile__included-icon"
                  src="/img/icons/google-svgrepo-com 1.svg"
                  alt=""
                />

                <p className="settings-profile__included-text">
                  ivanov.i@gmail.com
                </p>

                <div className="settings-profile__included-edit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                  >
                    <path
                      d="M20.9441 5.78406L18.7161 3.55603C18.1951 3.03603 17.5441 2.749 16.7681 2.75C16.0321 2.751 15.341 3.03906 14.823 3.56006L2.46899 15.971C2.32799 16.1119 2.25 16.302 2.25 16.5V21.5C2.25 21.914 2.586 22.25 3 22.25H8C8.198 22.25 8.38905 22.171 8.52905 22.032L20.9399 9.677C21.4609 9.158 21.749 8.46706 21.75 7.73206C21.751 6.99606 21.4651 6.30406 20.9441 5.78406ZM7.68994 20.75H3.75V16.8101L12.7429 7.776L16.7251 11.757L7.68994 20.75ZM19.8821 8.61402L17.7881 10.699L13.801 6.71302L15.886 4.61804C16.122 4.38104 16.436 4.251 16.771 4.25H16.772C17.106 4.25 17.42 4.37997 17.657 4.61597L19.885 6.844C20.121 7.081 20.251 7.39498 20.251 7.72998C20.25 8.06398 20.1191 8.37802 19.8821 8.61402Z"
                      fill="#D1D1D1"
                    ></path>
                  </svg>
                </div>
              </li>

              <li className="settings-profile__included-item">
                <img
                  className="settings-profile__included-icon"
                  src="/img/icons/icloud.svg"
                  alt=""
                />

                <p className="settings-profile__included-text">
                  ivanov.i@gmail.com
                </p>

                <div className="settings-profile__included-edit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                  >
                    <path
                      d="M20.9441 5.78406L18.7161 3.55603C18.1951 3.03603 17.5441 2.749 16.7681 2.75C16.0321 2.751 15.341 3.03906 14.823 3.56006L2.46899 15.971C2.32799 16.1119 2.25 16.302 2.25 16.5V21.5C2.25 21.914 2.586 22.25 3 22.25H8C8.198 22.25 8.38905 22.171 8.52905 22.032L20.9399 9.677C21.4609 9.158 21.749 8.46706 21.75 7.73206C21.751 6.99606 21.4651 6.30406 20.9441 5.78406ZM7.68994 20.75H3.75V16.8101L12.7429 7.776L16.7251 11.757L7.68994 20.75ZM19.8821 8.61402L17.7881 10.699L13.801 6.71302L15.886 4.61804C16.122 4.38104 16.436 4.251 16.771 4.25H16.772C17.106 4.25 17.42 4.37997 17.657 4.61597L19.885 6.844C20.121 7.081 20.251 7.39498 20.251 7.72998C20.25 8.06398 20.1191 8.37802 19.8821 8.61402Z"
                      fill="#D1D1D1"
                    ></path>
                  </svg>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="settings-profile__select">
          <div className="settings-profile__notifications">
            <p className="settings-profile__notifications-title">Уведомления</p>

            <div className="settings-profile__notifications-group checkbox-group">
              <input
                className="settings-profile__notifications-checkbox checkbox-input"
                type="checkbox"
                id="settings-profile-1"
              />

              <label
                className="settings-profile__notifications-label checkbox-label"
                htmlFor="settings-profile-1"
              >
                <div className="settings-profile__notifications-decor checkbox-decor"></div>

                <div className="settings-profile__notifications-links">
                  <div className="settings-profile__notifications-link">
                    <img src="/img/icons/mail.svg" alt="" />

                    <span>Почта</span>
                  </div>

                  <div className="settings-profile__notifications-link">
                    ivanov@mail.ru
                  </div>
                </div>
              </label>
            </div>

            <div className="settings-profile__notifications-group checkbox-group">
              <input
                className="settings-profile__notifications-checkbox checkbox-input"
                type="checkbox"
                id="settings-profile-2"
              />

              <label
                className="settings-profile__notifications-label checkbox-label"
                htmlFor="settings-profile-2"
              >
                <div className="settings-profile__notifications-decor checkbox-decor"></div>

                <div className="settings-profile__notifications-links">
                  <div className="settings-profile__notifications-link">
                    <img src="/img/icons/telegram.svg" alt="" />

                    <span>Telegram</span>
                  </div>

                  <div className="settings-profile__notifications-link">
                    @ivanov
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}