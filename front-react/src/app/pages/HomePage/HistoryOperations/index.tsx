import { useEffect, useState } from "react"
import { AuthorizedService } from "@awex-api"
import { HistoryFilters } from "./HistoryFilters"
import { useShortString } from "../../../hooks/useShortString"
import { useInView } from 'react-intersection-observer'
import { HistoryOperationsHeader } from "./HistoryOperationsHeader"


interface TransactionsQuery {
  startTime?: string
  endTime?: string
  projectId?: string
  currency?: string
  type?: string
  classType?: string
}

interface History {
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

interface HistoryOperationsProps {
  isFullFrame?: boolean
}


export function HistoryOperations(props: HistoryOperationsProps) {
  const [shortingString, setString, shortString] = useShortString('', 8)
  const { ref, inView, entry } = useInView({
    threshold: 0.5,
  })
  const [historyFilter, setHistoryFilter] = useState<TransactionsQuery>({})
  const [histories, setHistories] = useState<History[]>([])
  const [historyPage, setHistoryPage] = useState<number>(1)
  const [pages, setPages] = useState<number>(1)
  const [getingHistoryInProcess, setGetingHistoryInProcess] = useState<boolean>(false)


  useEffect(() => {
    getHistory()
  }, [historyFilter, historyPage])

  useEffect(() => {
    scrollLaod()
  }, [inView])
  

  function getHistory() {
    if(getingHistoryInProcess) return
    setGetingHistoryInProcess(true)
    AuthorizedService.getTransactions(historyFilter, historyPage?.toString())
    .then((response) => {
      console.log('response', response)
      if(!response) {
        setHistories([])
        return
      }
      const newHistories = historyPage === 1 ? [...response.list] : [...histories, ...response.list]
      console.log('getHistory newHistories', newHistories)
      setHistories(newHistories)
      setPages(response.pages)
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      setGetingHistoryInProcess(false)
    })
  }

  function changeHistoryFilter(newFilter: TransactionsQuery): void {
    const newHistoryFilter = {
      ...historyFilter,
      ...newFilter,
    }
    setHistoryFilter(newHistoryFilter)
    setHistoryPage(1)
  }

  function scrollLaod(): void {
    if(!inView) return
    historyPage < pages && setHistoryPage(historyPage + 1)
  }


  return (
    <div className="history-operations">

      { !props.isFullFrame && <HistoryOperationsHeader /> }
      
      <HistoryFilters
        isFullFrame={props.isFullFrame}
        setFilter={changeHistoryFilter}
      />

      <div className={`history-operations__container${ props.isFullFrame ? ' history-operations__container_full' : '' }`}>
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

          { histories && histories.length > 0 && (
            histories.map((history) => {
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
                  <div className="history-operations__item-sum">{ history.paymentOrderAmount } { history.currency }</div>
                  <div className="history-operations__item-deposite">{ history.paymentDepositAmount } { history.currency }</div>
                  <div className="history-operations__item-check">{ shortString(history.invoice) }</div>
                  <div className="history-operations__item-details">{ history.details }</div>
                </li>
              )
            })
          )}
          
          <li className="history-operations__item" ref={ref}></li>
        </ul>
      </div>
    </div>
  )
}
