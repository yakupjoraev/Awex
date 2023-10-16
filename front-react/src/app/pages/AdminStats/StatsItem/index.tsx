import { ProfileData } from "@awex-api";
import classNames from "classnames";
import { useState } from "react";
import toast from "react-hot-toast";
import Tooltip from "rc-tooltip";
import { EditRolesPopover } from "@components/admin/EditRolesPopover";
import { EditRolesForm } from "@components/admin/EditRolesForm";
import { Link } from "react-router-dom";
import {
  ADMIN_MERCHANTS_ROUTE,
  ADMIN_MERCHANT_STATS_SUBROUTE,
} from "@constants/path-locations";
import { QUERY_PARAM_NAVBACK } from "@constants/common-params";
import { PAGE_ID_ADMIN_MERCHANTS } from "@constants/pages";

export interface MerchantItemProps {
  merchantId: string;
  profileData?: ProfileData;
  enabled?: boolean;
  roles: string[];
  existingRoles: string[];
  fee?: number;
  onToggleEnabled: (enabled: boolean) => void;
  onUpdateRoles: (roles: string[], cb: () => void) => void;
}

export function StatsItem(props: MerchantItemProps) {
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
    <div className="admin-marchants__item" data-marchants-item="">
      <div className="admin-marchants__item-header">
        <div className="admin-marchants__item-id">
          {`ID${props.merchantId}`}
          <p className="admin-marchants__item-id-descr">
            {props.profileData?.name || "..."}
          </p>
        </div>
        <div className="admin-marchants__item-data">
          <span>10/01/23</span>
        </div>
        <div className="admin-marchants__item-comission">
          {props.fee === undefined ? "..." : props.fee.toString() + "%"}
        </div>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10.119 16.064c2.293-.53 4.427-.994 3.394-2.946-3.147-5.941-.835-9.118 2.488-9.118 3.388 0 5.643 3.299 2.488 9.119-1.065 1.964 1.149 2.427 3.393 2.946 1.985.458 2.118 1.428 2.118 3.107l-.003.828h-1.329c0-2.089.083-2.367-1.226-2.669-1.901-.438-3.695-.852-4.351-2.304-.239-.53-.395-1.402.226-2.543 1.372-2.532 1.719-4.726.949-6.017-.902-1.517-3.617-1.509-4.512-.022-.768 1.273-.426 3.479.936 6.05.607 1.146.447 2.016.206 2.543-.66 1.445-2.472 1.863-4.39 2.305-1.252.29-1.172.588-1.172 2.657h-1.331c0-2.196-.176-3.406 2.116-3.936zm-10.117 3.936h1.329c0-1.918-.186-1.385 1.824-1.973 1.014-.295 1.91-.723 2.316-1.612.212-.463.355-1.22-.162-2.197-.952-1.798-1.219-3.374-.712-4.215.547-.909 2.27-.908 2.819.015.935 1.567-.793 3.982-1.02 4.982h1.396c.44-1 1.206-2.208 1.206-3.9 0-2.01-1.312-3.1-2.998-3.1-2.493 0-4.227 2.383-1.866 6.839.774 1.464-.826 1.812-2.545 2.209-1.49.345-1.589 1.072-1.589 2.334l.002.618z" />
                  </svg>
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
        <Link
          className="admin-marchants__item-statistic"
          to={`${ADMIN_MERCHANTS_ROUTE}/${props.merchantId}${ADMIN_MERCHANT_STATS_SUBROUTE}?${QUERY_PARAM_NAVBACK}=${PAGE_ID_ADMIN_MERCHANTS}`}
        >
          <img src="/img/icons/chart-pie.svg" alt="chart-pie" />
          Статистика мерчанта
        </Link>
        <div
          className="admin-marchants__item-btn"
          onClick={handleNotImplemented}
        >
          <span>Подробнее</span>
          <img src="/img/icons/arrow-down.svg" alt="" />
        </div>
      </div>
    </div>
  );
}
