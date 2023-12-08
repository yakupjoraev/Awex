import React from "react";
import { ITransaction } from "../../../models/account.models";
import TransactionCard from "../TransactionCard";

interface IProps {
  transactions: ITransaction[];
}

const TransactionList: React.FC<IProps> = ({ transactions }) => {
  return (
    <ul className="history-transactions__list">
      {transactions?.map((transaction) => (
        <TransactionCard key={transaction.id} transaction={transaction} />
      ))}
    </ul>
  );
};

export default TransactionList;
