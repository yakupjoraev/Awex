import React from "react";
import { useState } from "react";

interface AboutCheckDepositProps {
  projects: { id: string; name: string }[];
  onGeneratePaymentLink: () => void;
}

export function AboutCheckDeposit(props: AboutCheckDepositProps) {
  return (
    <div className="main-content__deposit about-deposit">
      <div className="about-deposit__generation">
        <p className="about-deposit__generation-label">
          Быстрая генерация ссылки
        </p>

        <div
          className="about-deposit__generation-select about-deposit__generation-selected--not-reverse about-deposit__generation-selected--white"
          data-select-wrapper=""
        >
          <div
            className="about-deposit__generation-selected"
            data-select-arrow=""
          >
            <div className="about-deposit__generation-info">
              <h5 className="about-deposit__generation-title">Выбор проекта</h5>
            </div>

            <div className="about-deposit__generation-currency">
              <img
                className="about-deposit__generation-img"
                src="/img/icons/arrow-down.svg"
                alt="arrow-down"
              />
            </div>
          </div>

          <ul className="about-deposit__generation-list" data-select-list="">
            <li className="about-deposit__generation-item" data-select-item="">
              Выбор проекта
            </li>
            <li className="about-deposit__generation-item" data-select-item="">
              Выбор проекта
            </li>
            <li className="about-deposit__generation-item" data-select-item="">
              Выбор проекта
            </li>
          </ul>
        </div>

        <div className="about-deposit__generation-select about-deposit__generation-selected--not-reverse about-deposit__generation-selected--white">
          <div className="about-deposit__generation-selected">
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
              data-modal-id="select-modal"
            >
              <div className="about-deposit__generation-curr">USD</div>

              <img
                className="about-deposit__generation-img"
                src="/img/icons/arrow-down.svg"
                alt="arrow-down"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="about-check__btn main-btn"
        onClick={props.onGeneratePaymentLink}
      >
        Сгенерировать платежную ссылку
      </button>
    </div>
  );
}
