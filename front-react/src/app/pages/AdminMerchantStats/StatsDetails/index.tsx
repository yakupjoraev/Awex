import { Statistics } from "@awex-api";
import { ReactNode } from "react";

export interface StatsDetailsProps {
  merchantId: string;
  statistics: Statistics;
  appendTop?: ReactNode;
}

export function StatsDetails(props: StatsDetailsProps) {
  const { merchantId, statistics } = props;

  return (
    <div className="admin-statistic__detal">
      {props.appendTop}
      <div className="admin-statistic__detal-label">
        {`Статистика мерчанта ID${merchantId}`}
      </div>
      <ul className="admin-statistic__detal-list">
        <li className="admin-statistic__detal-item">
          <div className="admin-statistic__detal-top">
            <div className="admin-statistic__detal-item-label">Счета</div>
            <div className="admin-statistic__detal-item-volume">
              Общий объем:
            </div>
            <div className="admin-statistic__detal-item-sum">
              {(statistics.invoiceTotal === undefined
                ? "..."
                : statistics.invoiceTotal.toLocaleString()) + " USD"}
            </div>
          </div>
          <div className="admin-statistic__detal-bottom">
            <div className="admin-statistic__detal-infos">
              <div className="admin-statistic__detal-info">
                <p>Всего счетов:</p>
                <b>
                  {statistics.invoiceNumber === undefined
                    ? "..."
                    : statistics.invoiceNumber.toLocaleString()}
                </b>
              </div>
              <div className="admin-statistic__detal-info">
                <p>Средний чек:</p>
                <b>
                  {(statistics.invoiceAverage !== undefined &&
                  statistics.invoiceAverage !== null
                    ? statistics.invoiceAverage.toLocaleString()
                    : "...") + " USD"}
                </b>
              </div>
              <div className="admin-statistic__detal-info">
                <p>Оборот за период:</p>
                <b>??? USD</b>
              </div>
              <div className="admin-statistic__detal-info">
                <p>Процент завершенных заявок:</p>
                <b>
                  {(statistics.invoiceCompletedPercent === undefined
                    ? "..."
                    : statistics.invoiceCompletedPercent.toLocaleString()) +
                    " %"}
                </b>
              </div>
            </div>
          </div>
        </li>
        <li className="admin-statistic__detal-item">
          <div className="admin-statistic__detal-top">
            <div className="admin-statistic__detal-item-label">Депозиты</div>
            <div className="admin-statistic__detal-item-volume">
              Общий объем:
            </div>
            <div className="admin-statistic__detal-item-sum">
              {statistics.depositTotal === undefined
                ? "..."
                : statistics.depositTotal.toLocaleString() + " USD"}
            </div>
          </div>
          <div className="admin-statistic__detal-bottom">
            <div className="admin-statistic__detal-infos">
              <div className="admin-statistic__detal-info">
                <p>Средний чек:</p>
                <b>
                  {(statistics.depositAverage === null ||
                  statistics.depositAverage === undefined
                    ? "..."
                    : statistics.depositAverage.toLocaleString()) + " USD"}
                </b>
              </div>
              <div className="admin-statistic__detal-info">
                <p>Всего депозитов:</p>
                <b>
                  {statistics.depositNumber === undefined
                    ? "..."
                    : statistics.depositNumber.toLocaleString()}
                </b>
              </div>
              <div className="admin-statistic__detal-info">
                <p>В работе:</p>
                <b>
                  {statistics.depositInWork === undefined
                    ? "..."
                    : statistics.depositInWork.toLocaleString()}
                </b>
              </div>
              <div className="admin-statistic__detal-info">
                <p>Завершено:</p>
                <b>
                  {statistics.depositCompleted === undefined
                    ? "..."
                    : statistics.depositCompleted.toLocaleString()}
                </b>
              </div>
              <div className="admin-statistic__detal-info">
                <p>Сумма удержания:</p>
                <b>
                  {(statistics.depositWithholded === undefined
                    ? "..."
                    : statistics.depositWithholded.toLocaleString()) + " USD"}
                </b>
              </div>
            </div>
          </div>
        </li>
        <li className="admin-statistic__detal-item">
          <div className="admin-statistic__detal-top">
            <div className="admin-statistic__detal-item-label">
              Реферальная программа
            </div>
            <div className="admin-statistic__detal-item-volume">
              Общий объем:
            </div>
            <div className="admin-statistic__detal-item-sum">??? USD</div>
          </div>
          <div className="admin-statistic__detal-bottom">
            <div className="admin-statistic__detal-infos">
              <div className="admin-statistic__detal-info">
                <p>Средний чек:</p>
                <b>
                  {(statistics.referralAverage === null ||
                  statistics.referralAverage === undefined
                    ? "..."
                    : statistics.referralAverage.toLocaleString()) + " USD"}
                </b>
              </div>
              <div className="admin-statistic__detal-info">
                <p>Количество рефералов:</p>
                <b>
                  {statistics.referralNumber === undefined
                    ? "..."
                    : statistics.referralNumber.toLocaleString()}
                </b>
              </div>
              <div className="admin-statistic__detal-info">
                <p>Активные:</p>
                <b>
                  {statistics.referralActiveNumber === undefined
                    ? "..."
                    : statistics.referralActiveNumber.toLocaleString()}
                </b>
              </div>
              <div className="admin-statistic__detal-info">
                <p>Получено с комиссии:</p>
                <b>
                  {(statistics.referralFromFees === undefined
                    ? "..."
                    : statistics.referralFromFees.toLocaleString()) + " USD"}
                </b>
              </div>
              <div className="admin-statistic__detal-info">
                <p>Получено с оборота:</p>
                <b>
                  {(statistics.referralFromTurnover === undefined
                    ? "..."
                    : statistics.referralFromTurnover.toLocaleString()) +
                    " USD"}
                </b>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
