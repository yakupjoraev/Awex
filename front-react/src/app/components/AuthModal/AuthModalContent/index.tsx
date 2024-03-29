import { useEffect, useId } from "react"
import classNames from "classnames"
import { FieldErrors, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { authFormSchema } from "./validators"

export type AuthStage = "auth" | "verify"

export interface AuthModalContentProps {
  open: boolean
  loading: boolean
  error?: { type: "unknown" | "auth" }
  onClose: () => void
  onSignIn: (opts: { login: string; password: string }) => void
  onNavRegister: () => void
  onNavRecover: () => void
  onNavDescribeProblem: () => void
  onNavBlockProfile: () => void
}

export type AuthModalFormData = {
  login: string
  password: string
}

const DEFAULT_FORM_DATA: AuthModalFormData = {
  login: "",
  password: "",
}

export function AuthModalContent(props: AuthModalContentProps) {
  const loginId = useId()
  const passwordId = useId()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<AuthModalFormData>({
    defaultValues: DEFAULT_FORM_DATA,
    resolver: yupResolver(authFormSchema),
  })

  useEffect(() => {
    if (props.error && props.error.type === "auth") {
      setError("login", { message: "Неверный логин или пароль!" })
    }
    if (props.error && props.error.type === "unknown") {
      setError("root", { message: "Ошибка соединения с AWEX!" })
    }
  }, [props.error])

  useEffect(() => {
    reset()
  }, [props.open])

  const handleAuthFormSumbit = handleSubmit((formData) => {
    props.onSignIn({
      login: formData.login,
      password: formData.password,
    })
  })

  return (
    <div className={classNames("modal modal-enter", { show: props.open })}>
      <form className="modal-content" onSubmit={handleAuthFormSumbit}>
        <div className="modal-content__header">
          <div className="modal-content__header-logo">
            <img src="/img/icons/logo-mini.svg" alt="" />
            <h2>Вход</h2>
          </div>

          <button
            type="button"
            className="close-modal-btn"
            onClick={props.onClose}
          >
            <img src="/img/icons/close-modal.svg" alt="" />
          </button>
        </div>

        <div className="modal-content__main">
          <div
            className={classNames("my-projects__group project-group", {
              "project-group--error": !!errors.login,
            })}
          >
            <label
              className="my-projects__label project-label"
              htmlFor={loginId}
            >
              Логин
            </label>

            <input
              className="my-projects__input project-input"
              id={loginId}
              type="text"
              placeholder="Введите e-mail или логин AWEX"
              autoComplete="username"
              disabled={props.loading}
              {...register("login")}
            />
            {renderFieldError(errors, "login")}
          </div>

          <a
            className="modal-content__enter-forget"
            href="#"
            onClick={(ev) => {
              ev.preventDefault();
              props.onNavRecover();
            }}
          >
            Не помните пароль?
          </a>

          <div
            className={classNames("my-projects__group project-group", {
              "project-group--error": !!errors.password,
            })}
          >
            <label
              className="my-projects__label project-label"
              htmlFor={passwordId}
            >
              Пароль
            </label>

            <input
              className="my-projects__input project-input"
              id={passwordId}
              type="password"
              placeholder="Введите пароль"
              autoComplete="current-password"
              disabled={props.loading}
              {...register("password")}
            />
            {renderFieldError(errors, "password")}
          </div>
          {errors.root && errors.root.message && (
            <div className="modal-content__error">{errors.root.message}</div>
          )}
        </div>

        <button
          type="submit"
          className="modal-content__btn second-btn"
          disabled={props.loading}
        >
          Войти в аккаунт
        </button>

        <div className="modal-content__enter-footer">
          <p>Нет аккаунта?</p>
          <a
            href="#"
            onClick={(ev) => {
              ev.preventDefault();
              props.onNavRegister();
            }}
          >
            Регистрация
          </a>
        </div>

        <div className="modal-content__enter-footer">
          <a
            href="#"
            onClick={(ev) => {
              ev.preventDefault();
              props.onNavDescribeProblem();
            }}
          >
            Не могу получить доступ
          </a>
        </div>

        <div className="modal-content__enter-footer">
          <a
            href="#"
            onClick={(ev) => {
              ev.preventDefault()
              props.onNavBlockProfile()
            }}
          >
            Заблокировать профиль
          </a>
        </div>
      </form>
    </div>
  );
}

function renderFieldError(
  errors: FieldErrors<AuthModalFormData>,
  field: keyof AuthModalFormData
) {
  const error = errors[field];
  if (!error || !error.message) {
    return null;
  }
  return <div className="project-error">{error.message}</div>;
}
