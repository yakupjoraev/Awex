import { ROUTE } from "@constants/path-locations";
import { AuthModalContainer } from "@containers/AuthModalContainer";
import { BlockProfileModalContainer } from "@containers/BlockProfileModalContainer";
import { DescribeProblemModalContainer } from "@containers/DescribeProblemModalContainer";
import { RecoverModalContainer } from "@containers/RecoverModalContainer";
import { RegisterModalContainer } from "@containers/RegisterModalContainer";
import { useAppSelector } from "@store/hooks";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPersonalPage: React.FC = () => {
  const [authModalOpened, setAuthModalOpened] = useState(false);
  const [registerModalOpened, setRegisterModalOpened] = useState(false);
  const [recoverModalOpened, setRecoverModalOpened] = useState(false);
  const [describeProblemModalOpened, setDescribeProblemModalOpened] =
    useState(false);
  const [blockProfileModalOpened, setBlockProfileModalOpened] = useState(false);

  const authorized = useAppSelector((state) => state.auth.user !== undefined);

  const navigate = useNavigate();

  const handleStartButton = () => {
    if (authorized) {
      navigate(ROUTE.DASHBOARD_PATH);
    } else {
      handleSignInBtnClick();
    }
  };

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

  const onNavBlockProfile = () => {
    setAuthModalOpened(false);
    setBlockProfileModalOpened(true);
  };

  const handleCloseBlockProfileModal = () => {
    setBlockProfileModalOpened(false);
  };

  return (
    <main className="main main--profile-filling">
      <section className="landing-page">
        <div className="landing-page__container">
          <div className="landing-page__inner">
            <div className="landing-page__hero">
              <div className="landing-page__hero-banner">
                <img src="/img/landing-page__hero-1.png" alt="" />
              </div>

              <div className="landing-page__hero-main">
                <h1 className="landing-page__hero-title">
                  Криптоэквайринг
                  <br />
                  доступный для всех
                </h1>

                <div className="landing-page__telegram">
                  <p className="landing-page__telegram-label">
                    Принимайте платежи в криптовалюте
                    <br />
                    через Telegram-бот @paylink
                  </p>

                  <div className="landing-page__telegram-picture">
                    <img
                      className="landing-page__telegram-icon"
                      src="/img/landing-page__telegram-icon.png"
                      alt=""
                    />
                    <img
                      className="landing-page__telegram-qr"
                      src="/img/landing-page__telegram-qr.svg"
                      alt=""
                    />
                  </div>

                  <a
                    className="landing-page__telegram-btn"
                    href="https://t.me/shop"
                    target="_blank"
                  >
                    Попробовать прямо сейчас
                  </a>
                </div>

                <div className="landing-page__hero-footer">
                  <h2 className="landing-page__hero-subtitle">
                    Выставляйте счета.
                    <br />
                    Моментально получайте оплату.
                  </h2>
                  <p className="landing-page__hero-text"></p>
                  Максимальное удобство операций
                  <br />
                  для вас и ваших клиентов
                </div>
              </div>

              <div className="landing-page__hero-banner landing-page__hero-banner--second">
                <img src="/img/landing-page__hero-2.png" alt="" />
              </div>
            </div>

            <div className="landing-page__partners">
              <h3 className="landing-page__partners-label">Сотрудничаем</h3>

              <ul className="landing-page__partners-list">
                <li className="landing-page__partners-item">
                  <img
                    className="landing-page__partners-pic"
                    src="/img/partners/landing-page__partners-1.svg"
                    alt=""
                  />
                </li>

                <li className="landing-page__partners-item">
                  <img
                    className="landing-page__partners-pic"
                    src="/img/partners/landing-page__partners-2.png"
                    alt=""
                  />
                </li>

                <li className="landing-page__partners-item">
                  <img
                    className="landing-page__partners-pic"
                    src="/img/partners/landing-page__partners-3.svg"
                    alt=""
                  />
                </li>

                <li className="landing-page__partners-item">
                  <img
                    className="landing-page__partners-pic"
                    src="/img/partners/landing-page__partners-4.png"
                    alt=""
                  />
                </li>

                <li className="landing-page__partners-item">
                  <img
                    className="landing-page__partners-pic"
                    src="/img/partners/landing-page__partners-5.png"
                    alt=""
                  />
                </li>

                <li className="landing-page__partners-item">
                  <img
                    className="landing-page__partners-pic"
                    src="/img/partners/landing-page__partners-6.svg"
                    alt=""
                  />
                </li>

                <li className="landing-page__partners-item">
                  <img
                    className="landing-page__partners-pic"
                    src="/img/partners/landing-page__partners-7.svg"
                    alt=""
                  />
                </li>

                <li className="landing-page__partners-item">
                  <img
                    className="landing-page__partners-pic"
                    src="/img/partners/landing-page__partners-8.png"
                    alt=""
                  />
                </li>

                <li className="landing-page__partners-item">
                  <img
                    className="landing-page__partners-pic"
                    src="/img/partners/landing-page__partners-9.svg"
                    alt=""
                  />
                </li>

                <li className="landing-page__partners-item">
                  <img
                    className="landing-page__partners-pic"
                    src="/img/partners/landing-page__partners-10.svg"
                    alt=""
                  />
                </li>

                <li className="landing-page__partners-item landing-page__partners-item--last">
                  <img
                    className="landing-page__partners-pic"
                    src="/img/partners/landing-page__partners-11.png"
                    alt=""
                  />
                </li>
              </ul>
            </div>

            <div className="landing-page__benifits">
              <div className="landing-page__benifits-block">
                <h4 className="landing-page__benifits-title">
                  Не нужно быть ИП или юридическим лицом
                </h4>

                <p>Создать ссылку может каждый</p>

                {/* <img src="/img/landing-page__benifits-1.png" alt="" /> */}
              </div>

              <div className="landing-page__benifits-block">
                <h4 className="landing-page__benifits-title">
                  Международные платежи
                </h4>

                <p>С минимальными комиссиями</p>

                {/* <img src="/img/landing-page__benifits-2.png" alt="" /> */}
              </div>

              <div className="landing-page__benifits-block">
                <h4 className="landing-page__benifits-title">Поддержка</h4>

                <p>
                  Круглосуточно <br />
                  24/7
                </p>

                {/* <img src="/img/landing-page__benifits-3.png" alt="" /> */}
              </div>
            </div>

            <div className="landing-page__counts">
              <div className="landing-page__counts-group">
                <p>Работаем в</p>
                <span>220+</span>
                <p>странах</p>
              </div>

              <div className="landing-page__counts-border"></div>

              <div className="landing-page__counts-group">
                <p>Возможность оплаты в</p>
                <span>300+</span>
                <p>крипто</p>
              </div>

              <div className="landing-page__counts-border"></div>

              <div className="landing-page__counts-group">
                <p>Оборот мерчантов</p>
                <span> {">"} $1 млрд</span>
                <p>в год</p>
              </div>
            </div>

            <div className="landing-page__started">
              <h3 className="landing-page__started-title">
                Начни свой путь в<br />
                криптопроцессинге с AWEX
              </h3>

              <button
                className="landing-page__started-link main-btn"
                onClick={handleStartButton}
              >
                Попробовать прямо сейчас
              </button>
            </div>
          </div>
        </div>

        <div className="chat__container">
          <div className="chat">
            <div className="chat__btn">
              <img src="./img/icons/chat-icon.svg" alt="chat-icon.svg" />
            </div>
          </div>
        </div>
      </section>

      <AuthModalContainer
        open={authModalOpened}
        onClose={handleCloseAuthModal}
        onNavRegister={handleNavRegister}
        onNavRecover={handleNavRecover}
        onNavDescribeProblem={handleNavDescribeProblem}
        onNavBlockProfile={onNavBlockProfile}
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

      <BlockProfileModalContainer
        open={blockProfileModalOpened}
        onClose={handleCloseBlockProfileModal}
      />
    </main>
  );
};

export default LandingPersonalPage;
