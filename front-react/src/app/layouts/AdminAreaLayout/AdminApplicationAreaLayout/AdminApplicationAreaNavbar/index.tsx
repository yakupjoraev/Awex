import React, { useEffect } from "react";
import classes from "./AdminApplicationAreaNavbar.module.css";
import { NavLink } from "react-router-dom";
import { AuthorizedService, ProjectListAdmin } from "@awex-api";
import { ADMIN_APPLICATIONS_OFFICE_ADDRESS_ROUTE } from "@constants/path-locations";

const AdminApplicationAreaNavbar: React.FC = () => {
  const [applications, setApplications] = React.useState<ProjectListAdmin[]>(
    []
  );

  useEffect(() => {
    AuthorizedService.adminProjectsList().then((res) => {
      setApplications(res.list!);
    });
  }, []);

  const amountOfNewApplications = applications.filter(
    (application) => application?.validation?.status === "new"
  ).length;

  const AdminApplicationsPageNav = [
    {
      title: "Обработка депозитов",
      path: "/admin-applications-page/deposit-processing",
      disable: true,
    },
    {
      title: "Увеличение количества проектов",
      path: "/admin/applications/projects",
      amountOfNewApplications,
      disable: false,
    },
    {
      title: "Изменение/добавление юр.счета",
      path: "/admin-applications-page/bank-account",
      disable: true,
    },
    {
      title: "Изменение/добавление юр. адреса",
      path: ADMIN_APPLICATIONS_OFFICE_ADDRESS_ROUTE,
      disable: false,
    },
  ];

  const handleClick = (e: any, disable: boolean) => {
    if (disable) e.preventDefault();
  };

  return (
    <nav className={classes["container"]}>
      <ul className={classes["navigation-list"]}>
        {AdminApplicationsPageNav.map((item, index) => (
          <li key={index} className={classes["navigation-list__li"]}>
            <NavLink
              to={item.path}
              onClick={(e) =>
                item.disable ? handleClick(e, item.disable) : null
              }
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
