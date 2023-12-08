import { CustomDayPicker } from "@components/CustomDayPicker";
import classNames from "classnames";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { RefCallback, useState } from "react";
import { ContentRenderer, Popover } from "react-tiny-popover";
import classes from "./styles.module.css";

export interface DateInputProps {
  className?: string;
  id?: string;
  value?: Date;
  disabled?: boolean;
  error?: string;
  inputRef?: RefCallback<any>;
  onBlur?: () => void;
  onFocus?: () => void;
  onChange?: (value?: Date) => void;
  onChangeTime?: (value?: Date) => void;
}

export function DateInput(props: DateInputProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleClickInput = () => {
    setPopoverOpen(!popoverOpen);
  };

  const handleClickOutside = () => {
    setPopoverOpen(false);
  };

  const handelChange = (value?: Date) => {
    if (props.onChange && !props.disabled) {
      props.onChange(value);
      setPopoverOpen(false);
    }
  };

  const handleChangeTime = (e: any) => {
    const timeValue = e.target.value;
    const dateValue = props.value?.toLocaleDateString().split("/");
    const dateStringValue = `${dateValue![2]}-${dateValue![0]}-${
      dateValue![1]?.length === 1 ? `0${dateValue![1]}` : dateValue![1]
    }`;

    if (props.onChange && !props.disabled) {
      props.onChange(new Date(`${dateStringValue}T${timeValue}`));
    }
  };

  const renderPopoverContent: ContentRenderer = () => {
    return (
      <div className={classes["date-time-picker--container"]}>
        <CustomDayPicker
          initialFocus={popoverOpen}
          mode="single"
          locale={ru}
          selected={props.value}
          weekStartsOn={0}
          showOutsideDays={true}
          onSelect={handelChange}
        />
        <input
          className={classes["date-time-picket--time"]}
          type="time"
          min="00:00"
          max="23:59"
          disabled={props.value === undefined}
          pattern="[0-2][0-9]:[0-5][0-9]"
          onChange={handleChangeTime}
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
          "admin-comission__group admin-comission__group--has-icon-right",
          !!props.error && "admin-comission__group--has-error",
          props.className
        )}
        onClick={handleClickInput}
      >
        <label className="admin-comission__group-label" htmlFor={props.id}>
          Дата и время начала действия:
        </label>
        <input
          className="admin-comission__group-input admin-comission__group-input--has-icon-right"
          id={props.id}
          type="text"
          value={props.value ? format(props.value, "dd.MM.yy kk:mm (zzz)") : ""}
          readOnly
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          ref={props.inputRef}
        />
        <img
          className="admin-comission__group-icon-right"
          src="/img/icons/calendar.svg"
          alt=""
          width="24"
          height="24"
        />
      </div>
    </Popover>
  );
}
