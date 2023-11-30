import React, { useEffect } from "react";
import ApplicationList from "../ApplicationList";
import { AuthorizedService, ProjectListAdmin } from "@awex-api";
import classes from "./ProjectIncrease.module.css";

const ProjectsIncrease: React.FC = () => {
  const [applications, setApplications] = React.useState<ProjectListAdmin[]>(
    []
  );

  useEffect(() => {
    AuthorizedService.adminProjectsList().then((res) => {
      setApplications(res.list!);
    });
  }, [applications]);

  return (
    <div className={classes["container"]}>
      <div className="admin-marchants__list">
        <div className="admin-marchants__item-labels">
          <p className="admin-marchants__item-label">Номер</p>
          <p className="admin-marchants__item-label">Номер/ID мерчанта</p>
          <p className="admin-marchants__item-label">Дата заявки</p>
          <p className="admin-marchants__item-label" />
        </div>

        <ApplicationList applications={applications} />
      </div>
    </div>
  );
};

export default ProjectsIncrease;
