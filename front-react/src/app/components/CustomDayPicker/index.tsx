import classNames from "classnames";
import {
  CustomComponents,
  DateRange,
  DayPicker,
  DayPickerRangeProps,
  DayPickerSingleProps,
  StyledElement,
} from "react-day-picker";
import { CalendarCaption } from "./CalendarCaption";
import { CalendarDayContent } from "./CalendarDayContent";
import "react-day-picker/dist/style.css";
import style from "./style.module.css";

export type { DateRange } from "react-day-picker";

export interface DepositsFilterDateProps {
  className?: string;
  initialFocus?: boolean;
  label: string;
  value?: DateRange;
  onChange: (value: DateRange | undefined) => void;
}

const customComponents: CustomComponents = {
  Caption: CalendarCaption,
  DayContent: CalendarDayContent,
};

const customClassNames: Partial<StyledElement<string>> = {
  table: `rdp-table ${style["calendar__table"]}`,
  day: `rdp-day ${style["calendar__day"]}`,
  cell: `rdp-cell ${style["calendar__cell"]}`,
  head_cell: `rdp-head_cell ${style["calendar__head-cell"]}`,
};

export type CustomDayPickerProps = DayPickerSingleProps | DayPickerRangeProps;

export function CustomDayPicker(props: CustomDayPickerProps) {
  const extendedProps = { ...props };
  if (extendedProps.className) {
    extendedProps.className = classNames(
      style["calendar"],
      extendedProps.className
    );
  } else {
    extendedProps.className = style["calendar"];
  }
  if (extendedProps.classNames) {
    extendedProps.classNames = {
      ...customClassNames,
      ...extendedProps.classNames,
    };
  } else {
    extendedProps.classNames = customClassNames;
  }
  if (extendedProps.components) {
    extendedProps.components = {
      ...customComponents,
      ...extendedProps.components,
    };
  } else {
    extendedProps.components = customComponents;
  }

  return <DayPicker {...extendedProps} />;
}
