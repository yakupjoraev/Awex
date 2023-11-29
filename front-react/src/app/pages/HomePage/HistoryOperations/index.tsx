import { useEffect, useState } from "react"
import { AuthorizedService } from "@awex-api"
import { HistoryFilters } from "./HistoryFilters"
import { useShortString } from "../../../hooks/useShortString"

interface TransactionsQuery {
  startTime?: string
  endTime?: string
  projectId?: string
  currency?: string
  type?: string
  classType?: string
}

interface HistoryItem {
  id: number
  orderId: number
  date: number
  userId: number
  type: string // 'debit' | ''
  class: string
  paymentOrderAmount: number
  paymentDepositAmount: number
  paymentTotalAmount: number
  paymentFeeAmount: number
  currency: string
  invoice: string
  details: string
  projectId: number
}

interface Histories {
  page: number
  pages: number
  list: Array<HistoryItem>
}

interface HistoryOperationsProps {}

const historyDefault: Histories = {
  page: 0,
  pages: 0,
  list: []
}

export function HistoryOperations(props: HistoryOperationsProps) {
  const [historyFilter, setHistoryFilter] = useState<TransactionsQuery>({})
  const [histories, setHistories] = useState<Histories>(historyDefault)
  const [shortingString, setString, shortString] = useShortString('', 8)


  useEffect(() => {
    getHistory()
  }, [historyFilter])


  function getHistory() {
    console.log('historyFilter', historyFilter)
    AuthorizedService.getTransactions(historyFilter)
    .then((response) => {
      if(!response) {
        setHistories(historyDefault)
        return
      }
      setHistories({
        ...histories,
        list: response.list
      })
    })
    .catch((error) => {
      console.error(error)
    })
  }

  function changeHistoryFilter(newFilter: TransactionsQuery): void {
    const newHistoryFilter = {
      ...historyFilter,
      ...newFilter,
    }
    setHistoryFilter(newHistoryFilter)
  }


  return (
    <div className="history-operations">
      <div className="history-operations__label">
        <h3 className="history-operations__title main-title">
          История операций
        </h3>

        <a className="history-operations__link" href="#">
          Перейти в Операции
          <img className="history-operations__link-img"
            src="/img/icons/arrow-right.svg"
            alt="Перейти в Операции"
          />
        </a>
      </div>

      <HistoryFilters
        setFilter={changeHistoryFilter}
      />

      <div className="history-operations__container">
        <ul className="history-operations__list">
          <li className="history-operations__item history-operations__item-header">
            <div className="history-operations__item-data">Дата</div>
            <div className="history-operations__item-time">Время</div>
            <div className="history-operations__item-user">User</div>
            <div className="history-operations__item-type">Тип</div>
            <div className="history-operations__item-sum">Сумма операции</div>
            <div className="history-operations__item-deposite">Депозит</div>
            <div className="history-operations__item-check">Счет</div>
            <div className="history-operations__item-details">Детали</div>
          </li>

          { histories && histories.list.length > 0 && (
            histories.list.map((history) => {
              const historyDate = new Date(history.date * 1000)
              const day = historyDate.getDate()
              const month = historyDate.getMonth()
              const year = historyDate.getFullYear()
              const hours = historyDate.getHours()
              const minutes = historyDate.getMinutes()
              const date = `${day}.${month > 9 ? month : `0${month}`}.${year}`
              const time = `${hours > 9 ? hours : `0${hours}`}:${minutes > 9 ? minutes : `0${minutes}`}`
              return (
                <li className="history-operations__item"
                  key={history.id}
                >
                  <div className="history-operations__item-data">{ date }</div>
                  <div className="history-operations__item-time">{ time }</div>
                  <div className="history-operations__item-user">{ history.userId }</div>
                  <div className="history-operations__item-type">{ history.type }</div>
                  <div className="history-operations__item-sum">{ history.paymentTotalAmount } { history.currency }</div>
                  <div className="history-operations__item-deposite">{ history.paymentDepositAmount } { history.currency }</div>
                  <div className="history-operations__item-check">{ shortString(history.invoice) }</div>
                  <div className="history-operations__item-details">{ history.details }</div>
                </li>
              )
            })
          )}
        </ul>
      </div>
    </div>
  )
}
