import React from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: boolean;
  helperText?: string;
  label?: string;
}

const Input: React.FC<IProps> = ({
  className,
  error,
  helperText,
  label,
  ...restProps
}) => {
  return (
    <div className="space-y-2 w-full">
      <div className={`project-group ${error && "border border-red-500"}`}>
        <label className="project-label" htmlFor={restProps.id}>
          {label}
        </label>

        <input id={restProps.id} className={`project-input`} {...restProps} />
      </div>
      {error && <p className="text-red-500 text-[12px] pl-3">{helperText}</p>}
    </div>
  );
};

export default Input;
