export function RequisitesTab() {
  const handleClick = (ev: React.MouseEvent) => {
    ev.preventDefault();
    alert("NOT IMPLEMENTED!");
  };

  return (
    <div className="settings-requisites__lists">
      <div className="settings-requisites__list-wrapper">
        <div className="settings-requisites__header">
          <h3 className="settings-requisites__title">Мои карты</h3>

          <a
            className="settings-requisites__added"
            href="#"
            onClick={handleClick}
          >
            Добавить карту
          </a>
        </div>

        <ul className="settings-requisites__list">
          <li className="settings-requisites__item">
            <div className="settings-requisites__item-block">
              <img src="/img/mir-card.png" alt="mir-card" />
            </div>

            <div className="settings-requisites__item-block">
              <span>****</span>
              <span>****</span>
              <span>****</span>
              <span> 1234</span>
              <span>(Моя карта1)</span>
            </div>

            <div className="settings-requisites__item-border"></div>

            <div className="settings-requisites__item-block">до 12/28</div>

            <div className="settings-requisites__item-border"></div>

            <div className="settings-requisites__item-block">
              Количество операций: 158
            </div>
          </li>

          <li className="settings-requisites__item">
            <div className="settings-requisites__item-block">
              <img src="/img/mir-card.png" alt="mir-card" />
            </div>

            <div className="settings-requisites__item-block">
              <span>****</span>
              <span>****</span>
              <span>****</span>
              <span> 1234</span>
              <span>(Моя карта1)</span>
            </div>

            <div className="settings-requisites__item-border"></div>

            <div className="settings-requisites__item-block">до 12/28</div>

            <div className="settings-requisites__item-border"></div>

            <div className="settings-requisites__item-block">
              Количество операций: 158
            </div>
          </li>

          <li className="settings-requisites__item">
            <div className="settings-requisites__item-block">
              <img src="/img/mir-card.png" alt="mir-card" />
            </div>

            <div className="settings-requisites__item-block">
              <span>****</span>
              <span>****</span>
              <span>****</span>
              <span> 1234</span>
              <span>(Моя карта1)</span>
            </div>

            <div className="settings-requisites__item-border"></div>

            <div className="settings-requisites__item-block">до 12/28</div>

            <div className="settings-requisites__item-border"></div>

            <div className="settings-requisites__item-block">
              Количество операций: 158
            </div>
          </li>
        </ul>
      </div>

      <div className="settings-requisites__list-wrapper">
        <div className="settings-requisites__header">
          <h3 className="settings-requisites__title">Мои счета</h3>

          <a
            className="settings-requisites__added"
            href="#"
            onClick={handleClick}
          >
            Добавить счет
          </a>
        </div>

        <ul className="settings-requisites__list">
          <li className="settings-requisites__item">
            <div className="settings-requisites__item-block">
              <img src="/img/mir-card.png" alt="mir-card" />
            </div>

            <div className="settings-requisites__item-block">
              <span>****</span>
              <span>****</span>
              <span>****</span>
              <span> 1234</span>
              <span>(Моя карта1)</span>
            </div>

            <div className="settings-requisites__item-block">до 12/28</div>

            <div className="settings-requisites__item-block">
              Количество операций: 158
            </div>
          </li>

          <li className="settings-requisites__item">
            <div className="settings-requisites__item-block">
              <img src="/img/mir-card.png" alt="mir-card" />
            </div>

            <div className="settings-requisites__item-block">
              <span>****</span>
              <span>****</span>
              <span>****</span>
              <span> 1234</span>
              <span>(Моя карта1)</span>
            </div>

            <div className="settings-requisites__item-block">до 12/28</div>

            <div className="settings-requisites__item-block">
              Количество операций: 158
            </div>
          </li>

          <li className="settings-requisites__item">
            <div className="settings-requisites__item-block">
              <img src="/img/mir-card.png" alt="mir-card" />
            </div>

            <div className="settings-requisites__item-block">
              <span>****</span>
              <span>****</span>
              <span>****</span>
              <span> 1234</span>
              <span>(Моя карта1)</span>
            </div>

            <div className="settings-requisites__item-block">до 12/28</div>

            <div className="settings-requisites__item-block">
              Количество операций: 158
            </div>
          </li>
        </ul>
      </div>

      <div className="settings-requisites__list-wrapper">
        <div className="settings-requisites__header">
          <h3 className="settings-requisites__title">
            Мои адреса для доставки наличных
          </h3>

          <a
            className="settings-requisites__added"
            href="#"
            onClick={handleClick}
          >
            Добавить адрес
          </a>
        </div>

        <ul className="settings-requisites__list settings-requisites__list--addresses">
          <li className="settings-requisites__item">
            <div className="settings-requisites__item-block">ООО “Первый”</div>

            <div className="settings-requisites__item-border"></div>

            <div className="settings-requisites__item-block settings-requisites__item--addresses">
              Россия, г. Москва, ул. Ленина, 21, офис 1
            </div>

            <a
              className="settings-requisites__item-btn third-btn"
              href="#"
              onClick={handleClick}
            >
              <span>Подтверждающие</span> документы
            </a>
          </li>

          <li className="settings-requisites__item">
            <div className="settings-requisites__item-block">ООО “Первый”</div>

            <div className="settings-requisites__item-border"></div>

            <div className="settings-requisites__item-block settings-requisites__item--addresses">
              Россия, г. Москва, ул. Ленина, 21, офис 1
            </div>

            <a
              className="settings-requisites__item-btn third-btn"
              href="#"
              onClick={handleClick}
            >
              <span>Подтверждающие</span> документы
            </a>
          </li>

          <li className="settings-requisites__item">
            <div className="settings-requisites__item-block">ООО “Первый”</div>

            <div className="settings-requisites__item-border"></div>

            <div className="settings-requisites__item-block settings-requisites__item--addresses">
              Россия, г. Москва, ул. Ленина, 21, офис 1
            </div>

            <a
              className="settings-requisites__item-btn third-btn"
              href="#"
              onClick={handleClick}
            >
              <span>Подтверждающие</span> документы
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
