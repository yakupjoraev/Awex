import React from "react";

interface IProps {
  file: File;
  onRemove: (file: File) => void;
}

const FileCard: React.FC<IProps> = ({ file, onRemove }) => {
  return (
    <li className="project-file-input__file-item">
      <p>{file.name.substring(0, 18) + "..."}</p>
      <button
        type="button"
        className="project-file-input__file-remove"
        onClick={() => onRemove(file)}
      >
        <img src="/img/icons/trash.svg" alt="" />
      </button>
    </li>
  );
};

export default FileCard;
