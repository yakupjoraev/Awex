import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { DepositsFiltersSelect } from "../../components/DepositsFilterSelect";
import {
  DepositsFilterDate,
  DateRange,
} from "../../components/DepositsFilterDate";
import { DepositItem } from "./DepositItem";

const projectFilterOptions = [
  { value: "0", label: "Все" },
  { value: "1", label: "Все" },
  { value: "2", label: "Все" },
];

const statusFilterOptions = [
  { value: "0", label: "Ожидает действий" },
  { value: "1", label: "Ожидает действий" },
  { value: "2", label: "Ожидает действий" },
];

const defaultDateFilterValue: DateRange = {
  from: new Date("2022-01-05T22:00:00.000Z"),
  to: new Date("2023-06-05T22:00:00.000Z"),
};

const deposits: {
  id: string;
  depositStatus: "pending" | "active";
  applicationStatus: "rejected" | "review";
  comment: string;
  sum: { value: number; symbol: string };
  date: Date;
  dateEnd: Date;
}[] = [
  {
    id: "ID345678",
    depositStatus: "pending",
    applicationStatus: "rejected",
    sum: { value: 100, symbol: "USDT" },
    date: new Date("2023-09-30T21:00:00.000Z"),
    dateEnd: new Date("2023-09-30T21:00:00.000Z"),
    comment: "Автомобиль Mercedes-Benz А123АА123...",
  },
  {
    id: "ID345679",
    depositStatus: "active",
    applicationStatus: "review",
    sum: { value: 100, symbol: "USDT" },
    date: new Date("2023-09-30T21:00:00.000Z"),
    dateEnd: new Date("2023-09-30T21:00:00.000Z"),
    comment: "Автомобиль Mercedes-Benz А123АА123...",
  },
];

export function DepositsPage() {
  const [projectFilter, setProjectFilter] = useState("0");
  const [statusFilter, setStatusFilter] = useState("0");
  const [dateFilter, setDateFilter] = useState<DateRange | undefined>(
    defaultDateFilterValue
  );

  const handleProjectFilterChange = (value: string) => {
    setProjectFilter(value);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  const handleDateFilterChange = (value?: DateRange) => {
    setDateFilter(value);
  };

  return (
    <div className="wrapper">
      <Helmet title="Депозиты" />
      <section className="deposits">
        <div className="deposits__header">
          <h1 className="deposits__title main-title">Депозиты</h1>
        </div>

        <div className="deposits__infos">
          <div className="deposits__info deposits__info--black">
            <div className="deposits__info-row">
              <div className="deposits__info-name">Заявки на возврат:</div>
              <div className="deposits__info-count deposits__info-count--red">
                50
              </div>
            </div>

            <div className="deposits__info-row">
              <div className="deposits__info-label">На сумму:</div>
              <div className="deposits__info-sum">500.000</div>
            </div>
          </div>

          <div className="deposits__info">
            <div className="deposits__info-row">
              <div className="deposits__info-name">Активные депозиты:</div>
              <div className="deposits__info-count">350</div>
            </div>

            <div className="deposits__info-row">
              <div className="deposits__info-label">На сумму:</div>
              <div className="deposits__info-sum">1.789.567.57</div>
            </div>
          </div>

          <div className="deposits__info">
            <div className="deposits__info-row">
              <div className="deposits__info-name">На проверке:</div>
              <div className="deposits__info-count">50</div>
            </div>
          </div>
        </div>

        <div className="deposits__in">
          <p className="deposits__in-label">На депозитах:</p>

          <div className="deposits__in-sum">
            2.565.678
            <span>,456$</span>
          </div>
        </div>

        <div className="deposits__filters">
          <DepositsFiltersSelect
            label="Проект"
            options={projectFilterOptions}
            value={projectFilter}
            onChange={handleProjectFilterChange}
          />

          <DepositsFiltersSelect
            label="Статус"
            options={statusFilterOptions}
            value={statusFilter}
            onChange={handleStatusFilterChange}
          />

          <DepositsFilterDate
            label="Дата"
            value={dateFilter}
            onChange={handleDateFilterChange}
          />
        </div>

        <div className="deposits__filter-search search-group">
          <input
            className="deposits__filter-src search-input"
            type="search"
            placeholder="Поиск по ID или комментарию"
          />
          <img
            className="deposits__filter-search-img search-img"
            src="./img/icons/search.svg"
            alt="Поиск"
          />
        </div>

        <div className="deposits__list-container">
          <ul className="deposits__list">
            <li className="deposits__item-header">
              <div className="deposits__item-status"></div>
              <div className="deposits__item-id">Имя/ID</div>
              <div className="deposits__item-data">Дата</div>
              <div className="deposits__item-status-deposite">
                Статус депозита
              </div>
              <div className="deposits__item-sum">Сумма </div>
              <div className="deposits__item-data-end">Дата окончания</div>
              <div className="deposits__item-status-application">
                Статус заявки
              </div>
              <div className="deposits__item-commets">Комментарий</div>
            </li>

            {deposits.map((deposit) => {
              return <DepositItem {...deposit} key={deposit.id} />;
            })}

            {/* <li className="deposits__item deposits__item-rejected">
            <div className="deposits__item-status">
              <img src="./img/icons/rejected.svg" alt="" />
            </div>
            <div className="deposits__item-id">ID345678</div>
            <div className="deposits__item-data">10/01/23</div>
            <div className="deposits__item-status-deposite">
              Ожидает действий
            </div>
            <div className="deposits__item-sum">100 USDT </div>
            <div className="deposits__item-data-end">10/01/23</div>
            <div className="deposits__item-status-application">Отклонена</div>
            <div className="deposits__item-commets">
              Автомобиль Mercedes-Benz А123АА123...
            </div>
          </li>

          <li className="deposits__item">
            <div className="deposits__item-status"></div>
            <div className="deposits__item-id">ID345678</div>
            <div className="deposits__item-data">10/01/23</div>
            <div className="deposits__item-status-deposite">Активна</div>
            <div className="deposits__item-sum">100 USDT </div>
            <div className="deposits__item-data-end">10/01/23</div>
            <div className="deposits__item-status-application">На проверке</div>
            <div className="deposits__item-commets">
              Автомобиль Mercedes-Benz А123АА123...
            </div>
          </li> */}
          </ul>
        </div>
      </section>
    </div>
  );
}
