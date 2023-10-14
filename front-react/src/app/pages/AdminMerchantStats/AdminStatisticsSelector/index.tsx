import classNames from "classnames";
import { useState, useRef, useEffect } from "react";

export interface AdminStatisticsSelectorProps {
  label: string;
  value: string;
  options: Record<string, string>;
  onChange: (value: string) => void;
}

export function AdminStatisticsSelector(props: AdminStatisticsSelectorProps) {
  const selectorRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleDocumentClick = (ev: MouseEvent) => {
      if (
        selectorRef.current !== null &&
        ev.target instanceof Element &&
        !selectorRef.current.contains(ev.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [open]);

  const handleOptionClick = (value: string) => {
    props.onChange(value);
    setOpen(false);
  };

  const handleContainerClick = (
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (
      listRef.current !== null &&
      ev.target instanceof Element &&
      listRef.current.contains(ev.target)
    ) {
      return;
    }
    setOpen(!open);
  };

  return (
    <div
      className="admin-statistic__form-group"
      data-select-wrapper=""
      onClick={handleContainerClick}
      ref={selectorRef}
    >
      <p className="admin-statistic__form-label">{props.label}</p>
      <div className="admin-statistic__form-selected">
        <p className="admin-statistic__form-selected-text">
          {Object.prototype.hasOwnProperty.call(props.options, props.value) &&
            props.options[props.value]}
        </p>
        <img
          className={classNames("admin-statistic__form-arrow", {
            "admin-statistic__form-arrow--active": open,
          })}
          src="/img/icons/mini-arrow-down.svg"
          alt=""
        />
      </div>
      <ul
        className={classNames("my-projects__group-list select-list", {
          active: open,
        })}
        data-select-list=""
        ref={listRef}
      >
        {Object.entries(props.options).map(([value, label]) => {
          return (
            <li
              className="my-projects__group-item select-item"
              data-select-item=""
              onClick={() => handleOptionClick(value)}
              key={value}
            >
              {label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
