import { EmployeePaginator } from "../EmployeePaginator";
import { useEffect, useMemo, useState } from "react";
import { Employee, employees } from "./data";
import { EmployeeItem } from "../EmployeeItem";
import { useDebounce } from "usehooks-ts";
import escapeRegExp from "lodash/escapeRegExp";

const PAGE_LENGTH = 3;
const SEARCH_THROTTLE = 200;

export function EmployeeList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [allEmployees, setAllEmployees] = useState(employees);
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce(searchText, SEARCH_THROTTLE);

  const foundEmployees = useMemo(() => {
    const normalizedSearchText = debouncedSearchText.trim().toLowerCase();
    if (normalizedSearchText.length === 0) {
      return allEmployees;
    }
    const searchRe = new RegExp(escapeRegExp(normalizedSearchText), "i");
    return allEmployees.filter(([, employee]) => {
      return searchRe.test(employee.name) || searchRe.test(employee.email);
    });
  }, [debouncedSearchText, allEmployees]);

  const [pageEmployees, totalPages] = useMemo(() => {
    const totalPages =
      foundEmployees.length === 0
        ? 1
        : Math.ceil(foundEmployees.length / PAGE_LENGTH);

    const normalizedCurrentPage =
      currentPage > totalPages ? totalPages : currentPage;
    const offset = (normalizedCurrentPage - 1) * PAGE_LENGTH;
    const pageEmployees = foundEmployees.slice(offset, offset + PAGE_LENGTH);
    return [pageEmployees, totalPages];
  }, [foundEmployees, currentPage]);

  const handleNavigate = (page: number) => {
    if (page < 0) {
      setCurrentPage(1);
    } else {
      setCurrentPage(page);
    }
  };

  const handleDeleteEmployee = (employeeId: string) => {
    const nextAllEmployees = allEmployees.filter(([id]) => id !== employeeId);
    setAllEmployees(nextAllEmployees);
  };

  const handleBlockEmployee = (_employeeId: string) => {
    alert("NOT IMPLEMENTED");
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
    <div className="settings-profile__select">
      <div className="settings-security__header">
        <h3 className="settings-security__title">Мои сотрудники</h3>

        <button className="settings-security__header-btn settings-security__header-btn--password main-btn">
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
          {pageEmployees.map(([id, employee]) => (
            <EmployeeItem
              employeeId={id}
              role={employee.role}
              email={employee.email}
              name={employee.name}
              onDelete={handleDeleteEmployee}
              onBlock={handleBlockEmployee}
              onEdit={handleEditEmployee}
              key={id}
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
