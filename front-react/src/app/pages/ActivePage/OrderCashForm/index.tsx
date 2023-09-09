import classNames from "classnames";
import toast from "react-hot-toast";
import { useDropdown } from "../../../hooks/useDropdown";
import { SelectCurrencyModal } from "@components/SelectCurrenyModal";
import { useState } from "react";

export function OrderCashForm() {
  const officeDropdown = useDropdown<HTMLDivElement>();
  const [currencySelectorOpened, setCurrencySelectorOpened] = useState(false);

  const handleOrderCashFormSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    toast("NOT IMPLEMENTED!");
  };

  return (
    <>
      <form
        className="actives-action__withdrawal"
        onSubmit={handleOrderCashFormSubmit}
      >
        <div className="about-deposit__generation-select invoice__generation-select">
          <div className="about-deposit__generation-selected about-deposit__generation-selected--not-reverse">
            <div className="about-deposit__generation-info">
              <label className="about-deposit__generation-title">Сумма</label>

              <input
                className="about-deposit__generation-input"
                type="number"
                placeholder="Введите сумму"
                defaultValue="27.000"
              />

              <p className="about-deposit__generation-crypt">=1 BTC</p>
            </div>

            <div
              className="about-deposit__generation-currency  open-modal-btn"
              data-modal-id="select-modal"
            >
              <div className="about-deposit__generation-curr">RUB</div>
            </div>
          </div>

          <div className="actives-action__withdrawal-header">
            <div className="actives-action__withdrawal-sum">
              Мин. <span>200 USD</span>
            </div>

            <div className="actives-action__withdrawal-sum">
              Мax. <span>200.000 USD</span>
            </div>
          </div>
        </div>

        <div
          className="actives-action__withdrawal-group invoice-project__group-select"
          data-select-wrapper=""
          onClick={() => officeDropdown.toggle()}
          ref={officeDropdown.containerRef}
        >
          <div
            className={classNames("invoice-project__group-selected", {
              active: officeDropdown.opened,
            })}
            data-select-arrow=""
          >
            Выберете офис
            <img
              className="invoice-project__group-select-arrow"
              src="/img/icons/mini-arrow-down.svg"
              alt="mini-arrow-down"
            />
          </div>

          <ul
            className={classNames("invoice-project__group-list select-list", {
              active: officeDropdown.opened,
            })}
            data-select-list=""
          >
            <li
              className="invoice-project__group-item select-item"
              data-select-item=""
              onClick={() => officeDropdown.toggle()}
            >
              Выберете офис
            </li>
            <li
              className="invoice-project__group-item select-item"
              data-select-item=""
              onClick={() => officeDropdown.toggle()}
            >
              Выберете офис
            </li>
            <li
              className="invoice-project__group-item select-item"
              data-select-item=""
              onClick={() => officeDropdown.toggle()}
            >
              Выберете офис
            </li>
          </ul>
        </div>

        <button
          type="submit"
          className="actives-action__withdrawal-btn second-btn"
        >
          Заказать
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
