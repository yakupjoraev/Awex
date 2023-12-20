import React, { useEffect, useState } from "react";
import CardList from "./CardList";
import { AuthorizedService } from "@awex-api";
import { TCardList } from "src/generated/awex-api/models/CardList";
import { NewCardModalContainer } from "@containers/NewCardModalContainer";

const Cards: React.FC = () => {
  const [cards, setCards] = useState<TCardList>();
  const [isNewCardModalOpen, setIsNewCardModalOpen] = useState<boolean>(false);

  const handleOpenNewCardModal = () => {
    setIsNewCardModalOpen(true);
  };

  const handleCloseNewCardModal = () => {
    setIsNewCardModalOpen(false);
  };

  useEffect(() => {
    AuthorizedService.getCardsList().then((res) => {
      if (res) {
        setCards(res);
      }
    });
  }, []);

  return (
    <div className="settings-requisites__list-wrapper">
      <div className="settings-requisites__header">
        <h3 className="settings-requisites__title">Мои карты</h3>

        <button
          className="settings-requisites__added"
          type="button"
          onClick={handleOpenNewCardModal}
        >
          Добавить карту
        </button>
      </div>

      <CardList cards={cards!} />

      <NewCardModalContainer
        open={isNewCardModalOpen}
        onClose={handleCloseNewCardModal}
      />
    </div>
  );
};

export default Cards;
