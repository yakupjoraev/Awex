import React from "react";
import { Link } from "react-router-dom";
import { actives } from "../../../../data/actives";
import { MyActivesChecks } from "@components/MyActivesChecks";
import { MyActivesCheck } from "@components/MyActivesCheck";
import { toast } from "react-hot-toast";

const VISIBLE_ACTIVES = actives.slice(0, 4);

export function MyActives() {
  const handleNotImplemented = () => {
    toast("NOT IMPLEMENTED!");
  };

  return (
    <div className="my-actives">
      <div className="my-actives__header">
        <h2 className="my-actives__title main-title">Мои активы:</h2>

        <Link className="history-operations__link" to="/actives">
          Все активы
          <img
            className="history-operations__link-img"
            src="/img/icons/arrow-right.svg"
            alt="Перейти в Операции"
          />
        </Link>
      </div>

      <div className="my-actives__checks-container">
        <MyActivesChecks>
          {VISIBLE_ACTIVES.map((active) => {
            const { id: key, ...rest } = active;
            return (
              <MyActivesCheck
                {...rest}
                key={key}
                onWithdraw={handleNotImplemented}
                onSell={handleNotImplemented}
                onSwap={handleNotImplemented}
              />
            );
          })}
        </MyActivesChecks>
      </div>
    </div>
  );
}
