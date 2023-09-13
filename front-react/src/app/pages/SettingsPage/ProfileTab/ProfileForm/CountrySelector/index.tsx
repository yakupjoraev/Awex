import classNames from "classnames";
import { useEffect, useMemo } from "react";
import { useDropdown } from "../../../../../hooks/useDropdown";

export interface CountrySelectorOpts {
  options: { label: string; value: string }[];
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

export function CountrySelector(props: CountrySelectorOpts) {
  const dropdown = useDropdown<HTMLDivElement>();

  useEffect(() => {
    dropdown.toggle(false);
  }, [props.disabled]);

  const handleSelectClick = () => {
    if (props.disabled) {
      return;
    }
    if (props.options.length === 0) {
      return;
    }
    dropdown.toggle();
  };

  const handleOptionClick = (
    ev: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    if (props.disabled) {
      return;
    }
    const value = ev.currentTarget.getAttribute("data-value");
    if (value === null) {
      return;
    }
    props.onChange(value);
    dropdown.toggle(false);
  };

  const valueToLabel = useMemo(
    () => new Map(props.options.map((option) => [option.value, option.label])),
    [props.options]
  );

  return (
    <div
      className="my-projects__group-select"
      data-select-wrapper=""
      ref={dropdown.containerRef}
    >
      <div
        className={classNames(
          "my-projects__group-selected",
          Boolean(props.disabled) && "my-projects__group-selected--disabled"
        )}
        data-select-arrow=""
        onClick={handleSelectClick}
      >
        {valueToLabel.get(props.value) || "---"}
        <img
          className={classNames("my-projects__group-select-arrow", {
            active: dropdown.opened,
          })}
          src="/img/icons/mini-arrow-down.svg"
          alt="mini-arrow-down"
        />
      </div>
      <ul
        className={classNames("my-projects__group-list select-list", {
          active: dropdown.opened,
        })}
        data-select-list=""
      >
        {props.options.map(({ label, value }) => (
          <li
            className="my-projects__group-item select-item"
            data-value={value}
            data-select-item=""
            onClick={handleOptionClick}
            key={value}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
