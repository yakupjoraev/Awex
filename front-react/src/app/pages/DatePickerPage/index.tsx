import { Helmet } from "react-helmet-async";
import {
  DepositsFilterDate,
  DateRange,
} from "../../components/DepositsFilterDate";
import style from "./style.module.css";
import { useState } from "react";

const defaultDateFilterValue: DateRange = {
  from: new Date("2022-01-05T22:00:00.000Z"),
  to: new Date("2023-06-05T22:00:00.000Z"),
};

export function DatePickerPage() {
  const [dateFilter, setDateFilter] = useState<DateRange | undefined>(
    defaultDateFilterValue
  );

  const handleDateFilterChange = (value?: DateRange) => {
    setDateFilter(value);
  };

  return (
    <section className="main-content">
      <Helmet title="Date picker" />
      <div className={style["date-picker-page"]}>
        <DepositsFilterDate
          className={style["date-picker-page__select"]}
          label="Дата"
          value={dateFilter}
          onChange={handleDateFilterChange}
        />
      </div>
    </section>
  );
}
