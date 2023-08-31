import { AuthModalContainer } from "@containers/AuthModalContainer";
import { RegisterModalContainer } from "@containers/RegisterModalContainer";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { signOut } from "@store/auth/slice";
import "./style.css";
import { Link } from "react-router-dom";
import { HOME_PAGE_PATH } from "../../constants/path-locations";
import { RecoverModalContainer } from "@containers/RecoverModalContainer";
import { DescribeProblemModalContainer } from "@containers/DescribeProblemModalContainer";

export function AuthPage() {
  const dispatch = useAppDispatch();
  const authentificated = useAppSelector((state) => !!state.auth.user);
  const [authModalOpened, setAuthModalOpened] = useState(false);
  const [registerModalOpened, setRegisterModalOpened] = useState(false);
  const [recoverModalOpened, setRecoverModalOpened] = useState(false);
  const [describeProblemModalOpened, setDescribeProblemModalOpened] =
    useState(false);

  const handleSignInBtnClick = () => {
    setAuthModalOpened(!authModalOpened);
  };

  const handleSignOutBtnClick = () => {
    dispatch(signOut());
  };

  const handleRegisterBtnClick = () => {
    setRegisterModalOpened(!authModalOpened);
  };

  const handleRecoverBtnClick = () => {
    setRecoverModalOpened(!recoverModalOpened);
  };

  const handleDescribeProblemBtnClick = () => {
    setDescribeProblemModalOpened(!describeProblemModalOpened);
  };

  const handleCloseAuthModal = () => {
    setAuthModalOpened(false);
  };

  const handleCloseRegisterModal = () => {
    setRegisterModalOpened(false);
  };

  const handleCloseDescribeProblemModal = () => {
    setDescribeProblemModalOpened(false);
  };

  const handleNavRegister = () => {
    setAuthModalOpened(false);
    setRegisterModalOpened(true);
  };

  const handleNavRecover = () => {
    setAuthModalOpened(false);
    setRecoverModalOpened(true);
  };

  const handleNavDescribeProblem = () => {
    setAuthModalOpened(false);
    setDescribeProblemModalOpened(true);
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
        )}
        {!authentificated && (
          <button
            className="second-btn"
            type="button"
            onClick={handleRegisterBtnClick}
          >
            Регистрация
          </button>
        )}
        {!authentificated && (
          <button
            className="second-btn"
            type="button"
            onClick={handleRecoverBtnClick}
          >
            Сброс пароля
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
        <button
          className="second-btn"
          type="button"
          onClick={handleDescribeProblemBtnClick}
        >
          Опишите проблему
        </button>
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
        onNavRecover={handleNavRecover}
        onNavDescribeProblem={handleNavDescribeProblem}
      />
      <RegisterModalContainer
        open={registerModalOpened}
        onClose={handleCloseRegisterModal}
      />
      <RecoverModalContainer
        open={recoverModalOpened}
        onClose={handleRecoverBtnClick}
      />
      <DescribeProblemModalContainer
        open={describeProblemModalOpened}
        onClose={handleCloseDescribeProblemModal}
      />
    </section>
  );
}
