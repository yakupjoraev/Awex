import React from "react";
import { Card } from "src/generated/awex-api/models/Card";

interface IProps {
  card: Card;
}

const CardItem: React.FC<IProps> = ({ card }) => {
  const cardProviderImage = card?.cardNumber?.startsWith("4") ? (
    <img src="/img/visa-card.png" alt="visa-card" />
  ) : card.cardNumber.startsWith("5") ? (
    <img src="/img/mastercard-card.png" alt="mastercard-card" />
  ) : (
    <img src="/img/mir-card.png" alt="mir-card" />
  );

  return (
    <li className="settings-requisites__item">
      <div className="settings-requisites__item-block">{cardProviderImage}</div>

      <div className="settings-requisites__item-block">
        {card.cardNumber}
        <span>({card.cardName})</span>
      </div>

      <div className="settings-requisites__item-border"></div>

      <div className="settings-requisites__item-block">
        до {card.cardMonth}/{card.cardYear.slice(2)}
      </div>

      <div className="settings-requisites__item-border"></div>

      <div className="settings-requisites__item-block">
        Количество операций: 0
      </div>
    </li>
  );
};

export default CardItem;
