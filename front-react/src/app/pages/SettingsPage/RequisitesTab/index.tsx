import Cards from "./Cards";
import OfficeAddresses from "./OfficeAddresses";

export function RequisitesTab() {
  const handleClick = (ev: React.MouseEvent) => {
    ev.preventDefault();
    alert("NOT IMPLEMENTED!");
  };

  return (
    <div className="settings-requisites__lists">
      <Cards />

      <div className="settings-requisites__list-wrapper ___not_implemented">
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

      <OfficeAddresses />
    </div>
  );
}
