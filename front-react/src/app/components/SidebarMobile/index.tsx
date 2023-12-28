import { useState } from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { AppProject } from "../../../types";
import { ROUTE } from "../../constants/path-locations";

interface SidebarMobileProps {
  userName?: string;
  projects?: { id: string; project: AppProject }[];
  onLogout: () => void;
}

export function SidebarMobile(props: SidebarMobileProps) {
  const [expanded, setExpanded] = useState(false);

  const handleMenuBtnClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={classNames("sidebar-mobile", { show: expanded })}
      data-sidebar-mobile=""
    >
      <div className="sidebar-mobile__inner">
        <div className="sidebar-mobile__header">
          <NavLink className="sidebar-mobile__user" to={ROUTE.SETTINGS_PATH}>
            <div className="sidebar-mobile__user-icon">
              <img
                className="sidebar-mobile__pic"
                src="/img/sidebar-mobile/user.svg"
                alt="user"
              />
            </div>
            <p className="sidebar-mobile__user-name">{props.userName}</p>
          </NavLink>

          <NavLink
            className="sidebar-mobile__settings"
            to={ROUTE.SETTINGS_PATH}
          >
            <div className="sidebar-mobile__settings-icon">
              <img
                className="sidebar-mobile__pic"
                src="/img/sidebar-mobile/settings.svg"
                alt="settings"
              />
            </div>
            <p className="sidebar-mobile__settings-name">Настройки</p>
          </NavLink>

          <div
            className="sidebar-mobile__log-out"
            role="button"
            onClick={props.onLogout}
          >
            <div className="sidebar-mobile__log-out-icon">
              <img
                className="sidebar-mobile__pic"
                src="/img/sidebar-mobile/log-out.svg"
                alt="log-out"
              />
            </div>

            <p className="sidebar-mobile__log-out-name">Выйти</p>
          </div>
        </div>

        <div className="sidebar-mobile__middle">
          <NavLink className="sidebar-mobile__item" to={ROUTE.HISTORY_PATH}>
            <img
              className="sidebar-mobile__pic"
              src="/img/sidebar-mobile/clock.svg"
              alt="chat-dots"
            />
            <p className="sidebar-mobile__item-text">История</p>
          </NavLink>

          <NavLink className="sidebar-mobile__item" to={ROUTE.INTEGRATION_PATH}>
            <img
              className="sidebar-mobile__pic"
              src="/img/sidebar-mobile/sliders-horizontal-alt.svg"
              alt="sliders-horizontal-alt"
            />
            <p className="sidebar-mobile__item-text">Интеграция</p>
          </NavLink>

          <NavLink className="sidebar-mobile__item" to={ROUTE.INFOCENTER_PATH}>
            <img
              className="sidebar-mobile__pic"
              src="/img/sidebar-mobile/chat-dots.svg"
              alt="chat-dots"
            />
            <p className="sidebar-mobile__item-text">Инфоцентр</p>
          </NavLink>

          <NavLink className="sidebar-mobile__item" to={ROUTE.REFERRAL_PATH}>
            <img
              className="sidebar-mobile__pic"
              src="/img/sidebar-mobile/home.svg"
              alt="home"
            />
            <p className="sidebar-mobile__item-text">Реф. программа</p>
          </NavLink>
        </div>

        <div className="sidebar-mobile__main">
          <NavLink className="sidebar-mobile__item" to={ROUTE.DASHBOARD_PATH}>
            <img
              className="sidebar-mobile__pic"
              src="/img/sidebar-mobile/users-alt.svg"
              alt="users-alt"
            />
            <p className="sidebar-mobile__item-text">Главная</p>
          </NavLink>

          <NavLink className="sidebar-mobile__item" to={ROUTE.INVOICE_PATH}>
            <img
              className="sidebar-mobile__pic"
              src="/img/sidebar-mobile/link.svg"
              alt="link"
            />
            <p className="sidebar-mobile__item-text">Счета</p>
          </NavLink>

          <NavLink className="sidebar-mobile__item" to={ROUTE.DEPOSITS_PATH}>
            <img
              className="sidebar-mobile__pic"
              src="/img/sidebar-mobile/bookmark.svg"
              alt="bookmark"
            />
            <p className="sidebar-mobile__item-text">Депозиты</p>
          </NavLink>

          <NavLink className="sidebar-mobile__item" to={ROUTE.PROJECTS_PATH}>
            <img
              className="sidebar-mobile__pic"
              src="/img/sidebar-mobile/menu-left-alt.svg"
              alt="menu-left-alt"
            />
            <p className="sidebar-mobile__item-text">Проекты</p>
          </NavLink>

          <div
            className="sidebar-mobile__item"
            data-sidebar-mobile-btn=""
            onClick={handleMenuBtnClick}
          >
            <img
              className="sidebar-mobile__pic"
              src="/img/sidebar-mobile/more-horizontal-circle.svg"
              alt="more-horizontal-circle"
            />
            <img
              className="sidebar-mobile__pic sidebar-mobile__pic--open"
              src="/img/sidebar-mobile/angle-down-circle.svg"
              alt="angle-down-circle"
            />
            <p className="sidebar-mobile__item-text">Меню</p>
          </div>
        </div>
      </div>
    </div>
  );
}
