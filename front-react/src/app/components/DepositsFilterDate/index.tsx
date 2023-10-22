import { useState } from "react";
import { format } from "date-fns";
import classNames from "classnames";
import { ru } from "date-fns/locale";
import { ContentRenderer, Popover } from "react-tiny-popover";
import { DateRange } from "react-day-picker";
import { CustomDayPicker } from "@components/CustomDayPicker";

export type { DateRange } from "react-day-picker";

export interface DepositsFilterDateProps {
  className?: string;
  label: string;
  value?: DateRange;
  onChange: (value: DateRange | undefined) => void;
  onClose?: () => void;
}

export function DepositsFilterDate(props: DepositsFilterDateProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleClickOutside = () => {
    setPopoverOpen(false);
    if (props.onClose) {
      props.onClose();
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
