import { useState } from "react";
import classNames from "classnames";
import { ContentRenderer, Popover } from "react-tiny-popover";
import { DateRange } from "react-day-picker";
import { CustomDayPicker } from "@components/CustomDayPicker";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

export type { DateRange } from "react-day-picker";

export interface AdminStatsDateRangeProps {
  className?: string;
  label: string;
  value?: DateRange;
  onChange: (value: DateRange | undefined) => void;
  onInteractive?: (interactive: boolean) => void;
}

export function AdminStatsDateRange(props: AdminStatsDateRangeProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleClickOutside = () => {
    const nextPopoverOpen = false;
    setPopoverOpen(nextPopoverOpen);
    if (props.onInteractive !== undefined) {
      props.onInteractive(nextPopoverOpen);
    }
  };

  const handleClickSelector = () => {
    const nextPopoverOpen = !popoverOpen;
    setPopoverOpen(nextPopoverOpen);
    if (props.onInteractive !== undefined) {
      props.onInteractive(nextPopoverOpen);
    }
  };

  const handleRangeChange = (nextRange: DateRange | undefined) => {
    props.onChange(nextRange);
  };

  const renderPopoverContent: ContentRenderer = () => {
    return (
      <div>
        <CustomDayPicker
          initialFocus={popoverOpen}
          mode="range"
          locale={ru}
          selected={props.value}
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
        className={classNames("admin-statistic__form-group", props.className)}
        onClick={handleClickSelector}
      >
        <p className="admin-statistic__form-label">{props.label}</p>
        <div className="admin-statistic__form-selected">
          <p className="admin-statistic__form-selected-text">
            {!props.value ? "???-???" : formatRange(props.value)}
          </p>
          <img
            className={classNames("admin-statistic__form-arrow", {
              "admin-statistic__form-arrow--active": popoverOpen,
            })}
            src="/img/icons/mini-arrow-down.svg"
            alt=""
          />
        </div>
      </div>
    </Popover>
  );
}

function formatRange(range: DateRange) {
  let fromStr: string = "???";
  let toStr: string = "???";
  if (range.from) {
    fromStr = format(range.from, "dd.MM.yyyy");
  }
  if (range.to) {
    toStr = format(range.to, "dd.MM.yyyy");
  }
  return `${fromStr}-${toStr}`;
}
