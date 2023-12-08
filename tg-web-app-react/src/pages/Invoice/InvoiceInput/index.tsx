import React from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  helperText?: string;
  rightText?: string;
}

const InvoiceInput: React.FC<IProps> = ({
  label,
  error,
  helperText,
  rightText,
  ...props
}) => {
  return (
    <div className="invoice-input__container">
      <div className={`invoice-input ${error && "invoice-input__error"}`}>
        <div className="invoice-input__main">
          <label className="invoice-input__label" htmlFor={props.id}>
            {label}
          </label>
          <input className="invoice-input__input" id={props.id} {...props} />
        </div>
        {rightText && (
          <div className="invoice-input__right">
            <p className="invoice-input__text">{rightText}</p>
          </div>
        )}
      </div>
      <p className="invoice-input__error-text">{helperText}</p>
    </div>
  );
};

export default InvoiceInput;
