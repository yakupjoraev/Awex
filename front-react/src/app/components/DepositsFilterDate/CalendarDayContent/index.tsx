import classNames from "classnames";
import { DayContentProps, useDayPicker } from "react-day-picker";

export function CalendarDayContent(props: DayContentProps) {
  const {
    locale,
    formatters: { formatDay },
  } = useDayPicker();

  return (
    <span
      className={classNames("calendar__day-content", {
        "calendar__day-content--range-start": props.activeModifiers.range_start,
        "calendar__day-content--range-end": props.activeModifiers.range_end,
      })}
    >
      {formatDay(props.date, { locale })}
    </span>
  );
}
