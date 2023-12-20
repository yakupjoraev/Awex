import React from "react";
import classes from "./SupportingOfficeDocumentCard.module.css";

interface IProps {
  document: string;
}

const SupportingOfficeDocumentCard: React.FC<IProps> = ({ document }) => {
  return <li className={classes["card-container"]}>{document}</li>;
};

export default SupportingOfficeDocumentCard;
