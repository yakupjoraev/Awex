import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDropdown } from "../../hooks/useDropdown";
import classNames from "classnames";
import { Helmet } from "react-helmet-async";

export function CreateProjectPage() {
  const navigate = useNavigate();
  const currencyDropdown = useDropdown<HTMLDivElement>();
  const csmDropdown = useDropdown<HTMLDivElement>();
  const [commissionPayer, setCommissionPayer] = useState<"client" | "merchant">(
    "merchant"
  );

  const handleCommissionPayerChange = (
    ev: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (ev.target.value === "client") {
      setCommissionPayer("client");
    } else if (ev.target.value === "merchant") {
      setCommissionPayer("merchant");
    }
  };

  const handleCancelBtnClick = () => {
    navigate("/projects");
  };

  return (
    <section className="my-projects">
      <Helmet title="Добавление проекта" />
      <div className="my-projects__header">
        <h1 className="my-projects__title main-title">Добавление проекта</h1>
      </div>

      <h2 className="main-title" hidden>
        окно проекта
      </h2>

      <form action="#" className="my-projects__item-wrapper">
        <div className="my-projects__groups project-groups">
          <div className="my-projects__group project-group">
            <label className="my-projects__label project-label" htmlFor="#">
              Название проекта
            </label>

            <input
              className="my-projects__input project-input"
              type="text"
              placeholder="ООО “Первый”"
            />
          </div>

          <div className="my-projects__group project-group">
            <label className="my-projects__label project-label" htmlFor="#">
              Деятельность
            </label>

            <input
              className="my-projects__input project-input"
              type="text"
              placeholder="Введите род деятельности"
            />
          </div>
        </div>

        <div className="my-projects__groups project-groups  my-projects__groups--second">
          <div className="my-projects__group project-group">
            <label className="my-projects__label project-label" htmlFor="#">
              Название проекта
            </label>

            <textarea
              className="my-projects__textarea project-textarea"
              placeholder="Введите краткое описание проекта"
            ></textarea>
          </div>

          <div className="my-projects__group my-projects__group-changes">
            <div className="my-projects__radios">
              <div className="my-projects__label project-label">
                <img
                  className="my-projects__label-img"
                  src="/img/icons/checkbox-circle-checked.svg"
                  alt="checkbox-circle-checked"
                />

                <p className="my-projects__label-descr project-label-descr">
                  Конвертировать оплату в:
                </p>
              </div>
              <div className="my-projects__radio-container">
                <div className="my-projects__radio-group">
                  <input
                    className="my-projects__radio"
                    type="radio"
                    name="marka"
                    id="radio1"
                    defaultChecked
                  />

                  <label className="my-projects__radio-label" htmlFor="radio1">
                    Стейблкоин
                  </label>
                </div>

                <div className="my-projects__radio-group">
                  <input
                    className="my-projects__radio"
                    type="radio"
                    name="marka"
                    id="radio2"
                  />

                  <label className="my-projects__radio-label" htmlFor="radio2">
                    Фиат
                  </label>
                </div>
              </div>
            </div>

            <div
              className="my-projects__group-select"
              data-select-wrapper=""
              ref={currencyDropdown.containerRef}
            >
              <div
                className={classNames("my-projects__group-selected", {
                  active: currencyDropdown.opened,
                })}
                data-select-arrow=""
                onClick={() => currencyDropdown.toggle()}
              >
                Валюта
                <img
                  className="my-projects__group-select-arrow"
                  src="/img/icons/mini-arrow-down.svg"
                  alt="mini-arrow-down"
                />
              </div>

              <ul
                className={classNames("my-projects__group-list select-list", {
                  active: currencyDropdown.opened,
                })}
                data-select-list=""
              >
                <li
                  className="my-projects__group-item select-item"
                  data-select-item=""
                  onClick={() => currencyDropdown.toggle(false)}
                >
                  Валюта
                </li>
                <li
                  className="my-projects__group-item select-item"
                  data-select-item=""
                  onClick={() => currencyDropdown.toggle(false)}
                >
                  Валюта
                </li>
                <li
                  className="my-projects__group-item select-item"
                  data-select-item=""
                  onClick={() => currencyDropdown.toggle(false)}
                >
                  Валюта
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="my-projects__groups project-groups">
          <div className="my-projects__group my-projects__group--transparent project-group">
            <div className="my-projects__radios">
              <label className="my-projects__label project-label" htmlFor="#">
                Комиссию оплачивает:
                <img
                  className="my-projects__label-pic"
                  src="/img/icons/tooltip.svg"
                  alt="tooltip"
                />
              </label>

              <div className="my-projects__radio-container">
                <div className="my-projects__radio-group">
                  <input
                    className="my-projects__radio"
                    type="radio"
                    name="pay"
                    id="radio3"
                    value="merchant"
                    checked={commissionPayer === "merchant"}
                    onChange={handleCommissionPayerChange}
                  />

                  <label className="my-projects__radio-label" htmlFor="radio3">
                    Мерчант
                  </label>
                </div>

                <div className="my-projects__radio-group">
                  <input
                    className="my-projects__radio"
                    type="radio"
                    name="pay"
                    id="radio4"
                    value="client"
                    checked={commissionPayer === "client"}
                    onChange={handleCommissionPayerChange}
                  />

                  <label className="my-projects__radio-label" htmlFor="radio4">
                    Клиент
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="my-projects__group my-projects__group--transparent project-group">
            <div className="my-projects__group my-projects__group-changes">
              <div className="my-projects__radios">
                <div className="my-projects__label project-label">
                  <img
                    className="my-projects__label-img"
                    src="/img/icons/checkbox-circle-checked.svg"
                    alt="checkbox-circle-checked"
                  />

                  <p className="my-projects__label-descr project-label-descr">
                    Использую CMS
                  </p>
                </div>
              </div>

              <div
                className="my-projects__group-select"
                data-select-wrapper=""
                ref={csmDropdown.containerRef}
              >
                <div
                  className={classNames("my-projects__group-selected", {
                    active: csmDropdown.opened,
                  })}
                  data-select-arrow=""
                  onClick={() => csmDropdown.toggle()}
                >
                  Выбрать CMS
                  <img
                    className="my-projects__group-select-arrow"
                    src="/img/icons/mini-arrow-down.svg"
                    alt="mini-arrow-down"
                  />
                </div>

                <ul
                  className={classNames("my-projects__group-list select-list", {
                    active: csmDropdown.opened,
                  })}
                  data-select-list=""
                >
                  <li
                    className="my-projects__group-item select-item"
                    data-select-item=""
                    onClick={() => csmDropdown.toggle(false)}
                  >
                    Выбрать CMS
                  </li>
                  <li
                    className="my-projects__group-item select-item"
                    data-select-item=""
                    onClick={() => csmDropdown.toggle(false)}
                  >
                    Выбрать CMS
                  </li>
                  <li
                    className="my-projects__group-item select-item"
                    data-select-item=""
                    onClick={() => csmDropdown.toggle(false)}
                  >
                    Выбрать CMS
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="my-projects__checkboxes">
          <p className="my-projects__checkboxes-label project-label">
            Как вы планируете принимать платежи:
          </p>

          <div className="my-projects__checkboxes-list">
            <div className="my-projects__checkbox-view checkbox-group">
              <input
                className="my-projects__checkbox-checkbox checkbox-input"
                type="checkbox"
                id="checkbox2"
              />

              <label
                className="my-projects__checkbox-label checkbox-label"
                htmlFor="checkbox2"
              >
                <div className="my-projects__checkbox-decor checkbox-decor"></div>
                <span className="my-projects__checkbox-text checkbox-text">
                  Выставлять счета
                </span>
              </label>
            </div>

            <div className="my-projects__checkbox-view checkbox-group">
              <input
                className="my-projects__checkbox-checkbox checkbox-input"
                type="checkbox"
                id="checkbox3"
              />

              <label
                className="my-projects__checkbox-label checkbox-label"
                htmlFor="checkbox3"
              >
                <div className="my-projects__checkbox-decor checkbox-decor"></div>
                <span className="my-projects__checkbox-text checkbox-text">
                  На сайте
                </span>
              </label>
            </div>

            <div className="my-projects__checkbox-view checkbox-group">
              <input
                className="my-projects__checkbox-checkbox checkbox-input"
                type="checkbox"
                id="checkbox4"
              />

              <label
                className="my-projects__checkbox-label checkbox-label"
                htmlFor="checkbox4"
              >
                <div className="my-projects__checkbox-decor checkbox-decor"></div>
                <span className="my-projects__checkbox-text checkbox-text">
                  В Telegram
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="my-projects__groups project-groups">
          <div className="my-projects__group project-group">
            <label className="my-projects__label project-label" htmlFor="#">
              URL сайта или Telegram канала
              <img
                className="my-projects__label-pic"
                src="/img/icons/tooltip.svg"
                alt="tooltip"
              />
            </label>

            <input
              className="my-projects__input project-input"
              type="text"
              placeholder="https://www.gemini.com/"
            />
          </div>

          <div className="my-projects__group project-group">
            <label className="my-projects__label project-label" htmlFor="#">
              URL успешной оплаты
              <img
                className="my-projects__label-pic"
                src="/img/icons/tooltip.svg"
                alt="tooltip"
              />
            </label>

            <input
              className="my-projects__input project-input"
              type="text"
              placeholder="Введите URL"
            />
          </div>
        </div>

        <div className="my-projects__groups project-groups">
          <div className="my-projects__group project-group">
            <label className="my-projects__label project-label" htmlFor="#">
              URL уведомлений
              <img
                className="my-projects__label-pic"
                src="/img/icons/tooltip.svg"
                alt="tooltip"
              />
            </label>

            <input
              className="my-projects__input project-input"
              type="text"
              placeholder="Введите URL"
            />
          </div>

          <div className="my-projects__group project-group">
            <label className="my-projects__label project-label" htmlFor="#">
              URL неудачной оплаты
              <img
                className="my-projects__label-pic"
                src="/img/icons/tooltip.svg"
                alt="tooltip"
              />
            </label>

            <input
              className="my-projects__input project-input"
              type="text"
              placeholder="Введите URL"
            />
          </div>
        </div>

        <div className="my-projects__item-btns">
          <button
            type="button"
            className="my-projects__btn third-btn"
            onClick={handleCancelBtnClick}
          >
            Отменить
          </button>
          <button
            type="button"
            className="my-projects__btn second-btn"
            onClick={() => alert("NOT IMPLEMENTED")}
          >
            Создать проект
          </button>
        </div>
      </form>
    </section>
  );
}
