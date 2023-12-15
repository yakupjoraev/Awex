import { AuthorizedService } from "@awex-api"
import { useEffect, useState } from "react"
import { DepositInSumm } from "../DepositInSumm"


interface DepositInfoData {
  withdrawRequestsNumber: number
  withdrawRequestsAmount: string
  activeDepositsNumber: number
  activeDepositsAmount: string
  onReviewWithdrawRequestsNumber: number
}


export function DepositInfo() {
  const [data, setData] = useState<DepositInfoData | null>(null)
  const [dataisLoading, setDataisLoading] = useState<boolean>(false)


  useEffect(() => {
    getData()
  }, [])


  function getData() {
    if(dataisLoading) return
    setDataisLoading(true)
    AuthorizedService.getOrderDepositData()
    .then((response) => {
      if(!response) return
      setData(response)
    })
    .catch((error) => {
      console.error(error)
      setData(null)
    })
    .finally(() => {
      setDataisLoading(false)
    })
  }


  return (
    <>
      <div className="deposits__infos">
        <div className="deposits__info deposits__info--black">
          <div className="deposits__info-row">
            <div className="deposits__info-name">Заявки на возврат:</div>
            <div className="deposits__info-count deposits__info-count--red">
              { data?.withdrawRequestsNumber }
            </div>
          </div>

          <div className="deposits__info-row">
            <div className="deposits__info-label">На сумму:</div>
            <div className="deposits__info-sum">
              { data?.withdrawRequestsNumber }
            </div>
          </div>
        </div>

        <div className="deposits__info">
          <div className="deposits__info-row">
            <div className="deposits__info-name">Активные депозиты:</div>
            <div className="deposits__info-count">
              { data?.activeDepositsNumber }
            </div>
          </div>

          <div className="deposits__info-row">
            <div className="deposits__info-label">На сумму:</div>
            <div className="deposits__info-sum">
              { data?.activeDepositsAmount }
            </div>
          </div>
        </div>

        <div className="deposits__info">
          <div className="deposits__info-row">
            <div className="deposits__info-name">На проверке:</div>
            <div className="deposits__info-count">
              { data?.onReviewWithdrawRequestsNumber }
            </div>
          </div>
        </div>
      </div>

      <DepositInSumm
        amount={Number(data?.activeDepositsAmount)}
      />

    </>
  )
}