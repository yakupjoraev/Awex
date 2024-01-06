import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ASSETS_ROUTE, ROUTE } from "../../constants/path-locations";

export function IndexPage() {
  return (
    <main>
      <Helmet title="Индекс" />
      <div className="container">
        <div className="pages">
          <ul className="pages__list">
            <li className="pages__item">
              <Link
                className="pages__link"
                to={ROUTE.DASHBOARD_PATH}
                target="_blank"
              >
                Главная
              </Link>
            </li>

            <li className="pages__item">
              <Link className="pages__link" to={ROUTE.PROJECTS_PROJECTID_PATH} target="_blank">
                Мои проекты
              </Link>
            </li>

            <li className="pages__item">
              <Link
                className="pages__link"
                target="_blank"
                to={ROUTE.SUCCESSFULLY_INVOICE_PATH}
              >
                ЛК эквайринг (успешно выставленный счет)
              </Link>
            </li>

            <li className="pages__item">
              <Link className="pages__link" target="_blank" to={ROUTE.INVOICE_PATH}>
                ЛК эквайринг (выставление счета)
              </Link>
            </li>

            <li className="pages__item">
              <Link className="pages__link" target="_blank" to={ROUTE.DEPOSITS_PATH}>
                Депозиты
              </Link>
            </li>

            <li className="pages__item">
              <Link
                className="pages__link"
                target="_blank"
                to={ROUTE.DEPOSIT_RETENTION_PATH}
              >
                удержание депозита
              </Link>
            </li>

            <li className="pages__item">
              <Link className="pages__link" to={ROUTE.SETTINGS_PATH} target="_blank">
                Настройки
              </Link>
            </li>

            <li className="pages__item">
              <Link
                className="pages__link"
                to={`${ROUTE.PAYMENT_CRYPTO_STAGE_PATH}/stage1`}
                target="_blank"
              >
                Платежная ссылка у клиента (крипто) 1
              </Link>
            </li>

            <li className="pages__item">
              <Link
                className="pages__link"
                to={`${ROUTE.PAYMENT_CRYPTO_STAGE_PATH}/stage2`}
                target="_blank"
              >
                Платежная ссылка у клиента (крипто) шаг2
              </Link>
            </li>

            <li className="pages__item">
              <Link
                className="pages__link"
                to={`${ROUTE.PAYMENT_CRYPTO_STAGE_PATH}/stage3`}
                target="_blank"
              >
                Платежная ссылка у клиента (крипто) ожидание транзакции
                последний шаг
              </Link>
            </li>

            <li className="pages__item">
              <a className="pages__link" href={ASSETS_ROUTE} target="_blank">
                Страница активов
              </a>
            </li>

            <li className="pages__item">
              <a
                className="pages__link"
                href={`${ASSETS_ROUTE}/id1/sell`}
                target="_blank"
              >
                Действия с активом - ПРОДАТЬ
              </a>
            </li>
            <li className="pages__item">
              <a
                className="pages__link"
                href={`${ASSETS_ROUTE}/id1/withdraw`}
                target="_blank"
              >
                Действия с активом - ВЫВОД
              </a>
            </li>
            <li className="pages__item">
              <a
                className="pages__link"
                href={`${ASSETS_ROUTE}/id1/swap`}
                target="_blank"
              >
                Действия с активом - SWAP
              </a>
            </li>
            <li className="pages__item">
              <a
                className="pages__link"
                href={`${ASSETS_ROUTE}/id0/withdraw`}
                target="_blank"
              >
                Действия с активом - фиатным Заказ в офис
              </a>
            </li>
            <li className="pages__item">
              <a
                className="pages__link"
                href={`${ASSETS_ROUTE}/id0/withdraw`}
                target="_blank"
              >
                Действия с активом - фиатным вывод
              </a>
            </li>
            <li className="pages__item">
              <Link className="pages__link" target="_blank" to={ROUTE.DATE_PICKER_PATH}>
                Компонент выбора даты
              </Link>
            </li>

            <li className="pages__item">
              <a className="pages__link" href={ROUTE.AUTH_PATH} target="_blank">
                Модалки Вход и Регистрация
              </a>
            </li>

            <li className="pages__item">
              <a className="pages__link" href={ROUTE.SETTINGS_PATH} target="_blank">
                Настройки Профиль Главная вкладка
              </a>
            </li>

            <li className="pages__item">
              <a
                className="pages__link"
                href={`${ROUTE.SETTINGS_PATH}/requisites`}
                target="_blank"
              >
                Настройки Реквизиты
              </a>
            </li>

            <li className="pages__item">
              <a
                className="pages__link"
                href={`${ROUTE.SETTINGS_PATH}/safety`}
                target="_blank"
              >
                Настройки Безопасность
              </a>
            </li>

            <li className="pages__item">
              <a
                className="pages__link"
                href={`${ROUTE.SETTINGS_PATH}/permission-management`}
                target="_blank"
              >
                Управление правами
              </a>
            </li>

            <li className="pages__item">
              <a className="pages__link" href={ROUTE.INFOCENTER_PATH} target="_blank">
                Инфоцентр
              </a>
            </li>

            <li className="pages__item">
              <a className="pages__link" href="/no-page" target="_blank">
                404
              </a>
            </li>
            {"<------- СТРАНИЦЫ АДМИНКИ-------->"}
            <li className="pages__item">
              <a className="pages__link" href={ROUTE.ADMIN_AUTH_PATH} target="_blank">
                Админ панель (вход)
              </a>
            </li>
          </ul>
        </div>
      </div>

      <style>
        {`.pages__list {
          display: grid;
          gap: 20px;
          padding: 50px 0;
        }

        .pages__item {
          display: grid;
        }

        .pages__link {
          padding: 20px;
          background-color: var(--second-color);
          font-weight: 600;
          font-size: 20px;
          line-height: 120%;
          color: var(--text-color);
        }

        .pages__link:hover {
          color: var(--white-color);
        }`}
      </style>
    </main>
  );
}
