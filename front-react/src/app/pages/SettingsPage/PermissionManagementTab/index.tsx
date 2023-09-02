import { AddEmployeeForm } from "./AddEmployeeForm";
import { EmployeeList } from "./EmployeeList";

export function PermissionManagementTab() {
  return (
    <div className="settings-security__form">
      <div className="settings-profile__selects settings-profile__selects--modification">
        <AddEmployeeForm />
        <EmployeeList />
      </div>
    </div>
  );
}
