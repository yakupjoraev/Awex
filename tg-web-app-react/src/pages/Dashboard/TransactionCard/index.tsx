import React from "react";
import { ITransaction } from "../../../models/account.models";

interface IProps {
  transaction: ITransaction;
}

const TransactionCard: React.FC<IProps> = ({ transaction }) => {
  return (
    <li className="history-transactions__item">
      <div className="history-transactions__info">
        <img src="./img/icons/ic_round-log-in.svg" alt="ic_round-log-in" />

        <div className="history-transactions__texts">
          <div className="history-transactions__text">
            <span className="history-transactions__action font-semibold">
              {transaction?.type === "debit" ? "Пополнение" : ""}:{" "}
            </span>
            <span>#{transaction?.id}</span>
          </div>
          <div className="history-transactions__text">
            <span>
              {new Date(transaction?.date * 1000).toLocaleDateString("ru")}{" "}
            </span>
            <span>
              {new Date(transaction?.date * 1000).toLocaleTimeString("ru")}
            </span>
          </div>
        </div>
      </div>

      <div className="history-transactions__sums">
        <p className="history-transactions__sum">
          +{transaction?.paymentOrderAmount}{" "}
          {transaction?.currency?.toUpperCase()}
        </p>
        <p className="history-transactions__status">Получено</p>
      </div>
    </li>
  );
};

export default TransactionCard;
