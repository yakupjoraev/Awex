import React from "react";
import classes from "./ApplicationList.module.css";
import { AdminCashOrderItem } from "src/generated/awex-api/models/AdminCashOrderItem";
import CashOrderCard from "../AdminCashOrderCard";

interface IProps {
  applications: AdminCashOrderItem[];
  isDetailsButton?: boolean;
}

const AdminCashOrderList: React.FC<IProps> = ({
  applications,
  isDetailsButton = true,
}) => {
  return (
    <ul className={classes["application-list"]}>
      {applications?.map((application, index) => (
        <CashOrderCard
          key={index}
          application={application}
          isDetailsButton={isDetailsButton}
        />
      ))}
    </ul>
  );
};

export default AdminCashOrderList;
