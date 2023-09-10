import format from "date-fns/format";
import ru from "date-fns/locale/ru";

interface HistoryItemProps {
  status: "sent" | "received";
  address: string;
  date: Date;
}

const SHORTEN_ADDRESS_LENGTH = 14;

export function HistoryItem(props: HistoryItemProps) {
  return (
    <li className="actives-check__history-item">
      <div className="actives-check__history-info">
        <img
          className="actives-check__history-pic"
          src="/img/icons/withdrawal.svg"
          alt=""
        />
        <div className="actives-check__history-descrs">
          <p className="actives-check__history-descr">
            <span>
              <b>Пополнение:</b>
            </span>{" "}
            {formatAddress(props.address)}
          </p>
          <p className="actives-check__history-descr">
            <span>{format(props.date, "dd MMM yyyy", { locale: ru })}</span>{" "}
            <span>{format(props.date, "HH:mm:ss", { locale: ru })}</span>
          </p>
        </div>
      </div>
      <div className="actives-check__history-counts">
        <p className="actives-check__history-descr">
          <span>
            <b>+1.578697 BTC</b>
          </span>
        </p>
        <p className="actives-check__history-descr">
          {renderStatusLabel(props.status)}
        </p>
      </div>
    </li>
  );
}

function renderStatusLabel(status: "sent" | "received") {
  switch (status) {
    case "sent": {
      return "Отправлено";
    }
    case "received": {
      return "Получено";
    }
  }
}

function formatAddress(address: string) {
  if (address.length <= SHORTEN_ADDRESS_LENGTH) {
    return address;
  }
  const shortenAddress = address.slice(0, 7) + "..." + address.slice(-4);

  return shortenAddress;
}
