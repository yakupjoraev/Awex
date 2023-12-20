import React from "react";
import ApplicationCard from "../ApplicationForNewProjectCard";
import classes from "./ApplicationList.module.css";
import { ProjectListAdmin } from "@awex-api";

interface IProps {
  applications: ProjectListAdmin[];
  isDetailsButton?: boolean;
}

const ApplicationForNewProjectList: React.FC<IProps> = ({
  applications,
  isDetailsButton = true,
}) => {
  return (
    <ul className={classes["application-list"]}>
      {applications?.map((application, index) => (
        <ApplicationCard
          key={index}
          application={application}
          isDetailsButton={isDetailsButton}
        />
      ))}
    </ul>
  );
};

export default ApplicationForNewProjectList;
