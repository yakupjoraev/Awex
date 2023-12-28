import React from "react";

const LandingFooter: React.FC = () => {
  return (
    <footer className="footer footer-app">
      <div className="footer__container">
        <div className="footer__inner">
          <div className="footer__lists">
            <ul className="footer__list">
              <li className="footer__item footer__item--header">Об AWEX</li>
              <li className="footer__item">
                <a className="footer__link" href="#">
                  О нас
                </a>
              </li>
              <li className="footer__item">
                <a className="footer__link" href="#">
                  Наша команда
                </a>
              </li>
              <li className="footer__item">
                <a className="footer__link" href="#">
                  AWEX Блог
                </a>
              </li>
              <li className="footer__item">
                <a className="footer__link" href="#">
                  База знаний
                </a>
              </li>
              <li className="footer__item">
                <a className="footer__link" href="#">
                  FAQ
                </a>
              </li>
            </ul>

            <ul className="footer__list">
              <li className="footer__item footer__item--header">Биржа</li>
              <li className="footer__item">
                <a className="footer__link" href="#">
                  Личный кабинет
                </a>
              </li>
              <li className="footer__item">
                <a className="footer__link" href="#">
                  Торговля
                </a>
              </li>
              <li className="footer__item">
                <a className="footer__link" href="#">
                  Обмен
                </a>
              </li>
              <li className="footer__item">
                <a className="footer__link" href="#">
                  Тарифы
                </a>
              </li>
              <li className="footer__item">
                <a className="footer__link" href="#">
                  Комиссии
                </a>
              </li>
            </ul>

            <ul className="footer__list">
              <li className="footer__item footer__item--header">
                Документация
              </li>
              <li className="footer__item">
                <a className="footer__link" href="#">
                  Лицензия
                </a>
              </li>
              <li className="footer__item">
                <a className="footer__link" href="#">
                  Пользовательское соглашение
                </a>
              </li>
              <li className="footer__item">
                <a className="footer__link" href="#">
                  Политика конфиденциальльности
                </a>
              </li>
              <li className="footer__item">
                <a className="footer__link" href="#">
                  О рисках и соответствии нормам
                </a>
              </li>
            </ul>

            <ul className="footer__list">
              <li className="footer__item footer__item--header">
                Узнать больше
              </li>
              <li className="footer__item">
                <a className="footer__link" href="#">
                  Как купить Bitcoin
                </a>
              </li>
              <li className="footer__item">
                <a className="footer__link" href="#">
                  Как купить Etherium
                </a>
              </li>
              <li className="footer__item">
                <a className="footer__link" href="#">
                  Как купить с карты
                </a>
              </li>
              <li className="footer__item">
                <a className="footer__link" href="#">
                  Как работать с фьючерсами
                </a>
              </li>
              <li className="footer__item">
                <a className="footer__link" href="#">
                  Купить крипто за фиат
                </a>
              </li>
              <li className="footer__item">
                <a className="footer__link" href="#">
                  Криптоэквайринг для бизнеса
                </a>
              </li>
            </ul>

            <div className="footer__socials">
              <h4 className="footer__socials-title">Сообщество</h4>

              <div className="footer__socials-list">
                <a className="footer__socials-item" href="">
                  <img src="/img/icons/dzen light ver.svg" alt="" />
                </a>
                <a className="footer__socials-item" href="">
                  <img src="/img/icons/telegram light ver.svg" alt="" />
                </a>
                <a className="footer__socials-item" href="">
                  <img src="/img/icons/bitsmedia light ver.svg" alt="" />
                </a>
                <a className="footer__socials-item" href="">
                  <img src="/img/icons/vk light ver.svg" alt="" />
                </a>
                <a className="footer__socials-item" href="">
                  <img src="/img/icons/vc ru light ver.svg" alt="" />
                </a>
                <a className="footer__socials-item" href="">
                  <img src="/img/icons/twitter light ver.svg" alt="" />
                </a>
                <a className="footer__socials-item" href="">
                  <img src="/img/icons/pikabu light ver.svg" alt="" />
                </a>
                <a className="footer__socials-item" href="">
                  <img src="/img/icons/inst light ver.svg" alt="" />
                </a>
                <a className="footer__socials-item" href="">
                  <img src="/img/icons/facebook light ver.svg" alt="" />
                </a>
                <a className="footer__socials-item" href="">
                  <img src="/img/icons/medium light ver.svg" alt="" />
                </a>
              </div>

              <a className="footer__socials-link main-btn" href="#">
                Поддержка
              </a>
            </div>
          </div>

          <div className="footer__app">
            <div className="footer__app-label">Приложение AWEX</div>

            <div className="footer__app-list">
              <a className="footer__app-link" href="#">
                <img src="/img/icons/apple.svg" alt="AppStore" />

                <span>AppStore</span>
              </a>

              <a className="footer__app-link" href="#">
                <img src="/img/icons/googlePlay.svg" alt="Google Play" />

                <span>Google Play</span>
              </a>

              <a className="footer__app-link footer__app-link--row" href="#">
                <img src="/img/icons/app-qr.svg" alt="Скачать приложение" />

                <span>
                  Скачать <br />
                  приложение
                </span>
              </a>
            </div>
          </div>

          <div className="footer__copys">
            <p className="footer__copy-name">AWEX</p>
            <div className="footer__copy-text">
              Copyright 2022
              <a href="#" target="_blank">
                CRYPTO EXPLORER DMCC
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
