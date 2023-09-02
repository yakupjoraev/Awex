import { yupResolver } from "@hookform/resolvers/yup";
import { Control, Controller, useForm } from "react-hook-form";
import { addEmployeeFormSchema } from "./validators";
import classNames from "classnames";
import { useId } from "react";

interface AddEmployeeFormData {
  email: string;
  role: "worker" | "manager" | "admin";
}

const DEFAULT_FORM_DATA: AddEmployeeFormData = {
  email: "",
  role: "worker",
};

export function AddEmployeeForm() {
  const formId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<AddEmployeeFormData>({
    defaultValues: DEFAULT_FORM_DATA,
    resolver: yupResolver(addEmployeeFormSchema),
  });

  const handleAddEmployeeFormSubmit = handleSubmit((formData) => {
    alert("NOT IMPLEMENTED");
  });

  return (
    <form
      className="settings-profile__select"
      onSubmit={handleAddEmployeeFormSubmit}
    >
      <div className="settings-security__header">
        <h3 className="settings-security__title">Добавить нового сотрудника</h3>

        <button className="settings-security__header-btn settings-security__header-btn--password third-btn">
          Отменить
        </button>
      </div>

      <div className="settings-security__middle">
        <div className="my-projects__group project-group">
          <label className="my-projects__label project-label" htmlFor="#">
            E-mail для доступа
          </label>

          <input
            className="my-projects__input project-input"
            type="email"
            placeholder="Введите e-mail"
            {...register("email")}
          />
          {errors.email && errors.email.message && (
            <div className="project-error">{errors.email.message}</div>
          )}
        </div>

        <div className="settings-notifications__levels">
          <h5 className="settings-notifications__levels-label">
            Уровень доступа
          </h5>
          <ul className="settings-notifications__levels-list">
            {renderRoleRadio(control, "worker", "Работник", formId)}
            {renderRoleRadio(control, "manager", "Управляющий", formId)}
            {renderRoleRadio(control, "admin", "Админ", formId)}
          </ul>
        </div>

        <div className="settings-notifications__checkboxes">
          <div className="settings-notifications__checkbox">
            <div className="my-projects__checkbox-view checkbox-group">
              <input
                className="my-projects__checkbox-checkbox checkbox-input"
                type="checkbox"
                id="settings-notifications-1checkbox1"
              />

              <label
                className="my-projects__checkbox-label checkbox-label"
                htmlFor="settings-notifications-1checkbox1"
              >
                <div className="my-projects__checkbox-decor checkbox-decor"></div>
                <span className="my-projects__checkbox-text checkbox-text">
                  Выставлять счета
                </span>
              </label>
            </div>
          </div>

          <div className="settings-notifications__checkbox">
            <div className="my-projects__checkbox-view checkbox-group">
              <input
                className="my-projects__checkbox-checkbox checkbox-input"
                type="checkbox"
                id="settings-notifications-1checkbox2"
              />

              <label
                className="my-projects__checkbox-label checkbox-label"
                htmlFor="settings-notifications-1checkbox2"
              >
                <div className="my-projects__checkbox-decor checkbox-decor"></div>
                <span className="my-projects__checkbox-text checkbox-text">
                  Выставлять счета
                </span>
              </label>
            </div>
          </div>

          <div className="settings-notifications__checkbox">
            <div className="my-projects__checkbox-view checkbox-group">
              <input
                className="my-projects__checkbox-checkbox checkbox-input"
                type="checkbox"
                id="settings-notifications-1checkbox3"
              />

              <label
                className="my-projects__checkbox-label checkbox-label"
                htmlFor="settings-notifications-1checkbox3"
              >
                <div className="my-projects__checkbox-decor checkbox-decor"></div>
                <span className="my-projects__checkbox-text checkbox-text">
                  Выставлять счета
                </span>
              </label>
            </div>
          </div>

          <div className="settings-notifications__checkbox">
            <div className="my-projects__checkbox-view checkbox-group">
              <input
                className="my-projects__checkbox-checkbox checkbox-input"
                type="checkbox"
                id="settings-notifications-1checkbox4"
              />

              <label
                className="my-projects__checkbox-label checkbox-label"
                htmlFor="settings-notifications-1checkbox4"
              >
                <div className="my-projects__checkbox-decor checkbox-decor"></div>
                <span className="my-projects__checkbox-text checkbox-text">
                  Выставлять счета
                </span>
              </label>
            </div>
          </div>

          <div className="settings-notifications__checkbox">
            <div className="my-projects__checkbox-view checkbox-group">
              <input
                className="my-projects__checkbox-checkbox checkbox-input"
                type="checkbox"
                id="settings-notifications-1checkbox5"
              />

              <label
                className="my-projects__checkbox-label checkbox-label"
                htmlFor="settings-notifications-1checkbox5"
              >
                <div className="my-projects__checkbox-decor checkbox-decor"></div>
                <span className="my-projects__checkbox-text checkbox-text">
                  Выставлять счета
                </span>
              </label>
            </div>
          </div>

          <div className="settings-notifications__checkbox">
            <div className="my-projects__checkbox-view checkbox-group">
              <input
                className="my-projects__checkbox-checkbox checkbox-input"
                type="checkbox"
                id="settings-notifications-1checkbox6"
              />

              <label
                className="my-projects__checkbox-label checkbox-label"
                htmlFor="settings-notifications-1checkbox6"
              >
                <div className="my-projects__checkbox-decor checkbox-decor"></div>
                <span className="my-projects__checkbox-text checkbox-text">
                  Выставлять счета
                </span>
              </label>
            </div>
          </div>

          <div className="settings-notifications__checkbox">
            <div className="my-projects__checkbox-view checkbox-group">
              <input
                className="my-projects__checkbox-checkbox checkbox-input"
                type="checkbox"
                id="settings-notifications-1checkbox7"
              />

              <label
                className="my-projects__checkbox-label checkbox-label"
                htmlFor="settings-notifications-1checkbox7"
              >
                <div className="my-projects__checkbox-decor checkbox-decor"></div>
                <span className="my-projects__checkbox-text checkbox-text">
                  Выставлять счета
                </span>
              </label>
            </div>
          </div>

          <div className="settings-notifications__checkbox">
            <div className="my-projects__checkbox-view checkbox-group">
              <input
                className="my-projects__checkbox-checkbox checkbox-input"
                type="checkbox"
                id="settings-notifications-1checkbox8"
              />

              <label
                className="my-projects__checkbox-label checkbox-label"
                htmlFor="settings-notifications-1checkbox8"
              >
                <div className="my-projects__checkbox-decor checkbox-decor"></div>
                <span className="my-projects__checkbox-text checkbox-text">
                  Выставлять счета
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <button type="submit" className="settings-security__btn main-btn">
        Выслать приглашение
      </button>
    </form>
  );
}

function renderRoleRadio(
  control: Control<AddEmployeeFormData, any>,
  value: "worker" | "manager" | "admin",
  label: string,
  formId: string
) {
  return (
    <Controller
      control={control}
      name="role"
      render={({ field }) => {
        return (
          <li className="settings-notifications__levels-item">
            <label
              className={classNames(
                "settings-notifications__levels-link settings__item",
                { active: value === field.value }
              )}
              htmlFor={`${formId}${value}`}
            >
              <input
                className="settings-notifications__levels-radio"
                type="radio"
                id={`${formId}${value}`}
                {...field}
                checked={field.value === value}
                onChange={() => field.onChange(value)}
              />
              {label}
            </label>
          </li>
        );
      }}
    />
  );
}
