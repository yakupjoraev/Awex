import React from "react";
import AdminProjectCard from "../AdminProjectCard";
import classes from "./ApplicationList.module.css";
import { ProjectListAdmin } from "@awex-api";

interface IProps {
  applications: ProjectListAdmin[];
  isDetailsButton?: boolean;
}

const AdminProjectList: React.FC<IProps> = ({
  applications,
  isDetailsButton = true,
}) => {
  return (
    <ul className={classes["application-list"]}>
      {applications?.map((application, index) => (
        <AdminProjectCard
          key={index}
          application={application}
          isDetailsButton={isDetailsButton}
        />
      ))}
    </ul>
  );
};

export default AdminProjectList;
