import { useNavigate, useParams } from "react-router-dom";
import { ConfirmCryptoPaymentForm } from "./ConfirmCryptoPaymentForm";
import { CryptoPaymentDetails } from "./CryptoPaymentDetails";
import { OrderDetails } from "./OrderDetails";
import { PaymentMethodForm } from "./PaymentMethodForm";
import { WaitForCrypto } from "./WaitForCrypto";

const order = {
  orderId: "12345678",
  seller: "ООО “Первый”",
  name: "Аренда машины гос.номер А123АА123 на 10 дней (марка, модель и другая информация)",
  amountPayable: { value: 3500, currency: "AED" },
  amountPrice: { value: 2500, currency: "AED" },
  amountDeposit: { value: 1000, currency: "AED" },
  depositTerm: 21,
  expires: new Date(Date.now() + 13 * 60 * 60 * 1000),
};

const cryptoPayment = {
  orderId: "12345678",
  seller: "ООО “Первый”",
  payment: { value: 9657.45, currency: "USDT" },
  commission: { value: 7.45, currency: "USDT" },
  paymentAddress: "238894dhdfm83838nskfjsf90393732nfk",
  network: "TRC20",
  expires: new Date(Date.now() + 13 * 60 * 60 * 1000),
};

export function PaymentCryptoPage() {
  const navigate = useNavigate();
  const params = useParams();

  const stage = params.stage;

  if (stage !== "stage1" && stage !== "stage2" && stage !== "stage3") {
    navigate("/payment-crypto/stage1");
    return null;
  }

  return (
    <main className="main">
      <div className="wrapper-payment">
        <div className="payment">
          <a href="#" className="payment__logo">
            <img
              className="payment__logo-img"
              src="/img/icons/logo-2.svg"
              alt=""
            />
          </a>
          {stage === "stage1" && <PaymentMethodForm />}
          {stage === "stage2" && <ConfirmCryptoPaymentForm />}
          {stage === "stage3" && <WaitForCrypto />}
        </div>
        {stage === "stage1" && <OrderDetails {...order} />}
        {stage === "stage2" && <CryptoPaymentDetails {...cryptoPayment} />}
        {stage === "stage3" && <CryptoPaymentDetails {...cryptoPayment} />}
      </div>
    </main>
  );
}
