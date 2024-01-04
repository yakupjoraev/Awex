import React from "react";
import { Link } from "react-router-dom";
import { AdminCashOrderItem } from "src/generated/awex-api/models/AdminCashOrderItem";
import classes from "./ApplicationCard.module.css";

interface IProps {
  application: AdminCashOrderItem;
  isDetailsButton?: boolean;
}

const AdminCashOrderCard: React.FC<IProps> = ({
  application,
  isDetailsButton = true,
}) => {
  const { id, completedAt, createdAt, officeId } = application || {};

  const date = completedAt
    ? new Date(completedAt * 1000)
    : createdAt
    ? new Date(createdAt * 1000)
    : null;

  const cardStyle =
    classes[`application-card--${completedAt ? "approved" : "read"}`];

  const statusLabel = completedAt ? "Завершено" : "Подробнее";

  const statusLabelStyle =
    classes[
      `application-card__status-label__${createdAt ? "read" : "approved"}`
    ];

  return (
    <li key={id} className={cardStyle}>
      <p>{id}</p>
      <p>ID{officeId}</p>
      <p>{date?.toLocaleDateString()}</p>
      <p />
      <p />
      {statusLabel && isDetailsButton && (
        <Link
          to={`/admin/applications/cash-order/${id}`}
          className={classes["application-card__more"]}
        >
          {statusLabel && (
            <span className={statusLabelStyle}>{statusLabel}</span>
          )}
          {completedAt && (
            <img src="/img/icons/check-circle-green.svg" alt="" />
          )}
          {statusLabel === "Подробнее" && createdAt && (
            <img src="/img/icons/arrow-down.svg" alt="" />
          )}
        </Link>
      )}
    </li>
  );
};

export default AdminCashOrderCard;
