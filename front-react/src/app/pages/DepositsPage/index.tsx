import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { DepositItem } from "./DepositItem"
import { DepositFilters } from "./DepositFilters"
import { DepositInfo } from "./DepositInfo"
import { DepositInSumm } from "./DepositInSumm"


const deposits: {
  id: string
  depositStatus: "pending" | "active"
  applicationStatus: "rejected" | "review"
  comment: string
  sum: { value: number; symbol: string }
  date: Date
  dateEnd: Date
}[] = [
  {
    id: "ID345678",
    depositStatus: "pending",
    applicationStatus: "rejected",
    sum: { value: 100, symbol: "USDT" },
    date: new Date("2023-09-30T21:00:00.000Z"),
    dateEnd: new Date("2023-09-30T21:00:00.000Z"),
    comment: "Автомобиль Mercedes-Benz А123АА123...",
  },
  {
    id: "ID345679",
    depositStatus: "active",
    applicationStatus: "review",
    sum: { value: 100, symbol: "USDT" },
    date: new Date("2023-09-30T21:00:00.000Z"),
    dateEnd: new Date("2023-09-30T21:00:00.000Z"),
    comment: "Автомобиль Mercedes-Benz А123АА123...",
  },
]


export function DepositsPage() {


  useEffect(() => {
    getDeposits()
  }, [])


  function getDeposits(): void {

  }


  return (
    <div className="wrapper">
      <Helmet title="Депозиты" />
      <section className="deposits">
        <div className="deposits__header">
          <h1 className="deposits__title main-title">Депозиты</h1>
        </div>

        <DepositInfo />

        <DepositInSumm />

        <DepositFilters />

        <div className="deposits__list-container">
          <ul className="deposits__list">
            <li className="deposits__item-header">
              <div className="deposits__item-status"></div>
              <div className="deposits__item-id">Имя/ID</div>
              <div className="deposits__item-data">Дата</div>
              <div className="deposits__item-status-deposite"> Статус депозита </div>
              <div className="deposits__item-sum">Сумма </div>
              <div className="deposits__item-data-end">Дата окончания</div>
              {/* <div className="deposits__item-status-application"> Статус заявки </div> */}
              <div className="deposits__item-commets">Комментарий</div>
            </li>

            {deposits.map((deposit) => {
              return <DepositItem {...deposit} key={deposit.id} />
            })}

            {/* <li className="deposits__item deposits__item-rejected">
              <div className="deposits__item-status">
                <img src="/img/icons/rejected.svg" alt="" />
              </div>
              <div className="deposits__item-id">ID345678</div>
              <div className="deposits__item-data">10/01/23</div>
              <div className="deposits__item-status-deposite">
                Ожидает действий
              </div>
              <div className="deposits__item-sum">100 USDT </div>
              <div className="deposits__item-data-end">10/01/23</div>
              <div className="deposits__item-status-application">Отклонена</div>
              <div className="deposits__item-commets">
                Автомобиль Mercedes-Benz А123АА123...
              </div>
            </li>

            <li className="deposits__item">
              <div className="deposits__item-status"></div>
              <div className="deposits__item-id">ID345678</div>
              <div className="deposits__item-data">10/01/23</div>
              <div className="deposits__item-status-deposite">Активна</div>
              <div className="deposits__item-sum">100 USDT </div>
              <div className="deposits__item-data-end">10/01/23</div>
              <div className="deposits__item-status-application">На проверке</div>
              <div className="deposits__item-commets">
                Автомобиль Mercedes-Benz А123АА123...
              </div>
            </li> */}
          </ul>
        </div>
      </section>
    </div>
  )
}