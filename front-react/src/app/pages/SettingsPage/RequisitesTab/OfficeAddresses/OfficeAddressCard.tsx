import { SupportingDocumentsForOfficeModalContainer } from "@containers/SupportingDocumentsForOfficeModalContainer";
import React, { useState } from "react";

interface IProps {
  officeAddress: any;
}

const OfficeAddressCard: React.FC<IProps> = ({ officeAddress }) => {
  const [supportingDocumentsModalOpen, setSupportingDocumentsModalOpen] =
    useState<boolean>(false);

  const handleCloseSupportingDocuments = () => {
    setSupportingDocumentsModalOpen(false);
  };

  return (
    <>
      <li key={officeAddress.id} className="settings-requisites__item">
        <div className="settings-requisites__item-block">
          {officeAddress?.data?.companyName}
        </div>

        <div className="settings-requisites__item-border"></div>

        <div className="settings-requisites__item-block settings-requisites__item--addresses">
          {officeAddress?.address}
        </div>

        <button
          type="button"
          className="settings-requisites__item-btn third-btn"
          onClick={() => setSupportingDocumentsModalOpen(true)}
        >
          Подтверждающие документы
        </button>
      </li>

      <SupportingDocumentsForOfficeModalContainer
        addressId={officeAddress?.id}
        address={officeAddress?.address}
        companyName={officeAddress?.data?.companyName}
        open={supportingDocumentsModalOpen}
        onClose={handleCloseSupportingDocuments}
      />
    </>
  );
};

export default OfficeAddressCard;
