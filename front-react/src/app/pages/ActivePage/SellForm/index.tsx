import classNames from "classnames";
import { useDropdown } from "../../../hooks/useDropdown";

export function SellForm() {
  const paymentMethodDropdown = useDropdown<HTMLDivElement>();
  const areaDropdown = useDropdown<HTMLDivElement>();

  return (
    <>
      <div className="actives-action__filters ">
        <div
          className="deposits__filter-select"
          data-select-wrapper=""
          ref={paymentMethodDropdown.containerRef}
          onClick={() => paymentMethodDropdown.toggle()}
        >
          <div className="deposits__filter-label">Способ оплаты</div>
          <div className="deposits__filter-selected" data-select-value="">
            Карты
          </div>
          <img
            className={classNames("deposits__filter-arrow", {
              active: paymentMethodDropdown.opened,
            })}
            src="/img/icons/mini-arrow-down.svg"
            alt="mini-arrow-down"
          />
          <ul
            className={classNames("deposits__filter-list select-list", {
              active: paymentMethodDropdown.opened,
            })}
            data-select-list=""
          >
            <li
              className="deposits__filter-item select-item"
              data-select-item=""
              onClick={() => paymentMethodDropdown.toggle()}
            >
              Карты
            </li>
            <li
              className="deposits__filter-item select-item"
              data-select-item=""
              onClick={() => paymentMethodDropdown.toggle()}
            >
              Карты
            </li>
            <li
              className="deposits__filter-item select-item"
              data-select-item=""
              onClick={() => paymentMethodDropdown.toggle()}
            >
              Карты
            </li>
          </ul>
        </div>
        <div
          className="deposits__filter-select"
          data-select-wrapper=""
          ref={areaDropdown.containerRef}
          onClick={() => areaDropdown.toggle()}
        >
          <div className="deposits__filter-label">Регион</div>
          <div className="deposits__filter-selected" data-select-value="">
            Ульяно.....
          </div>
          <img
            className={classNames("deposits__filter-arrow", {
              active: areaDropdown.opened,
            })}
            src="/img/icons/mini-arrow-down.svg"
            alt="mini-arrow-down"
            data-select-arrow=""
          />
          <ul
            className={classNames("deposits__filter-list select-list", {
              active: areaDropdown.opened,
            })}
            data-select-list=""
          >
            <li
              className="deposits__filter-item select-item"
              data-select-item=""
              onClick={() => paymentMethodDropdown.toggle()}
            >
              Ульяно.....1
            </li>
            <li
              className="deposits__filter-item select-item"
              data-select-item=""
              onClick={() => paymentMethodDropdown.toggle()}
            >
              Ульяно.....2
            </li>
            <li
              className="deposits__filter-item select-item"
              data-select-item=""
              onClick={() => paymentMethodDropdown.toggle()}
            >
              Ульяно.....3
            </li>
          </ul>
        </div>
      </div>
      <div className="actives-action__exchanges">
        <div className="actives-action__exchange">
          <p className="actives-action__exchange-label">Курс</p>
          <div className="actives-action__exchange-price">
            <p className="actives-action__exchange-price-sum">1 205 720, 83 </p>
            <p className="actives-action__exchange-price-currency">AED</p>
            <p className="actives-action__exchange-price-rypto">/1 BTC</p>
          </div>
          <div className="actives-action__exchange-office">
            <img
              src="/img/united arab emirates.svg"
              alt="united arab emirates"
            />
            <span>Наличные Офис Дубай</span>
          </div>
          <p className="actives-action__exchange-adderess">
            Ambit| г.Москва, ММЦД Москва-Сити, Пресненская набережная, 12 (башня
            Федерация)
          </p>
          <div className="actives-action__exchang-limites">
            <p className="actives-action__exchange-label">Лимит</p>
            <div className="actives-action__exchang-limit">
              48.4k-56,5M <span>AED</span>
            </div>
          </div>
        </div>
        <div className="actives-action__exchange">
          <p className="actives-action__exchange-label">Курс</p>
          <div className="actives-action__exchange-price">
            <p className="actives-action__exchange-price-sum">1 205 720, 83 </p>
            <p className="actives-action__exchange-price-currency">AED</p>
            <p className="actives-action__exchange-price-rypto">/1 BTC</p>
          </div>
          <div className="actives-action__exchange-office">
            <img
              src="/img/united arab emirates.svg"
              alt="united arab emirates"
            />
            <span>Наличные Офис Дубай</span>
          </div>
          <p className="actives-action__exchange-adderess">
            Ambit| г.Москва, ММЦД Москва-Сити, Пресненская набережная, 12 (башня
            Федерация)
          </p>
          <div className="actives-action__exchang-limites">
            <p className="actives-action__exchange-label">Лимит</p>
            <div className="actives-action__exchang-limit">
              48.4k-56,5M <span>AED</span>
            </div>
          </div>
        </div>
        <div className="actives-action__exchange">
          <p className="actives-action__exchange-label">Курс</p>
          <div className="actives-action__exchange-price">
            <p className="actives-action__exchange-price-sum">2 805 720, 83 </p>
            <p className="actives-action__exchange-price-currency">RUB</p>
            <p className="actives-action__exchange-price-rypto">/1 BTC</p>
          </div>
          <div className="actives-action__exchange-office">
            <img src="/img/tinkoff.png" alt="tinkoff" />
            <span>Cash-In Тинькофф</span>
          </div>
          <div className="actives-action__exchang-limites">
            <p className="actives-action__exchange-label">Лимит</p>
            <div className="actives-action__exchang-limit">
              48.4k-56,5M <span>RUB</span>
            </div>
          </div>
        </div>
        <div className="actives-action__exchange">
          <p className="actives-action__exchange-label">Курс</p>
          <div className="actives-action__exchange-price">
            <p className="actives-action__exchange-price-sum">2 805 720, 83 </p>
            <p className="actives-action__exchange-price-currency">RUB</p>
            <p className="actives-action__exchange-price-rypto">/1 BTC</p>
          </div>
          <div className="actives-action__exchange-office">
            <img src="/img/tinkoff.png" alt="tinkoff" />
            <span>Cash-In Тинькофф</span>
          </div>
          <div className="actives-action__exchang-limites">
            <p className="actives-action__exchange-label">Лимит</p>
            <div className="actives-action__exchang-limit">
              48.4k-56,5M <span>RUB</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
