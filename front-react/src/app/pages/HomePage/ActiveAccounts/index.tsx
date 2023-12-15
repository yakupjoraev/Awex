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
    const displayCurrency = useAppSelector((state) => state.accountProfile.data?.displayCurrency)

    useEffect(() => {
        getAllWaitingOrdersList()
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

    async function getWaitOrdersList(page: string, status: OrderStatus.status): Promise<ordersList> {
        let newOrdersList: ordersList
        try {
            newOrdersList = await AuthorizedService.ordersList(page, undefined, status)
        } catch(error) {
            throw(error)
        }
        return newOrdersList
    }

    return (
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
    )
}