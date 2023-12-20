import classNames from "classnames"
import QRCode from "react-qr-code"

export interface QrModalPorps {
  open: boolean
  value: string
  onClose: () => void
}

function stop(event: any) {
  event.stopPropagation()
}

export function QrModal(props: QrModalPorps) {
  return (
    <div className={classNames("modal", { show: props.open })} onClick={props.onClose}>
      <form action="#" className="modal-content" onClick={stop}>
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
            <QRCode
              className="modal-content__qr-img"
              value={props.value}
              size={320}
              viewBox="0 0 400 400"
            />
          </div>
        </div>
      </form>
    </div>
  )
}
