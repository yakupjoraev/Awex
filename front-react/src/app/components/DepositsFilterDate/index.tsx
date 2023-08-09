import React, { useState } from "react";
import { format } from "date-fns";
import classNames from "classnames";
import { ru } from "date-fns/locale";
import { ContentRenderer, Popover } from "react-tiny-popover";
import {
  CustomComponents,
  DateRange,
  DayPicker,
  StyledElement,
} from "react-day-picker";
import { CalendarCaption } from "./CalendarCaption";
import { CalendarDayContent } from "./CalendarDayContent";
import "react-day-picker/dist/style.css";
import "./style.css";

export type { DateRange } from "react-day-picker";

export interface DepositsFilterDateProps {
  className?: string;
  label: string;
  value?: DateRange;
  onChange: (value: DateRange | undefined) => void;
}

const customComponents: CustomComponents = {
  Caption: CalendarCaption,
  DayContent: CalendarDayContent,
};

const customClassNames: Partial<StyledElement<string>> = {
  table: "rdp-table calendar__table",
  day: "rdp-day calendar__day",
  cell: "rdp-cell calendar__cell",
  head_cell: "rdp-head_cell calendar__head-cell",
};

export function DepositsFilterDate(props: DepositsFilterDateProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleClickOutside = () => {
    setPopoverOpen(false);
  };

  const handleRangeChange = (nextRange: DateRange | undefined) => {
    props.onChange(nextRange);
  };

  const renderPopoverContent: ContentRenderer = () => {
    return (
      <div>
        <DayPicker
          className="calendar"
          initialFocus={popoverOpen}
          mode="range"
          locale={ru}
          selected={props.value}
          components={customComponents}
          classNames={customClassNames}
          weekStartsOn={0}
          showOutsideDays={true}
          onSelect={handleRangeChange}
        />
      </div>
    );
  };

  return (
    <Popover
      isOpen={popoverOpen}
      positions={["right", "top", "left", "bottom"]}
      padding={10}
      onClickOutside={handleClickOutside}
      content={renderPopoverContent}
    >
      <div
        className={classNames(
          "deposits__filter-select deposits__filter-select--datapicker",
          props.className
        )}
        data-select-wrapper=""
        onClick={() => setPopoverOpen(!popoverOpen)}
      >
        <div className="deposits__filter-label">{props.label}</div>

        <div className="deposits__filter-selected" data-select-value="">
          {!props.value ? "???-???" : formatRange(props.value)}
        </div>

        <img
          className={classNames("deposits__filter-arrow", {
            active: popoverOpen,
          })}
          src="/img/icons/mini-arrow-down.svg"
          alt="mini-arrow-down"
          data-select-arrow=""
        />
      </div>
    </Popover>
  );
}

function formatRange(range: DateRange) {
  let fromStr: string = "???";
  let toStr: string = "???";
  if (range.from) {
    fromStr = format(range.from, "dd/MM/yyyy");
  }
  if (range.to) {
    toStr = format(range.to, "dd/MM/yyyy");
  }
  return `${fromStr}-${toStr}`;
}
