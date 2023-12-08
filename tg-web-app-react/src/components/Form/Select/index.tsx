import React from "react";

interface IProps {
  name: string;
  label: string;
  currentBlockActive: string;
  values: {
    id: string;
    value: string;
    name?: string;
    icon?: React.ReactNode;
  }[];
  value: string;
  onChange: (value: any) => void;
  handleChangeBlock: (value: string) => void;
  error?: boolean;
  helperText?: string;
}

const Select: React.FC<IProps> = ({
  name,
  label,
  currentBlockActive,
  values,
  value,
  onChange,
  handleChangeBlock,
  error,
  helperText,
}) => {
  return (
    <div className="invoice-input__container">
      <div
        className={`select ${error ? "invoice-input__error" : ""}`}
        data-select-wrapper
      >
        <div
          onClick={() => {
            handleChangeBlock(currentBlockActive === name ? "" : name);
          }}
          className="select__selected"
          data-select-arrow
        >
          <p>
            {label}:{" "}
            <span>
              {value
                ? name === "feePayee"
                  ? value === "true"
                    ? "Платит мерчант"
                    : "Платит клиент"
                  : value.toString().toUpperCase()
                : "-"}
            </span>
          </p>
          <img
            className="select__arrow"
            src="./img/icons/mini-arrow-down.svg"
            alt="mini-arrow-down"
          />
        </div>

        <ul
          className={`select__list select-list ${
            currentBlockActive === name ? "active" : ""
          }`}
          data-select-list
        >
          {values?.map((value) => {
            return (
              <li
                className="select__item select-item"
                data-select-item
                key={value?.id}
                onClick={() => {
                  handleChangeBlock("");
                  onChange(value?.value);
                }}
              >
                {value?.icon && value?.icon}
                <span>{value?.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
      {error && <p className="invoice-input__error-text">{helperText}</p>}
    </div>
  );
};

export default Select;
