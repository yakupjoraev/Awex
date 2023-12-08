import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { ILogin } from "../../models/auth.models";
import Input from "../../components/Form/Input";

interface IProps {
  useFormInstance: UseFormReturn<ILogin>;
  onSubmit: (data: ILogin) => void;
}

const SignInForm: React.FC<IProps> = ({ useFormInstance, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormInstance;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sign-form">
      <div className="sign-form__header">
        <div className="sign-form__header-logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
          >
            <rect
              x="0.248047"
              y="0.871094"
              width="25"
              height="25"
              rx="4"
              fill="#FED602"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.3949 7.42849C13.1958 7.33457 12.9746 7.2832 12.7452 7.2832C12.1483 7.2832 11.6071 7.63113 11.3637 8.17142L6.28955 19.436H8.1789L9.39003 16.663L10.0925 15.0716L12.4399 9.68411L13.3949 7.42849ZM13.4425 10.761L15.3003 15.0475L15.9785 16.6389L17.1897 19.4119H19.2001L14.3395 8.6427L13.4425 10.761ZM14.185 16.6732L12.6758 13.3532L11.1154 16.6732L14.185 16.6732Z"
              fill="#292421"
            />
          </svg>

          <h2>Вход</h2>
        </div>
      </div>

      <div className="sign-form__main">
        <Controller
          name="email"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              label="Логин"
              placeholder="Введите e-mail или логин AWEX"
              value={value}
              onChange={onChange}
              error={Boolean(errors?.email?.message)}
              helperText={errors?.email?.message}
            />
          )}
        />
        {/* 
        <a className="sign-form__forget" href="#">
          Не помните пароль?{" "}
        </a> */}

        <Controller
          name="password"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              label="Пароль"
              type="password"
              placeholder="Введите пароль"
              value={value}
              onChange={onChange}
              error={Boolean(errors?.password?.message)}
              helperText={errors?.password?.message}
            />
          )}
        />
      </div>

      <button type="submit" className="second-btn">
        Войти в аккаунт
      </button>

      <div className="sign-form__footer">
        <p>Нет аккаунта?</p>
        <a target="_blank" href="https://awex.freeblock.site/auth">
          Регистрация
        </a>
      </div>

      {/* <div className="sign-form__footer">
    <a href="#">Не могу получить доступ</a>
  </div> */}
    </form>
  );
};

export default SignInForm;
