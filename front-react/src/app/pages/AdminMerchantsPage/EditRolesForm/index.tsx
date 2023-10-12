import classNames from "classnames";
import style from "./style.module.css";
import { useEffect, useId, useMemo, useState } from "react";

const roleToLabel: Record<string, string> = {
  administrators: "Администраторы",
  merchants: "Мерчанты",
  projects: "Проекты",
  fees: "Комиссия",
  statistics: "Статистика",
  referral: "Рефералы",
  orders: "Заявки",
};

const DEFAULT_ROLE_VALUES: string[] = [];

export interface EditRolesFormProps {
  className?: string;
  existingRoles: string[];
  roles: string[];
  onUpdateRoles: (roles: string[], cb: () => void) => void;
}

export function EditRolesForm(props: EditRolesFormProps) {
  const rolePrefix = useId();
  const [disabled, setDisabled] = useState(false);
  const [roleValues, setRoleValues] = useState(DEFAULT_ROLE_VALUES);

  useEffect(() => {
    setRoleValues(props.roles);
  }, [props.roles]);

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setDisabled(true);
    props.onUpdateRoles(roleValues, () => {
      setDisabled(false);
    });
  };

  const handleRoleChange = (value: string, checked: boolean) => {
    const nextRoleValues = checked
      ? addItemToArray(roleValues, value)
      : removeItemFromArray(roleValues, value);
    setRoleValues(nextRoleValues);
  };

  const roles = useMemo(
    () => unique(props.existingRoles),
    [props.existingRoles]
  );

  return (
    <form
      className={classNames(style["edit-roles-form"], props.className)}
      onSubmit={handleSubmit}
    >
      <div className={style["edit-roles-form__checkboxes"]}>
        {roles.map((role) => {
          const id = rolePrefix + role;
          const checked = roleValues.includes(role);
          return renderRoleCheckbox(
            role,
            id,
            role,
            checked,
            disabled,
            handleRoleChange
          );
        })}
      </div>
      <button
        className={classNames("main-btn", style["edit-roles-form__submit"])}
        type="submit"
        disabled={disabled}
      >
        Сохранить
      </button>
    </form>
  );
}

function renderRoleCheckbox(
  key: string,
  id: string,
  value: string,
  checked: boolean,
  disbaled: boolean,
  onChange: (value: string, checked: boolean) => void
) {
  const handleChange = (_ev: React.ChangeEvent<HTMLInputElement>) => {
    onChange(value, !checked);
  };

  const label = Object.prototype.hasOwnProperty.call(roleToLabel, value)
    ? roleToLabel[value]
    : value;

  return (
    <div className="my-projects__checkbox-view checkbox-group" key={key}>
      <input
        className="my-projects__checkbox-checkbox checkbox-input"
        type="checkbox"
        id={id}
        value={value}
        name="role"
        checked={checked}
        disabled={disbaled}
        onChange={handleChange}
      />
      <label
        className="my-projects__checkbox-label checkbox-label"
        htmlFor={id}
      >
        <div className="my-projects__checkbox-decor checkbox-decor" />
        <span className="my-projects__checkbox-text checkbox-text">
          {label}
        </span>
      </label>
    </div>
  );
}

function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

function addItemToArray<T>(array: T[], item: T): T[] {
  const itemIndex = array.indexOf(item);
  if (itemIndex !== -1) {
    return array;
  }
  return [...array, item];
}

function removeItemFromArray<T>(array: T[], item: T): T[] {
  const itemIndex = array.indexOf(item);
  if (itemIndex === -1) {
    return array;
  }
  return [...array.slice(0, itemIndex), ...array.slice(itemIndex + 1)];
}
