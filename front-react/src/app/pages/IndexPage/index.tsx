import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { HOME_PAGE_PATH } from "../../constants/path-locations";

export function IndexPage() {
  return (
    <main>
      <Helmet title="Индекс" />
      <div className="container">
        <div className="pages">
          <ul className="pages__list">
            <li className="pages__item">
              <Link className="pages__link" to={HOME_PAGE_PATH} target="_blank">
                Главная
              </Link>
            </li>

            <li className="pages__item">
              <Link className="pages__link" to="/projects" target="_blank">
                Мои проекты
              </Link>
            </li>

            <li className="pages__item">
              <Link
                className="pages__link"
                target="_blank"
                to="/successfully-invoice"
              >
                ЛК эквайринг (успешно выставленный счет)
              </Link>
            </li>

            <li className="pages__item">
              <Link className="pages__link" target="_blank" to="/invoice">
                ЛК эквайринг (выставление счета)
              </Link>
            </li>

            <li className="pages__item">
              <Link className="pages__link" target="_blank" to="/deposits">
                Депозиты
              </Link>
            </li>

            <li className="pages__item">
              <Link
                className="pages__link"
                target="_blank"
                to="/deposit-retention"
              >
                удержание депозита
              </Link>
            </li>

            <li className="pages__item">
              <Link className="pages__link" to="/settings" target="_blank">
                Настройки
              </Link>
            </li>

            <li className="pages__item">
              <Link
                className="pages__link"
                to="/payment-crypto/stage1"
                target="_blank"
              >
                Платежная ссылка у клиента (крипто) 1
              </Link>
            </li>

            <li className="pages__item">
              <Link
                className="pages__link"
                to="/payment-crypto/stage2"
                target="_blank"
              >
                Платежная ссылка у клиента (крипто) шаг2
              </Link>
            </li>

            <li className="pages__item">
              <Link
                className="pages__link"
                to="/payment-crypto/stage3"
                target="_blank"
              >
                Платежная ссылка у клиента (крипто) ожидание транзакции
                последний шаг
              </Link>
            </li>

            <li className="pages__item">
              <Link className="pages__link" target="_blank" to="/date-picker">
                Компонент выбора даты
              </Link>
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
