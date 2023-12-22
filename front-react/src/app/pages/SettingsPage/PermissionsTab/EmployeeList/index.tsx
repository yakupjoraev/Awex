import { EmployeePaginator } from "../EmployeePaginator";
import { useMemo, useState } from "react";
import { EmployeeItem } from "../EmployeeItem";
import { useDebounce } from "usehooks-ts";
import escapeRegExp from "lodash/escapeRegExp";
import classNames from "classnames";
import { AppTeamMember } from "@store/accountTeam/slice";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "@constants/path-locations";

export interface EmployeeListProps {
  className?: string;
  employees: AppTeamMember[];
  onNavAddEmployee: () => void;
  onDeleteEmployee: (employeeId: string) => void;
  onEnableEmployee: (employeeId: string) => void;
  onDisableEmployee: (employeeId: string) => void;
}

const PAGE_LENGTH = 3;
const SEARCH_THROTTLE = 200;

export function EmployeeList(props: EmployeeListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce(searchText, SEARCH_THROTTLE);
  const navigate = useNavigate()

  const employeesBySearchText = useMemo(() => {
    const normalizedSearchText = debouncedSearchText.trim().toLowerCase();
    if (normalizedSearchText.length === 0) {
      return props.employees;
    }
    const searchRe = new RegExp(escapeRegExp(normalizedSearchText), "i");
    return props.employees.filter(({ name, email }) => {
      return searchRe.test(name) || searchRe.test(email);
    });
  }, [props.employees, debouncedSearchText]);

  const [pageEmployees, totalPages] = useMemo(() => {
    const totalPages =
      employeesBySearchText.length === 0
        ? 1
        : Math.ceil(employeesBySearchText.length / PAGE_LENGTH);

    const normalizedCurrentPage =
      currentPage > totalPages ? totalPages : currentPage;
    const offset = (normalizedCurrentPage - 1) * PAGE_LENGTH;
    const pageEmployees = employeesBySearchText.slice(
      offset,
      offset + PAGE_LENGTH
    );
    return [pageEmployees, totalPages];
  }, [employeesBySearchText, currentPage]);

  const handleNavigate = (page: number) => {
    if (page < 0) {
      setCurrentPage(1);
    } else {
      setCurrentPage(page);
    }
  };

  const handleEditEmployee = (_employeeId: string) => {
    alert("NOT IMPLEMENTED");
  };

  const handleSearchInputKeyUp = (
    ev: React.KeyboardEvent<HTMLInputElement>
  ) => {
    setSearchText(ev.currentTarget.value);
  };

  return (
    <div className={classNames("settings-profile__select", props.className)}>
      <div className="settings-security__header">
        <h3 className="settings-security__title">Мои сотрудники</h3>

        <button
          type="button"
          className="settings-security__header-btn main-btn"
          onClick={() => navigate(ROUTE.EMPLOYEE_ACTIVITY_PATH)}
        >
          {/* Журнал действий */}
          История сотрудников
        </button>

        <button
          type="button"
          className="settings-security__header-btn settings-security__header-btn--password main-btn"
          onClick={props.onNavAddEmployee}
        >
          + Добавить нового сотрудника
        </button>
      </div>

      <div className="settings-security__middle">
        <div className="settings-security__search deposits__filter-search search-group">
          <input
            className="deposits__filter-src search-input"
            type="search"
            placeholder="Поиск по имени или e-mail"
            onKeyUp={handleSearchInputKeyUp}
          />
          <img
            className="deposits__filter-search-img search-img"
            src="/img/icons/search.svg"
            alt="Поиск"
          />
        </div>

        <ul className="settings-security__users">
          {pageEmployees.map((employee) => (
            <EmployeeItem
              employeeId={employee.id}
              label={employee.label}
              email={employee.email}
              name={employee.name}
              enabled={employee.enabled}
              onEnable={props.onEnableEmployee}
              onDisable={props.onDisableEmployee}
              onDelete={props.onDeleteEmployee}
              onEdit={handleEditEmployee}
              key={employee.id}
            />
          ))}
        </ul>
      </div>
      <EmployeePaginator
        currentPage={currentPage > totalPages ? totalPages : currentPage}
        totalPages={totalPages}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
