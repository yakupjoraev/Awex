import React from "react";
import classNames from "classnames";

export interface QrModalPorps {
  open: boolean;
  onClose: () => void;
}

export function QrModal(props: QrModalPorps) {
  return (
    <div className={classNames("modal", { show: props.open })}>
      <form action="#" className="modal-content">
        <div className="modal-content__header">
          <button
            className="close-modal-btn"
            type="button"
            onClick={props.onClose}
          >
            <img src="/img/icons/close-modal.svg" alt="" />
          </button>
        </div>

        <div className="modal-content__main">
          <div className="modal-content__qr modal-content__qr--big">
            <img className="modal-content__qr-img" src="/img/qr.png" alt="" />
          </div>
        </div>
      </form>
    </div>
  );
}
