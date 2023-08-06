import React, { useState } from "react";
import { useDropdown } from "../../hooks/useDropdown";
import classNames from "classnames";
import { SelectCurrencyModal } from "../../components/SelectCurrenyModal";

export function InvoicePage() {
  const projectDropdown = useDropdown<HTMLDivElement>();
  const currencyDropdown = useDropdown<HTMLDivElement>();
  const [currencySelectorOpened, setCurrencySelectorOpened] = useState(false);

  const handleCurrencySelectorClose = () => {
    setCurrencySelectorOpened(false);
  };

  return (
    <section className="invoice">
      <div className="invoice__header">
        <div className="invoice__header-label">
          <h1 className="invoice__title main-title">Выставление счета</h1>

          <img
            className="invoice__header-img"
            src="/img/icons/tooltip.svg"
            alt="tooltip"
          />
        </div>

        <a className="invoice__header-link second-btn" href="#">
          Выбрать шаблон
        </a>
      </div>

      <div className="invoice__wrapper">
        <div
          className="invoice__group-select invoice__group-textarea"
          data-select-wrapper
        >
          <div
            className={classNames(
              "invoice__group-selected invoice-project__group-selected",
              { active: projectDropdown.opened }
            )}
            data-select-arrow
            onClick={() => projectDropdown.toggle()}
          >
            Выбор проекта
            <img
              className="invoice__group-select-arrow"
              src="/img/icons/mini-arrow-down.svg"
              alt="mini-arrow-down"
            />
          </div>

          <ul
            className={classNames("invoice__group-list select-list", {
              active: projectDropdown.opened,
            })}
            data-select-list
          >
            <li
              className="invoice__group-item select-item"
              data-select-item
              onClick={() => projectDropdown.toggle(false)}
            >
              Выбор проекта
            </li>
            <li
              className="invoice__group-item select-item"
              data-select-item
              onClick={() => projectDropdown.toggle(false)}
            >
              Выбор проекта
            </li>
            <li
              className="invoice__group-item select-item"
              data-select-item
              onClick={() => projectDropdown.toggle(false)}
            >
              Выбор проекта
            </li>
          </ul>
        </div>

        <div className="invoice-project__groups project-groups">
          <div className="invoice-project__group invoice-project__group--transparent project-group">
            <div className="invoice-project__group invoice-project__group-changes">
              <div className="invoice-project__radios">
                <div className="invoice-project__label project-label">
                  <img
                    className="invoice-project__label-img"
                    src="/img/icons/checkbox-circle-checked.svg"
                    alt="checkbox-circle-checked"
                  />

                  <p className="invoice-project__label-descr project-label-descr">
                    Конвертировать в:
                  </p>

                  <div className="invoice-project__radio-container">
                    <div className="invoice-project__radio-group">
                      <input
                        className="invoice-project__radio"
                        type="radio"
                        name="marka"
                        id="radio10"
                        defaultChecked
                      />

                      <label
                        className="invoice-project__radio-label"
                        htmlFor="radio10"
                      >
                        Фиат
                      </label>
                    </div>

                    <div className="invoice-project__radio-group">
                      <input
                        className="invoice-project__radio"
                        type="radio"
                        name="marka"
                        id="radio11"
                      />

                      <label
                        className="invoice-project__radio-label"
                        htmlFor="radio11"
                      >
                        Крипто
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="invoice-project__group-select"
                data-select-wrapper
                ref={currencyDropdown.containerRef}
              >
                <div
                  className={classNames(
                    "invoice-project__group-selected invoice-project__group-selected--not-beetwen",
                    { active: currencyDropdown.opened }
                  )}
                  data-select-arrow
                  onClick={() => currencyDropdown.toggle()}
                >
                  Выберете валюту
                  <img
                    className="invoice-project__group-select-arrow"
                    src="/img/icons/mini-arrow-down.svg"
                    alt="mini-arrow-down"
                  />
                </div>

                <ul
                  className={classNames(
                    "invoice-project__group-list select-list",
                    { active: currencyDropdown.opened }
                  )}
                  data-select-list
                >
                  <li
                    className="invoice-project__group-item select-item"
                    data-select-item
                    onClick={() => currencyDropdown.toggle(false)}
                  >
                    Валюта
                  </li>
                  <li
                    className="invoice-project__group-item select-item"
                    data-select-item
                    onClick={() => currencyDropdown.toggle(false)}
                  >
                    Валюта
                  </li>
                  <li
                    className="invoice-project__group-item select-item"
                    data-select-item
                    onClick={() => currencyDropdown.toggle(false)}
                  >
                    Валюта
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="invoice-project__group invoice-project__group--transparent project-group">
            <div className="invoice-project__radios">
              <label
                className="invoice-project__label project-label"
                htmlFor="#"
              >
                Комиссию оплачивает:
                <img
                  className="invoice-project__label-pic"
                  src="/img/icons/tooltip.svg"
                  alt="tooltip"
                />
              </label>

              <div className="invoice-project__radio-container">
                <div className="invoice-project__radio-group">
                  <input
                    className="invoice-project__radio"
                    type="radio"
                    name="pay"
                    id="radio12"
                    defaultChecked
                  />

                  <label
                    className="invoice-project__radio-label"
                    htmlFor="radio12"
                  >
                    Мерчант
                  </label>
                </div>

                <div className="invoice-project__radio-group">
                  <input
                    className="invoice-project__radio"
                    type="radio"
                    name="pay"
                    id="radio13"
                  />

                  <label
                    className="invoice-project__radio-label"
                    htmlFor="radio13"
                  >
                    Клиент
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="invoice-project__label project-label invoice__group-textarea">
          <img
            className="invoice-project__label-img"
            src="/img/icons/checkbox-circle-checked.svg"
            alt="checkbox-circle-checked"
          />

          <p className="invoice-project__label-descr project-label-descr">
            Использовать депозит
          </p>
        </div>

        <div className="invoice-project__groups project-groups">
          <div className="invoice-project__group project-group">
            <label className="invoice-project__label project-label" htmlFor="#">
              Депозит
            </label>

            <input
              className="invoice-project__input project-input"
              type="text"
              placeholder="Введите сумму депозита"
            />
          </div>

          <div className="invoice-project__group project-group">
            <label className="invoice-project__label project-label" htmlFor="#">
              Срок депозита
            </label>

            <input
              className="invoice-project__input project-input"
              type="text"
              placeholder="Введите количество дней"
            />
          </div>
        </div>

        <div className="invoice-project__group project-group invoice__group-textarea">
          <label className="invoice-project__label project-label" htmlFor="#">
            Наименование товара или услуги
            <img
              className="invoice-project__label-pic"
              src="/img/icons/tooltip.svg"
              alt="tooltip"
            />
          </label>

          <textarea
            className="invoice-project__textarea project-textarea"
            placeholder="Введите наименование товара, номер договора, ФИО клиента и комментарий, отображающий особенность услуги или товара"
          ></textarea>
        </div>

        <div className="about-deposit__generation-select invoice__generation-select">
          <div className="about-deposit__generation-selected about-deposit__generation-selected--not-reverse">
            <div className="about-deposit__generation-info">
              <h5 className="about-deposit__generation-title">Сумма</h5>

              <input
                className="about-deposit__generation-input"
                type="number"
                placeholder="Введите сумму"
              />
            </div>

            <div
              className="about-deposit__generation-currency open-modal-btn"
              onClick={() => setCurrencySelectorOpened(true)}
            >
              <div className="about-deposit__generation-curr">RUB</div>

              <img
                className="about-deposit__generation-img"
                src="/img/icons/arrow-down.svg"
                alt="arrow-down"
              />
            </div>

            <div className="modal" id="select-modal">
              <form
                action="#"
                className="modal-content modal-content--select-list"
              >
                <div className="modal-content__header">
                  <h4 className="modal-content__title">
                    Выберете криптовалюту:
                  </h4>

                  <button className="close-modal-btn">
                    <img src="/img/icons/close-modal.svg" alt="" />
                  </button>
                </div>

                <div className="deposits__filter-search search-group">
                  <input
                    className="deposits__filter-src search-input"
                    type="search"
                    placeholder="Поиск"
                  />
                  <img
                    className="deposits__filter-search-img search-img"
                    src="/img/icons/search.svg"
                    alt="Поиск"
                  />
                </div>

                <div className="modal-content__main">
                  <ul className="crypto__list">
                    <li className="crypto___item">
                      <img
                        className="crypto__item-pic"
                        src="/img/actives/actives-2.png"
                        alt=""
                      />

                      <div className="crypto__item-info">
                        <h4 className="crypto__item-name">
                          Green Metaverse Token
                        </h4>

                        <h5 className="crypto__item-subname">BTC</h5>
                      </div>

                      <div className="crypto__item-counts">
                        <div className="crypto__item-count--main">1.578697</div>

                        <div className="crypto__item-count--second">
                          ~131567.654 USD
                        </div>
                      </div>
                    </li>

                    <li className="crypto___item">
                      <img
                        className="crypto__item-pic"
                        src="/img/actives/actives-2.png"
                        alt=""
                      />

                      <div className="crypto__item-info">
                        <h4 className="crypto__item-name">
                          Green Metaverse Token
                        </h4>

                        <h5 className="crypto__item-subname">BTC</h5>
                      </div>

                      <div className="crypto__item-counts">
                        <div className="crypto__item-count--main">1.578697</div>

                        <div className="crypto__item-count--second">
                          ~131567.654 USD
                        </div>
                      </div>
                    </li>

                    <li className="crypto___item">
                      <img
                        className="crypto__item-pic"
                        src="/img/actives/actives-2.png"
                        alt=""
                      />

                      <div className="crypto__item-info">
                        <h4 className="crypto__item-name">
                          Green Metaverse Token
                        </h4>

                        <h5 className="crypto__item-subname">BTC</h5>
                      </div>

                      <div className="crypto__item-counts">
                        <div className="crypto__item-count--main">1.578697</div>

                        <div className="crypto__item-count--second">
                          ~131567.654 USD
                        </div>
                      </div>
                    </li>

                    <li className="crypto___item">
                      <img
                        className="crypto__item-pic"
                        src="/img/actives/actives-2.png"
                        alt=""
                      />

                      <div className="crypto__item-info">
                        <h4 className="crypto__item-name">
                          Green Metaverse Token
                        </h4>

                        <h5 className="crypto__item-subname">BTC</h5>
                      </div>

                      <div className="crypto__item-counts">
                        <div className="crypto__item-count--main">1.578697</div>

                        <div className="crypto__item-count--second">
                          ~131567.654 USD
                        </div>
                      </div>
                    </li>

                    <li className="crypto___item">
                      <img
                        className="crypto__item-pic"
                        src="/img/actives/actives-2.png"
                        alt=""
                      />

                      <div className="crypto__item-info">
                        <h4 className="crypto__item-name">
                          Green Metaverse Token
                        </h4>

                        <h5 className="crypto__item-subname">BTC</h5>
                      </div>

                      <div className="crypto__item-counts">
                        <div className="crypto__item-count--main">1.578697</div>

                        <div className="crypto__item-count--second">
                          ~131567.654 USD
                        </div>
                      </div>
                    </li>

                    <li className="crypto___item">
                      <img
                        className="crypto__item-pic"
                        src="/img/actives/actives-2.png"
                        alt=""
                      />

                      <div className="crypto__item-info">
                        <h4 className="crypto__item-name">
                          Green Metaverse Token
                        </h4>

                        <h5 className="crypto__item-subname">BTC</h5>
                      </div>

                      <div className="crypto__item-counts">
                        <div className="crypto__item-count--main">1.578697</div>

                        <div className="crypto__item-count--second">
                          ~131567.654 USD
                        </div>
                      </div>
                    </li>

                    <li className="crypto___item">
                      <img
                        className="crypto__item-pic"
                        src="/img/actives/actives-2.png"
                        alt=""
                      />

                      <div className="crypto__item-info">
                        <h4 className="crypto__item-name">
                          Green Metaverse Token
                        </h4>

                        <h5 className="crypto__item-subname">BTC</h5>
                      </div>

                      <div className="crypto__item-counts">
                        <div className="crypto__item-count--main">1.578697</div>

                        <div className="crypto__item-count--second">
                          ~131567.654 USD
                        </div>
                      </div>
                    </li>

                    <li className="crypto___item">
                      <img
                        className="crypto__item-pic"
                        src="/img/actives/actives-2.png"
                        alt=""
                      />

                      <div className="crypto__item-info">
                        <h4 className="crypto__item-name">
                          Green Metaverse Token
                        </h4>

                        <h5 className="crypto__item-subname">BTC</h5>
                      </div>

                      <div className="crypto__item-counts">
                        <div className="crypto__item-count--main">1.578697</div>

                        <div className="crypto__item-count--second">
                          ~131567.654 USD
                        </div>
                      </div>
                    </li>

                    <li className="crypto___item">
                      <img
                        className="crypto__item-pic"
                        src="/img/actives/actives-2.png"
                        alt=""
                      />

                      <div className="crypto__item-info">
                        <h4 className="crypto__item-name">
                          Green Metaverse Token
                        </h4>

                        <h5 className="crypto__item-subname">BTC</h5>
                      </div>

                      <div className="crypto__item-counts">
                        <div className="crypto__item-count--main">1.578697</div>

                        <div className="crypto__item-count--second">
                          ~131567.654 USD
                        </div>
                      </div>
                    </li>

                    <li className="crypto___item">
                      <img
                        className="crypto__item-pic"
                        src="/img/actives/actives-2.png"
                        alt=""
                      />

                      <div className="crypto__item-info">
                        <h4 className="crypto__item-name">
                          Green Metaverse Token
                        </h4>

                        <h5 className="crypto__item-subname">BTC</h5>
                      </div>

                      <div className="crypto__item-counts">
                        <div className="crypto__item-count--main">1.578697</div>

                        <div className="crypto__item-count--second">
                          ~131567.654 USD
                        </div>
                      </div>
                    </li>

                    <li className="crypto___item">
                      <img
                        className="crypto__item-pic"
                        src="/img/actives/actives-2.png"
                        alt=""
                      />

                      <div className="crypto__item-info">
                        <h4 className="crypto__item-name">
                          Green Metaverse Token
                        </h4>

                        <h5 className="crypto__item-subname">BTC</h5>
                      </div>

                      <div className="crypto__item-counts">
                        <div className="crypto__item-count--main">1.578697</div>

                        <div className="crypto__item-count--second">
                          ~131567.654 USD
                        </div>
                      </div>
                    </li>

                    <li className="crypto___item">
                      <img
                        className="crypto__item-pic"
                        src="/img/actives/actives-2.png"
                        alt=""
                      />

                      <div className="crypto__item-info">
                        <h4 className="crypto__item-name">
                          Green Metaverse Token
                        </h4>

                        <h5 className="crypto__item-subname">BTC</h5>
                      </div>

                      <div className="crypto__item-counts">
                        <div className="crypto__item-count--main">1.578697</div>

                        <div className="crypto__item-count--second">
                          ~131567.654 USD
                        </div>
                      </div>
                    </li>

                    <li className="crypto___item">
                      <img
                        className="crypto__item-pic"
                        src="/img/actives/actives-2.png"
                        alt=""
                      />

                      <div className="crypto__item-info">
                        <h4 className="crypto__item-name">
                          Green Metaverse Token
                        </h4>

                        <h5 className="crypto__item-subname">BTC</h5>
                      </div>

                      <div className="crypto__item-counts">
                        <div className="crypto__item-count--main">1.578697</div>

                        <div className="crypto__item-count--second">
                          ~131567.654 USD
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="invoice-project__item-btns my-projects__item-btns">
          <button
            type="button"
            className="invoice-project__btn second-btn"
            onClick={() => alert("NOT IMPLEMENTED")}
          >
            Сгенерировать платежную ссылку
          </button>
        </div>
      </div>
      <SelectCurrencyModal
        open={currencySelectorOpened}
        onClose={handleCurrencySelectorClose}
      />
    </section>
  );
}
