import React from "react";
import ApplicationForNewOfficeAddressCard from "../ApplicationForNewOfficeAddressCard";
import classes from "./ApplicationForNewOfficeAddressList.module.css";
import { OfficeAddressListAdmin } from "src/generated/awex-api/models/OfficeAddressAdminList";

interface IProps {
  applications: OfficeAddressListAdmin;
  isDetailsButton?: boolean;
}

const ApplicationForNewOfficeAddressList: React.FC<IProps> = ({
  applications,
  isDetailsButton = true,
}) => {
  return (
    <ul className={classes["application-list"]}>
      {applications?.list?.map((application, index) => (
        <ApplicationForNewOfficeAddressCard
          key={index}
          application={application}
          isDetailsButton={isDetailsButton}
        />
      ))}
    </ul>
  );
};

export default ApplicationForNewOfficeAddressList;
