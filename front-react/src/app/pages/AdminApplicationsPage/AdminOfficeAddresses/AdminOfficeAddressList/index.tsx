import React from "react";
import AdminOfficeAddressCard from "../AdminOfficeAddressCard";
import classes from "./ApplicationForNewOfficeAddressList.module.css";
import { OfficeAddressListAdmin } from "src/generated/awex-api/models/OfficeAddressAdminList";

interface IProps {
  applications: OfficeAddressListAdmin;
  isDetailsButton?: boolean;
}

const AdminOfficeAddressList: React.FC<IProps> = ({
  applications,
  isDetailsButton = true,
}) => {
  return (
    <ul className={classes["application-list"]}>
      {applications?.list?.map((application, index) => (
        <AdminOfficeAddressCard
          key={index}
          application={application}
          isDetailsButton={isDetailsButton}
        />
      ))}
    </ul>
  );
};

export default AdminOfficeAddressList;
