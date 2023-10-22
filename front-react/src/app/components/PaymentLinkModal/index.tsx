import classNames from "classnames";
import { useRef } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import QRCode from "react-qr-code";
import toast from "react-hot-toast";

export interface PaymentLinkModalProps {
  open: boolean;
  token: string;
  text?: string;
  onClose: () => void;
}

export function PaymentLinkModal(props: PaymentLinkModalProps) {
  const modalContentRef = useRef<HTMLDivElement>(null);

  const handleCoverClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (
      modalContentRef.current &&
      ev.target instanceof Element &&
      !modalContentRef.current.contains(ev.target)
    ) {
      props.onClose();
    }
  };

  const handleLinkCopy = () => {
    toast.success("Скопировано!");
  };

  const handleShare = () => {
    if (typeof window === "undefined") {
      return;
    }
    if (!window.navigator.canShare || !window.navigator.share) {
      toast.error("Не удалось поделиться.");
      return;
    }
    const shareRequest = {
      title: "Платежная ссылка",
      url: paymentLink,
      text: "description",
    };

    if (window.navigator.canShare(shareRequest)) {
      window.navigator.share(shareRequest).catch((error) => {
        console.error(error);
        toast.error("Не удалось поделиться.");
      });
    } else {
      toast.error("Не удалось поделиться.");
    }
  };

  const paymentLink =
    typeof window === "undefined"
      ? "http://example.com/"
      : window.location.origin + "/payment/" + props.token;

  const canShare = typeof window !== "undefined" && !!window.navigator.share;

  return (
    <div
      className={classNames("modal", { show: props.open })}
      onClick={handleCoverClick}
    >
      <div className="modal-content" ref={modalContentRef}>
        <div className="modal-content__header">
          <h2>Платежная ссылка</h2>
          <button
            className="close-modal-btn"
            aria-label="close"
            onClick={props.onClose}
          >
            <img src="/img/icons/close-modal.svg" alt="" />
          </button>
        </div>
        <div className="modal-content__main">
          <div className="modal-content__checked">
            <img
              className="modal-content__checked-img"
              src="/img/icons/modal-content-checked.svg"
              alt=""
            />
          </div>
          <h3 className="modal-content__subtitle">
            Ваша ссылка сгенерирована!
          </h3>
          <div className="modal-content__qr">
            <QRCode
              className="modal-content__qr-img"
              value={paymentLink}
              size={156}
            />
          </div>
          <div className="modal-content__copy">
            <a
              className="modal-content__copy-text"
              href={paymentLink}
              target="_blank"
            >
              {props.token}
            </a>
            <CopyToClipboard text={paymentLink} onCopy={handleLinkCopy}>
              <button className="modal-content__copy-btn">
                <img
                  className="modal-content__copy-img"
                  src="/img/icons/copy.svg"
                  alt=""
                />
              </button>
            </CopyToClipboard>
          </div>
        </div>
        {canShare ? (
          <button
            type="button"
            className="modal-content__btn second-btn"
            onClick={handleShare}
          >
            Поделиться
          </button>
        ) : (
          <div className="modal-content__not-supported">
            Web Share API не поддерживается в этом браузере.
          </div>
        )}
      </div>
    </div>
  );
}
