import { Link } from "react-router-dom";
import classNames from "classnames";
import { Asset } from "../../../../data/assets";
import { HistoryList } from "../HistoryList";
import { ASSETS_ROUTE } from "../../../constants/path-locations";

export interface AssetDetailsProps {
  active: Asset;
  action: "withdraw" | "sell" | "swap" | "orderCash";
  onNavigate: (action: "withdraw" | "sell" | "swap" | "orderCash") => void;
}

export function AssetDetails(props: AssetDetailsProps) {
  const { active: asset, action, onNavigate } = props;

  return (
    <div className="actives-check">
      <Link to={ASSETS_ROUTE} className="actives-check__back">
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
            src={`/img/actives/${asset.currencyIcon}-big.png`}
            alt="btc"
          />
          <h3 className="actives-check__currency-name">
            {asset.currencyDesc}
          </h3>
          <h4 className="actives-check__currency-subname">{asset.currency}</h4>
          <div className="actives-check__count">
            0,5672314
            <span>~27.568.4565 USDT</span>
          </div>
        </div>
      </div>
      <div
        className={`actives-check__actions actives-check__actions--${countButtons(
          asset
        )}`}
      >
        {asset.cash && (
          <div
            className={classNames("actives-check__action", {
              active: action === "orderCash",
            })}
            onClick={() => {
              onNavigate("orderCash");
            }}
          >
            <img
              className="actives-check__action-pic"
              src="/img/icons/money-hand.svg"
              alt="Продать"
            />

            <p className="actives-check__action-text">Заказ наличных в офис</p>
          </div>
        )}
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
        {asset.sell && (
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

        {asset.swap && (
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

function countButtons(active: Asset): number {
  const { cash, sell, swap } = active;

  const widthdrawBtnCount = 1;
  const cashBtnCount = Number(cash);
  const sellBtnCount = Number(sell);
  const swapBtnCOunt = Number(swap);

  const buttonCount =
    widthdrawBtnCount + cashBtnCount + sellBtnCount + swapBtnCOunt;

  return buttonCount;
}
