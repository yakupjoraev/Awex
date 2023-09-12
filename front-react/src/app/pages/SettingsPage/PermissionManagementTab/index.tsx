import { AddEmployeeForm } from "./AddEmployeeForm";
import { EmployeeList } from "./EmployeeList";
import { useState } from "react";
import classNames from "classnames";
import styles from "./style.module.css";

export function PermissionManagementTab() {
  const [primary, setPrimary] = useState(true);

  const handleNavAddEmployeeForm = () => {
    setPrimary(false);
  };

  const handleNavEmployeeList = () => {
    setPrimary(true);
  };

  return (
    <div className="settings-security__form">
      <div className="settings-profile__selects settings-profile__selects--modification">
        <AddEmployeeForm
          className={classNames(
            styles["panel"],
            !primary && styles["panel--active"]
          )}
          onNavEmployeeList={handleNavEmployeeList}
        />
        <EmployeeList
          className={classNames(
            styles["panel"],
            primary && styles["panel--active"]
          )}
          onNavAddEmployee={handleNavAddEmployeeForm}
        />
      </div>
    </div>
  );
}
