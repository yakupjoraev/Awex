import { NumericFormat } from "react-number-format";

export interface FeeInputProps {
  id?: string;
  value?: string;
  error?: string;
  disabled?: boolean;
  inputRef?: (el: HTMLInputElement) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export function FeeInput(props: FeeInputProps) {
  return (
    <div className="admin-comission__group">
      <label className="admin-comission__group-label" htmlFor={props.id}>
        Новая комиссия:
      </label>
      <NumericFormat
        className="admin-comission__group-input"
        id={props.id}
        suffix="%"
        value={props.value}
        disabled={props.disabled}
        getInputRef={props.inputRef}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
}
