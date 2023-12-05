import classNames from "classnames"
import { useEffect, useMemo, useRef, useState } from "react"

export interface HistoryFilterSelectProps {
  className?: string
  label: string
  value: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
}

export function HistoryFilterSelect(props: HistoryFilterSelectProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dropdownOpened, setDropdownOpened] = useState(false)

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
    }

    document.addEventListener("click", handleDocumentClick)

    return () => {
      document.removeEventListener("click", handleDocumentClick)
    }
  }, [dropdownOpened])

  const currentOption = useMemo(() => {
    return props.options.find((option) => option.value === props.value) || null
  }, [props.value, props.options])

  const handleOptionClick = (value: string) => {
    setDropdownOpened(false)

    if (value !== null) {
      props.onChange(value)
    }
  }

  return (
    <div
      className={classNames("history-operations__select", props.className)}
      ref={containerRef}
      onClick={() => void setDropdownOpened(!dropdownOpened)}
    >
      <div className="history-operations__select-label">{props.label}</div>

      <div className="history-operations__select-selected">
        {currentOption ? currentOption.label : " "}
      </div>

      <ul
        className={classNames("history-operations__list select-list", {
          active: dropdownOpened,
        })}
        data-select-list=""
      >
        {props.options.map((option) => {
          return (
            <li
              className="history-operations__item select-item"
              onClick={() => handleOptionClick(option.value)}
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
