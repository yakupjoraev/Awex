import React from "react";
import classNames from "classnames";

export interface LanguagesModalProps {
  open: boolean;
  loading: boolean;
  error?: string;
  onClose: () => void;
}

const LanguagesModal: React.FC<LanguagesModalProps> = (props) => {
  return (
    <div className={classNames("modal modal-enter", { show: props.open })}>
      <div className="modal-content">
        <div className="modal-content__header">
          <div className="modal-content__header-logo">
            {/* <img src="/img/icons/logo-mini.svg" alt="" /> */}

            <h2>Язык</h2>
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
          <ul className="landing-page__languages__list">
            <li className="landing-page__languages__item">
              <img
                className="landing-page__languages__pic"
                src="/img/icons/ru.svg"
                alt=""
              />
              <span>Русский</span>
            </li>
            <li className="landing-page__languages__item">
              <img
                className="landing-page__languages__pic"
                src="/img/icons/en.svg"
                alt=""
              />
              <span>English</span>
            </li>
            <li className="landing-page__languages__item">
              <img
                className="landing-page__languages__pic"
                src="/img/icons/chi.svg"
                alt=""
              />
              <span>汉语</span>
            </li>
            <li className="landing-page__languages__item">
              <img
                className="landing-page__languages__pic"
                src="/img/icons/vietnam.svg"
                alt=""
              />
              <span>TiếNg ViệT</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LanguagesModal;
