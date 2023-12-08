import { AuthorizedService, CommonService } from "@awex-api"
import { useEffect, useState } from "react"
import { useAppSelector } from "@store/hooks"


type Order = {
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
    status?: OrderStatus.status
    createdAt?: number
}

namespace OrderStatus {
    export enum status {
        WAIT = 'wait',
        PAID = 'paid',
        EXPIRED = 'expired',
    }
}

interface ordersList {
    page?: number
    pages?: number
    list?: Array<Order>
}


export function ActiveAccounts() {
    const [ordersListIsLoading, setOrdersListIsLoading] = useState<boolean>(false)
    const [ordersCount, setOrdersCount] = useState<number>(0)
    const [ordersSumm, setOrdersSumm] = useState<string>('0')
    const [depositsListIsLoading, setDepositsListIsLoading] = useState<boolean>(false)
    const [depositsCount, setDepositsCount] = useState<number>(0)
    const [depositsSumm, setDepositsSumm] = useState<string>('0')
    const displayCurrency = useAppSelector((state) => state.accountProfile.data?.displayCurrency)

    useEffect(() => {
        getAllWaitingOrdersList()
        getAllWaitingDepositsList()
    }, [displayCurrency])

    async function getAllWaitingOrdersList() {
        if(ordersListIsLoading || !displayCurrency) return
        setOrdersListIsLoading(true)
        let page = 1
        const status: OrderStatus.status = OrderStatus.status.WAIT
        let allOrdersList: Order[] = []

        while(true) {
            let newOrdersList: ordersList 
            try {
                newOrdersList = await getWaitOrdersList(page.toString(), status)
            } catch(error) {
                console.error(error)
                break
            }

            if(!newOrdersList || !newOrdersList.list) break
            allOrdersList = [...allOrdersList, ...newOrdersList.list]

            if(!newOrdersList.pages || page >= newOrdersList.pages) break
            page++
        }

        let newOrdersCount: number = allOrdersList.length
        let newOrdersSumm: number = 0
        allOrdersList.forEach((item) => {
            newOrdersSumm += item.amount ? Number(item.amount) : 0
        })
        setOrdersCount(newOrdersCount)

        if(newOrdersSumm === 0) {
            setOrdersSumm('0')
            setOrdersListIsLoading(false)
            return
        }
        
        CommonService.paymentUsdtRate(newOrdersSumm.toString(), displayCurrency.toLocaleLowerCase())
        .then((response) => {
            if(!response) return
            const ordersSummAmount = newOrdersSumm / Number(response.rate)
            setOrdersSumm(ordersSummAmount.toFixed(5))
        })
        .catch((error) => {
            console.error(error)
        })
        .finally(() => {
            setOrdersListIsLoading(false)
        })
    }

    async function getAllWaitingDepositsList() {
        if(depositsListIsLoading || !displayCurrency) return
        setDepositsListIsLoading(true)
        let page = 1
        const status: OrderStatus.status = OrderStatus.status.WAIT
        let allDepositsList: Order[] = []

        while(true) {
            let newDepositsList: ordersList 
            try {
                newDepositsList = await getWaitDepositsList(page.toString(), status)
            } catch(error) {
                console.error(error)
                break
            }

            if(!newDepositsList || !newDepositsList.list) break
            allDepositsList = [...allDepositsList, ...newDepositsList.list]

            if(!newDepositsList.pages || page >= newDepositsList.pages) break
            page++
        }

        let newDepositsCount: number = allDepositsList.length
        let newDepositsSumm: number = 0
        allDepositsList.forEach((item) => {
            newDepositsSumm += item.depositAmount ? Number(item.depositAmount) : 0
        })
        setDepositsCount(newDepositsCount)

        if(newDepositsSumm === 0) {
            setDepositsSumm('0')
            setDepositsListIsLoading(false)
            return
        }
        
        CommonService.paymentUsdtRate(newDepositsSumm.toString(), displayCurrency.toLocaleLowerCase())
        .then((response) => {
            if(!response) return
            const depositsSummAmount = newDepositsSumm / Number(response.rate)
            setDepositsSumm(depositsSummAmount.toFixed(5))
        })
        .catch((error) => {
            console.error(error)
        })
        .finally(() => {
            setDepositsListIsLoading(false)
        })
    }

    async function getWaitOrdersList(page: string, status: OrderStatus.status): Promise<ordersList> {
        let newOrdersList: ordersList
        try {
            newOrdersList = await AuthorizedService.ordersList(page, undefined, status)
        } catch(error) {
            throw(error)
        }
        return newOrdersList
    }

    async function getWaitDepositsList(page: string, status: OrderStatus.status): Promise<ordersList> {
        let newDepositsList: ordersList
        try {
            newDepositsList = await AuthorizedService.depositsList(page, undefined, status)
        } catch(error) {
            throw(error)
        }
        return newDepositsList
    }

    return (
        <>
            <div className="about-check__info">
                <div className="about-check__info-top">
                    <h4 className="about-check__info-title">Активные счета:</h4>
                    <span className="about-check__info-sum">{ ordersCount }</span>
                </div>

                <div className="about-check__info-labels">
                    <div className="about-check__info-label">На сумму:</div>
                    <div className="about-check__info-label">{ ordersSumm }</div>
                </div>
            </div>
            
            <div className="about-check__info">
                <div className="about-check__info-top">
                    <h4 className="about-check__info-title">Активные депозиты:</h4>
                    <span className="about-check__info-sum">{ depositsCount }</span>
                </div>

                <div className="about-check__info-labels">
                    <div className="about-check__info-label">На сумму:</div>
                    <div className="about-check__info-label">{ depositsSumm }</div>
                </div>
            </div>
        </>
    )
}