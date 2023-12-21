import React, { useState } from "react";
import classes from "./SupportingOfficeDocumentCard.module.css";
import { AuthorizedService } from "@awex-api";
import { AdminSupportingDocumentsViewModalContainer } from "@containers/AdminSupportingDocumentViewModalContainer";

interface IProps {
  document: string;
}

const SupportingOfficeDocumentCard: React.FC<IProps> = ({ document }) => {
  const [isFileOpen, setIsFileOpen] = useState(false);
  const [file, setFile] = useState("");

  const handleOpenFile = async () => {
    await AuthorizedService.administratorGetOfficeAddressDocument(
      document
    ).then((res) => {
      console.log(res);
      if (res) {
        setFile(res);
      }
    });
    setIsFileOpen(true);
  };

  const handleCloseFile = () => {
    setIsFileOpen(false);
  };

  return (
    <>
      <li className={classes["card-container"]} onClick={handleOpenFile}>
        {document}
      </li>

      <AdminSupportingDocumentsViewModalContainer
        open={isFileOpen}
        onClose={handleCloseFile}
        img={document}
      />
    </>
  );
};

export default SupportingOfficeDocumentCard;
