import { Link } from "react-router-dom";
import { ACTIVES_ROUTE } from "../../../constants/path-locations";
import { SelectCurrencyModal } from "@components/SelectCurrenyModal";
import { useState } from "react";
import toast from "react-hot-toast";

export interface SwapFormProps {}

export function SwapForm(props: SwapFormProps) {
  const [currencySelectorOpened, setCurrencySelectorOpened] = useState(false);

  const handleSwapFormSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    toast("NOT IMPLEMENTED!");
  };

  return (
    <>
      <form
        className="actives-action__withdrawal"
        onSubmit={handleSwapFormSubmit}
      >
        <div className="actives-action__withdrawal-swaps">
          <div className="actives-action__withdrawal-swap about-deposit__generation-select invoice__generation-select">
            <div className="about-deposit__generation-selected about-deposit__generation-selected--not-reverse">
              <div className="about-deposit__generation-info">
                <div className="actives-action__withdrawal-swap-header">
                  <h5 className="about-deposit__generation-title">Из</h5>
                  <p className="actives-action__withdrawal-swap-text">
                    <span>Доступно:</span>
                    9.9999
                  </p>
                </div>
                <input
                  className="about-deposit__generation-input"
                  type="number"
                  placeholder="Введите сумму"
                  defaultValue="0.00566"
                />
              </div>
              <div
                className="about-deposit__generation-currency open-modal-btn"
                onClick={() =>
                  setCurrencySelectorOpened(!currencySelectorOpened)
                }
              >
                <div className="about-deposit__generation-curr">
                  <img src="/img/btc.png" alt="btc" />
                  USD
                </div>
                <img
                  className="about-deposit__generation-img"
                  src="/img/icons/arrow-down.svg"
                  alt="arrow-down"
                />
              </div>
            </div>
          </div>
          <img
            className="actives-action__withdrawal-swap-decor"
            src="/img/icons/exchange.svg"
            alt="exchange"
          />
          <div className="actives-action__withdrawal-swap about-deposit__generation-select invoice__generation-select">
            <div className="about-deposit__generation-selected about-deposit__generation-selected--not-reverse">
              <div className="about-deposit__generation-info">
                <h5 className="about-deposit__generation-title">Получить</h5>
                <input
                  className="about-deposit__generation-input"
                  type="number"
                  placeholder="Введите сумму"
                  defaultValue="23,45"
                />
              </div>
              <div
                className="about-deposit__generation-currency  open-modal-btn"
                onClick={() =>
                  setCurrencySelectorOpened(!currencySelectorOpened)
                }
              >
                <div className="about-deposit__generation-curr">
                  <img src="/img/bnb.png" alt="bnb" />
                  BNB
                </div>
                <img
                  className="about-deposit__generation-img"
                  src="/img/icons/arrow-down.svg"
                  alt="arrow-down"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="actives-action__withdrawal-comissions">
          <div className="actives-action__withdrawal-comission">
            <div className="actives-action__withdrawal-comission-label">
              Комиссия
            </div>
            <div className="actives-action__withdrawal-comission-green">
              Комиссия отсутствует
            </div>
          </div>
          <div className="actives-action__withdrawal-comission">
            <div className="actives-action__withdrawal-comission-label">
              Курс
            </div>
            <div className="actives-action__withdrawal-comission-label">
              1 BTC ~ 0.00023 BNB
              <img src="/img/icons/swap-mini.svg" alt="swap" />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="actives-action__withdrawal-btn second-btn"
        >
          SWAP
        </button>
      </form>
      <div className="actives-action__inforamation">
        <div className="actives-action__inforamation-header">
          <img
            className="actives-action__inforamation-pic"
            src="/img/icons/check-circle.svg"
            alt="check-circle"
          />
          <h4 className="actives-action__inforamation-title">
            Операция прошла успешно!
          </h4>
        </div>
        <p className="actives-action__inforamation-descr">
          Проверить статус перевода
        </p>
        <a className="actives-action__inforamation-btn third-btn" href="#">
          Проверить
        </a>
      </div>
      <div className="actives-action__inforamation">
        <div className="actives-action__inforamation-header">
          <img
            className="actives-action__inforamation-pic"
            src="/img/icons/times-circle.svg"
            alt="times-circle"
          />
          <h4 className="actives-action__inforamation-title">
            Упс-с! Что-то пошло не так
          </h4>
        </div>
        <p className="actives-action__inforamation-descr">
          Повторите попытку или обратитесь в Службу поддержки
        </p>
        <a className="actives-action__inforamation-btn third-btn" href="#">
          Проверить
        </a>
      </div>
      <SelectCurrencyModal
        open={currencySelectorOpened}
        onClose={() => setCurrencySelectorOpened(!currencySelectorOpened)}
      />
    </>
  );
}
