import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { DepositFilters } from "./DepositFilters"
import { DepositInfo } from "./DepositInfo"
import { DepositInSumm } from "./DepositInSumm"
import { DepositsList } from "./DepositsList"
import { AuthorizedService } from "@awex-api"
import toast from "react-hot-toast"
import { msg } from "@constants/messages"


namespace DepositStatus {
  export enum status {
      WAIT = 'wait',
      PAID = 'paid',
      EXPIRED = 'expired',
  }
}

export type Deposit = {
  id?: number
  data?: {
      name?: string
      price?: number
      currency?: string
      rate?: number
  }
  deposit?: {
      name?: string
      amount?: number
      currency?: string
      rate?: number
      returnTime?: number
  }
  amount?: number
  depositAmount?: number
  depositReturnTime?: number
  buyerIdentifier?: string
  status?: DepositStatus.status
  createdAt?: number
}

interface DepositsFilters {
  projectId?: number
  status?: DepositStatus.status
  startTime?: number
  endTime?: number
}


const depositsFiltersDefault:DepositsFilters = {
  projectId: undefined,
  status: undefined,
  startTime: undefined,
  endTime: undefined,
}


export function DepositsPage() {
  const [deposits, setDeposits] = useState<Deposit[]>([])
  const [depositsPage, setDepositsPage] = useState<number>(1)
  const [depositsPages, setDepositsPages] = useState<number>(1)
  const [depositsFilters, setDepositsFilters] = useState<DepositsFilters>(depositsFiltersDefault)
  const [getDepositsInProcess, setGetDepositsInProcess] = useState<boolean>(false)
  // const [filteredDeposits, setFilteredDeposits] = useState()


  useEffect(() => {
    getDeposits()
  }, [depositsFilters, depositsPage])


  function getDeposits(): void {
    if(getDepositsInProcess) return
    setGetDepositsInProcess(true)
    const { projectId, status, startTime, endTime } = depositsFilters
    AuthorizedService.depositsList(depositsPage.toString(), projectId, status, startTime, endTime)
    .then((response) => {
      if(!response || response.list === undefined) {
        toast.error(msg.UNEXPECTED_ERROR)
        setDeposits([])
        return
      }
      const newDeposits: Deposit[] = depositsPage === 1 ? [...response.list] : [...deposits, ...response.list]
      setDeposits(newDeposits)
      setDepositsPages(response.pages ? response.pages : 1)
    })
    .catch((error) => {
      console.error(error)
      setDeposits([])
    })
    .finally(() => {
      setGetDepositsInProcess(false)
    })
  }
  
  function changeDepositsFilters(newFilter: DepositsFilters): void {
    const newDepositsFilter = {
      ...depositsFilters,
      ...newFilter,
    }
    setDepositsFilters(newDepositsFilter)
    setDepositsPage(1)
  }

  function scrollLoad() {
    depositsPage < depositsPages && setDepositsPage(depositsPage + 1)
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

        <DepositsList
          depositsList={deposits}
          onLoadMore={scrollLoad}
        />
      </section>
    </div>
  )
}