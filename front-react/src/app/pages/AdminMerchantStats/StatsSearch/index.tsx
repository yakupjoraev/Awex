import classNames from "classnames";
import { useState } from "react";

export interface StatsSearchProps {
  value: string;
  onChange?: (value: string) => void;
  onInteractive?: (edit: boolean) => void;
}

export function StatsSearch(props: StatsSearchProps) {
  const [focused, setFocused] = useState(false);

  const handleSearchInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;
    if (props.onChange !== undefined) {
      props.onChange(value);
    }
  };

  const handleFocus = () => {
    setFocused(true);
    if (props.onInteractive) {
      props.onInteractive(true);
    }
  };

  const handleBlur = () => {
    setFocused(false);
    if (props.onInteractive) {
      props.onInteractive(false);
    }
  };

  return (
    <div className="settings-security__search deposits__filter-search search-group">
      <input
        className="deposits__filter-src search-input"
        type="search"
        placeholder="Поиск"
        value={props.value}
        onChange={handleSearchInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <img
        className="deposits__filter-search-img search-img"
        src="/img/icons/search.svg"
        alt="Поиск"
      />
      <button
        className={classNames(
          "search-apply-btn",
          focused && "search-apply-btn--active"
        )}
        type="button"
      >
        Применить
      </button>
    </div>
  );
}
