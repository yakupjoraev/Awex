import { HistoryItem } from "../HistoryItem";
import { transactions } from "../data/transactions";

export function HistoryList() {
  return (
    <ul className="actives-check__history-list">
      {transactions.map((transaction) => {
        return (
          <HistoryItem
            status={transaction.status}
            address={transaction.address}
            date={transaction.date}
            key={transaction.id}
          />
        );
      })}
    </ul>
  );
}
