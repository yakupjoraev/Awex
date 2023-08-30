import { AuthModalContainer } from "@containers/AuthModalContainer";
import { RegisterModalContainer } from "@containers/RegisterModalContainer";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { signOut } from "@store/auth/slice";
import "./style.css";
import { Link } from "react-router-dom";
import { HOME_PAGE_PATH } from "../../constants/path-locations";

export function AuthPage() {
  const dispatch = useAppDispatch();
  const authentificated = useAppSelector((state) => !!state.auth.user);
  const [authModalOpened, setAuthModalOpened] = useState(false);
  const [registerModalOpened, setRegisterModalOpened] = useState(false);

  const handleSignInBtnClick = () => {
    setAuthModalOpened(!authModalOpened);
  };

  const handleSignOutBtnClick = () => {
    dispatch(signOut());
  };

  const handleRegisterBtnClick = () => {
    setRegisterModalOpened(!authModalOpened);
  };

  const handleCloseAuthModal = () => {
    setAuthModalOpened(false);
  };

  const handleCloseRegisterModal = () => {
    setRegisterModalOpened(false);
  };

  const handleNavRegister = () => {
    setAuthModalOpened(false);
    setRegisterModalOpened(true);
  };

  return (
    <section className="auth-page">
      <div className="auth-page__card">
        {!authentificated && (
          <button
            className="main-btn"
            type="button"
            onClick={handleSignInBtnClick}
          >
            Войти
          </button>
        )}{" "}
        {!authentificated && (
          <button
            className="second-btn"
            type="button"
            onClick={handleRegisterBtnClick}
          >
            Регистрация
          </button>
        )}
        {authentificated && (
          <button
            className="main-btn"
            type="button"
            onClick={handleSignOutBtnClick}
          >
            Выйти
          </button>
        )}
        {authentificated && (
          <Link className="auth-page__home-link" to={HOME_PAGE_PATH}>
            Главная
          </Link>
        )}
      </div>

      <AuthModalContainer
        open={authModalOpened}
        onClose={handleCloseAuthModal}
        onNavRegister={handleNavRegister}
      />
      <RegisterModalContainer
        open={registerModalOpened}
        onClose={handleCloseRegisterModal}
      />
    </section>
  );
}
