import React from "react";
import SupportingOfficeDocumentCard from "../SupportingOfficeDocumentCard";
import classes from "./SupportingOfficeDocumentList.module.css";

interface IProps {
  documents: string[];
}

const SupportingOfficeDocumentList: React.FC<IProps> = ({ documents }) => {
  return (
    <ul className={classes["list-wrapper"]}>
      {documents.map((document, index) => (
        <SupportingOfficeDocumentCard key={index} document={document} />
      ))}
    </ul>
  );
};

export default SupportingOfficeDocumentList;
