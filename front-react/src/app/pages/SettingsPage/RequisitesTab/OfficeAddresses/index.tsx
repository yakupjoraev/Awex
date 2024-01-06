import { AuthorizedService } from "@awex-api";
import React, { useEffect, useState } from "react";
import OfficeAddressList from "./OfficeAddressList";
import { NewAddressRequisiteModalContainer } from "@containers/NewAddressRequisiteModalContainer";

const OfficeAddresses: React.FC = () => {
  const [officeAddresses, setOfficeAddresses] = useState<any[]>([]);
  const [newOfficeAddressModalOpen, setNewOfficeAddressModalOpen] =
    useState<boolean>(false);

  const handleCloseNewOfficeAddress = () => {
    setNewOfficeAddressModalOpen(false);
  };

  useEffect(() => {
    AuthorizedService.getOfficeAddresses().then((res) => {
      setOfficeAddresses(res.list);
    });
  }, [newOfficeAddressModalOpen]);

  return (
    <div className="settings-requisites__list-wrapper">
      <div className="settings-requisites__header">
        <h3 className="settings-requisites__title">
          Мои адреса для доставки наличных
        </h3>

        <button
          className="settings-requisites__added"
          onClick={() => setNewOfficeAddressModalOpen(true)}
        >
          Добавить адрес
        </button>
      </div>

      {officeAddresses?.length > 0 ? (
        <OfficeAddressList officeAddresses={officeAddresses} />
      ) : (
        <p className="settings-requisites__empty-list-text">
          Нет доступных адресов для доставки
        </p>
      )}

      <NewAddressRequisiteModalContainer
        open={newOfficeAddressModalOpen}
        onClose={handleCloseNewOfficeAddress}
      />
    </div>
  );
};

export default OfficeAddresses;
