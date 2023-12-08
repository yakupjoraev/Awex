import classNames from "classnames";
import { useEffect, useMemo } from "react";
import { useDropdown } from "../../../hooks/useDropdown";

export interface InvoiceProjectSelectorProps {
  value?: string;
  options?: { value: string; label: string; key?: string }[];
  disabled?: boolean;
  error?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
}

export function InvoiceProjectSelector(props: InvoiceProjectSelectorProps) {
  const projectDropdown = useDropdown<HTMLDivElement>();

  useEffect(() => {
    if (props.disabled === true) {
      projectDropdown.toggle(false);
    }
  }, [props.disabled]);

  const handleSelectorClick = () => {
    if (props.disabled !== true) {
      projectDropdown.toggle();
    }
  };

  const handleOptionClick = (
    ev: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const nextValue = ev.currentTarget.getAttribute("data-value");
    if (nextValue === null) {
      return;
    }
    projectDropdown.toggle(false);
    if (props.onBlur) {
      props.onBlur();
    }

    if (props.options === undefined) {
      return;
    }
    if (props.onChange === undefined) {
      return;
    }
    const optionIndex = props.options.findIndex(
      (option) => option.value === nextValue
    );
    if (optionIndex === -1) {
      return;
    }
    props.onChange(nextValue);
  };

  const selectedLabel = useMemo(() => {
    // if(props.value === undefined || props.options === undefined || props.options.length === 0) return "..." ???
    if (props.value === undefined) {
      return "...";
    }
    if (props.options === undefined) {
      return "...";
    }
    if (props.options.length === 0) {
      return "...";
    }
    const option = props.options.find((option) => option.value === props.value);
    if (option === undefined) {
      return "...";
    }
    return option.label;
  }, [props.value, props.options]);

  return (
    <div
      className="invoice__group-select invoice__group-textarea"
      data-select-wrapper
    >
      <div
        className={classNames(
          "invoice__group-selected invoice-project__group-selected",
          { active: projectDropdown.opened }
        )}
        data-select-arrow
        onClick={handleSelectorClick}
      >
        {selectedLabel}
        <img
          className="invoice__group-select-arrow"
          src="/img/icons/mini-arrow-down.svg"
          alt="mini-arrow-down"
        />
      </div>

      <ul
        className={classNames("invoice__group-list select-list", {
          active: projectDropdown.opened,
        })}
        data-select-list
      >
        {props.options !== undefined &&
          props.options.map(({ value, label, key }) => {
            return (
              <li
                className="invoice__group-item select-item"
                data-select-item
                data-value={value}
                onClick={handleOptionClick}
                key={key === undefined ? value : key}
              >
                {label}
              </li>
            );
          })}
      </ul>
      {props.error !== undefined && (
        <div className="project-error">{props.error}</div>
      )}
    </div>
  );
}
