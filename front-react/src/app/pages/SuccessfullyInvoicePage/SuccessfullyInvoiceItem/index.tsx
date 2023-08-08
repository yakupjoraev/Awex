import React from "react";
import classNames from "classnames";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-hot-toast";

export interface SuccessfullyInvoiceItemProps {
  status: "paid" | "expired" | "pending";
  code: string;
  onShowQr: (code: string) => void;
}

export function SuccessfullyInvoiceItem(props: SuccessfullyInvoiceItemProps) {
  const handleСodeCopy = () => {
    toast("Скопировано!");
  };

  const handleQrBtnClick = () => {
    props.onShowQr(props.code);
  };

  let statusLabel;
  switch (props.status) {
    case "paid": {
      statusLabel = "Оплачен";
      break;
    }
    case "expired": {
      statusLabel = "Истек";
      break;
    }
    case "pending": {
      statusLabel = "В ожидании";
      break;
    }
  }

  return (
    <li className="successfully-invoice__item">
      <div className="successfully-invoice__item-info">
        <div
          className={classNames(
            "successfully-invoice__item-status",
            props.status
          )}
        >
          {statusLabel}
        </div>

        <div className="successfully-invoice__item-code">{props.code}</div>

        <CopyToClipboard text={props.code} onCopy={handleСodeCopy}>
          <img
            className="successfully-invoice__item-copy"
            src="/img/icons/copy.svg"
            alt="copy"
          />
        </CopyToClipboard>

        <img
          className="successfully-invoice__item-scan"
          src="/img/icons/scan-qr.svg"
          alt="scan qr"
          onClick={handleQrBtnClick}
        />
      </div>

      <a className="successfully-invoice__item-link second-btn" href="#">
        Поделиться
      </a>
    </li>
  );
}
