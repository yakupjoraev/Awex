import {
  ADMIN_MERCHANTS_ROUTE,
  ADMIN_STATS_ROUTE,
} from "@constants/path-locations";
import { Link, Outlet } from "react-router-dom";

export function AdminAreaLayout() {
  return (
    <div className="main__body main__body--white">
      <header className="header header--admin">
        <nav className="nav">
          <div className="nav__container">
            <div className="nav__list">
              <div className="nav__logo">
                <a href="#">
                  <img src="/img/sidebar/logo.svg" alt="" />
                </a>
              </div>
              <ul className="nav__menu">
                <li className="nav__item">
                  <Link
                    to={ADMIN_MERCHANTS_ROUTE}
                    className="nav__item-link"
                    data-scroll=""
                  >
                    Мерчанты
                  </Link>
                </li>
                <li className="nav__item">
                  <a href="#" className="nav__item-link" data-scroll="">
                    Заявки
                  </a>
                </li>
                <li className="nav__item">
                  <a href="#" className="nav__item-link" data-scroll="">
                    Комиссия
                  </a>
                </li>
                <li className="nav__item">
                  <Link
                    className="nav__item-link"
                    data-scroll=""
                    to={ADMIN_STATS_ROUTE}
                  >
                    Статистика
                  </Link>
                </li>
                <li className="nav__item">
                  <a href="#" className="nav__item-link" data-scroll="">
                    Настройка прав
                  </a>
                </li>
              </ul>
              <div className="nav__others">
                <div data-select-wrapper="">
                  <div className="sidebar__user" data-select-arrow="">
                    <img
                      className="sidebar__user-icon"
                      src="/img/sidebar/user-black.svg"
                      alt="user"
                    />
                    <span>Администратор</span>
                    <div
                      className="sidebar__user-list select-list"
                      data-select-list=""
                    >
                      <a
                        href="#"
                        className="sidebar__user-item select-item"
                        data-select-item=""
                      >
                        <img
                          className="sidebar__user-item-img"
                          src="/img/sidebar/user.svg"
                          alt="user"
                        />
                        <span className="sidebar__user-item-text">
                          Ivan Ivanov
                        </span>
                      </a>
                      <a
                        href="#"
                        className="sidebar__user-item select-item"
                        data-select-item=""
                      >
                        <img
                          className="sidebar__user-item-img"
                          src="/img/sidebar/settings.svg"
                          alt="settings"
                        />
                        <span className="sidebar__user-item-text">
                          Настройки
                        </span>
                      </a>
                      <a
                        href="#"
                        className="sidebar__user-item sidebar__user-item--red select-item"
                        data-select-item=""
                      >
                        <img
                          className="sidebar__user-item-img"
                          src="/img/sidebar/log-out.svg"
                          alt="log-out"
                        />
                        <span className="sidebar__user-item-text">Выйти</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}
