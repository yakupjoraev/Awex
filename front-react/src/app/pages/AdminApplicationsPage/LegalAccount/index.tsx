import React, { useEffect } from "react";
import classes from "./LegalAccount.module.css";
import ApplicationList from "../AdminProjects/AdminProjectList";
import { AuthorizedService, ProjectListAdmin } from "@awex-api";

const LegalAccount: React.FC = () => {
  const [applications, setApplications] = React.useState<ProjectListAdmin[]>(
    []
  );

  useEffect(() => {
    AuthorizedService.adminProjectsList().then((res) => {
      setApplications(res.list!);
    });
  }, []);

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

export default LegalAccount;
