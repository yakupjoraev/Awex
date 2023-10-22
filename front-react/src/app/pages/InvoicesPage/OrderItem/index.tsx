import classNames from "classnames";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-hot-toast";

export interface OrderItemProps {
  status: "wait" | "paid" | "expired";
  orderId: string;
  onShowQr: (orderId: string) => void;
}

export function OrderItem(props: OrderItemProps) {
  const handleСodeCopy = () => {
    toast.success("Скопировано!");
  };

  const handleQrBtnClick = () => {
    props.onShowQr(props.orderId);
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
    case "wait": {
      statusLabel = "В ожидании";
      break;
    }
  }

  const paymentLink =
    (typeof window === "undefined"
      ? "http://example.com"
      : window.location.origin) +
    "/payment/" +
    props.orderId;

  return (
    <li className="successfully-invoice__item">
      <div className="successfully-invoice__item-info">
        <div
          className={classNames(
            "successfully-invoice__item-status",
            getStatusBadgeModifier(props.status)
          )}
        >
          {statusLabel}
        </div>

        <a
          className="successfully-invoice__item-code"
          href={paymentLink}
          target="_blank"
        >
          {props.orderId}
        </a>

        <CopyToClipboard text={paymentLink} onCopy={handleСodeCopy}>
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

function getStatusBadgeModifier(status: "wait" | "paid" | "expired"): string {
  switch (status) {
    case "wait": {
      return "pending";
    }
    case "paid": {
      return "paid";
    }
    case "expired": {
      return "expired";
    }
  }
}
