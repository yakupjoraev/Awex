import { LdsSpinner } from "@components/LdsSpinner";
import { Helmet } from "react-helmet-async";

export function PaymentPage() {
  return (
    <main className="main">
      <Helmet title="Детали счета" />
      <div className="wrapper wrapper-spinner">
        <LdsSpinner />
      </div>
    </main>
  );
}
