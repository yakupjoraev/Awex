import classNames from "classnames";
import { DayContentProps, useDayPicker } from "react-day-picker";
import style from "../style.module.css";

export function CalendarDayContent(props: DayContentProps) {
  const {
    mode,
    locale,
    formatters: { formatDay },
  } = useDayPicker();

  return (
    <span
      className={classNames(style["calendar__day-content"], {
        [style["calendar__day-content--range-start"]]:
          props.activeModifiers.range_start,
        [style["calendar__day-content--range-end"]]:
          props.activeModifiers.range_end,
        [style["calendar__day-content--selected"]]:
          props.activeModifiers.selected,
        [style["calendar__day-content--single"]]: mode === "single"
      })}
    >
      {formatDay(props.date, { locale })}
    </span>
  );
}
