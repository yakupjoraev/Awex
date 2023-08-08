import React, { useState } from "react";
import { DepositsFiltersSelect } from "../../components/DepositsFilterSelect";
import { SuccessfullyInvoiceItem } from "./SuccessfullyInvoiceItem";
import { QrModal } from "../../components/QrModal";
import { Helmet } from "react-helmet-async";

const projectFilterOptions = [
  { value: "0", label: "Все" },
  { value: "1", label: "Все" },
  { value: "2", label: "Все" },
];

const statusFilterOptions = [
  { value: "0", label: "Ожидает действий" },
  { value: "1", label: "Ожидает действий" },
  { value: "2", label: "Ожидает действий" },
];

const dateFilterOptions = [
  { value: "0", label: "01/06/2022-13/06/2023" },
  { value: "1", label: "01/06/2022-13/06/2023" },
  { value: "2", label: "01/06/2022-13/06/2023" },
];

const invoices: {
  id: string;
  code: string;
  status: "paid" | "expired" | "pending";
}[] = [
  { id: "0", code: "TR45hy67jid", status: "paid" },
  { id: "1", code: "TR45hy67jid", status: "expired" },
  { id: "2", code: "TR45hy67jid", status: "pending" },
];

export function SuccessfullyInvoicePage() {
  const [projectFilter, setProjectFilter] = useState("0");
  const [statusFilter, setStatusFilter] = useState("0");
  const [dateFilter, setDateFilter] = useState("0");
  const [qrModalOpened, setQrModalOpened] = useState(false);

  const handleProjectFilterChange = (value: string) => {
    setProjectFilter(value);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  const handleDateFilterChange = (value: string) => {
    setDateFilter(value);
  };

  const handleShowQr = () => {
    setQrModalOpened(true);
  };

  const handleCloseQrModal = () => {
    setQrModalOpened(false);
  };

  return (
    <section className="successfully-invoice">
      <Helmet title="Счета" />
      <div className="successfully-invoice__header">
        <h1 className="successfully-invoice__title main-title">Счета</h1>

        <img
          className="successfully-invoice__header-img"
          src="./img/icons/tooltip.svg"
          alt="tooltip"
        />
      </div>

      <div className="deposits__filters">
        <DepositsFiltersSelect
          label="Проект"
          options={projectFilterOptions}
          value={projectFilter}
          onChange={handleProjectFilterChange}
        />

        <DepositsFiltersSelect
          label="Статус"
          options={statusFilterOptions}
          value={statusFilter}
          onChange={handleStatusFilterChange}
        />

        <DepositsFiltersSelect
          className="deposits__filter-select deposits__filter-select--datapicker"
          label="Дата"
          options={dateFilterOptions}
          value={dateFilter}
          onChange={handleDateFilterChange}
        />
      </div>

      <ul className="successfully-invoice__list">
        {invoices.map((invoice) => {
          return (
            <SuccessfullyInvoiceItem
              code={invoice.code}
              status={invoice.status}
              key={invoice.id}
              onShowQr={handleShowQr}
            />
          );
        })}
      </ul>
      <QrModal open={qrModalOpened} onClose={handleCloseQrModal} />
    </section>
  );
}
