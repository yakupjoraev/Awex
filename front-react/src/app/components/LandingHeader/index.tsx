import { ROUTE } from "@constants/path-locations";
import { AuthModalContainer } from "@containers/AuthModalContainer";
import { DescribeProblemModalContainer } from "@containers/DescribeProblemModalContainer";
import { RecoverModalContainer } from "@containers/RecoverModalContainer";
import { RegisterModalContainer } from "@containers/RegisterModalContainer";
import { useAppSelector } from "@store/hooks";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const LandingHeader: React.FC = () => {
  const [authModalOpened, setAuthModalOpened] = useState(false);
  const [registerModalOpened, setRegisterModalOpened] = useState(false);
  const [recoverModalOpened, setRecoverModalOpened] = useState(false);
  const [describeProblemModalOpened, setDescribeProblemModalOpened] =
    useState(false);

  const authorized = useAppSelector((state) => state.auth.user !== undefined);

  const handleSignInBtnClick = () => {
    setAuthModalOpened(!authModalOpened);
  };

  const handleRecoverBtnClick = () => {
    setRecoverModalOpened(!recoverModalOpened);
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
    <header className="header header-app">
      <nav className="nav">
        <div className="nav__container">
          <div className="nav__list">
            <div className="nav__logo">
              <Link to={ROUTE.HOME_PAGE_PATH}>
                <img src="/img/sidebar/logo.svg" alt="Awex B2B logo" />
              </Link>
            </div>
            <ul className="nav__menu">
              <li className="nav__item" data-select-wrapper>
                <Link
                  to={ROUTE.HOME_PERSONAL_PAGE_PATH}
                  className="nav__item-link"
                  data-scroll
                >
                  Персональный
                </Link>
              </li>

              <li className="nav__item" data-select-wrapper>
                <Link
                  to={ROUTE.HOME_BUSINESS_PAGE_PATH}
                  className="nav__item-link"
                  data-scroll
                >
                  Бизнес
                </Link>
              </li>
            </ul>
            <div className="nav__others">
              <div className="sidebar__user">
                <img
                  className="sidebar__user-icon"
                  src="/img/icons/ru.svg"
                  alt="ru"
                />

                <span>RU</span>
              </div>

              {authorized ? (
                <Link
                  to={ROUTE.DASHBOARD_PATH}
                  className="sidebar__user sidebar__user--ls"
                >
                  <img
                    className="sidebar__user-icon"
                    src="/img/sidebar/user-black.svg"
                    alt="user"
                  />

                  <span>Личный кабинет</span>
                </Link>
              ) : (
                <button
                  className="landing-page__btn second-btn"
                  onClick={handleSignInBtnClick}
                >
                  Войти
                </button>
              )}
            </div>

            <div className="burger">
              <span></span>
            </div>
          </div>
        </div>
      </nav>

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
    </header>
  );
};

export default LandingHeader;
