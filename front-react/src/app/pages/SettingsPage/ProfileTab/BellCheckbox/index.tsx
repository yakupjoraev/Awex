import classNames from "classnames";

export interface BellCheckboxProps<T extends string> {
  value: boolean;
  onChange: (value: boolean) => void;
}

export function BellCheckbox<T extends string>(props: BellCheckboxProps<T>) {
  const handleBtnClick = () => {
    // props.onChange(!props.value);

    alert('В Разработке!')

  };

  return (
    <div
      className={classNames("settings-profile__included-edit", {
        checked: props.value,
      })}
      role="checkbox"
      aria-checked={props.value ? "true" : "false"}
      tabIndex={0}
      onClick={handleBtnClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
      >
        <path
          d="M12.0002 22.25C11.0122 22.25 10.1242 21.737 9.6222 20.878C9.4142 20.52 9.5342 20.061 9.8922 19.852C10.2482 19.644 10.7082 19.764 10.9182 20.122C11.3772 20.909 12.6232 20.909 13.0822 20.122C13.2912 19.764 13.7512 19.644 14.1082 19.852C14.4662 20.06 14.5872 20.52 14.3782 20.878C13.8762 21.737 12.9882 22.25 12.0002 22.25ZM20.6752 18.825C20.8002 18.565 20.7652 18.257 20.5862 18.032C20.5672 18.009 18.7452 15.689 18.7452 13V9.495C18.7452 5.776 15.7192 2.75 12.0002 2.75C8.2812 2.75 5.2552 5.776 5.2552 9.495V13C5.2552 15.689 3.4332 18.009 3.4142 18.032C3.2352 18.257 3.2002 18.566 3.3252 18.825C3.4502 19.084 3.7122 19.25 4.0002 19.25H20.0002C20.2882 19.25 20.5502 19.084 20.6752 18.825ZM6.7552 13V9.495C6.7552 6.603 9.1082 4.25 12.0002 4.25C14.8922 4.25 17.2452 6.603 17.2452 9.495V13C17.2452 14.936 17.9952 16.658 18.6132 17.75H5.3862C6.0052 16.658 6.7552 14.936 6.7552 13Z"
          fill="#D1D1D1"
        ></path>
      </svg>
    </div>
  );
}
