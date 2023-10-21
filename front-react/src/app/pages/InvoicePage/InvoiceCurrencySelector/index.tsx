import { SelectCurrencyModal } from "@components/SelectCurrenyModal";
import { useState } from "react";
import usePortal from "react-useportal";

export interface InvoiceCurrencySelectorProps {
  loading?: boolean;
  currency?: string;
  currencies?: { currency: string; name?: string; rate?: string }[];
  onChange?: (value: string) => void;
}

export function InvoiceCurrencySelector(props: InvoiceCurrencySelectorProps) {
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
      <div
        className="about-deposit__generation-currency open-modal-btn"
        onClick={handleSelectorClick}
      >
        <div className="about-deposit__generation-curr">
          {props.currency ? props.currency.toUpperCase() : "..."}
        </div>

        <img
          className="about-deposit__generation-img"
          src="/img/icons/arrow-down.svg"
          alt="arrow-down"
        />
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
