import classNames from "classnames";
import { useRef } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import QRCode from "react-qr-code";
import toast from "react-hot-toast";

import { InvoiceLight } from "@components/InvoiceLight"

export interface GenerationLinksModalProps {
  open: boolean
  onClose: () => void
}

export function GenerationLinksModal(props: GenerationLinksModalProps) {

  const closeModal = () => {
    props.onClose()
  }

  return (
    <div className={`modal modal-genation-links ${props.open && 'show'}`}
      onClick={closeModal}
    >
      <div className="modal-content"
        onClick={(ev)=>{ev.stopPropagation()}}
      >
          <div className="modal-content__header">
              <button className="close-modal-btn"
                onClick={closeModal}
              >
                <img src="./img/icons/close-modal.svg" alt="" />
              </button>
          </div>

          <InvoiceLight
            isMobile={true}
            onSubmit={closeModal}
          />
      </div>
    </div>
  )
}