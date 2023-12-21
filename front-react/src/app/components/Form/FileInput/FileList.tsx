import React from "react";
import FileCard from "./FileCard";

interface IProps {
  files: File[];
  onRemove: (file: File) => void;
}

const FileList: React.FC<IProps> = ({ files, onRemove }) => {
  return (
    <ul className="project-file-input__file-list">
      {files.map((file) => (
        <FileCard file={file} onRemove={onRemove} />
      ))}
    </ul>
  );
};

export default FileList;
