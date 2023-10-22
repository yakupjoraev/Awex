import { useEffect, useMemo, useState } from "react";
import { DepositsFiltersSelect } from "../../../components/DepositsFilterSelect";
import { AppProject } from "src/types";
import { DateRange } from "react-day-picker";
import { DepositsFilterDate } from "@components/DepositsFilterDate";

interface StatusOption {
  value: "wait" | "paid" | "expired" | "none";
  label: string;
}

const statusFilterOptions: StatusOption[] = [
  { value: "wait", label: "В ожидании" },
  { value: "paid", label: "Оплачен" },
  { value: "expired", label: "Истек" },
  { value: "none", label: "Не выбрано" },
];

const VALUE_PREFIX = "_";

export interface OrderFilterState {
  projectId: string | null;
  status: "wait" | "paid" | "expired" | null;
  dateRange: DateRange | null;
}

export interface OrderFilterProps {
  filter: OrderFilterState;
  projects?: { id: string; project: AppProject }[];
  onSubmit: (filter: OrderFilterState) => void;
}

export function OrderFilter(props: OrderFilterProps) {
  const [dateRangeValue, setDateRangeValue] = useState<DateRange | undefined>(
    undefined
  );

  useEffect(() => {
    setDateRangeValue(props.filter.dateRange || undefined);
  }, [props.filter.dateRange]);

  const handleProjectFilterChange = (value: string) => {
    if (value === "none") {
      const nextFilter: OrderFilterState = { ...props.filter };
      nextFilter.projectId = null;
      props.onSubmit(nextFilter);
      return;
    }
    if (!props.projects) {
      return;
    }
    const projectId = value.slice(VALUE_PREFIX.length);
    const projectIndex = props.projects.findIndex(
      (listItem) => listItem.id === projectId
    );
    if (projectIndex === -1) {
      return;
    }
    const nextFilter: OrderFilterState = { ...props.filter };
    nextFilter.projectId = projectId;
    props.onSubmit(nextFilter);
  };

  const handleStatusFilterChange = (value: string) => {
    const option = statusFilterOptions.find((option) => option.value === value);
    if (option === undefined) {
      return;
    }
    const nextFilter: OrderFilterState = { ...props.filter };
    if (option.value === "none") {
      nextFilter.status = null;
    } else {
      nextFilter.status = option.value;
    }
    props.onSubmit(nextFilter);
  };

  const handleDateFilterChange = (value: DateRange | undefined) => {
    setDateRangeValue(value);
  };

  const handleDateFilterClose = () => {
    let from: number | undefined = dateRangeValue?.from?.getTime();
    let to: number | undefined = dateRangeValue?.to?.getTime();
    let filterFrom: number | undefined = undefined;
    let filterTo: number | undefined = undefined;
    if (props.filter.dateRange) {
      filterFrom = props.filter.dateRange.from?.getTime();
      filterTo = props.filter.dateRange.to?.getTime();
    }
    if (from !== filterFrom || to !== filterTo) {
      const nextFilter: OrderFilterState = { ...props.filter };
      nextFilter.dateRange = dateRangeValue || null;
      props.onSubmit(nextFilter);
    }
  };

  const projectOptions: { value: string; label: string }[] = useMemo(() => {
    const allProjectsOption = { value: "none", label: "Все проекты" };
    if (props.projects === undefined) {
      return [allProjectsOption];
    }
    const options: { value: string; label: string }[] = props.projects.map(
      ({ id, project }) => {
        return { value: VALUE_PREFIX + id, label: project.name };
      }
    );
    options.push(allProjectsOption);
    return options;
  }, [props.projects]);

  const projectValue: string =
    props.filter.projectId === null
      ? "none"
      : VALUE_PREFIX + props.filter.projectId;

  const statusValue: StatusOption["value"] =
    props.filter.status === null ? "none" : props.filter.status;

  return (
    <div className="deposits__filters">
      <DepositsFiltersSelect
        label="Проект"
        options={projectOptions}
        value={projectValue}
        onChange={handleProjectFilterChange}
      />

      <DepositsFiltersSelect
        label="Статус"
        options={statusFilterOptions}
        value={statusValue}
        onChange={handleStatusFilterChange}
      />

      <DepositsFilterDate
        label="Дата"
        value={dateRangeValue}
        onChange={handleDateFilterChange}
        onClose={handleDateFilterClose}
      />

      {/* <DepositsFiltersSelect
        className="deposits__filter-select deposits__filter-select--datapicker"
        label="Дата"
        options={dateFilterOptions}
        value={dateFilter}
        onChange={handleDateFilterChange}
      /> */}
    </div>
  );
}
