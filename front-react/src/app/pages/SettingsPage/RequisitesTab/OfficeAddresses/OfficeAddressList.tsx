import React from "react";
import OfficeAddressCard from "./OfficeAddressCard";

interface IProps {
  officeAddresses: any[];
}

const OfficeAddressList: React.FC<IProps> = ({ officeAddresses }) => {
  return (
    <ul className="settings-requisites__list settings-requisites__list--addresses">
      {officeAddresses?.map((officeAddress) => (
        <OfficeAddressCard officeAddress={officeAddress} />
      ))}
    </ul>
  );
};

export default OfficeAddressList;
