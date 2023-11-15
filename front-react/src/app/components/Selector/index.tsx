import classNames from "classnames"
import { useEffect, useMemo, useState } from "react"
import { useDropdown } from "../../hooks/useDropdown"

const PLACEHOLDER_DEFAULT = '---'

export interface SelectorOptions {
  label: string
  value: string
}

export interface SelectorOpts {
  className?: string
  options: SelectorOptions[]
  value: string | undefined
  placeholder?: string
  disabled?: boolean
  appendBottom?: JSX.Element
  onChange: (value: string) => void
}

export function Selector(props: SelectorOpts) {
  const dropdown = useDropdown<HTMLDivElement>()
  const [placeholder, sePlaceholder] = useState<string>(PLACEHOLDER_DEFAULT)

  useEffect(() => {
    sePlaceholder(props.placeholder ? props.placeholder : PLACEHOLDER_DEFAULT)
  }, [props.placeholder])
  
  useEffect(() => {
    dropdown.toggle(false)
  }, [props.disabled])

  const handleSelectClick = () => {
    if (props.disabled || (props.options.length === 0 && !props.appendBottom))  return
    dropdown.toggle()
  }

  const handleOptionClick = (value: string) => {
    if (props.disabled || value === null) return
    props.onChange(value)
    dropdown.toggle(false)
  }

  const valueToLabel = useMemo(
    () => new Map(props.options.map((option) => [option.value, option.label])),
    [props.options]
  )

  return (
    <div className={classNames("my-projects__group-select", props.className)}
      data-select-wrapper
      ref={dropdown.containerRef}
    >
      <div className={classNames("my-projects__group-selected",
          Boolean(props.disabled) && "my-projects__group-selected--disabled"
        )}
        data-select-arrow
        onClick={handleSelectClick}
      >
        {valueToLabel.get(props.value || '') || placeholder}
        <img className={classNames("my-projects__group-select-arrow", {
            active: dropdown.opened,
          })}
          src="/img/icons/mini-arrow-down.svg"
          alt="mini-arrow-down"
        />
      </div>

      <ul className={classNames("my-projects__group-list select-list", {
          active: dropdown.opened,
        })}
        data-select-list
      >
        {props.options.map(({ label, value }) => (
          <li className="my-projects__group-item select-item"
            data-select-item
            onClick={() => handleOptionClick(value)}
            key={value}
          >
            {label}
          </li>
        ))}
        {props.appendBottom}
      </ul>
    </div>
  )
}
