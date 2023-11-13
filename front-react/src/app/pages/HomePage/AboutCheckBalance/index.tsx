import React, { useEffect, useState } from "react"
import { AuthenticatedService } from "@awex-api"

interface Balance {
  balance: {
    int: string
    fract: string
  }
  currency: string
}

export function AboutCheckBalance() {
  
  const [userBalance, setUserBalance] = useState<Balance | null>(null)
  
  useEffect(()=>{
    getAccountBalance()
  },[])

  function getAccountBalance(): void {
    AuthenticatedService.accountBalance()
      .then((response) => {
        if(!response) {
          setUserBalance(null)
          return
        }

        const {balance, currency} = response
        const balanceSegmented: string[] = balance.split('.')
        setUserBalance({
          balance: {
            int: balanceSegmented[0],
            fract: balanceSegmented[1] ? balanceSegmented[1] : '',
          },
          currency
        })
      })
      .catch((error) => {
        setUserBalance(null)
        console.error(error)
      })
      // .finally(() => {})
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

        { userBalance && (
          <div className="about-check__balance-sum">
            { userBalance.balance.int }
            <span>
              { userBalance.balance.fract && (
                <>
                  ,{ userBalance.balance.fract }
                </>
              )}
              { userBalance.currency }
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

      <button
        type="button"
        className="about-check__btn main-btn"
        onClick={() => {
          alert("NOT IMPLEMENTED");
        }}
      >
        Заказ наличных в офис
      </button>
    </div>
  );
}
