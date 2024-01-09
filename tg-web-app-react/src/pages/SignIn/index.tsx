import React, { useContext, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import cookies from "../../services/cookies";
import { AppContext } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../apis/Awex";
import SignInForm from "./SignInForm";
import { useForm } from "react-hook-form";
import { ILogin } from "../../models/auth.models";

export default function SignIn() {
  const { site } = useContext(AppContext);
  const navigate = useNavigate();

  const SignInFormSchema = yup.object().shape({
    email: yup.string().required("Обязательное поле"),
    password: yup.string().required("Обязательное поле"),
  });

  const useFormReturn = useForm({
    resolver: yupResolver(SignInFormSchema),
  });

  const handleForm = async (data: ILogin) => {
    try {
      const response = await signIn(data);
      if (response?.status == 200) {
        cookies.set("token", response?.data?.token);
        site.setToken(response?.data?.token);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err?.response?.status == 401 && err?.response?.data?.errors) {
        useFormReturn.setError("email", {
          type: "manual",
          message: err?.response?.data?.errors?.email,
        });
        useFormReturn.setError("password", {
          type: "manual",
          message: err?.response?.data?.errors?.password,
        });
      }
    }
  };

  return (
    <main className="center-container">
      <div className="wrapper">
        <SignInForm useFormInstance={useFormReturn} onSubmit={handleForm} />
      </div>
    </main>
  );
}
