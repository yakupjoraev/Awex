import React from "react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

export function SettingsPageLayout() {
  return (
    <section className="settings">
      <div className="deposits__header">
        <h1 className="deposits__title main-title">Настройки</h1>
      </div>

      <div className="settings__inner">
        <div className="settings__list" data-payment-details-content>
          <NavLink className="settings__item" to="/settings" end>
            Профиль
          </NavLink>

          <img
            className="settings__list-arrow"
            src="/img/icons/arrow-down-white.svg"
            alt=""
            data-payment-details-btn
          />

          <NavLink className="settings__item" to="/settings/requisites">
            Реквизиты
          </NavLink>
          <NavLink className="settings__item" to="/settings/safety">
            Безопасность
          </NavLink>
          <NavLink className="settings__item" to="/settings/notifications">
            Уведомления
          </NavLink>
          <NavLink
            className="settings__item"
            to="/settings/permission-management"
          >
            Управление правами
          </NavLink>
        </div>

        <div className="settings__content">
          <Outlet />
        </div>
      </div>
    </section>
  );
}
