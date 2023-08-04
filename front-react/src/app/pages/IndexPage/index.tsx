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
                Мои проекты 1
              </Link>
            </li>

            <li className="pages__item">
              <Link
                className="pages__link"
                to="/projects/project2"
                target="_blank"
              >
                Мои проекты 2
              </Link>
            </li>

            <li className="pages__item">
              <a
                className="pages__link"
                href="my-projects-3.html"
                target="_blank"
              >
                Мои проекты 3
              </a>
            </li>

            <li className="pages__item">
              <a
                className="pages__link"
                href="successfully-invoice.html"
                target="_blank"
              >
                ЛК эквайринг (успешно выставленный счет)
              </a>
            </li>

            <li className="pages__item">
              <a className="pages__link" href="invoice.html" target="_blank">
                ЛК эквайринг (выставление счета)
              </a>
            </li>

            <li className="pages__item">
              <a className="pages__link" href="deposits.html" target="_blank">
                Депозиты
              </a>
            </li>

            <li className="pages__item">
              <a
                className="pages__link"
                href="deposit-retention.html"
                target="_blank"
              >
                удержание депозита
              </a>
            </li>

            <li className="pages__item">
              <a
                className="pages__link"
                href="deposit-retention-2.html"
                target="_blank"
              >
                удержание депозита 2
              </a>
            </li>

            <li className="pages__item">
              <Link className="pages__link" to="/settings" target="_blank">
                Настройки
              </Link>
            </li>

            <li className="pages__item">
              <a className="pages__link" href="modals.html" target="_blank">
                Модалки
              </a>
            </li>

            <li className="pages__item">
              <a
                className="pages__link"
                href="payment-crypto-1.html"
                target="_blank"
              >
                Платежная ссылка у клиента (крипто) 1
              </a>
            </li>

            <li className="pages__item">
              <a
                className="pages__link"
                href="payment-crypto-2.html"
                target="_blank"
              >
                Платежная ссылка у клиента (крипто) шаг2
              </a>
            </li>

            <li className="pages__item">
              <a
                className="pages__link"
                href="payment-crypto-3.html"
                target="_blank"
              >
                Платежная ссылка у клиента (крипто) ожидание транзакции
                последний шаг
              </a>
            </li>

            <li className="pages__item">
              <a
                className="pages__link"
                href="payment-cash-1.html"
                target="_blank"
              >
                Платежная ссылка у клиента (наличный расчет) 1
              </a>
            </li>

            <li className="pages__item">
              <a
                className="pages__link"
                href="payment-cash-2.html"
                target="_blank"
              >
                Платежная ссылка у клиента (наличные) шаг2
              </a>
            </li>

            <li className="pages__item">
              <a
                className="pages__link"
                href="payment-cash-3.html"
                target="_blank"
              >
                Платежная ссылка у клиента (наличные) ожидание транзакции
                финальный шаг
              </a>
            </li>

            <li className="pages__item">
              <a className="pages__link" href="payment-rf.html" target="_blank">
                Платежная ссылка у клиента (Карта РФ)
              </a>
            </li>

            <li className="pages__item">
              <a
                className="pages__link"
                href="payment-awix.html"
                target="_blank"
              >
                Платежная ссылка у клиента (Awix)
              </a>
            </li>

            <li className="pages__item">
              <a
                className="pages__link"
                href="payment-deadline.html"
                target="_blank"
              >
                Счет после истечения срока оплаты
              </a>
            </li>

            <li className="pages__item">
              <a
                className="pages__link"
                href="active-page.html"
                target="_blank"
              >
                Страница активов
              </a>
            </li>

            <li className="pages__item">
              <a className="pages__link" href="actives-1.html" target="_blank">
                Действия с активом - ПРОДАТЬ
              </a>
            </li>

            <li className="pages__item">
              <a className="pages__link" href="actives-2.html" target="_blank">
                Действия с активом - ВЫВОД
              </a>
            </li>

            <li className="pages__item">
              <a className="pages__link" href="actives-3.html" target="_blank">
                Действия с активом - SWAP
              </a>
            </li>

            <li className="pages__item">
              <a className="pages__link" href="actives-4.html" target="_blank">
                Действия с активом - фиатным Заказ в офис
              </a>
            </li>

            <li className="pages__item">
              <a className="pages__link" href="actives-5.html" target="_blank">
                Действия с активом - фиатным вывод
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