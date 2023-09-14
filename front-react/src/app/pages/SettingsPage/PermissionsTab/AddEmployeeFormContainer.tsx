import { useAppDispatch, useAppSelector } from "@store/hooks";
import { AddEmployeeForm, AddEmployeeRequest } from "./AddEmployeeForm";
import { useEffect, useState } from "react";
import { getConfigSettings } from "@store/accountConfigSettings/slice";
import { addTeamMember } from "@store/accountTeam/slice";
import toast from "react-hot-toast";

interface AddEmployeeFormContainerProps {
  className?: string;
  onNavEmployeeList: () => void;
}

const DEFAULT_LABELS: string[] = [];

const DEFAULT_PERMISSIONS: string[] = [];

export function AddEmployeeFormContainer(props: AddEmployeeFormContainerProps) {
  const dispatch = useAppDispatch();
  const [submitPending, setSubmitPending] = useState(false);
  const labels = useAppSelector(
    (state) => state.accountConfigSettings.data?.labels
  );
  const permissions = useAppSelector(
    (state) => state.accountConfigSettings.data?.permissions
  );
  const configSettingsLoading = useAppSelector(
    (state) => state.accountConfigSettings.loading
  );

  useEffect(() => {
    dispatch(getConfigSettings());
  }, [dispatch]);

  const addEmployee = async (request: AddEmployeeRequest): Promise<void> => {
    setSubmitPending(true);
    try {
      await dispatch(
        addTeamMember({
          name: request.name,
          email: request.email,
          permissions: request.permissions,
          label: request.label,
          enabled: true,
        })
      );
    } finally {
      setSubmitPending(false);
    }
  };

  return (
    <AddEmployeeForm
      className={props.className}
      labels={labels || DEFAULT_LABELS}
      permissions={permissions || DEFAULT_PERMISSIONS}
      loading={submitPending || configSettingsLoading}
      onNavEmployeeList={props.onNavEmployeeList}
      addEmployee={addEmployee}
    />
  );
}
