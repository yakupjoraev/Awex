import classNames from "classnames";
import { useDropdown } from "../../../../hooks/useDropdown";

export function LanguageSelector() {
  const langDropdown = useDropdown<HTMLDivElement>();

  const handleOptionClick = () => {
    langDropdown.toggle(false);
  };

  return (
    <div
      className="settings-profile__select"
      data-select-wrapper=""
      ref={langDropdown.containerRef}
      onClick={() => langDropdown.toggle()}
    >
      <div
        className={classNames("settings-profile__language", {
          active: langDropdown.opened,
        })}
        data-select-arrow=""
      >
        Выбор языка
        <div className="settings-profile__language-selected">
          <img src="/img/icons/Lang.svg" alt="" />

          <img src="/img/icons/arrow-down.svg" alt="arrow-down" />
        </div>
      </div>
      <ul
        className={classNames("invoice-project__group-list select-list", {
          active: langDropdown.opened,
        })}
        data-select-list=""
      >
        <li
          className="invoice-project__group-item select-item"
          data-select-item=""
          onClick={handleOptionClick}
        >
          <img src="/img/icons/Lang.svg" alt="" />
        </li>

        <li
          className="invoice-project__group-item select-item"
          data-select-item=""
        >
          <img src="/img/icons/Lang.svg" alt="" />
        </li>

        <li
          className="invoice-project__group-item select-item"
          data-select-item=""
        >
          <img src="/img/icons/Lang.svg" alt="" />
        </li>
      </ul>
    </div>
  );
}
