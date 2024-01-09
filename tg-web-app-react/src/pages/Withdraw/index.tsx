import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const WITHDRAW_METHODS = [
  {
    id: 0,
    name: "Сеть блокчейн",
    description: "С других криптокошельков",
    icon: "./img/icons/gg_link.svg",
  },
  {
    id: 1,
    name: "Pay",
    description: "Между пользователями AWEX",
    icon: "./img/icons/ic_sharp-swap-horiz.svg",
  },
  {
    id: 2,
    name: "За наличные",
    description: "Наличные в офисе AWEX",
    icon: "./img/icons/Tab Two.svg",
  },
  {
    id: 3,
    name: "С рублевой карты",
    description: "Карты российских банков",
    icon: "./img/icons/ion_card-outline.svg",
  },
  {
    id: 4,
    name: "С валютной карты",
    description: "Mercuryo",
    icon: "./img/icons/mercuryo.png",
  },
];

const Withdraw: React.FC = () => {
  const navigate = useNavigate();

  const handleNotImplemented = () => {
    toast.error("В разработке");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <main>
      <div className="wrapper">
        <div onClick={handleBack} className="back__wrapper">
          <img
            className="back__icon"
            src="./img/icons/arrow-left.svg"
            alt="arrow left icon"
          />
          <p className="back__text">Назад</p>
        </div>
        <h1 className="title">Способы вывода:</h1>

        <ul className="currency-selection__list">
          {WITHDRAW_METHODS?.map((method) => (
            <div
              key={method.id}
              onClick={handleNotImplemented}
              className="currency-selection__item"
            >
              <div className="actives__payer">
                <img src={method.icon} alt="gg_link" />
              </div>

              <div className="currency-selection__info">
                <p className="currency-selection__label">{method.name}</p>
                <p className="currency-selection__text">{method.description}</p>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Withdraw;
