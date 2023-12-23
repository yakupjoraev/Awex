import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { DepositFilters } from "./DepositFilters"
import { DepositInfo } from "./DepositInfo"
import { DepositsList } from "./DepositsList"
import { AuthorizedService } from "@awex-api"
import toast from "react-hot-toast"
import { msg } from "@constants/messages"
import { isNull } from "lodash"


type DepositStatus = 'wait' | 'paid' | 'expired'

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
  status?: DepositStatus
  createdAt?: number
}

interface DepositsFilters {
  projectId?: number
  status?: DepositStatus
  startTime?: number
  endTime?: number
  search?: string
}


const depositsFiltersDefault:DepositsFilters = {
  projectId: undefined,
  status: undefined,
  startTime: undefined,
  endTime: undefined,
  search: undefined,
}


export function DepositsPage() {
  const [deposits, setDeposits] = useState<Deposit[]>([])
  const [depositsPage, setDepositsPage] = useState<number>(1)
  const [depositsPages, setDepositsPages] = useState<number>(1)
  const [depositsFilters, setDepositsFilters] = useState<DepositsFilters>(depositsFiltersDefault)
  const [getDepositsInProcess, setGetDepositsInProcess] = useState<boolean>(false)


  useEffect(() => {
    getDeposits()
  }, [depositsFilters, depositsPage])


  function getDeposits(): void {
    if(getDepositsInProcess) return
    setGetDepositsInProcess(true)
    const { projectId, status, startTime, endTime, search } = depositsFilters
    AuthorizedService.depositsList(depositsPage.toString(), projectId, status, startTime, endTime, search)
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
  
  function changeDepositsFilters(newSearchString: string | null, newFilter: DepositsFilters | null): void {
    let newDepositsFilter: DepositsFilters | null = null

    if(!isNull(newSearchString)) {
      newDepositsFilter = {
        ...depositsFilters,
        search: newSearchString ? newSearchString : undefined,
      }
    }

    if(!isNull(newFilter)) {
      newDepositsFilter = {
        ...depositsFilters,
        ...newFilter,
      }
    }
    
    setDepositsFilters(newDepositsFilter ? newDepositsFilter : depositsFiltersDefault)
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

        <DepositFilters
          setFilter={changeDepositsFilters}
        />

        <DepositsList
          depositsList={deposits}
          onLoadMore={scrollLoad}
        />
      </section>
    </div>
  )
}