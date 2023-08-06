import React, { useState } from "react";
import { DepositsFiltersSelect } from "../../../components/DepositsFilterSelect";

const projectFilterOptions = [
  { value: "0", label: "Приход" },
  { value: "1", label: "Приход" },
  { value: "2", label: "Приход" },
];

const currencyFilterOptions = [
  { value: "0", label: "Все" },
  { value: "1", label: "Все" },
  { value: "2", label: "Все" },
];

const operationFilterOptions = [
  { value: "0", label: "Приход" },
  { value: "1", label: "Приход" },
  { value: "2", label: "Приход" },
];

const dateFilterOptions = [
  { value: "0", label: "01/06/2022-13/06/2023" },
  { value: "1", label: "01/06/2022-13/06/2023" },
  { value: "2", label: "01/06/2022-13/06/2023" },
];

interface HistoryOperationsProps {}

export function HistoryOperations(props: HistoryOperationsProps) {
  const [projectFilter, setProjectFilter] = useState("0");
  const [currencyFilter, setCurrencyFilter] = useState("0");
  const [operationFilter, setOperationFilter] = useState("0");
  const [dateFilter, setDateFilter] = useState("0");

  const handleProjectFilterChange = (value: string) => {
    setProjectFilter(value);
  };

  const handleCurrencyFilterChange = (value: string) => {
    setCurrencyFilter(value);
  };

  const handleOperationFilterChange = (value: string) => {
    setOperationFilter(value);
  };

  const handleDateFilterChange = (value: string) => {
    setDateFilter(value);
  };

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
        <DepositsFiltersSelect
          label="Проект"
          options={projectFilterOptions}
          value={projectFilter}
          onChange={handleProjectFilterChange}
        />

        <DepositsFiltersSelect
          label="Валюта"
          options={currencyFilterOptions}
          value={currencyFilter}
          onChange={handleCurrencyFilterChange}
        />

        <DepositsFiltersSelect
          label="Тип операции"
          options={operationFilterOptions}
          value={operationFilter}
          onChange={handleOperationFilterChange}
        />

        <DepositsFiltersSelect
          className="deposits__filter-select deposits__filter-select--datapicker"
          label="Дата"
          options={dateFilterOptions}
          value={dateFilter}
          onChange={handleDateFilterChange}
        />
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
