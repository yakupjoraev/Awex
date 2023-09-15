import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { adminAuthFormSchema } from "./validators";

type AdminAuthFormData = {
  login: string;
  password: string;
};

const DEFAULT_FORM_DATA: AdminAuthFormData = {
  login: "",
  password: "",
};

export interface AdminAuthFormProps {
  loading: boolean;
  error?: { type: "unknown" | "auth" };
  onSignIn: (opts: { login: string; password: string }) => void;
}

export function AdminAuthForm(props: AdminAuthFormProps) {
  const loginId = useId();
  const passwordId = useId();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<AdminAuthFormData>({
    defaultValues: DEFAULT_FORM_DATA,
    resolver: yupResolver(adminAuthFormSchema),
  });

  useEffect(() => {
    if (props.error && props.error.type === "auth") {
      setError("login", { message: "Неверный логин или пароль!" });
    }
    if (props.error && props.error.type === "unknown") {
      setError("root", { message: "Ошибка соединения с AWEX!" });
    }
  }, [props.error]);

  const handleAdminAuthFormSubmit = handleSubmit((formData) => {
    props.onSignIn({
      login: formData.login,
      password: formData.password,
    });
  });

  return (
    <form
      className="modal-content admin-enter__from"
      onSubmit={handleAdminAuthFormSubmit}
    >
      <div className="modal-content__header">
        <div className="modal-content__header-logo">
          <img src="/img/icons/logo-mini.svg" alt="" />
          <h2>Вход</h2>
        </div>
      </div>
      <div className="modal-content__main">
        <div className="my-projects__group project-group">
          <label className="my-projects__label project-label" htmlFor={loginId}>
            Логин
          </label>
          <input
            className="my-projects__input project-input"
            id={loginId}
            type="text"
            placeholder="Введите e-mail или логин AWEX"
            disabled={props.loading}
            {...register("login")}
          />
          {!!errors.login?.message && (
            <div className="project-error">{errors.login.message}</div>
          )}
        </div>
        <div className="my-projects__group project-group">
          <label
            className="my-projects__label project-label"
            htmlFor={passwordId}
          >
            Пароль
          </label>
          <input
            className="my-projects__input project-input"
            id={passwordId}
            type={passwordVisible ? "text" : "password"}
            placeholder="Введите пароль"
            disabled={props.loading}
            {...register("password")}
          />
          <button
            type="button"
            className="project-input__see"
            onClick={() => void setPasswordVisible(!passwordVisible)}
          >
            <img src="/img/icons/eye-open.svg" alt="" />
          </button>
          {!!errors.password?.message && (
            <div className="project-error">{errors.password.message}</div>
          )}
        </div>
      </div>
      <button
        className="modal-content__btn second-btn"
        type="submit"
        disabled={props.loading}
      >
        Войти в аккаунт
      </button>
    </form>
  );
}
