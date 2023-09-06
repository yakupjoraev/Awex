import React from "react";
import classNames from "classnames";
import daysjs from "dayjs";

export interface DepositItemProps {
  id: string;
  depositStatus: "pending" | "active";
  applicationStatus: "rejected" | "review";
  comment: string;
  sum: { value: number; symbol: string };
  date: Date;
  dateEnd: Date;
}

export function DepositItem(props: DepositItemProps) {
  let depositStatusLabel: string;
  switch (props.depositStatus) {
    case "pending": {
      depositStatusLabel = "Ожидает действий";
      break;
    }
    case "active": {
      depositStatusLabel = "Активна";
      break;
    }
  }

  let applicationStatusLabel: string;
  switch (props.applicationStatus) {
    case "rejected": {
      applicationStatusLabel = "Отклонена";
      break;
    }
    case "review": {
      applicationStatusLabel = "На проверке";
      break;
    }
  }

  return (
    <li
      className={classNames("deposits__item", {
        "deposits__item-rejected": props.applicationStatus === "rejected",
      })}
    >
      <div className="deposits__item-status">
        {props.applicationStatus === "rejected" && (
          <img src="/img/icons/rejected.svg" alt="" />
        )}
      </div>
      <div className="deposits__item-id">{props.id}</div>
      <div className="deposits__item-data">
        {daysjs(props.date).format("DD/MM/YY")}
      </div>
      <div className="deposits__item-status-deposite">{depositStatusLabel}</div>
      <div className="deposits__item-sum">
        {props.sum.value} {props.sum.symbol}
      </div>
      <div className="deposits__item-data-end">
        {daysjs(props.dateEnd).format("DD/MM/YY")}
      </div>
      <div className="deposits__item-status-application">
        {applicationStatusLabel}
      </div>
      <div className="deposits__item-commets">{props.comment}</div>
    </li>
  );
}

function formatDate(date: Date) {}
