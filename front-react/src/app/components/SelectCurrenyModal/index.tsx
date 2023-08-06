import React, { useState } from "react";
import classNames from "classnames";

interface SelectCurrencyModalProps {
  open: boolean;
  onClose: () => void;
}

export function SelectCurrencyModal(props: SelectCurrencyModalProps) {
  const [searchText, setSeacrhText] = useState("");

  const handleSearchInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSeacrhText(ev.currentTarget.value);
  };

  return (
    <div className={classNames("modal", { show: props.open })}>
      <form className="modal-content modal-content--select-list">
        <div className="modal-content__header">
          <h4 className="modal-content__title">Выберете криптовалюту:</h4>

          <button
            className="close-modal-btn"
            type="button"
            onClick={props.onClose}
          >
            <img src="/img/icons/close-modal.svg" alt="" />
          </button>
        </div>

        <div className="deposits__filter-search search-group">
          <input
            className="deposits__filter-src search-input"
            type="search"
            placeholder="Поиск"
            value={searchText}
            onChange={handleSearchInputChange}
          />
          <img
            className="deposits__filter-search-img search-img"
            src="/img/icons/search.svg"
            alt="Поиск"
          />
        </div>

        <div className="modal-content__main">
          <ul className="crypto__list">
            <li className="crypto___item">
              <img
                className="crypto__item-pic"
                src="/img/actives/actives-2.png"
                alt=""
              />

              <div className="crypto__item-info">
                <h4 className="crypto__item-name">Green Metaverse Token</h4>

                <h5 className="crypto__item-subname">BTC</h5>
              </div>

              <div className="crypto__item-counts">
                <div className="crypto__item-count--main">1.578697</div>

                <div className="crypto__item-count--second">
                  ~131567.654 USD
                </div>
              </div>
            </li>

            <li className="crypto___item">
              <img
                className="crypto__item-pic"
                src="/img/actives/actives-2.png"
                alt=""
              />

              <div className="crypto__item-info">
                <h4 className="crypto__item-name">Green Metaverse Token</h4>

                <h5 className="crypto__item-subname">BTC</h5>
              </div>

              <div className="crypto__item-counts">
                <div className="crypto__item-count--main">1.578697</div>

                <div className="crypto__item-count--second">
                  ~131567.654 USD
                </div>
              </div>
            </li>

            <li className="crypto___item">
              <img
                className="crypto__item-pic"
                src="/img/actives/actives-2.png"
                alt=""
              />

              <div className="crypto__item-info">
                <h4 className="crypto__item-name">Green Metaverse Token</h4>

                <h5 className="crypto__item-subname">BTC</h5>
              </div>

              <div className="crypto__item-counts">
                <div className="crypto__item-count--main">1.578697</div>

                <div className="crypto__item-count--second">
                  ~131567.654 USD
                </div>
              </div>
            </li>

            <li className="crypto___item">
              <img
                className="crypto__item-pic"
                src="/img/actives/actives-2.png"
                alt=""
              />

              <div className="crypto__item-info">
                <h4 className="crypto__item-name">Green Metaverse Token</h4>

                <h5 className="crypto__item-subname">BTC</h5>
              </div>

              <div className="crypto__item-counts">
                <div className="crypto__item-count--main">1.578697</div>

                <div className="crypto__item-count--second">
                  ~131567.654 USD
                </div>
              </div>
            </li>

            <li className="crypto___item">
              <img
                className="crypto__item-pic"
                src="/img/actives/actives-2.png"
                alt=""
              />

              <div className="crypto__item-info">
                <h4 className="crypto__item-name">Green Metaverse Token</h4>

                <h5 className="crypto__item-subname">BTC</h5>
              </div>

              <div className="crypto__item-counts">
                <div className="crypto__item-count--main">1.578697</div>

                <div className="crypto__item-count--second">
                  ~131567.654 USD
                </div>
              </div>
            </li>

            <li className="crypto___item">
              <img
                className="crypto__item-pic"
                src="/img/actives/actives-2.png"
                alt=""
              />

              <div className="crypto__item-info">
                <h4 className="crypto__item-name">Green Metaverse Token</h4>

                <h5 className="crypto__item-subname">BTC</h5>
              </div>

              <div className="crypto__item-counts">
                <div className="crypto__item-count--main">1.578697</div>

                <div className="crypto__item-count--second">
                  ~131567.654 USD
                </div>
              </div>
            </li>

            <li className="crypto___item">
              <img
                className="crypto__item-pic"
                src="/img/actives/actives-2.png"
                alt=""
              />

              <div className="crypto__item-info">
                <h4 className="crypto__item-name">Green Metaverse Token</h4>

                <h5 className="crypto__item-subname">BTC</h5>
              </div>

              <div className="crypto__item-counts">
                <div className="crypto__item-count--main">1.578697</div>

                <div className="crypto__item-count--second">
                  ~131567.654 USD
                </div>
              </div>
            </li>

            <li className="crypto___item">
              <img
                className="crypto__item-pic"
                src="/img/actives/actives-2.png"
                alt=""
              />

              <div className="crypto__item-info">
                <h4 className="crypto__item-name">Green Metaverse Token</h4>

                <h5 className="crypto__item-subname">BTC</h5>
              </div>

              <div className="crypto__item-counts">
                <div className="crypto__item-count--main">1.578697</div>

                <div className="crypto__item-count--second">
                  ~131567.654 USD
                </div>
              </div>
            </li>

            <li className="crypto___item">
              <img
                className="crypto__item-pic"
                src="/img/actives/actives-2.png"
                alt=""
              />

              <div className="crypto__item-info">
                <h4 className="crypto__item-name">Green Metaverse Token</h4>

                <h5 className="crypto__item-subname">BTC</h5>
              </div>

              <div className="crypto__item-counts">
                <div className="crypto__item-count--main">1.578697</div>

                <div className="crypto__item-count--second">
                  ~131567.654 USD
                </div>
              </div>
            </li>

            <li className="crypto___item">
              <img
                className="crypto__item-pic"
                src="/img/actives/actives-2.png"
                alt=""
              />

              <div className="crypto__item-info">
                <h4 className="crypto__item-name">Green Metaverse Token</h4>

                <h5 className="crypto__item-subname">BTC</h5>
              </div>

              <div className="crypto__item-counts">
                <div className="crypto__item-count--main">1.578697</div>

                <div className="crypto__item-count--second">
                  ~131567.654 USD
                </div>
              </div>
            </li>

            <li className="crypto___item">
              <img
                className="crypto__item-pic"
                src="/img/actives/actives-2.png"
                alt=""
              />

              <div className="crypto__item-info">
                <h4 className="crypto__item-name">Green Metaverse Token</h4>

                <h5 className="crypto__item-subname">BTC</h5>
              </div>

              <div className="crypto__item-counts">
                <div className="crypto__item-count--main">1.578697</div>

                <div className="crypto__item-count--second">
                  ~131567.654 USD
                </div>
              </div>
            </li>

            <li className="crypto___item">
              <img
                className="crypto__item-pic"
                src="/img/actives/actives-2.png"
                alt=""
              />

              <div className="crypto__item-info">
                <h4 className="crypto__item-name">Green Metaverse Token</h4>

                <h5 className="crypto__item-subname">BTC</h5>
              </div>

              <div className="crypto__item-counts">
                <div className="crypto__item-count--main">1.578697</div>

                <div className="crypto__item-count--second">
                  ~131567.654 USD
                </div>
              </div>
            </li>

            <li className="crypto___item">
              <img
                className="crypto__item-pic"
                src="/img/actives/actives-2.png"
                alt=""
              />

              <div className="crypto__item-info">
                <h4 className="crypto__item-name">Green Metaverse Token</h4>

                <h5 className="crypto__item-subname">BTC</h5>
              </div>

              <div className="crypto__item-counts">
                <div className="crypto__item-count--main">1.578697</div>

                <div className="crypto__item-count--second">
                  ~131567.654 USD
                </div>
              </div>
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
}
