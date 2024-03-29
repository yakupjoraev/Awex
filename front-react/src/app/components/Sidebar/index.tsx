import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { ROUTE } from "../../constants/path-locations";
import { AppProject } from "../../../types";
import { UserCurrency } from "@components/UserCurrency";

interface SidebarProps {
  userName?: string;
  projects?: { id: string; project: AppProject }[];
  onLogout: () => void;
}

export function Sidebar(props: SidebarProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [projectsMenuOpened, setProjectsMenuOpened] = useState(false);

  useEffect(() => {
    if (!userMenuOpened) return;
    const handleDocumentClick = (ev: MouseEvent) => {
      if (
        menuRef.current &&
        ev.target instanceof Element &&
        !menuRef.current.contains(ev.target)
      ) {
        setUserMenuOpened(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [userMenuOpened]);

  const handleMenuIconClick = () => {
    setUserMenuOpened(true);
  };

  const handleMenuItemClick = () => {
    setUserMenuOpened(false);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__inner">
        <div className="sidebar__header">
          <NavLink className="sidebar__logo" to={ROUTE.HOME_PAGE_PATH}>
            <picture>
              <source
                media="(max-width: 992px)"
                srcSet="/img/sidebar/logo-mobile.svg"
              />
              <img
                className="sidebar__logo-img"
                src="/img/sidebar/logo.svg"
                alt="logo"
              />
            </picture>
          </NavLink>

          <div className="sidebar__themes">
            <div className="sidebar__user" data-select-wrapper="" ref={menuRef}>
              <img
                className={classNames("sidebar__user-icon", {
                  active: userMenuOpened,
                })}
                src="/img/sidebar/user-black.svg"
                alt="user"
                data-select-arrow=""
                onClick={handleMenuIconClick}
              />
              <div
                className={classNames("sidebar__user-list select-list", {
                  active: userMenuOpened,
                })}
                data-select-list=""
              >
                <NavLink
                  className="sidebar__user-item select-item"
                  to={ROUTE.SETTINGS_PATH}
                  onClick={handleMenuItemClick}
                >
                  <img
                    className="sidebar__user-item-img"
                    src="/img/sidebar/user.svg"
                    alt="user"
                  />
                  <span className="sidebar__user-item-text">
                    {props.userName}
                  </span>
                </NavLink>

                <NavLink
                  className="sidebar__user-item select-item"
                  to={ROUTE.SETTINGS_PATH}
                  onClick={handleMenuItemClick}
                >
                  <img
                    className="sidebar__user-item-img"
                    src="/img/sidebar/settings.svg"
                    alt="settings"
                  />
                  <span className="sidebar__user-item-text">Настройки</span>
                </NavLink>

                <div
                  className="sidebar__user-item sidebar__user-item--red select-item"
                  onClick={() => {
                    handleMenuItemClick();
                    props.onLogout();
                  }}
                >
                  <img
                    className="sidebar__user-item-img"
                    src="/img/sidebar/log-out.svg"
                    alt="log-out"
                  />
                  <span className="sidebar__user-item-text">Выйти</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <UserCurrency />

        <div className="sidebar__menu">
          <ul className="sidebar__menu-list">
            <li className="sidebar__menu-item">
              <NavLink to={ROUTE.DASHBOARD_PATH} className="sidebar__menu-link">
                <span className="sidebar__menu-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 21.75H13.75V16.5C13.75 15.535 12.965 14.75 12 14.75C11.035 14.75 10.25 15.535 10.25 16.5V21.75H6C3.582 21.75 2.25 20.418 2.25 18V11.65C2.25 9.52704 2.83599 8.93401 3.79199 8.14101L9.91199 3.01003C11.121 1.99503 12.879 1.99503 14.088 3.01003L20.208 8.14101C21.164 8.93401 21.75 9.52804 21.75 11.65V18C21.75 20.418 20.418 21.75 18 21.75ZM15.25 20.25H18C19.577 20.25 20.25 19.577 20.25 18V11.65C20.25 10.124 19.998 9.91506 19.251 9.29506L13.125 4.15908C12.473 3.61308 11.527 3.61308 10.875 4.15908L4.74902 9.29506C4.00202 9.91506 3.75 10.124 3.75 11.65V18C3.75 19.577 4.423 20.25 6 20.25H8.75V16.5C8.75 14.708 10.208 13.25 12 13.25C13.792 13.25 15.25 14.708 15.25 16.5V20.25Z"
                      fill="#6F6F6F"
                    ></path>
                  </svg>
                </span>
                <span className="sidebar__menu-name">Главная</span>
              </NavLink>
            </li>

            <li className="sidebar__menu-item">
              <NavLink className="sidebar__menu-link" to={ROUTE.INVOICE_PATH}>
                <span className="sidebar__menu-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5645 14.2959C17.3735 14.2959 17.1814 14.2229 17.0354 14.0779C16.7424 13.7859 16.7404 13.3109 17.0334 13.0169L19.0005 11.0389C19.8085 10.2409 20.2495 9.17088 20.2495 8.02288C20.2495 6.87688 19.8064 5.80286 19.0024 4.99786C17.3384 3.33286 14.6284 3.33286 12.9624 4.99786L10.9956 6.97488C10.7036 7.26888 10.2286 7.26987 9.93457 6.97787C9.64157 6.68587 9.6394 6.21086 9.9314 5.91686L11.9004 3.93887C14.1534 1.68687 17.8135 1.68886 20.0625 3.93786C21.1505 5.02486 21.7495 6.47588 21.7495 8.02288C21.7495 9.57488 21.1495 11.0229 20.0605 12.1009L18.0974 14.0749C17.9494 14.2229 17.7575 14.2959 17.5645 14.2959ZM12.0986 20.0629L14.0774 18.0949C14.3704 17.8029 14.3726 17.3279 14.0796 17.0339C13.7876 16.7399 13.3126 16.7399 13.0186 17.0309L11.0396 19.0009C9.37555 20.6659 6.66551 20.6659 4.99951 19.0009C3.33451 17.3359 3.33454 14.6269 4.99854 12.9629L6.97754 10.9949C7.27054 10.7029 7.27249 10.2279 6.97949 9.93386C6.68749 9.63986 6.21246 9.63987 5.91846 9.93087L3.93945 11.9009C1.68945 14.1509 1.68945 17.8109 3.93945 20.0609C5.06545 21.1859 6.54351 21.7479 8.02051 21.7479C9.49751 21.7479 10.9746 21.1869 12.0986 20.0629ZM9.52954 15.5299L15.5554 9.50488C15.8484 9.21188 15.8484 8.73687 15.5554 8.44387C15.2634 8.15187 14.7886 8.14987 14.4946 8.44387L8.46851 14.4689C8.17551 14.7619 8.17551 15.2369 8.46851 15.5299C8.61451 15.6759 8.80654 15.7499 8.99854 15.7499C9.19054 15.7499 9.38354 15.6769 9.52954 15.5299Z"
                      fill="#6F6F6F"
                    ></path>
                  </svg>
                </span>
                <span className="sidebar__menu-name">Выставить счет</span>
              </NavLink>
            </li>

            <li className="sidebar__menu-item">
              <NavLink className="sidebar__menu-link" to={ROUTE.DEPOSITS_PATH}>
                <span className="sidebar__menu-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 2.25H8C5.582 2.25 4.25 3.582 4.25 6V21C4.25 21.268 4.39302 21.5149 4.62402 21.6479C4.74002 21.716 4.87 21.75 5 21.75C5.128 21.75 5.25707 21.717 5.37207 21.651L12 17.863L18.6279 21.65C18.8599 21.783 19.146 21.782 19.376 21.647C19.607 21.513 19.75 21.266 19.75 20.999V5.99902C19.75 3.58202 18.418 2.25 16 2.25ZM18.25 19.707L12.3721 16.349C12.1421 16.217 11.8579 16.217 11.6279 16.349L5.75 19.708V6C5.75 4.423 6.423 3.75 8 3.75H16C17.577 3.75 18.25 4.423 18.25 6V19.707ZM15.75 8C15.75 8.414 15.414 8.75 15 8.75H9C8.586 8.75 8.25 8.414 8.25 8C8.25 7.586 8.586 7.25 9 7.25H15C15.414 7.25 15.75 7.586 15.75 8Z"
                      fill="#6F6F6F"
                    ></path>
                  </svg>
                </span>
                <span className="sidebar__menu-name">Депозиты</span>
              </NavLink>
            </li>

            <li
              className={classNames("sidebar__menu-item", {
                show: projectsMenuOpened,
              })}
            >
              <div className="sidebar__menu-item-main">
                <NavLink
                  className="sidebar__menu-link"
                  to={ROUTE.PROJECTS_PATH}
                  end
                >
                  <span className="sidebar__menu-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 7H3C2.448 7 2 6.552 2 6C2 5.448 2.448 5 3 5H16C16.552 5 17 5.448 17 6C17 6.552 16.552 7 16 7Z"
                        fill="#6F6F6F"
                      ></path>
                      <path
                        d="M21 13H3C2.448 13 2 12.552 2 12C2 11.448 2.448 11 3 11H21C21.552 11 22 11.448 22 12C22 12.552 21.552 13 21 13Z"
                        fill="#6F6F6F"
                      ></path>
                      <path
                        d="M12 19H3C2.448 19 2 18.552 2 18C2 17.448 2.448 17 3 17H12C12.552 17 13 17.448 13 18C13 18.552 12.552 19 12 19Z"
                        fill="#6F6F6F"
                      ></path>
                    </svg>
                  </span>
                  <span className="sidebar__menu-name">Мои проекты</span>
                </NavLink>

                <img
                  className="sidebar__menu-arrow"
                  src="/img/sidebar/arrow.svg"
                  alt="arrow"
                  onClick={() => setProjectsMenuOpened(!projectsMenuOpened)}
                />
              </div>

              <ul className="sidebar__menu-sublist">
                <li className="sidebar__menu-subitem">
                  <NavLink
                    className="sidebar__menu-sublink"
                    to={ROUTE.PROJECTS_NEW_PROJECT_PATH}
                  >
                    Добавить проект
                  </NavLink>
                </li>

                {props.projects !== undefined &&
                  props.projects.map(({ id, project }) => {
                    return (
                      <li className="sidebar__menu-subitem" key={id}>
                        <NavLink
                          className="sidebar__menu-sublink"
                          to={`${ROUTE.PROJECTS_PATH}/${id}`}
                        >
                          {project.name}
                        </NavLink>
                      </li>
                    );
                  })}
              </ul>
            </li>

            <li className="sidebar__menu-item">
              <NavLink className="sidebar__menu-link" to={ROUTE.HISTORY_PATH}>
                <span className="sidebar__menu-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 1.25C6.072 1.25 1.25 6.072 1.25 12C1.25 17.928 6.072 22.75 12 22.75C17.928 22.75 22.75 17.928 22.75 12C22.75 6.072 17.928 1.25 12 1.25ZM12 21.25C6.899 21.25 2.75 17.101 2.75 12C2.75 6.899 6.899 2.75 12 2.75C17.101 2.75 21.25 6.899 21.25 12C21.25 17.101 17.101 21.25 12 21.25ZM15.53 14.47C15.823 14.763 15.823 15.238 15.53 15.531C15.384 15.677 15.192 15.751 15 15.751C14.808 15.751 14.616 15.678 14.47 15.531L11.47 12.531C11.329 12.39 11.25 12.199 11.25 12.001V7.00098C11.25 6.58698 11.586 6.25098 12 6.25098C12.414 6.25098 12.75 6.58698 12.75 7.00098V11.6899L15.53 14.47Z"
                      fill="#6F6F6F"
                    ></path>
                  </svg>
                </span>
                <span className="sidebar__menu-name">История</span>
              </NavLink>
            </li>

            <li className="sidebar__menu-item">
              <div className="sidebar__menu-item-main">
                <NavLink
                  className="sidebar__menu-link"
                  to={ROUTE.INTEGRATION_PATH}
                >
                  <span className="sidebar__menu-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 3.25C3.932 3.25 2.25 4.932 2.25 7C2.25 9.068 3.932 10.75 6 10.75C8.068 10.75 9.75 9.068 9.75 7C9.75 4.932 8.068 3.25 6 3.25ZM6 9.25C4.759 9.25 3.75 8.241 3.75 7C3.75 5.759 4.759 4.75 6 4.75C7.241 4.75 8.25 5.759 8.25 7C8.25 8.241 7.241 9.25 6 9.25ZM18 13.25C15.932 13.25 14.25 14.932 14.25 17C14.25 19.068 15.932 20.75 18 20.75C20.068 20.75 21.75 19.068 21.75 17C21.75 14.932 20.068 13.25 18 13.25ZM18 19.25C16.759 19.25 15.75 18.241 15.75 17C15.75 15.759 16.759 14.75 18 14.75C19.241 14.75 20.25 15.759 20.25 17C20.25 18.241 19.241 19.25 18 19.25ZM15 7.75H21C21.414 7.75 21.75 7.414 21.75 7C21.75 6.586 21.414 6.25 21 6.25H15C14.586 6.25 14.25 6.586 14.25 7C14.25 7.414 14.586 7.75 15 7.75ZM9 16.25H3C2.586 16.25 2.25 16.586 2.25 17C2.25 17.414 2.586 17.75 3 17.75H9C9.414 17.75 9.75 17.414 9.75 17C9.75 16.586 9.414 16.25 9 16.25Z"
                        fill="#6F6F6F"
                      ></path>
                    </svg>
                  </span>
                  <span className="sidebar__menu-name">Интеграция</span>
                </NavLink>
                <img
                  className="sidebar__menu-arrow"
                  src="/img/sidebar/arrow.svg"
                  alt="arrow"
                />
              </div>

              <ul className="sidebar__menu-sublist">
                <li className="sidebar__menu-subitem">
                  <NavLink
                    className="sidebar__menu-sublink"
                    to={ROUTE.INTEGRATION_API_PATH}
                  >
                    API
                  </NavLink>
                </li>

                <li className="sidebar__menu-subitem">
                  <NavLink
                    className="sidebar__menu-sublink"
                    to={ROUTE.INTEGRATION_CMS_MODULE_PATH}
                  >
                    Модули CMS
                  </NavLink>
                </li>

                <li className="sidebar__menu-subitem">
                  <NavLink
                    className="sidebar__menu-sublink"
                    to={ROUTE.INTEGRATION_HTML_WIDJET_PATH}
                  >
                    HTML-виджет
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="sidebar__menu-item">
              <NavLink
                className="sidebar__menu-link"
                to={ROUTE.INFOCENTER_PATH}
              >
                <span className="sidebar__menu-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.0049 21.749C3.5479 21.749 3.10408 21.569 2.76809 21.233C2.29408 20.76 2.13108 20.073 2.34108 19.441L3.1819 16.94C3.2799 16.633 3.27102 16.325 3.15602 16.082C2.56402 14.809 2.25392 13.399 2.25392 11.999C2.25392 6.62402 6.62697 2.25 12.002 2.25C17.378 2.25 21.751 6.62302 21.751 11.999C21.751 17.375 17.378 21.748 12.002 21.748C10.603 21.748 9.19302 21.437 7.92702 20.848C7.67902 20.729 7.37002 20.721 7.05202 20.822L4.56301 21.658C4.37801 21.719 4.1899 21.749 4.0049 21.749ZM12.001 3.75C7.453 3.75 3.75295 7.45002 3.75295 11.999C3.75295 13.182 4.01596 14.373 4.51296 15.443C4.78896 16.024 4.82493 16.723 4.60793 17.406L3.76393 19.917C3.72193 20.042 3.7859 20.131 3.8279 20.173C3.8699 20.215 3.95998 20.279 4.08498 20.237L6.58303 19.398C7.27703 19.177 7.97696 19.211 8.56496 19.492C9.62696 19.986 10.818 20.249 12.001 20.249C16.55 20.249 20.25 16.549 20.25 12C20.25 7.451 16.55 3.75 12.001 3.75ZM12.0049 13C11.4529 13 11 12.552 11 12C11 11.448 11.4431 11 11.9951 11H12.0049C12.5579 11 13.0049 11.448 13.0049 12C13.0049 12.552 12.5579 13 12.0049 13ZM17.0049 12C17.0049 11.448 16.5579 11 16.0049 11H15.9951C15.4431 11 15 11.448 15 12C15 12.552 15.4529 13 16.0049 13C16.5579 13 17.0049 12.552 17.0049 12ZM9.0049 12C9.0049 11.448 8.5579 11 8.0049 11H7.99514C7.44314 11 7.00002 11.448 7.00002 12C7.00002 12.552 7.4529 13 8.0049 13C8.5579 13 9.0049 12.552 9.0049 12Z"
                      fill="#6F6F6F"
                    ></path>
                  </svg>
                </span>
                <span className="sidebar__menu-name">Информационный центр</span>
              </NavLink>
            </li>

            <li className="sidebar__menu-item">
              <NavLink className="sidebar__menu-link" to={ROUTE.REFERRAL_PATH}>
                <span className="sidebar__menu-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.00903 10.75C11.353 10.75 13.259 8.843 13.259 6.5C13.259 4.157 11.353 2.25 9.00903 2.25C6.66503 2.25 4.75903 4.157 4.75903 6.5C4.75903 8.843 6.66503 10.75 9.00903 10.75ZM9.00903 3.75C10.526 3.75 11.759 4.983 11.759 6.5C11.759 8.017 10.526 9.25 9.00903 9.25C7.49203 9.25 6.25903 8.017 6.25903 6.5C6.25903 4.983 7.49203 3.75 9.00903 3.75ZM16.75 18.019V21C16.75 21.414 16.414 21.75 16 21.75C15.586 21.75 15.25 21.414 15.25 21V18.019C15.25 17.018 14.943 13.75 11 13.75H7C3.057 13.75 2.75 17.017 2.75 18.019V21C2.75 21.414 2.414 21.75 2 21.75C1.586 21.75 1.25 21.414 1.25 21V18.019C1.25 15.358 2.756 12.25 7 12.25H11C15.244 12.25 16.75 15.357 16.75 18.019ZM14.155 10.2159C13.859 9.92594 13.8529 9.45103 14.1429 9.15503C14.4339 8.85903 14.909 8.85504 15.204 9.14404C15.563 9.49604 16.045 9.68994 16.559 9.68994C17.664 9.68994 18.53 8.82497 18.53 7.71997C18.53 6.63397 17.646 5.75 16.559 5.75C16.251 5.75 15.9731 5.81301 15.7321 5.93701C15.3651 6.12801 14.912 5.98104 14.722 5.61304C14.532 5.24504 14.678 4.79303 15.046 4.60303C15.502 4.36903 16.011 4.25 16.559 4.25C18.473 4.25 20.03 5.80697 20.03 7.71997C20.03 9.63297 18.473 11.1899 16.559 11.1899C15.65 11.1899 14.797 10.8439 14.155 10.2159ZM22.75 16.6801V19C22.75 19.414 22.414 19.75 22 19.75C21.586 19.75 21.25 19.414 21.25 19V16.6801C21.25 15.9411 21.023 13.53 18.11 13.53H16.599C16.185 13.53 15.849 13.194 15.849 12.78C15.849 12.366 16.185 12.03 16.599 12.03H18.11C21.535 12.03 22.75 14.5351 22.75 16.6801Z"
                      fill="#6F6F6F"
                    ></path>
                  </svg>
                </span>
                <span className="sidebar__menu-name">
                  Реферальная программа
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
