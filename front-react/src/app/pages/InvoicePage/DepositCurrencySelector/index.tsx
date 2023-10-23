import { useEffect, useMemo } from "react";
import { useDropdown } from "../../../hooks/useDropdown";
import classNames from "classnames";

export interface DepositCurrencySelectorProps {
  loading?: boolean;
  currency?: string;
  disabled?: boolean;
  currencies?: { currency: string; name?: string }[];
  onChange?: (value: string) => void;
}

export function DepositCurrencySelector(props: DepositCurrencySelectorProps) {
  const currencyDropdown = useDropdown<HTMLDivElement>();

  useEffect(() => {
    currencyDropdown.toggle(false);
  }, [props.loading]);

  const hanldeSelectorClick = () => {
    if (props.disabled) {
      return;
    }
    currencyDropdown.toggle();
  };

  const hanldeOptionClick = (
    ev: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    currencyDropdown.toggle(false);

    const currency = ev.currentTarget.getAttribute("data-currency");
    if (currency === null) {
      return;
    }

    let optionIndex = -1;
    if (props.currencies) {
      optionIndex = props.currencies.findIndex(
        (option) => option.currency === currency
      );
    }
    if (optionIndex === -1) {
      return;
    }

    if (props.onChange) {
      props.onChange(currency);
    }
  };

  const selectorLabel = useMemo(() => {
    if (props.currency === undefined || props.currencies === undefined) {
      return "Выберете валюту";
    }
    const option = props.currencies.find(
      (option) => option.currency === props.currency
    );
    if (option === undefined) {
      return "Выберете валюту";
    }
    return option.name || option.currency.toUpperCase();
  }, [props.currency, props.currencies]);

  return (
    <div
      className={classNames(
        "invoice-project__group-select",
        props.disabled && "invoice-project__group-select--disabled"
      )}
      data-select-wrapper
      ref={currencyDropdown.containerRef}
    >
      <div
        className={classNames("invoice-project__group-selected", {
          active: currencyDropdown.opened,
          "invoice-project__group-selected--disabled": props.disabled,
        })}
        data-select-arrow
        onClick={hanldeSelectorClick}
      >
        {props.loading ? <i>Загрузка...</i> : selectorLabel}
        <svg
          className="invoice-project__group-select-arrow"
          width="5"
          height="4"
          viewBox="0 0 5 4"
        >
          <path d="M2.00017 3.68404L0.00016737 0.31604L0.976168 0.31604L2.24017 2.40404L3.53617 0.31604L4.47217 0.31604L2.44017 3.68404L2.00017 3.68404Z" />
        </svg>
      </div>

      <ul
        className={classNames("invoice-project__group-list select-list", {
          active: currencyDropdown.opened,
        })}
        data-select-list
      >
        {props.currencies !== undefined &&
          props.currencies.map((currency) => {
            return (
              <li
                className="invoice-project__group-item select-item"
                data-select-item
                data-currency={currency.currency}
                onClick={hanldeOptionClick}
                key={currency.currency}
              >
                {currency.name || currency.currency.toUpperCase()}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
