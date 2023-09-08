import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { actives } from "../../../../data/actives";
import { MyActivesChecks } from "@components/MyActivesChecks";
import { MyActivesCheck } from "@components/MyActivesCheck";
import { toast } from "react-hot-toast";
import { ACTIVES_ROUTE } from "../../../constants/path-locations";

const VISIBLE_ACTIVES = Object.values(actives).slice(0, 4);

export function MyActives() {
  const navigate = useNavigate();

  return (
    <div className="my-actives">
      <div className="my-actives__header">
        <h2 className="my-actives__title main-title">Мои активы:</h2>

        <Link className="history-operations__link" to={ACTIVES_ROUTE}>
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
            const { id, ...rest } = active;
            return (
              <MyActivesCheck
                {...rest}
                onWithdraw={() => navigate(`${ACTIVES_ROUTE}/${id}/withdraw`)}
                onSell={() => {
                  navigate(`${ACTIVES_ROUTE}/${id}/sell`);
                }}
                onSwap={() => navigate(`${ACTIVES_ROUTE}/${id}/swap`)}
                key={id}
              />
            );
          })}
        </MyActivesChecks>
      </div>
    </div>
  );
}
