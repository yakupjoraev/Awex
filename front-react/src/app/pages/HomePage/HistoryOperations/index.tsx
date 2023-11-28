import { useEffect, useState } from "react"
import { DepositsFiltersSelect } from "../../../components/DepositsFilterSelect"
import { DepositsFilterDate, DateRange } from "../../../components/DepositsFilterDate"
import { AuthorizedService } from "@awex-api"

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

const projectFilterOptions = [
  { value: "0", label: "Приход" },
  { value: "1", label: "Приход" },
  { value: "2", label: "Приход" },
]

const currencyFilterOptions = [
  { value: "0", label: "Все" },
  { value: "1", label: "Все" },
  { value: "2", label: "Все" },
]

const operationFilterOptions = [
  { value: "0", label: "Приход" },
  { value: "1", label: "Приход" },
  { value: "2", label: "Приход" },
]

const dateFilterOptions = [
  { value: "0", label: "01/06/2022-13/06/2023" },
  { value: "1", label: "01/06/2022-13/06/2023" },
  { value: "2", label: "01/06/2022-13/06/2023" },
]

const defaultDateFilterValue: DateRange = {
  from: new Date("2022-01-05T22:00:00.000Z"),
  to: new Date("2023-06-05T22:00:00.000Z"),
}

const historyDefault: Histories = {
  page: 0,
  pages: 0,
  list: []
}


export function HistoryOperations(props: HistoryOperationsProps) {
  const [projectFilter, setProjectFilter] = useState("0")
  const [currencyFilter, setCurrencyFilter] = useState("0")
  const [operationFilter, setOperationFilter] = useState("0")
  const [dateFilter, setDateFilter] = useState<DateRange | undefined>(defaultDateFilterValue)
  const [historyFilter, setHistoryFilter] = useState<TransactionsQuery>({})
  const [histories, setHistories] = useState<Histories>(historyDefault)


  useEffect(() => {
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
  }, [])


  const handleProjectFilterChange = (value: string) => {
    setProjectFilter(value);
  }

  const handleCurrencyFilterChange = (value: string) => {
    setCurrencyFilter(value);
  }

  const handleOperationFilterChange = (value: string) => {
    setOperationFilter(value);
  }

  const handleDateFilterChange = (value?: DateRange) => {
    setDateFilter(value);
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

      <div className="history-operations__header">
        <DepositsFiltersSelect
          label="Проект"
          options={projectFilterOptions}
          value={projectFilter}
          onChange={handleProjectFilterChange}
        />

        <DepositsFiltersSelect
          label="Валюта"
          options={currencyFilterOptions}
          value={currencyFilter}
          onChange={handleCurrencyFilterChange}
        />

        <DepositsFiltersSelect
          label="Тип операции"
          options={operationFilterOptions}
          value={operationFilter}
          onChange={handleOperationFilterChange}
        />

        <DepositsFilterDate
          label="Дата"
          value={dateFilter}
          onChange={handleDateFilterChange}
        />
      </div>

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
              const date = '**.**.****' //history.date
              const time = '**:**' //history.date
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
                  <div className="history-operations__item-check">{ history.invoice }</div>
                  <div className="history-operations__item-details">{ history.details }</div>
                </li>
              )
            })
          )}

          <li className="history-operations__item">
            <div className="history-operations__item-data">10/01/23</div>
            <div className="history-operations__item-time">12:23:45</div>
            <div className="history-operations__item-user">ID345678</div>
            <div className="history-operations__item-type">Прих</div>
            <div className="history-operations__item-sum">100 USDT</div>
            <div className="history-operations__item-deposite">10 USDT</div>
            <div className="history-operations__item-check">1N4Qbzg6LS...</div>
            <div className="history-operations__item-details">комментарий</div>
          </li>

          <li className="history-operations__item">
            <div className="history-operations__item-data">10/01/23</div>
            <div className="history-operations__item-time">12:23:45</div>
            <div className="history-operations__item-user">ID345678</div>
            <div className="history-operations__item-type">Прих</div>
            <div className="history-operations__item-sum">100 USDT</div>
            <div className="history-operations__item-deposite">10 USDT</div>
            <div className="history-operations__item-check">1N4Qbzg6LS...</div>
            <div className="history-operations__item-details">комментарий</div>
          </li>

          <li className="history-operations__item">
            <div className="history-operations__item-data">10/01/23</div>
            <div className="history-operations__item-time">12:23:45</div>
            <div className="history-operations__item-user">ID345678</div>
            <div className="history-operations__item-type">Прих</div>
            <div className="history-operations__item-sum">100 USDT</div>
            <div className="history-operations__item-deposite">10 USDT</div>
            <div className="history-operations__item-check">1N4Qbzg6LS...</div>
            <div className="history-operations__item-details">комментарий</div>
          </li>

          <li className="history-operations__item">
            <div className="history-operations__item-data">10/01/23</div>
            <div className="history-operations__item-time">12:23:45</div>
            <div className="history-operations__item-user">ID345678</div>
            <div className="history-operations__item-type">Прих</div>
            <div className="history-operations__item-sum">100 USDT</div>
            <div className="history-operations__item-deposite">10 USDT</div>
            <div className="history-operations__item-check">1N4Qbzg6LS...</div>
            <div className="history-operations__item-details">комментарий</div>
          </li>

          <li className="history-operations__item">
            <div className="history-operations__item-data">10/01/23</div>
            <div className="history-operations__item-time">12:23:45</div>
            <div className="history-operations__item-user">ID345678</div>
            <div className="history-operations__item-type">Прих</div>
            <div className="history-operations__item-sum">100 USDT</div>
            <div className="history-operations__item-deposite">10 USDT</div>
            <div className="history-operations__item-check">1N4Qbzg6LS...</div>
            <div className="history-operations__item-details">комментарий</div>
          </li>

          <li className="history-operations__item">
            <div className="history-operations__item-data">10/01/23</div>
            <div className="history-operations__item-time">12:23:45</div>
            <div className="history-operations__item-user">ID345678</div>
            <div className="history-operations__item-type">Прих</div>
            <div className="history-operations__item-sum">100 USDT</div>
            <div className="history-operations__item-deposite">10 USDT</div>
            <div className="history-operations__item-check">1N4Qbzg6LS...</div>
            <div className="history-operations__item-details">комментарий</div>
          </li>

          <li className="history-operations__item">
            <div className="history-operations__item-data">10/01/23</div>
            <div className="history-operations__item-time">12:23:45</div>
            <div className="history-operations__item-user">ID345678</div>
            <div className="history-operations__item-type">Прих</div>
            <div className="history-operations__item-sum">100 USDT</div>
            <div className="history-operations__item-deposite">10 USDT</div>
            <div className="history-operations__item-check">1N4Qbzg6LS...</div>
            <div className="history-operations__item-details">комментарий</div>
          </li>
        </ul>
      </div>
    </div>
  )
}
