import { ApiError, CommonService } from "@awex-api";
import { InternalErrorMessage } from "@components/InternalErrorMessage";
import { LdsSpinner } from "@components/LdsSpinner";
import { NotFoundErrorMessage } from "@components/NotFoundErrorMessage";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

type OrderError = { type: "unknown" | "not_found" };

interface OrderVM {
  amount: number;
  currency?: string | undefined;
  chain?: string | undefined;
  address?: string | undefined;
}

export function PaymentPage() {
  const { uniqueId } = useParams();

  const [order, setOrder] = useState<OrderVM | null>(null);
  const [orderLoading, setOrderLoading] = useState<boolean>(false);
  const [orderError, setOrderError] = useState<OrderError | null>(null);

  useEffect(() => {
    if (uniqueId === undefined) {
      setOrder(null);
      setOrderLoading(false);
      setOrderError({ type: "not_found" });
      return;
    }

    setOrderLoading(true);
    CommonService.orderPaymentGet(uniqueId)
      .then((response) => {
        const amount = response.amount;
        const currency = response.paymentData?.currency;
        const chain = response.paymentData?.chain;
        const address = response.paymentData?.address;
        if (
          amount === undefined ||
          currency === undefined ||
          chain === undefined ||
          address === undefined
        ) {
          setOrder(null);
          setOrderError({ type: "not_found" });
        } else {
          setOrder({
            amount,
            currency,
            chain,
            address,
          });
        }
      })
      .catch((error) => {
        if (error instanceof ApiError && error.status === 404) {
          setOrder(null);
          setOrderError({ type: "not_found" });
        } else {
          console.error(error);
          setOrder(null);
          setOrderError({ type: "unknown" });
        }
      })
      .finally(() => {
        setOrderLoading(false);
      });
  }, [uniqueId]);

  if (orderLoading) {
    return (
      <main className="main">
        <Helmet title="Детали счета" />
        <div className="wrapper wrapper-spinner">
          <LdsSpinner />
        </div>
      </main>
    );
  }
  if (orderError) {
    if (orderError.type === "not_found") {
      return (
        <main className="main">
          <Helmet title="Счет не найден" />
          <div className="wrapper">
            <NotFoundErrorMessage />
          </div>
        </main>
      );
    } else {
      return (
        <main className="main">
          <Helmet title="Внутренняя ошибка" />
          <div className="wrapper">
            <InternalErrorMessage />
          </div>
        </main>
      );
    }
  }

  return (
    <main className="main">
      <Helmet title="Загружено" />
      <div className="wrapper wrapper-spinner">
        <pre>{JSON.stringify(order, null, 2)}</pre>
      </div>
    </main>
  );
}
