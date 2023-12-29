import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { getAccountBalance } from "@store/accountBalance/slice";
import { Link } from "react-router-dom";
import { ROUTE } from "@constants/path-locations";

interface Balance {
  balance: {
    int: string;
    fract: string;
  };
  currency: string;
}

export function CheckBalance() {
  const [userBalance, setUserBalance] = useState<Balance | null>(null);
  const dispatch = useAppDispatch();
  const accountBalance = useAppSelector((state) => state.accountBalance.data);

  useEffect(() => {
    dispatch(getAccountBalance());
  }, []);

  useEffect(() => {
    formattingBalance();
  }, [accountBalance]);

  function formattingBalance(): void {
    const { balance, currency } = accountBalance;
    const balanceSegmented: string[] = balance.split(".");
    setUserBalance({
      balance: {
        int: balanceSegmented[0],
        fract: balanceSegmented[1] ? balanceSegmented[1] : "",
      },
      currency,
    });
  }

  return (
    <div className="about-check__balance">
      <div className="about-check__balance-inner">
        <div className="about-check__balance-labels">
          <div className="about-check__balance-label">Общий баланс:</div>

          <a href="#" className="about-check__balance-statistic">
            Статистика
            <img
              className="about-check__balance-statistic-img"
              src="/img/icons/arrow-right.svg"
              alt="Статистика"
            />
          </a>
        </div>

        {userBalance && (
          <div className="about-check__balance-sum">
            {userBalance.balance.int}
            <span>
              {userBalance.balance.fract && <>,{userBalance.balance.fract}</>}
              {userBalance.currency}
            </span>
          </div>
        )}

        <div className="about-check__graphic">
          <img
            className="about-check__graphic-img"
            src="/img/balance-graphic.svg"
            alt="графика баланса"
          />
        </div>
      </div>

      <Link
        to={ROUTE.ORDER_CASH_PATH}
        className="about-check__btn main-btn"
        style={{
          width: "max-content",
        }}
      >
        Заказ наличных в офис
      </Link>
    </div>
  );
}
