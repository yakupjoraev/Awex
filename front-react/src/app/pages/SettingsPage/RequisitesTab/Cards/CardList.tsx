import React from "react";
import CardItem from "./CardItem";
import { TCardList } from "src/generated/awex-api/models/CardList";

interface IProps {
  cards: TCardList;
}

const CardList: React.FC<IProps> = ({ cards }) => {
  return (
    <ul className="settings-requisites__list">
      {cards?.list?.map((card) => (
        <CardItem key={card?.cardName} card={card} />
      ))}
    </ul>
  );
};

export default CardList;
