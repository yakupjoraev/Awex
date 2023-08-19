import classNames from "classnames";
import { useDropdown } from "../../../hooks/useDropdown";

export function ConfirmCryptoPaymentForm() {
  const networkDopdown = useDropdown<HTMLDivElement>();

  return (
    <form className="payment__from payment-form" action="#">
      <div className="payment-form__group">
        <div className="payment-form__label">
          Реквизиты для оплаты
          <a className="payment-form__label-link" href="#">
            Изменить способ
            <img
              className="payment-form__label-arrow"
              src="/img/icons/arrow-right.svg"
              alt=""
            />
          </a>
        </div>

        <div className="about-deposit__generation-select invoice__generation-select about-deposit__generation-select--white ">
          <div className="about-deposit__generation-selected">
            <div className="about-deposit__generation-info">
              <input
                className="about-deposit__generation-input"
                type="number"
                placeholder="Введите сумму"
                value="9.650"
                disabled
              />
            </div>

            <div className="about-deposit__generation-currency">
              <div className="about-deposit__generation-curr">
                <img src="/img/usdt.png" alt="" />
                USDT
              </div>
            </div>
          </div>
        </div>

        <div
          className="invoice-project__group-select"
          data-select-wrapper=""
          ref={networkDopdown.containerRef}
        >
          <div
            className={classNames("invoice-project__group-selected", {
              active: networkDopdown.opened,
            })}
            data-select-arrow=""
            onClick={() => networkDopdown.toggle()}
          >
            Выберете сеть
            <img
              className="invoice-project__group-select-arrow"
              src="/img/icons/mini-arrow-down.svg"
              alt="mini-arrow-down"
            />
          </div>

          <ul
            className={classNames("invoice-project__group-list select-list", {
              active: networkDopdown.opened,
            })}
            data-select-list=""
          >
            <li
              className="invoice-project__group-item select-item"
              data-select-item=""
              onClick={() => networkDopdown.toggle(false)}
            >
              Выберете сеть
            </li>
            <li
              className="invoice-project__group-item select-item"
              data-select-item=""
              onClick={() => networkDopdown.toggle(false)}
            >
              Выберете сеть
            </li>
            <li
              className="invoice-project__group-item select-item"
              data-select-item=""
              onClick={() => networkDopdown.toggle(false)}
            >
              Выберете сеть
            </li>
          </ul>
        </div>
      </div>

      <div className="payment-form__group">
        <p className="payment-form__label">
          Возврат депозита на карту РФ
          <a className="payment-form__label-link" href="#">
            Изменить
            <img
              className="payment-form__label-arrow"
              src="/img/icons/arrow-right.svg"
              alt=""
            />
          </a>
        </p>

        <div className="my-projects__card">
          <div className="my-projects__card-num">
            <span>**** **** **** </span>
            <span>1234</span>
          </div>

          <div className="my-projects__card-name">IVANOV I.</div>
        </div>
      </div>

      <div className="payment-form__btns">
        <button className="payment-form__btn second-btn">Я оплатил</button>
      </div>
    </form>
  );
}
