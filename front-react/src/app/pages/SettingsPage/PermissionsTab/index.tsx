import { useState } from "react";
import classNames from "classnames";
import styles from "./style.module.css";
import { EmployeeListContainer } from "./EmployeeListContainer";
import { AddEmployeeFormContainer } from "./AddEmployeeFormContainer";

export function PermissionsTab() {
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
        <AddEmployeeFormContainer
          className={classNames(
            styles["panel"],
            !primary && styles["panel--active"]
          )}
          onNavEmployeeList={handleNavEmployeeList}
        />
        <EmployeeListContainer
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
