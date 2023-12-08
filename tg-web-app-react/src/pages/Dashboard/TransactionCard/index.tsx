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
            <span className="history-transactions__action">
              {transaction?.type}:{" "}
            </span>
            <span>{transaction?.orderId}</span>
          </div>
          <div className="history-transactions__text">
            <span>{new Date(transaction?.date).toLocaleDateString()}</span>
            <span>{new Date(transaction?.date).toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      <div className="history-transactions__sums">
        <p className="history-transactions__sum">+9900 RUB</p>
        <p className="history-transactions__status">Получено</p>
      </div>
    </li>
  );
};

export default TransactionCard;
