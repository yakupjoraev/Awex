import { AuthorizedService } from "@awex-api"
import { useEffect, useState } from "react"


interface DepositInfoData {
    withdrawRequestsNumber: number
    withdrawRequestsAmount: string
    activeDepositsNumber: number
    activeDepositsAmount: string
    onReviewWithdrawRequestsNumber: number
}


export function ActiveDeposits() {
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
        <div className="about-check__info">
            <div className="about-check__info-top">
                <h4 className="about-check__info-title">Активные депозиты:</h4>
                <span className="about-check__info-sum">{ data?.activeDepositsNumber }</span>
            </div>

            <div className="about-check__info-labels">
                <div className="about-check__info-label">На сумму:</div>
                <div className="about-check__info-label">{ data?.activeDepositsAmount }</div>
            </div>
        </div>
    )
}