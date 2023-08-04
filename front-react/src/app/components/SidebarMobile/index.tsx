import React from "react";
import { useState } from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { HOME_PAGE_PATH } from "../../constants/path-locations";

interface SidebarMobileProps {
  userName: string;
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
          <a href="#" className="sidebar-mobile__user">
            <div className="sidebar-mobile__user-icon">
              <img
                className="sidebar-mobile__pic"
                src="/img/sidebar-mobile/user.svg"
                alt="user"
              />
            </div>

            <p className="sidebar-mobile__user-name">{props.userName}</p>
          </a>

          <a href="#" className="sidebar-mobile__settings">
            <div className="sidebar-mobile__settings-icon">
              <img
                className="sidebar-mobile__pic"
                src="/img/sidebar-mobile/settings.svg"
                alt="settings"
              />
            </div>

            <p className="sidebar-mobile__settings-name">Настройки</p>
          </a>

          <a href="#" className="sidebar-mobile__log-out">
            <div className="sidebar-mobile__log-out-icon">
              <img
                className="sidebar-mobile__pic"
                src="/img/sidebar-mobile/log-out.svg"
                alt="log-out"
              />
            </div>

            <p className="sidebar-mobile__log-out-name">Выйти</p>
          </a>
        </div>

        <div className="sidebar-mobile__middle">
          <a href="#" className="sidebar-mobile__item">
            <img
              className="sidebar-mobile__pic"
              src="/img/sidebar-mobile/clock.svg"
              alt="clock"
            />

            <p className="sidebar-mobile__item-text">История</p>
          </a>

          <a href="#" className="sidebar-mobile__item">
            <img
              className="sidebar-mobile__pic"
              src="/img/sidebar-mobile/sliders-horizontal-alt.svg"
              alt="sliders-horizontal-alt"
            />

            <p className="sidebar-mobile__item-text">Интеграция</p>
          </a>

          <a href="#" className="sidebar-mobile__item">
            <img
              className="sidebar-mobile__pic"
              src="/img/sidebar-mobile/chat-dots.svg"
              alt="chat-dots"
            />

            <p className="sidebar-mobile__item-text">Инфоцентр</p>
          </a>

          <a href="#" className="sidebar-mobile__item">
            <img
              className="sidebar-mobile__pic"
              src="/img/sidebar-mobile/home.svg"
              alt="home"
            />

            <p className="sidebar-mobile__item-text">Реф. программа</p>
          </a>
        </div>

        <div className="sidebar-mobile__main">
          <NavLink className="sidebar-mobile__item" to={HOME_PAGE_PATH}>
            <img
              className="sidebar-mobile__pic"
              src="/img/sidebar-mobile/users-alt.svg"
              alt="users-alt"
            />

            <p className="sidebar-mobile__item-text">Главная</p>
          </NavLink>

          <a href="#" className="sidebar-mobile__item">
            <img
              className="sidebar-mobile__pic"
              src="/img/sidebar-mobile/link.svg"
              alt="link"
            />

            <p className="sidebar-mobile__item-text">Счета</p>
          </a>

          <a href="#" className="sidebar-mobile__item">
            <img
              className="sidebar-mobile__pic"
              src="/img/sidebar-mobile/bookmark.svg"
              alt="bookmark"
            />

            <p className="sidebar-mobile__item-text">Депозиты</p>
          </a>

          <a href="#" className="sidebar-mobile__item">
            <img
              className="sidebar-mobile__pic"
              src="/img/sidebar-mobile/menu-left-alt.svg"
              alt="menu-left-alt"
            />

            <p className="sidebar-mobile__item-text">Проекты</p>
          </a>

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
