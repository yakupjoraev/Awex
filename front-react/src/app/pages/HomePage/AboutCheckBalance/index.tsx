import React from "react";

export function AboutCheckBalance() {
  return (
    <div className="about-check__balance">
      <div className="about-check__balance-inner">
        <div className="about-check__balance-labels">
          <div className="about-check__balance-label">Общий баланс:</div>

          <a href="#" className="about-check__balance-statistic">
            Статистика
            <img
              className="about-check__balance-statistic-img"
              src="/img/icons/arrow-right.svg"
              alt="Статистика"
            />
          </a>
        </div>

        <div className="about-check__balance-sum">
          2.565.678
          <span>,456$</span>
        </div>

        <div className="about-check__graphic">
          <img
            className="about-check__graphic-img"
            src="/img/balance-graphic.svg"
            alt="графика баланса"
          />
        </div>
      </div>

      <button
        type="button"
        className="about-check__btn main-btn"
        onClick={() => {
          alert("NOT IMPLEMENTED");
        }}
      >
        Заказ наличных в офис
      </button>
    </div>
  );
}
