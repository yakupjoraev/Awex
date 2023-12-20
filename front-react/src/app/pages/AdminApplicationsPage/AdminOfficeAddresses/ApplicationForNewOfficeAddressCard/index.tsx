import React from "react";
import { Link } from "react-router-dom";
import { OfficeAddressAdminItem } from "src/generated/awex-api/models/OfficeAddressAdminItem";
import classes from "./ApplicationForNewOfficeAddress.module.css";

interface IProps {
  application: OfficeAddressAdminItem;
  isDetailsButton?: boolean;
}

const ApplicationForNewOfficeAddressCard: React.FC<IProps> = ({
  application,
  isDetailsButton,
}) => {
  const { id, userId, validation, createdAt } = application || {};

  const date = validation?.approve?.timestamp
    ? new Date(validation.approve.timestamp * 1000)
    : validation?.reject?.timestamp
    ? new Date(validation?.reject?.timestamp * 1000)
    : new Date(createdAt! * 1000);

  const cardStyle =
    classes[`application-card--${validation?.status || "read"}`];

  const isDetailsButtonDisabled = validation?.status === "read";

  const statusLabel =
    validation?.status === "new"
      ? "Ожидает действий оператора"
      : validation?.status === "waiting"
      ? "Ожидает действий мерчанта"
      : validation?.status === "approved"
      ? "Подтвержден"
      : validation?.status === "rejected"
      ? "Отклонен"
      : null;

  const statusLabelStyle =
    classes[`application-card__status-label__${validation?.status || "more"}`];

  return (
    <li key={id} className={cardStyle}>
      <p>{id}</p>
      <p>ID{userId}</p>
      <p>{date.toLocaleDateString()}</p>
      <p />
      <p />
      {(isDetailsButtonDisabled || statusLabel) && isDetailsButton && (
        <Link
          to={`/admin/applications/office-address/${id}`}
          className={classes["application-card__more"]}
        >
          {isDetailsButtonDisabled && <span>Подробнее</span>}
          {statusLabel && (
            <span className={statusLabelStyle}>{statusLabel}</span>
          )}
          {validation?.status === "approved" && (
            <img src="/img/icons/check-circle-green.svg" alt="" />
          )}
          {validation?.status === "rejected" && (
            <img src="/img/icons/red-close.svg" alt="" />
          )}
          {validation?.status === "read" && (
            <img src="/img/icons/arrow-down.svg" alt="" />
          )}
        </Link>
      )}
    </li>
  );
};

export default ApplicationForNewOfficeAddressCard;
