import { PaymentDetailsCountdown } from "../PaymentDetailsCountdown";

export interface OrderDetailsProps {
  orderId: string;
  seller: string;
  name: string;
  amountPayable: { value: number; currency: string };
  amountPrice: { value: number; currency: string };
  amountDeposit: { value: number; currency: string };
  expires: Date;
  depositTerm: number;
}

export function OrderDetails(props: OrderDetailsProps) {
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

          <div className="payment-details__label-time">12:34:56</div>
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
            Детали счета №{props.orderId}
          </h2>

          <div className="payment-details__label">
            <div className="payment-details__label-text">Истечет через:</div>

            <div className="payment-details__label-time">
              <PaymentDetailsCountdown expires={props.expires} />
            </div>
          </div>
        </div>

        <div className="payment-details__block">
          <div className="payment-details__sum">
            <div className="payment-details__sum-label">Сумма к оплате:</div>

            <div className="payment-details__sum-count">
              {props.amountPayable.value}{" "}
              <span>{props.amountPayable.currency}</span>
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
          <div className="payment-details__product">
            <div className="payment-details__product-label">
              Наименование товара или услуги:
            </div>

            <p className="payment-details__product-descr">{props.name}</p>
          </div>
        </div>

        <div className="payment-details__block">
          <div className="payment-details__row">
            <div className="payment-details__row-label">Стоимость:</div>

            <div className="payment-details__row-text">
              {props.amountPrice.value} {props.amountPrice.currency}
            </div>
          </div>
          <div className="payment-details__row-border"></div>
          <div className="payment-details__row">
            <div className="payment-details__row-label">Депозит:</div>

            <div className="payment-details__row-text">
              {props.amountDeposit.value} {props.amountDeposit.currency}{" "}
              <span>(срок: {props.depositTerm} день)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
