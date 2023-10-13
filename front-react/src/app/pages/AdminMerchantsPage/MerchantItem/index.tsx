import { ProfileData } from "@awex-api";
import classNames from "classnames";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import Tooltip from "rc-tooltip";
import { EditRolesPopover } from "../EditRolesPopover";
import { EditRolesForm } from "../EditRolesForm";
import { currencyToName } from "@constants/currency-names";

export interface MerchantItemProps {
  merchantId: string;
  profileData?: ProfileData;
  enabled?: boolean;
  roles: string[];
  existingRoles: string[];
  onToggleEnabled: (enabled: boolean) => void;
  onUpdateRoles: (roles: string[], cb: () => void) => void;
}

export function MerchantItem(props: MerchantItemProps) {
  const [expanded, setExpanded] = useState(false);
  const [rolesPopoverOpen, setRolesPopoverOpen] = useState(false);

  const handleExpandBtnClick = () => {
    setExpanded(!expanded);
  };

  const handleСopied = () => {
    toast.success("Скопировано!");
  };

  const handleNotImplemented = () => {
    toast("NOT IMPLEMENTED!");
  };

  const handleClickOutsideRolesPopover = () => {
    setRolesPopoverOpen(false);
  };

  const hanldeRolesBtnClick = () => {
    setRolesPopoverOpen(!rolesPopoverOpen);
  };

  return (
    <div
      className={classNames("admin-marchants__item", { active: expanded })}
      data-marchants-item=""
    >
      <div className="admin-marchants__item-header">
        <div className="admin-marchants__item-id">
          {`ID${props.merchantId}`}
          <p className="admin-marchants__item-id-descr">
            {props.profileData?.name || "..."}
          </p>
        </div>
        <div className="admin-marchants__item-data">
          <Tooltip overlay={() => <span>Hello</span>} placement="bottom">
            <span>10/01/23</span>
          </Tooltip>
        </div>
        <div className="admin-marchants__item-comission">0.1%</div>
        <div className="admin-marchants__item-action">
          <Tooltip
            overlay={() =>
              props.enabled ? "Заблокировать аккаунт" : "Разблокировать аккаунт"
            }
            placement="bottom"
          >
            <button
              type="button"
              data-enabled={!!props.enabled}
              className={classNames("admin-marchants__item-action-btn", {
                "admin-marchants__item-action-btn--mute": Boolean(
                  props.enabled
                ),
              })}
              onClick={() => props.onToggleEnabled(!props.enabled)}
              aria-label={
                props.enabled
                  ? "Заблокировать аккаунт"
                  : "Разблокировать аккаунт"
              }
            >
              <svg width="25" height="24" viewBox="0 0 25 24">
                <path d="M17.417 8.30396V7C17.417 4.381 15.286 2.25 12.667 2.25C10.048 2.25 7.91699 4.381 7.91699 7V8.30396C5.97899 8.56096 4.91699 9.846 4.91699 12V18C4.91699 20.418 6.24899 21.75 8.66699 21.75H16.667C19.085 21.75 20.417 20.418 20.417 18V12C20.417 9.847 19.355 8.56195 17.417 8.30396ZM12.667 3.75C14.459 3.75 15.917 5.208 15.917 7V8.25H9.41699V7C9.41699 5.208 10.875 3.75 12.667 3.75ZM18.917 18C18.917 19.577 18.244 20.25 16.667 20.25H8.66699C7.08999 20.25 6.41699 19.577 6.41699 18V12C6.41699 10.423 7.08999 9.75 8.66699 9.75H16.667C18.244 9.75 18.917 10.423 18.917 12V18ZM13.937 14C13.937 14.412 13.725 14.7601 13.417 14.9871V17C13.417 17.414 13.081 17.75 12.667 17.75C12.253 17.75 11.917 17.414 11.917 17V14.9619C11.629 14.7329 11.4319 14.395 11.4319 14C11.4319 13.31 11.987 12.75 12.677 12.75H12.687C13.377 12.75 13.937 13.31 13.937 14Z" />
              </svg>
            </button>
          </Tooltip>
          <EditRolesPopover
            isOpen={rolesPopoverOpen}
            positions={["bottom", "top", "left", "right"]}
            padding={10}
            align="center"
            renderContent={() => {
              return (
                <EditRolesForm
                  existingRoles={props.existingRoles}
                  roles={props.roles}
                  onUpdateRoles={props.onUpdateRoles}
                />
              );
            }}
            onClickOutside={handleClickOutsideRolesPopover}
          >
            <div>
              <Tooltip
                overlay={() => "Редактировать права"}
                placement={rolesPopoverOpen ? "top" : "bottom"}
              >
                <button
                  type="button"
                  className="admin-marchants__item-action-btn"
                  onClick={hanldeRolesBtnClick}
                >
                  <img src="/img/icons/pen.svg" alt="pen" />
                </button>
              </Tooltip>
            </div>
          </EditRolesPopover>
          <button
            type="button"
            className="admin-marchants__item-action-btn"
            onClick={handleNotImplemented}
          >
            <img src="/img/icons/trash.svg" alt="trash" />
          </button>
        </div>
        <div
          className="admin-marchants__item-statistic"
          onClick={handleNotImplemented}
        >
          <img src="/img/icons/chart-pie.svg" alt="chart-pie" />
          Статистика мерчанта
        </div>
        <div
          className="admin-marchants__item-btn"
          onClick={handleExpandBtnClick}
        >
          <span>{expanded ? "Скрыть" : "Подробнее"}</span>
          <img src="/img/icons/arrow-down.svg" alt="" />
        </div>
      </div>
      <div className="admin-marchants__item-content">
        <div className="admin-marchants__item-blocks">
          <div className="admin-marchants__item-block">
            <p className="admin-marchants__item-block-label">Имя</p>
            <p className="admin-marchants__item-block-text">
              {props.profileData?.name || "..."}
            </p>
            {!!props.profileData?.name &&
              renderCopyToClipboardBtn(props.profileData?.name, handleСopied)}
          </div>
          <div className="admin-marchants__item-block">
            <p className="admin-marchants__item-block-label">Валюта</p>
            <p className="admin-marchants__item-block-text">
              {props.profileData?.displayCurrency
                ? renderCurrencyName(props.profileData.displayCurrency)
                : "..."}
            </p>
            {!!props.profileData?.displayCurrency &&
              renderCopyToClipboardBtn(
                props.profileData.displayCurrency,
                handleСopied
              )}
          </div>
          <div className="admin-marchants__item-block">
            <p className="admin-marchants__item-block-label">Telegram</p>
            <p className="admin-marchants__item-block-text">
              {props.profileData?.telegram || "..."}
            </p>
            {!!props.profileData?.telegram &&
              renderCopyToClipboardBtn(
                props.profileData.telegram,
                handleСopied
              )}
          </div>
          <div className="admin-marchants__item-block">
            <p className="admin-marchants__item-block-label">E-mail</p>
            <p className="admin-marchants__item-block-text">
              {props.profileData?.email || "..."}
            </p>
            {!!props.profileData?.email &&
              renderCopyToClipboardBtn(props.profileData.email, handleСopied)}
          </div>
        </div>

        <div className="admin-applications__others">
          <div className="my-projects__items-wrapper">
            <ul className="my-projects__items">
              <li className="my-projects__item">
                <div className="my-projects__item-info">
                  <h3 className="my-projects__item-title main-title">
                    ООО ”Второй”
                  </h3>
                  <a href="#" className="my-projects__item-address">
                    https://www.gemini.com/
                  </a>
                </div>
                <div className="my-projects__item-convertion my-projects__item-convertion--row">
                  <div className="my-projects__item-for">
                    <div className="my-projects__item-text">конвертация в:</div>
                    <div className="my-projects__item-currency">
                      <img
                        className="my-projects__item-pic"
                        src="/img/actives/actives-1.png"
                        alt=""
                      />
                      <span className="my-projects__item-curr">USDT</span>
                    </div>
                  </div>
                  <div className="my-projects__item-to">
                    <div className="my-projects__item-text">
                      комиссию платит:
                    </div>
                    <div className="my-projects__item-client">клиент</div>
                  </div>
                </div>
                <div className="my-projects__item-btn">
                  <img
                    src="/img/icons/lock-grey.svg"
                    alt="lock"
                    onClick={handleNotImplemented}
                  />
                  <img
                    src="/img/icons/pen.svg"
                    alt="pen"
                    onClick={handleNotImplemented}
                  />
                  <img
                    src="/img/icons/trash.svg"
                    alt="trash"
                    onClick={handleNotImplemented}
                  />
                  <a href="#" onClick={handleNotImplemented}>
                    Статистика
                  </a>
                </div>
              </li>
              <li className="my-projects__item">
                <div className="my-projects__item-info">
                  <h3 className="my-projects__item-title main-title">
                    ООО ”Второй”
                  </h3>
                  <a href="#" className="my-projects__item-address">
                    https://www.gemini.com/
                  </a>
                </div>
                <div className="my-projects__item-convertion my-projects__item-convertion--row">
                  <div className="my-projects__item-for">
                    <div className="my-projects__item-text">конвертация в:</div>
                    <div className="my-projects__item-currency">
                      <img
                        className="my-projects__item-pic"
                        src="/img/actives/actives-1.png"
                        alt=""
                      />
                      <span className="my-projects__item-curr">USDT</span>
                    </div>
                  </div>
                  <div className="my-projects__item-to">
                    <div className="my-projects__item-text">
                      комиссию платит:
                    </div>
                    <div className="my-projects__item-client">клиент</div>
                  </div>
                </div>
                <div className="my-projects__item-btn">
                  <img
                    src="/img/icons/lock-grey.svg"
                    alt="lock"
                    onClick={handleNotImplemented}
                  />
                  <img
                    src="/img/icons/pen.svg"
                    alt="pen"
                    onClick={handleNotImplemented}
                  />
                  <img
                    src="/img/icons/trash.svg"
                    alt="trash"
                    onClick={handleNotImplemented}
                  />
                  <a href="#" onClick={handleNotImplemented}>
                    Статистика
                  </a>
                </div>
              </li>
              <li className="my-projects__item">
                <div className="my-projects__item-info">
                  <h3 className="my-projects__item-title main-title">
                    ООО ”Второй”
                  </h3>
                  <a href="#" className="my-projects__item-address">
                    https://www.gemini.com/
                  </a>
                </div>
                <div className="my-projects__item-convertion my-projects__item-convertion--row">
                  <div className="my-projects__item-for">
                    <div className="my-projects__item-text">конвертация в:</div>
                    <div className="my-projects__item-currency">
                      <img
                        className="my-projects__item-pic"
                        src="/img/actives/actives-1.png"
                        alt=""
                      />
                      <span className="my-projects__item-curr">USDT</span>
                    </div>
                  </div>
                  <div className="my-projects__item-to">
                    <div className="my-projects__item-text">
                      комиссию платит:
                    </div>
                    <div className="my-projects__item-client">клиент</div>
                  </div>
                </div>
                <div className="my-projects__item-btn">
                  <img
                    src="/img/icons/lock-grey.svg"
                    alt="lock"
                    onClick={handleNotImplemented}
                  />
                  <img
                    src="/img/icons/pen.svg"
                    alt="pen"
                    onClick={handleNotImplemented}
                  />
                  <img
                    src="/img/icons/trash.svg"
                    alt="trash"
                    onClick={handleNotImplemented}
                  />
                  <a href="#" onClick={handleNotImplemented}>
                    Статистика
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderCurrencyName(name: string): string {
  if (Object.prototype.hasOwnProperty.call(currencyToName, name)) {
    return currencyToName[name];
  }
  return name;
}

function renderCopyToClipboardBtn(text: string, handleCopy: () => void) {
  return (
    <CopyToClipboard text={text} onCopy={handleCopy}>
      <button type="button" className="admin-marchants__item-block-copy">
        <img src="/img/icons/file-grey.svg" alt="" />
      </button>
    </CopyToClipboard>
  );
}
