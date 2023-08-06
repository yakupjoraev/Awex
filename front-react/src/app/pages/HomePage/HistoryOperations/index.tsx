import React from "react";

interface HistoryOperationsProps {}

export function HistoryOperations(props: HistoryOperationsProps) {
  return (
    <div className="history-operations">
      <div className="history-operations__label">
        <h3 className="history-operations__title main-title">
          История операций
        </h3>

        <a className="history-operations__link" href="#">
          Перейти в Операции
          <img
            className="history-operations__link-img"
            src="/img/icons/arrow-right.svg"
            alt="Перейти в Операции"
          />
        </a>
      </div>

      <div className="history-operations__header">
        <div className="history-operations__select">
          <div className="history-operations__select-label">Проект</div>

          <div className="history-operations__select-selected">Приход</div>
        </div>

        <div className="history-operations__select">
          <div className="history-operations__select-label">Валюта</div>

          <div className="history-operations__select-selected">Все</div>
        </div>

        <div className="history-operations__select">
          <div className="history-operations__select-label">Тип операции</div>

          <div className="history-operations__select-selected">Приход</div>
        </div>

        <div
          className="deposits__filter-select deposits__filter-select--datapicker"
          data-select-wrapper=""
        >
          <div className="deposits__filter-label">Дата</div>

          <div className="deposits__filter-selected" data-select-value="">
            01/06/2022-13/06/2023
          </div>

          <img
            className="deposits__filter-arrow"
            src="/img/icons/mini-arrow-down.svg"
            alt="mini-arrow-down"
            data-select-arrow=""
          />

          <ul className="deposits__filter-list select-list" data-select-list="">
            <li
              className="deposits__filter-item select-item"
              data-select-item=""
            >
              01/06/2022-13/06/2023
            </li>
            <li
              className="deposits__filter-item select-item"
              data-select-item=""
            >
              01/06/2022-13/06/2023
            </li>
            <li
              className="deposits__filter-item select-item"
              data-select-item=""
            >
              01/06/2022-13/06/2023
            </li>
          </ul>
        </div>
      </div>

      <div className="history-operations__container">
        <ul className="history-operations__list">
          <li className="history-operations__item history-operations__item-header">
            <div className="history-operations__item-data">Дата</div>
            <div className="history-operations__item-time">Время</div>
            <div className="history-operations__item-user">User</div>
            <div className="history-operations__item-type">Тип</div>
            <div className="history-operations__item-sum">Сумма операции</div>
            <div className="history-operations__item-deposite">Депозит</div>
            <div className="history-operations__item-check">Счет</div>
            <div className="history-operations__item-details">Детали</div>
          </li>

          <li className="history-operations__item">
            <div className="history-operations__item-data">10/01/23</div>
            <div className="history-operations__item-time">12:23:45</div>
            <div className="history-operations__item-user">ID345678</div>
            <div className="history-operations__item-type">Прих</div>
            <div className="history-operations__item-sum">100 USDT</div>
            <div className="history-operations__item-deposite">10 USDT</div>
            <div className="history-operations__item-check">1N4Qbzg6LS...</div>
            <div className="history-operations__item-details">комментарий</div>
          </li>

          <li className="history-operations__item">
            <div className="history-operations__item-data">10/01/23</div>
            <div className="history-operations__item-time">12:23:45</div>
            <div className="history-operations__item-user">ID345678</div>
            <div className="history-operations__item-type">Прих</div>
            <div className="history-operations__item-sum">100 USDT</div>
            <div className="history-operations__item-deposite">10 USDT</div>
            <div className="history-operations__item-check">1N4Qbzg6LS...</div>
            <div className="history-operations__item-details">комментарий</div>
          </li>

          <li className="history-operations__item">
            <div className="history-operations__item-data">10/01/23</div>
            <div className="history-operations__item-time">12:23:45</div>
            <div className="history-operations__item-user">ID345678</div>
            <div className="history-operations__item-type">Прих</div>
            <div className="history-operations__item-sum">100 USDT</div>
            <div className="history-operations__item-deposite">10 USDT</div>
            <div className="history-operations__item-check">1N4Qbzg6LS...</div>
            <div className="history-operations__item-details">комментарий</div>
          </li>

          <li className="history-operations__item">
            <div className="history-operations__item-data">10/01/23</div>
            <div className="history-operations__item-time">12:23:45</div>
            <div className="history-operations__item-user">ID345678</div>
            <div className="history-operations__item-type">Прих</div>
            <div className="history-operations__item-sum">100 USDT</div>
            <div className="history-operations__item-deposite">10 USDT</div>
            <div className="history-operations__item-check">1N4Qbzg6LS...</div>
            <div className="history-operations__item-details">комментарий</div>
          </li>

          <li className="history-operations__item">
            <div className="history-operations__item-data">10/01/23</div>
            <div className="history-operations__item-time">12:23:45</div>
            <div className="history-operations__item-user">ID345678</div>
            <div className="history-operations__item-type">Прих</div>
            <div className="history-operations__item-sum">100 USDT</div>
            <div className="history-operations__item-deposite">10 USDT</div>
            <div className="history-operations__item-check">1N4Qbzg6LS...</div>
            <div className="history-operations__item-details">комментарий</div>
          </li>

          <li className="history-operations__item">
            <div className="history-operations__item-data">10/01/23</div>
            <div className="history-operations__item-time">12:23:45</div>
            <div className="history-operations__item-user">ID345678</div>
            <div className="history-operations__item-type">Прих</div>
            <div className="history-operations__item-sum">100 USDT</div>
            <div className="history-operations__item-deposite">10 USDT</div>
            <div className="history-operations__item-check">1N4Qbzg6LS...</div>
            <div className="history-operations__item-details">комментарий</div>
          </li>

          <li className="history-operations__item">
            <div className="history-operations__item-data">10/01/23</div>
            <div className="history-operations__item-time">12:23:45</div>
            <div className="history-operations__item-user">ID345678</div>
            <div className="history-operations__item-type">Прих</div>
            <div className="history-operations__item-sum">100 USDT</div>
            <div className="history-operations__item-deposite">10 USDT</div>
            <div className="history-operations__item-check">1N4Qbzg6LS...</div>
            <div className="history-operations__item-details">комментарий</div>
          </li>
        </ul>
      </div>
    </div>
  );
}
