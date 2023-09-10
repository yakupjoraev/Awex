import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../../../data/assets";
import { MyActivesChecks } from "@components/MyActivesChecks";
import { MyActivesCheck } from "@components/MyActivesCheck";
import { toast } from "react-hot-toast";
import { ASSETS_ROUTE } from "../../../constants/path-locations";

const VISIBLE_ACTIVES = Object.values(assets).slice(0, 4);

export function MyActives() {
  const navigate = useNavigate();

  return (
    <div className="my-actives">
      <div className="my-actives__header">
        <h2 className="my-actives__title main-title">Мои активы:</h2>

        <Link className="history-operations__link" to={ASSETS_ROUTE}>
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
                onWithdraw={() => navigate(`${ASSETS_ROUTE}/${id}/withdraw`)}
                onSell={() => {
                  navigate(`${ASSETS_ROUTE}/${id}/sell`);
                }}
                onSwap={() => navigate(`${ASSETS_ROUTE}/${id}/swap`)}
                key={id}
              />
            );
          })}
        </MyActivesChecks>
      </div>
    </div>
  );
}
