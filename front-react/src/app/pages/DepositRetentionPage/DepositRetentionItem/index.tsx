import React from "react";

interface DepositRetentionItemProps {
  id: string;
  sumUSD: number;
  projectName: string;
  projectUrl: string;
  clientId: string;
  clientName: string;
  comment: string;
}

export function DepositRetentionItem(props: DepositRetentionItemProps) {
  const [sumUSDInteger, sumUSDFractional] = formatCurrency(props.sumUSD);

  return (
    <li className="deposit-retention__item">
      <div className="deposit-retention__inner">
        <div className="deposit-retention__info deposit-retention__info--1200">
          <div className="deposit-retention__info-groups">
            <div className="deposit-retention__deposit">
              <div className="deposit-retention__deposit-label">
                Текущий депозит:
              </div>

              <div className="deposit-retention__deposit-sum">
                {sumUSDInteger}
                <span>,{sumUSDFractional}$</span>
              </div>
            </div>

            <div className="deposit-retention__info-group">
              <div className="deposit-retention__project">
                <div className="deposit-retention__project-label">Проект:</div>

                <div className="deposit-retention__project-name">
                  {props.projectName}
                </div>

                <a
                  className="deposit-retention__project-link"
                  target="_blank"
                  rel="noopener"
                  href={props.projectUrl}
                >
                  {props.projectUrl}
                </a>
              </div>

              <div className="deposit-retention__id">
                <div className="deposit-retention__label">ID клиента:</div>

                <p className="deposit-retention__descr">#{props.clientId}</p>

                <p className="deposit-retention__descr">({props.clientName})</p>
              </div>
            </div>
          </div>

          <div className="deposit-retention__about">
            <div className="deposit-retention__comments">
              <div className="deposit-retention__label">Комментарий:</div>

              <p className="deposit-retention__descr">{props.comment}</p>
            </div>

            <form className="deposit-retention__form" action="#">
              <div className="deposit-retention__item-btns deposit-retention__item-btns--first">
                <button
                  type="button"
                  className="deposit-retention__btn third-btn"
                >
                  Удержать часть депозита
                </button>
              </div>

              <div className="deposit-retention__item-btns deposit-retention__item-btns--first">
                <button
                  type="button"
                  className="deposit-retention__btn second-btn"
                >
                  Вернуть полностью
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </li>
  );
}

function formatCurrency(value: number): [string, string] {
  const fixed = value.toFixed(2);

  let integerPart = fixed.slice(0, -3);
  if (integerPart.length > 3) {
    integerPart = integerPart.replace(/\d(?=(\d{3})+$)/g, "$&.");
  }

  const fractionalPart = fixed.slice(-2);

  return [integerPart, fractionalPart];
}
