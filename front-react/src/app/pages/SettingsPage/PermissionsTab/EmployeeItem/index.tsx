export interface EmployeeItemProps {
  employeeId: string;
  label: string;
  email: string;
  name: string;
  enabled: boolean;
  onDelete: (employeeId: string) => void;
  onDisable: (employeeId: string) => void;
  onEnable: (employeeId: string) => void;
  onEdit: (employeeId: string) => void;
}

export function EmployeeItem(props: EmployeeItemProps) {
  return (
    <li className="settings-security__user">
      <div className="settings-security__user-info">
        <div className="settings-security__user-icon">
          <img src="/img/icons/user-alt.svg" alt="" />
        </div>

        <div className="settings-security__user-texts">
          {renderUserRoleLabel(props.label)}

          <p className="settings-security__user-name">{props.name}</p>

          <a
            className="settings-security__user-mail"
            href={`mailto:${props.email}`}
          >
            ({props.email})
          </a>
        </div>

        <div
          className="settings-security__user-edit"
          onClick={() => props.onEdit(props.employeeId)}
        >
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
      </div>

      <div className="settings-security__user-action">
        {props.enabled ? (
          <button
            type="button"
            className="settings-security__user-btn third-btn"
            onClick={() => props.onDisable(props.employeeId)}
          >
            Заблокировать
          </button>
        ) : (
          <button
            type="button"
            className="settings-security__user-btn third-btn"
            onClick={() => props.onEnable(props.employeeId)}
          >
            Разблокировать
          </button>
        )}

        <button
          type="button"
          className="settings-security__user-btn settings-security__user-btn--delete"
          onClick={() => props.onDelete(props.employeeId)}
        >
          <img src="/img/icons/trash-red.svg" alt="trash-red" />
          Удалить
        </button>
      </div>
    </li>
  );
}

function renderUserRoleLabel(label: string) {
  switch (label) {
    case "Админ": {
      return (
        <div className="settings-security__user-label settings-security__user-label--yellow">
          Админ
        </div>
      );
    }
    case "Управляющий": {
      return (
        <div className="settings-security__user-label settings-security__user-label--black">
          Управляющий
        </div>
      );
    }
    case "Работник": {
      return (
        <div className="settings-security__user-label settings-security__user-label--grey">
          Работник
        </div>
      );
    }
    default: {
      return (
        <div className="settings-security__user-label settings-security__user-label--grey">
          {label}
        </div>
      );
    }
  }
}
