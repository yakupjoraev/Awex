import { useState } from "react";
import { SelectCurrencyModal } from "../../../components/SelectCurrenyModal";

export function PaymentMethodForm() {
  const [currencySelectorOpened, setCurrencySelectorOpened] = useState(false);

  const handleCurrencySelectorClose = () => {
    setCurrencySelectorOpened(false);
  };

  return (
    <>
      <form className="payment__from payment-form" action="#">
        <div className="payment-form__group">
          <p className="payment-form__label">Выберете способ оплаты</p>

          <div className="payment-form__radios">
            <div className="payment-form__radio">
              <input
                className="payment-form__radio-input"
                type="radio"
                name="pay"
                id="pay1"
                checked
              />

              <label className="payment-form__radio-label" htmlFor="pay1">
                Крипто
              </label>
            </div>

            <div className="payment-form__radio">
              <input
                className="payment-form__radio-input"
                type="radio"
                name="pay"
                id="pay2"
              />

              <label className="payment-form__radio-label" htmlFor="pay2">
                Наличный расчет
              </label>
            </div>

            <div className="payment-form__radio">
              <input
                className="payment-form__radio-input"
                type="radio"
                name="pay"
                id="pay3"
              />

              <label className="payment-form__radio-label" htmlFor="pay3">
                Карта РФ
              </label>
            </div>

            <div
              className="tooltip"
              data-tooltip="Доступно для операций до 99.000 RUB"
              data-tooltip-pos="right"
              data-tooltip-length="medium"
            >
              <img
                className="payment-form__radio-pic"
                src="/img/icons/tooltip.svg"
                alt="tooltip"
              />
            </div>
          </div>

          <div className="about-deposit__generation-select invoice__generation-select">
            <div className="about-deposit__generation-selected">
              <div className="about-deposit__generation-info">
                <input
                  className="about-deposit__generation-input"
                  type="number"
                  placeholder="Введите сумму"
                  value="9.650"
                />
              </div>

              <div
                className="about-deposit__generation-currency open-modal-btn"
                onClick={() => setCurrencySelectorOpened(true)}
              >
                <div className="about-deposit__generation-curr">
                  <img src="/img/usdt.png" alt="" />
                  RUB
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

        <div className="payment-form__group">
          <p className="payment-form__label">
            Выберете способ возврата депозита
          </p>

          <div className="payment-form__radios">
            <div className="payment-form__radio">
              <input
                className="payment-form__radio-input"
                type="radio"
                name="pay"
                id="pay4"
              />

              <label className="payment-form__radio-label" htmlFor="pay4">
                Крипто
              </label>
            </div>

            <div className="payment-form__radio">
              <input
                className="payment-form__radio-input"
                type="radio"
                name="pay"
                id="pay5"
                checked
              />

              <label className="payment-form__radio-label" htmlFor="pay5">
                Карта РФ
              </label>
            </div>
          </div>

          <div className="my-projects__group project-group">
            <label className="my-projects__label project-label" htmlFor="#">
              Введите номер карты
            </label>

            <input
              className="my-projects__input project-input"
              type="text"
              placeholder="Введите номер"
            />
          </div>

          <div className="my-projects__group project-group">
            <label className="my-projects__label project-label" htmlFor="#">
              ФИО владельца
            </label>

            <input
              className="my-projects__input project-input"
              type="text"
              placeholder="Введите ФИО"
            />
          </div>
        </div>

        <div className="payment-form__group">
          <p className="payment-form__label">Отправить уведомление на почту</p>

          <div className="my-projects__group project-group">
            <label className="my-projects__label project-label" htmlFor="#">
              E-mail
            </label>

            <input
              className="my-projects__input project-input"
              type="text"
              placeholder="Введите ваш e-mail"
            />
          </div>
        </div>

        <div className="payment-form__btns">
          <button className="payment-form__btn second-btn">Оплатить</button>

          <button className="payment-form__btn blue-btn">
            <img src="/img/icons/WalletConnect.svg" alt="" />
          </button>

          <button className="payment-form__btn second-btn">
            <img src="/img/icons/payment-form-awex.svg" alt="" />
          </button>
        </div>

        <div className="payment-form__footer">
          Нажимая «Оплатить», вы принимаете
          <a href="#">пользовательское соглашение..</a>
        </div>
      </form>
      <SelectCurrencyModal
        open={currencySelectorOpened}
        onClose={handleCurrencySelectorClose}
      />
    </>
  );
}
