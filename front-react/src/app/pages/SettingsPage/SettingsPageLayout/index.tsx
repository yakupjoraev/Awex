import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

export function SettingsPageLayout() {
  const tabsRef = useRef<HTMLDivElement>(null);
  const [tabsOpened, setTabsOpened] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    if (!tabsOpened) {
      return;
    }

    const handleDocumentClick = (ev: MouseEvent) => {
      if (
        tabsRef.current &&
        ev.target instanceof Element &&
        !tabsRef.current.contains(ev.target)
      ) {
        setTabsOpened(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [tabsOpened]);

  const handleTabsArrowClick = (_ev: React.MouseEvent<HTMLImageElement>) => {
    setTabsOpened(!tabsOpened);
  };

  return (
    <div className="wrapper">
      <section className={classNames("settings", getSectionModifier(pathname))}>
        <div className="deposits__header">
          <h1 className="deposits__title main-title">Настройки</h1>
        </div>

        <div className="settings__inner">
          <div
            className={classNames("settings__list", { show: tabsOpened })}
            data-payment-details-content
            ref={tabsRef}
          >
            <NavLink className="settings__item" to="/dashboard/settings" end>
              Профиль
            </NavLink>

            <img
              className="settings__list-arrow"
              src="/img/icons/arrow-down-white.svg"
              alt=""
              data-payment-details-btn
              onClick={handleTabsArrowClick}
            />

            <NavLink
              className="settings__item"
              to="/dashboard/settings/requisites"
            >
              Реквизиты
            </NavLink>
            <NavLink className="settings__item" to="/dashboard/settings/safety">
              Безопасность
            </NavLink>
            <NavLink
              className="settings__item"
              to="/dashboard/settings/permission-management"
            >
              Управление правами
            </NavLink>
          </div>

          <Outlet />
        </div>
      </section>
    </div>
  );
}

function getSectionModifier(pathname: string) {
  if (pathname.length <= 1) {
    return null;
  }
  if (pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }
  switch (pathname) {
    case "/dashboard/settings": {
      return "settings-profile";
    }
    case "/dashboard/settings/requisites": {
      return "settings-requisites";
    }
    case "/dashboard/settings/safety": {
      return "settings-security";
    }
    case "/dashboard/settings/permission-management": {
      return "settings-notifications";
    }
    default: {
      return null;
    }
  }
}
