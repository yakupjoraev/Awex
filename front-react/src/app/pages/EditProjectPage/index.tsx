import React from "react";
import { useMemo } from "react";
import { redirect, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserAreaLayout } from "../../layouts/UserArea";
import { projects } from "../../state-defaults/projects";

export function EditProjectPage() {
  const params = useParams();
  const navigate = useNavigate();

  const projectId = params.projectId;
  const project = useMemo(() => {
    return projects.find((project) => project.id === projectId);
  }, [projectId]);
  if (!project) {
    navigate("/projects", { replace: true });
    return null;
  }

  const handleDeleteBtnClick = () => {
    alert("NOT IMPLEMENTED");
  };

  const handleSaveBtnClick = () => {
    alert("NOT IMPLEMENTED");
  };

  let commissionPayByLabel;
  switch (project.commissionPaidBy) {
    case "client": {
      commissionPayByLabel = "клиент";
      break;
    }
    case "merchant": {
      commissionPayByLabel = "мерчант";
      break;
    }
  }

  return (
    <UserAreaLayout>
      <section className="my-projects">
        <div className="my-projects__header">
          <h1 className="my-projects__title main-title">Мои проекты</h1>

          <div className="my-projects__added" onClick={handleDeleteBtnClick}>
            <img
              className="my-projects__added-img"
              src="/img/icons/trash.svg"
              alt="trash"
            />

            <span className="my-projects__added-descr">Удалить проект</span>
          </div>
        </div>

        <h2 className="main-title" hidden>
          окно проекта
        </h2>

        <form action="#" className="my-projects__item-wrapper">
          <div className="my-projects__item">
            <div className="my-projects__item-info">
              <h3 className="my-projects__item-title main-title">
                {project.name}
                <img
                  className="my-projects__item-icon"
                  src="/img/icons/pen.svg"
                  alt="pen"
                />
              </h3>

              <a
                href={project.url}
                className="my-projects__item-address"
                rel="noopener"
                target="_blank"
              >
                {project.url}
              </a>
            </div>

            <div className="my-projects__item-convertion">
              <div className="my-projects__item-for">
                <div className="my-projects__item-text">конвертация в:</div>
                <div className="my-projects__item-currency">
                  <img
                    className="my-projects__item-pic"
                    src={"/img/actives/" + project.tokenIcon}
                    alt=""
                  />

                  <span className="my-projects__item-curr">
                    {project.tokenSymbol}
                  </span>
                </div>
              </div>

              <div className="my-projects__item-to">
                <div className="my-projects__item-text">комиссию платит:</div>
                <div className="my-projects__item-client">
                  {commissionPayByLabel}
                </div>
              </div>
            </div>
          </div>

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

          <div className="my-projects__groups my-projects__groups--second project-groups">
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

                  <div className="my-projects__radio-container">
                    <div className="my-projects__radio-group">
                      <input
                        className="my-projects__radio"
                        type="radio"
                        name="marka"
                        id="radio1"
                        checked
                      />

                      <label
                        className="my-projects__radio-label"
                        htmlFor="radio1"
                      >
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

                      <label
                        className="my-projects__radio-label"
                        htmlFor="radio2"
                      >
                        Фиат
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-projects__group-select" data-select-wrapper="">
                <div
                  className="my-projects__group-selected"
                  data-select-arrow=""
                >
                  Валюта
                  <img
                    className="my-projects__group-select-arrow"
                    src="/img/icons/mini-arrow-down.svg"
                    alt="mini-arrow-down"
                  />
                </div>

                <ul
                  className="my-projects__group-list select-list"
                  data-select-list=""
                >
                  <li
                    className="my-projects__group-item select-item"
                    data-select-item=""
                  >
                    Валюта
                  </li>
                  <li
                    className="my-projects__group-item select-item"
                    data-select-item=""
                  >
                    Валюта
                  </li>
                  <li
                    className="my-projects__group-item select-item"
                    data-select-item=""
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
                      checked
                    />

                    <label
                      className="my-projects__radio-label"
                      htmlFor="radio3"
                    >
                      Мерчант
                    </label>
                  </div>

                  <div className="my-projects__radio-group">
                    <input
                      className="my-projects__radio"
                      type="radio"
                      name="pay"
                      id="radio4"
                    />

                    <label
                      className="my-projects__radio-label"
                      htmlFor="radio4"
                    >
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

                    <img
                      className="my-projects__label-pic"
                      src="/img/icons/tooltip.svg"
                      alt="tooltip"
                    />
                  </div>
                </div>

                <div
                  className="my-projects__group-select"
                  data-select-wrapper=""
                >
                  <div
                    className="my-projects__group-selected active"
                    data-select-arrow=""
                  >
                    Выбрать CMS
                    <img
                      className="my-projects__group-select-arrow"
                      src="/img/icons/mini-arrow-down.svg"
                      alt="mini-arrow-down"
                    />
                  </div>

                  <ul
                    className="my-projects__group-list select-list active"
                    data-select-list=""
                  >
                    <li
                      className="my-projects__group-item select-item"
                      data-select-item=""
                    >
                      Выбрать CMS
                    </li>
                    <li
                      className="my-projects__group-item select-item"
                      data-select-item=""
                    >
                      Выбрать CMS
                    </li>
                    <li
                      className="my-projects__group-item select-item"
                      data-select-item=""
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
                  checked
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
                  checked
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
              className="my-projects__btn second-btn"
              onClick={handleSaveBtnClick}
            >
              Сохранить данные
            </button>
          </div>
        </form>
      </section>
    </UserAreaLayout>
  );
}