import { useAppDispatch, useAppSelector } from "@store/hooks";
import { EmployeeList } from "./EmployeeList";
import {
  deleteTeamMember,
  disableTeamMember,
  enableTeamMember,
  getTeamMembers,
  teamMemberSelectors,
} from "@store/accountTeam/slice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export interface EmployeeListContainerProps {
  className?: string;
  onNavAddEmployee: () => void;
}

export function EmployeeListContainer(props: EmployeeListContainerProps) {
  const dispatch = useAppDispatch();
  const employees = useAppSelector((state) =>
    teamMemberSelectors.selectAll(state.accountTeam.data)
  );

  useEffect(() => {
    dispatch(getTeamMembers());
  }, []);

  const handleEnableEmployee = (employeeId: string) => {
    dispatch(enableTeamMember({ id: employeeId }))
      .then(() => {
        toast.success("Сотрудник разблокирован!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Не удалось разблокировать сотрудника!");
      });
  };

  const handleDisableEmployee = (employeeId: string) => {
    dispatch(disableTeamMember({ id: employeeId }))
      .then(() => {
        toast.success("Сотрудник заблокирован!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Не удалось заблокировать сотрудника!");
      });
  };

  const handleDeleteEmployee = (employeeId: string) => {
    dispatch(deleteTeamMember({ id: employeeId }))
      .then(() => {
        toast.success("Сотрудник удален!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Не удалось удалить сотрудника!");
      });
  };

  return (
    <EmployeeList
      className={props.className}
      employees={employees}
      onNavAddEmployee={props.onNavAddEmployee}
      onEnableEmployee={handleEnableEmployee}
      onDisableEmployee={handleDisableEmployee}
      onDeleteEmployee={handleDeleteEmployee}
    />
  );
}
