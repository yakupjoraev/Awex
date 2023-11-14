import { useEffect, useMemo } from "react"
import classNames from "classnames";
import { useDropdown } from "../../hooks/useDropdown"

export interface SelectorSimpleOptions {
    label: string
    value: string
}

export interface SelectorSimpleProps {
    disabled?: boolean
    options: SelectorSimpleOptions[]
    value: string | undefined
    onChange: (value: string) => void
}

export function SelectorSimple(props: SelectorSimpleProps) {
    const dropdown = useDropdown<HTMLDivElement>()

    useEffect(() => {
        dropdown.toggle(false)
    }, [props.disabled])

    const handleSelectClick = () => {
        if (props.disabled || !props.options.length) return
        dropdown.toggle()
    }

    const handleOptionClick = (value: string) => {
        if (props.disabled || value === null)  return
        props.onChange(value)
        dropdown.toggle(false)
    }

    const valueToLabel = useMemo(
        () => new Map(props.options.map((option) => [option.value, option.label])),
        [props.options]
    )

  return (
    <div className="about-deposit__generation-select about-deposit__generation-selected--not-reverse about-deposit__generation-selected--white"
        ref={dropdown.containerRef}
    >
        <div
            className={classNames("about-deposit__generation-selected", {
                active: dropdown.opened,
            })}
            onClick={handleSelectClick}
        >
            <div className="about-deposit__generation-info">
                <h5 className="about-deposit__generation-title">
                    {props.value ? valueToLabel.get(props.value) : "---"}
                </h5>
            </div>

            <div className="about-deposit__generation-currency">
                <img className="about-deposit__generation-img" src="/img/icons/arrow-down.svg" alt="arrow-down" />
            </div>
        </div>

        <ul
            className={classNames("about-deposit__generation-list", {
                active: dropdown.opened,
            })}
        >
            {props.options.map(({ label, value }) => (
                <li
                    className="about-deposit__generation-item"
                    key={value}
                    onClick={() => handleOptionClick(value)}
                >
                    {label}
                </li>
                )
            )}
        </ul>
    </div>
  )
}
