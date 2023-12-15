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
}


const depositsFiltersDefault:DepositsFilters = {
  projectId: undefined,
  status: undefined,
  startTime: undefined,
  endTime: undefined,
}


export function DepositsPage() {
  const [deposits, setDeposits] = useState<Deposit[]>([])
  const [filteredDeposits, setFilteredDeposits] = useState<Deposit[]>([])
  const [depositsPage, setDepositsPage] = useState<number>(1)
  const [depositsPages, setDepositsPages] = useState<number>(1)
  const [depositsFilters, setDepositsFilters] = useState<DepositsFilters>(depositsFiltersDefault)
  const [getDepositsInProcess, setGetDepositsInProcess] = useState<boolean>(false)
  const [searchString, setSearchString] = useState<string>('')


  useEffect(() => {
    getDeposits()
  }, [depositsFilters, depositsPage])

  useEffect(() => {
    fiterDeposits()
  }, [searchString, deposits])


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
      // console.log('newDeposits', newDeposits)
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
    if(!isNull(newSearchString)) {
      setSearchString(newSearchString)
    }

    if(!isNull(newFilter)) {
      const newDepositsFilter = {
        ...depositsFilters,
        ...newFilter,
      }
      setDepositsFilters(newDepositsFilter)
      setDepositsPage(1)
    }
  }

  function scrollLoad() {
    depositsPage < depositsPages && setDepositsPage(depositsPage + 1)
  }

  function fiterDeposits(): void {
    const newFilteredDeposits = deposits.filter((deposit) => {
      if(deposit.id === Number(searchString)) return true
      if(deposit.data?.name && deposit.data.name.indexOf(searchString) >= 0) return true
      return false
    })
    setFilteredDeposits(newFilteredDeposits)
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
          depositsList={filteredDeposits}
          onLoadMore={scrollLoad}
        />
      </section>
    </div>
  )
}