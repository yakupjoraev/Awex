import { PaymentDetailsCountdown } from "../PaymentDetailsCountdown";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-hot-toast";

export interface CryptoPaymentDetailsProps {
  orderId: string;
  seller: string;
  payment: { value: number; currency: string };
  commission: { value: number; currency: string };
  paymentAddress: string;
  network: string;
  expires: Date;
}

export function CryptoPaymentDetails(props: CryptoPaymentDetailsProps) {
  const handleCopied = () => {
    toast("Скопировано!");
  };

  return (
    <div className="payment-details">
      <a href="#" className="payment-details__logo">
        <img
          className="payment-details__logo-img"
          src="/img/icons/logo-2.svg"
          alt=""
        />
      </a>

      <div className="payment-details__block payment-details__block--main">
        <h2 className="payment-details__title main-title">
          Детали счета №{props.orderId}
        </h2>
        <div className="payment-details__label">
          <div className="payment-details__label-text">Истечет через:</div>

          <div className="payment-details__label-time">
            <PaymentDetailsCountdown expires={props.expires} />
          </div>
        </div>

        <img
          className="payment-details__pic"
          src="/img/icons/info.svg"
          alt=""
          data-payment-details-btn=""
        />
      </div>

      <div
        className="payment-details__block-wrapper"
        data-payment-details-content=""
      >
        <div className="payment-details__block">
          <h2 className="payment-details__title main-title">
            Детали счета №${props.orderId}
          </h2>
          <div className="payment-details__label">
            <div className="payment-details__label-text">Истечет через:</div>

            <div className="payment-details__label-time">
              <PaymentDetailsCountdown expires={props.expires} />
            </div>
          </div>
        </div>

        <div className="payment-details__block">
          <div className="payment-details__salesman">
            <div className="payment-details__salesman-label">Продавец:</div>

            <div className="payment-details__salesman-name">{props.seller}</div>
          </div>
        </div>

        <div className="payment-details__block">
          <div className="payment-details__sum">
            <div className="payment-details__sum-label">Сумма к оплате:</div>

            <div className="payment-details__sum-count">
              {props.payment.value} <span>{props.payment.currency}</span>
              <CopyToClipboard
                text={props.payment.value.toString()}
                onCopy={handleCopied}
              >
                <img src="/img/icons/file.svg" alt="" />
              </CopyToClipboard>
            </div>
          </div>

          <div className="payment-details__commission">
            <div className="payment-details__commission-label">
              в том числе комиссия:
            </div>

            <p className="payment-details__commission-sum">
              {props.commission.value}
              <span>{props.commission.currency}</span>
            </p>
          </div>

          <div className="payment-details__qr">
            <img
              className="payment-details__qr-img"
              src="/img/payment-qr.png"
              alt=""
            />

            <p className="payment-details__qr-descr">
              Отправьте точную сумму по указанному адресу. После совершения
              оплаты нажмите на кнопку «Я оплатил» для проверки транзакции.
            </p>
          </div>

          <div className="payment-details__group my-projects__group project-group">
            <div className="my-projects__label project-label">Адрес:</div>

            <p className="project-label__text">{props.paymentAddress}</p>

            <CopyToClipboard text={props.paymentAddress} onCopy={handleCopied}>
              <img
                className="payment-details__group-copy"
                src="/img/icons/file.svg"
                alt=""
              />
            </CopyToClipboard>
          </div>

          <div className="payment-details__group my-projects__group project-group">
            <div className="my-projects__label project-label">Сеть:</div>

            <p className="project-label__text">{props.network}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
