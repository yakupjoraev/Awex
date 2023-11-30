import React, { useEffect } from "react";
import classes from "./AdminApplicationAreaNavbar.module.css";
import { NavLink } from "react-router-dom";
import { AuthorizedService, ProjectListAdmin } from "@awex-api";

const AdminApplicationAreaNavbar: React.FC = () => {
  const [applications, setApplications] = React.useState<ProjectListAdmin[]>(
    []
  );

  useEffect(() => {
    AuthorizedService.adminProjectsList().then((res) => {
      setApplications(res.list!);
    });
  }, [applications]);

  const amountOfNewApplications = applications.filter(
    (application) => application?.validation?.status === "new"
  ).length;

  const AdminApplicationsPageNav = [
    {
      title: "Обработка депозитов",
      path: "/admin-applications-page/deposit-processing",
    },
    {
      title: "Увеличение количества проектов",
      path: "/admin/applications/projects",
      amountOfNewApplications,
    },
    {
      title: "Изменение/добавление юр.счета",
      path: "/admin-applications-page/bank-account",
    },
    {
      title: "Изменение/добавление юр. адреса",
      path: "/admin-applications-page/legal-address",
    },
  ];

  return (
    <nav className={classes["container"]}>
      <ul className={classes["navigation-list"]}>
        {AdminApplicationsPageNav.map((item, index) => (
          <li key={index} className={classes["navigation-list__li"]}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? classes["navigation-list__item--active"]
                  : classes["navigation-list__item"]
              }
            >
              {item.title}
              {item.amountOfNewApplications &&
              item.amountOfNewApplications > 0 ? (
                <span className={classes["navigation-list__amount"]}>
                  {item.amountOfNewApplications}
                </span>
              ) : null}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminApplicationAreaNavbar;
