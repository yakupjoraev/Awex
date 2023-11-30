import {
  ADMIN_MERCHANTS_ROUTE,
  ADMIN_STATS_ROUTE,
} from "@constants/path-locations";
import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import { Link, Outlet, useSearchParams } from "react-router-dom";

const DEFAULT_SEARCH = "";
const QUERY_PARAM_SEARCH = "search";

export function AdminAreaLayout() {
  const [searchInputFocused, setSearchInputFocused] = useState(false);
  const [searchText, setSearchText] = useState(DEFAULT_SEARCH);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchFormSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    submitTextFilter();
  };

  const submitTextFilter = () => {
    const normalizedSearchText = searchText.trim();

    if (searchParams.get(QUERY_PARAM_SEARCH) === normalizedSearchText) {
      return;
    }

    const nextSearchParams = new URLSearchParams(searchParams);
    if (normalizedSearchText.length === 0) {
      nextSearchParams.delete(QUERY_PARAM_SEARCH);
    } else {
      nextSearchParams.set(QUERY_PARAM_SEARCH, normalizedSearchText);
    }
    setSearchParams(nextSearchParams);
  };

  const handleSearchInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(ev.currentTarget.value);
  };

  const submittedSearchText = useMemo(() => {
    const searchText = searchParams.get(QUERY_PARAM_SEARCH);
    return searchText === null ? DEFAULT_SEARCH : searchText;
  }, [searchParams]);

  useEffect(() => {
    setSearchText(submittedSearchText);
  }, []);

  useEffect(() => {
    if (searchInputFocused) {
      return;
    }
    submitTextFilter();
  }, [searchInputFocused]);

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
                  <Link
                    to="/admin/applications/projects"
                    className="nav__item-link"
                    data-scroll=""
                  >
                    Заявки
                  </Link>
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
      <div className="admin-statistic admin-marchants ">
        <div className="admin-statistic__container">
          <form
            className="admin-applications__from"
            onSubmit={handleSearchFormSubmit}
          >
            <div className="admin-applications__search search-group">
              <input
                className="admin-applications__src search-input"
                type="search"
                name="query"
                placeholder="Поиск по ID/имени мерчанта/названию/ИНН/адресу/телефону/юрисдикции"
                value={searchText}
                onChange={handleSearchInputChange}
                onFocus={() => setSearchInputFocused(true)}
                onBlur={() => setSearchInputFocused(false)}
              />
              <img
                className="admin-applications__search-img search-img"
                src="/img/icons/search.svg"
                alt="Поиск"
              />
              <button
                className={classNames(
                  "search-apply-btn",
                  searchInputFocused && "search-apply-btn--active"
                )}
                type="button"
              >
                Применить
              </button>
            </div>
          </form>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
