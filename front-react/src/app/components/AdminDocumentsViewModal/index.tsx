import classNames from "classnames";
import React from "react";

export interface AdminDocumentsViewModalProps {
  open: boolean;
  onClose: () => void;
  fileName: string;
}

const AdminDocumentsViewModal: React.FC<AdminDocumentsViewModalProps> = (
  props
) => {
  return (
    <div className={classNames("modal modal-enter", { show: props.open })}>
      <div className="modal-content">
        <div className="modal-content__header">
          <div className="modal-content__header-logo">
            <img src="/img/icons/logo-mini.svg" alt="" />

            <h2>Просмотр документов</h2>
          </div>

          <button
            type="button"
            className="close-modal-btn"
            onClick={props.onClose}
          >
            <img src="/img/icons/close-modal.svg" alt="" />
          </button>
        </div>

        <div className="modal-content__main">
          <img
            src={`https://awex.freeblock.site/api/uploaded-files/${props.fileName}`}
            alt="file"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDocumentsViewModal;
