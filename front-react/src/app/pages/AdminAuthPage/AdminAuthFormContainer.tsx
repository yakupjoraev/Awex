import { useState } from "react";
import { AdminAuthForm } from "./AdminAuthForm";
import { useAppDispatch } from "@store/hooks";
import { signIn } from "@store/auth/slice";
import { AUTH_SIGN_IN_ERROR, VER_REQ_SIGN_IN_ERROR } from "@store/auth/errors";
import { useNavigate } from "react-router-dom";

export function AdminAuthFormContainer() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [signInError, setSignInError] = useState<
    { type: "unknown" | "auth" } | undefined
  >(undefined);

  const handleSignIn = (opts: { login: string; password: string }) => {
    setLoading(true);
    dispatch(signIn({ login: opts.login, password: opts.password }))
      .unwrap()
      .then(() => {
        setSignInError(undefined);
        navigate("/admin/");
      })
      .catch((error) => {
        if (error && error.code === AUTH_SIGN_IN_ERROR) {
          setSignInError({ type: "auth" });
          return;
        }
        if (error && error.code === VER_REQ_SIGN_IN_ERROR) {
          setSignInError({ type: "auth" });
          return;
        }
        setSignInError({ type: "unknown" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <AdminAuthForm
      loading={loading}
      error={signInError}
      onSignIn={handleSignIn}
    />
  );
}
