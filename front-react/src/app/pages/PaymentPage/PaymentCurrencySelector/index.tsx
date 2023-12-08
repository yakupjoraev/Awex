import { SelectCurrencyModal } from "@components/SelectCurrenyModal";
import { useState } from "react";
import usePortal from "react-useportal";

export interface PaymentCurrencySelectorProps {
  loading?: boolean;
  currency?: string;
  currencies?: { currency: string; name?: string; rate?: string; chain?: string; }[];
  onChange: (value: string, chain?: string | null) => any;
}

export function PaymentCurrencySelector(props: PaymentCurrencySelectorProps) {
  const { Portal } = usePortal();
  const [opened, setOpened] = useState(false);

  const handleSelectorClick = () => {
    setOpened(true);
  };

  const handleModalClose = () => {
    setOpened(false);
  };

  return (
    <>
      <div className="about-deposit__generation-curr"
        onClick={handleSelectorClick}
      >
        {/* <img src={`/img/${props.currency?.toLowerCase()}.png`} alt="" /> */}
        <img src={`/img/usdt.png`} alt="" />
        {props.currency ? props.currency.toUpperCase() : "..."}
      <img className="about-deposit__generation-img" src="/img/icons/arrow-down.svg" alt="arrow-down" />
      </div>

      <Portal>
        <SelectCurrencyModal
          open={opened}
          currencies={props.currencies}
          loading={props.loading}
          onSelect={props.onChange}
          onClose={handleModalClose}
        />
      </Portal>
    </>
  );
}
