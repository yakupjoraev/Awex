import React, { useState } from "react";
import classes from "./SupportingOfficeDocumentCard.module.css";
import { AuthorizedService } from "@awex-api";
import { AdminSupportingDocumentsViewModalContainer } from "@containers/AdminSupportingDocumentViewModalContainer";

interface IProps {
  document: string;
}

const SupportingOfficeDocumentCard: React.FC<IProps> = ({ document }) => {
  const [isFileOpen, setIsFileOpen] = useState(false);

  const handleCloseFile = () => {
    setIsFileOpen(false);
  };

  const handleOpenFile = () => {
    setIsFileOpen(true);
  };

  return (
    <>
      <li className={classes["card-container"]} onClick={handleOpenFile}>
        {document}
      </li>

      <AdminSupportingDocumentsViewModalContainer
        open={isFileOpen}
        onClose={handleCloseFile}
        fileName={document}
      />
    </>
  );
};

export default SupportingOfficeDocumentCard;
