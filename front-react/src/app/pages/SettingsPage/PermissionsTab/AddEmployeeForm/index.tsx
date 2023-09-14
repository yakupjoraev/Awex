import { yupResolver } from "@hookform/resolvers/yup";
import { Control, Controller, useForm } from "react-hook-form";
import { addEmployeeFormSchema } from "./validators";
import classNames from "classnames";
import { useEffect, useId } from "react";
import toast from "react-hot-toast";

export interface AddEmployeeRequest {
  name: string;
  email: string;
  label: string;
  permissions: string[];
}

export interface AddEmployeeFormProps {
  className?: string;
  labels: string[];
  permissions: string[];
  loading: boolean;
  onNavEmployeeList: () => void;
  addEmployee: (request: AddEmployeeRequest) => Promise<void>;
}

interface AddEmployeeFormData {
  name: string;
  email: string;
  label: string;
  permissions: string[];
}

const DEFAULT_FORM_DATA: AddEmployeeFormData = {
  name: "",
  email: "",
  label: "",
  permissions: [],
};

export function AddEmployeeForm(props: AddEmployeeFormProps) {
  const formId = useId();
  const nameId = useId();
  const emailId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm<AddEmployeeFormData>({
    defaultValues: DEFAULT_FORM_DATA,
    resolver: yupResolver(addEmployeeFormSchema),
  });

  useEffect(() => {
    if (props.labels.length > 0) {
      setValue("label", props.labels[0]);
    }
  }, [props.labels, setValue]);

  useEffect(() => {
    if (props.labels.length > 0) {
      setValue("permissions", []);
    }
  }, [props.permissions, setValue]);

  const handleAddEmployeeFormSubmit = handleSubmit((formData) => {
    props.addEmployee(formData).then(() => {
      reset();
      toast.success("Приглашение выслано!");
    });
  });

  return (
    <form
      className={classNames("settings-profile__select", props.className)}
      onSubmit={handleAddEmployeeFormSubmit}
    >
      <div className="settings-security__header">
        <h3 className="settings-security__title">Добавить нового сотрудника</h3>

        <button
          className="settings-security__header-btn settings-security__header-btn--password third-btn"
          type="button"
          onClick={props.onNavEmployeeList}
        >
          Отменить
        </button>
      </div>

      <div className="settings-security__middle">
        <div className="my-projects__group project-group">
          <label className="my-projects__label project-label" htmlFor={nameId}>
            Имя сотрудника
          </label>
          <input
            className="my-projects__input project-input"
            id={nameId}
            type="text"
            placeholder="Введитe имя сотрудника"
            {...register("name")}
          />
          {!!errors.name && !!errors.name.message && (
            <div className="project-error">{errors.name.message}</div>
          )}
        </div>

        <div className="my-projects__group project-group">
          <label className="my-projects__label project-label" htmlFor={emailId}>
            E-mail для доступа
          </label>
          <input
            className="my-projects__input project-input"
            id={emailId}
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
            {props.labels.map((label) => {
              return renderRoleRadio(control, label, label, formId, label);
            })}
          </ul>
        </div>

        <div
          className={classNames(
            "settings-notifications__checkboxes",
            !!errors.permissions &&
              !!errors.permissions.message &&
              "settings-notifications__checkboxes-errored"
          )}
        >
          {props.permissions.map((permission, i) => {
            const checkboxId = `${formId}perm${i.toString()}`;
            return (
              <div
                className="settings-notifications__checkbox"
                key={permission}
              >
                <div className="my-projects__checkbox-view checkbox-group">
                  <input
                    className="my-projects__checkbox-checkbox checkbox-input"
                    type="checkbox"
                    id={checkboxId}
                    value={permission}
                    {...register("permissions")}
                  />
                  <label
                    className="my-projects__checkbox-label checkbox-label"
                    htmlFor={checkboxId}
                  >
                    <div className="my-projects__checkbox-decor checkbox-decor"></div>
                    <span className="my-projects__checkbox-text checkbox-text">
                      {permission}
                    </span>
                  </label>
                </div>
              </div>
            );
          })}
        </div>
        {!!errors.permissions && !!errors.permissions.message && (
          <div className="settings-notifications__checkboxes-error">
            {errors.permissions.message}
          </div>
        )}
        {errors.root && errors.root.message && (
          <div className="my-projects__error">{errors.root.message}</div>
        )}
      </div>

      <button
        type="submit"
        className="settings-security__btn main-btn"
        disabled={props.loading}
      >
        Выслать приглашение
      </button>
    </form>
  );
}

function renderRoleRadio(
  control: Control<AddEmployeeFormData, any>,
  value: string,
  label: string,
  formId: string,
  key?: string
) {
  return (
    <Controller
      control={control}
      name="label"
      key={key}
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
