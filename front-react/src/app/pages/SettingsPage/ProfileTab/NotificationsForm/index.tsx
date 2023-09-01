import { BellCheckbox } from "../BellCheckbox";
import { Notification } from "@awex-api";

export interface NotificationsFormProps {
  loading: boolean;
  notificationSettings: Notification;
  onUpdate: (nextNotificationSettings: Notification) => void;
}

export function NotificationsForm(props: NotificationsFormProps) {
  const handleChange = (value: boolean, name: keyof Notification) => {
    if (props.loading) {
      return;
    }
    const nextNotificationSettings = { ...props.notificationSettings };
    nextNotificationSettings[name] = value;
    props.onUpdate(nextNotificationSettings);
  };

  return (
    <form
      className="settings-profile__selects grid-column-1"
      onSubmit={(ev) => void ev.preventDefault()}
    >
      <div className="settings-profile__select">
        <div className="settings-profile__included">
          <p className="settings-profile__included-label">Уведомления</p>

          <ul className="settings-profile__included-list">
            <li className="settings-profile__included-item">
              <img
                className="settings-profile__included-icon"
                src="./img/icons/mail.svg"
                alt=""
              />

              <p className="settings-profile__included-text">
                ivanov.i@mail.ru
              </p>

              <BellCheckbox
                value={props.notificationSettings.email}
                onChange={(value) => handleChange(value, "email")}
              />
            </li>

            <li className="settings-profile__included-item">
              <img
                className="settings-profile__included-icon"
                src="./img/icons/telegram.svg"
                alt=""
              />

              <p className="settings-profile__included-text">ivanov</p>

              <BellCheckbox
                value={props.notificationSettings.telegram}
                onChange={(value) => handleChange(value, "telegram")}
              />
            </li>

            <li className="settings-profile__included-item">
              <img
                className="settings-profile__included-icon"
                src="./img/icons/vk.svg"
                alt=""
              />

              <p className="settings-profile__included-text">ivanov111</p>

              <BellCheckbox
                value={props.notificationSettings.vk}
                onChange={(value) => handleChange(value, "vk")}
              />
            </li>

            <li className="settings-profile__included-item">
              <img
                className="settings-profile__included-icon"
                src="./img/icons/google-svgrepo-com 1.svg"
                alt=""
              />

              <p className="settings-profile__included-text">
                ivanov.i@gmail.com
              </p>

              <BellCheckbox
                value={props.notificationSettings.google}
                onChange={(value) => handleChange(value, "google")}
              />
            </li>

            <li className="settings-profile__included-item">
              <img
                className="settings-profile__included-icon"
                src="./img/icons/icloud.svg"
                alt=""
              />

              <p className="settings-profile__included-text">
                ivanov.i@gmail.com
              </p>

              <BellCheckbox
                value={props.notificationSettings.apple}
                onChange={(value) => handleChange(value, "apple")}
              />
            </li>
          </ul>
        </div>
      </div>
    </form>
  );
}

// function registerCheckbox(notificationSettings: Notification, key: keyof Notification, onUpdate: (nextNotificationSettings: Notification) => void) {
//   return {
//     value: notificationSettings[key],
//     onUpdate: (value: boolean) => {
//       const nextNotificationSettings = {...notificationSettings};
//       nextNotificationSettings[key] = value;
//       onUpdate(nextNotificationSettings);
//     }
//   }
// }
