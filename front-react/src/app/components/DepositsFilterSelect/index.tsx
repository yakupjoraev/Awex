import classNames from "classnames";
import React, { useEffect, useMemo, useRef, useState } from "react";

export interface DepositsFiltersSelectProps {
  className?: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

export function DepositsFiltersSelect(props: DepositsFiltersSelectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dropdownOpened, setDropdownOpened] = useState(false);

  useEffect(() => {
    if (!dropdownOpened) {
      return;
    }
    const handleDocumentClick = (ev: MouseEvent) => {
      if (
        containerRef.current &&
        ev.target instanceof Element &&
        !containerRef.current.contains(ev.target)
      ) {
        setDropdownOpened(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [dropdownOpened]);

  const currentOption = useMemo(() => {
    return props.options.find((option) => option.value === props.value) || null;
  }, [props.value, props.options]);

  const handleOptionClick = (ev: React.MouseEvent<HTMLLIElement>) => {
    setDropdownOpened(false);
    const value = ev.currentTarget.getAttribute("data-value");
    if (value !== null) {
      props.onChange(value);
    }
  };

  return (
    <div
      className={classNames("deposits__filter-select", props.className)}
      data-select-wrapper=""
      ref={containerRef}
      onClick={() => void setDropdownOpened(!dropdownOpened)}
    >
      <div className="deposits__filter-label">{props.label}</div>

      <div className="deposits__filter-selected" data-select-value="">
        {currentOption ? currentOption.label : " "}
      </div>

      <img
        className={classNames("deposits__filter-arrow", {
          active: dropdownOpened,
        })}
        src="/img/icons/mini-arrow-down.svg"
        alt="mini-arrow-down"
        data-select-arrow=""
      />

      <ul
        className={classNames("deposits__filter-list select-list", {
          active: dropdownOpened,
        })}
        data-select-list=""
      >
        {props.options.map((option) => {
          return (
            <li
              className="deposits__filter-item select-item"
              data-select-item=""
              data-value={option.value}
              onClick={handleOptionClick}
              key={option.value}
            >
              {option.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
