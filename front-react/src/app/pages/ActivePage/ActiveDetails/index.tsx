import { Link } from "react-router-dom";
import classNames from "classnames";
import { Active } from "../../../../data/actives";
import { HistoryList } from "../HistoryList";
import { ACTIVES_ROUTE } from "../../../constants/path-locations";

export interface ActiveDetailsProps {
  active: Active;
  action: "withdraw" | "sell" | "swap";
  onNavigate: (action: "withdraw" | "sell" | "swap") => void;
}

export function ActiveDetails(props: ActiveDetailsProps) {
  const { active, action, onNavigate } = props;

  return (
    <div className="actives-check">
      <Link to={ACTIVES_ROUTE} className="actives-check__back">
        <img
          className="actives-check__back-pic"
          src="/img/icons/arrow-left.svg"
          alt="arrow to back"
        />
        Вернуться к выбору актива
      </Link>
      <div className="actives-check__main">
        <div className="actives-check__currency">
          <img
            className="actives-check__currency-pic"
            src={`/img/actives/${active.currencyIcon}-big.png`}
            alt="btc"
          />
          <h3 className="actives-check__currency-name">
            {active.currencyDesc}
          </h3>
          <h4 className="actives-check__currency-subname">{active.currency}</h4>
          <div className="actives-check__count">
            0,5672314
            <span>~27.568.4565 USDT</span>
          </div>
        </div>
      </div>
      <div
        className={`actives-check__actions actives-check__actions--${countButtons(
          active
        )}`}
      >
        <div
          className={classNames("actives-check__action", {
            active: action === "withdraw",
          })}
          onClick={() => {
            onNavigate("withdraw");
          }}
        >
          <img
            className="actives-check__action-pic"
            src="/img/icons/withdrawal.svg"
            alt="Вывод"
          />
          <p className="actives-check__action-text">Вывод</p>
        </div>
        {active.sell && (
          <div
            className={classNames("actives-check__action", {
              active: action === "sell",
            })}
            onClick={() => onNavigate("sell")}
          >
            <img
              className="actives-check__action-pic"
              src="/img/icons/money-hand.svg"
              alt="Продать"
            />
            <p className="actives-check__action-text">Продать</p>
          </div>
        )}

        {active.swap && (
          <div
            className={classNames("actives-check__action", {
              active: action === "swap",
            })}
            onClick={() => {
              onNavigate("swap");
            }}
          >
            <img
              className="actives-check__action-pic"
              src="/img/icons/sharp-swap.svg"
              alt="SWAP"
            />
            <p className="actives-check__action-text">SWAP</p>
          </div>
        )}
      </div>
      <div className="actives-check__history" />
      <h5 className="actives-check__history-label">История операций</h5>
      <HistoryList />
    </div>
  );
}

function countButtons(active: Active): number {
  const { sell, swap } = active;
  const buttonCount = 1 + Number(sell) + Number(swap);
  return buttonCount;
}
