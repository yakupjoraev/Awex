import { useEffect, useState } from "react"
import { ReferralsFilters } from "./ReferralsFilters"
import { AuthorizedService } from "@awex-api"
import toast from "react-hot-toast"
import { msg } from "@constants/messages"
import daysjs from "dayjs"
import { useInView } from 'react-intersection-observer'
import { isNull } from "lodash"


type Referral = {
    referralId?: number
    createdAt?: number
    status?: 'active' | 'inActive'
    amount?: number
}

export type ReferralFilters = {
    status?: string
    startTime?: number
    endTime?: number
}


const referralStatuses = new Map([
    ['active', 'Активный'],
    ['inActive', 'Не активный']
])


export function ReferralsTable() {
    const [referralsList, setReferralsList] = useState<Referral[]>([])
    const [referralsIsLoading, setReferralsIsLoading] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [pages, setPages] = useState<number>(1)
    const [referralFilters, setReferralFilters] = useState<ReferralFilters>({})
    const { ref, inView } = useInView({
        threshold: 0.5,
    })


    useEffect(() => {
        getReferrals()
    }, [page, referralFilters])
    
    useEffect(() => {
        scrollLaod()
    }, [inView])


    function getReferrals(): void {
        if(referralsIsLoading) return
        setReferralsIsLoading(true)
        const { status, startTime, endTime } = referralFilters
        AuthorizedService.referralsList(page.toString(), status, startTime, endTime)
        .then((response) => {
            if(!response || !response.list || response.list.length === 0) {
                setReferralsList([])
                setPage(1)
                setPages(1)
                return
            }
            const newreferralsList = response.page === 1 ? [ ...response.list ] : [ ...referralsList, ...response.list ]
            setReferralsList(newreferralsList)
            setPages(Number(response.pages))
        })
        .catch((error) => {
            toast.error(msg.SERVER_ERROR)
            console.error(error)
        })
        .finally(() => {
            setReferralsIsLoading(false)
        })
    }
    
    function scrollLaod(): void {
        if(!inView) return
        if(page < pages) {
            setPage(page + 1)
        }
    }

    function changeReferralFilters(newFilter: ReferralFilters): void {
        if(!isNull(newFilter)) {
            const newReferralFilters = {
              ...referralFilters,
              ...newFilter,
            }
            setReferralFilters(newReferralFilters)
            setPage(1)
          }
    } 


    return (
        <div className="history-operations">
            <div className="history-operations__label">
                <h3 className="history-operations__title main-title"> Рефералы: </h3>
            </div>
    
            <ReferralsFilters 
                setFilter={changeReferralFilters}
            />

            <div className="history-operations__container history-operations__container_full">
                <ul className="history-operations__list">
                    <li className="history-operations__item history-operations__item-header">
                        <div className="history-operations__item-data">ID реферала</div>
                        <div className="history-operations__item-time">Статус</div>
                        <div className="history-operations__item-user">Получено</div>
                        <div className="history-operations__item-type">Дата</div>
                    </li>

                    { referralsList && referralsList.map((referral) => {
                        const data = referral.createdAt ? referral.createdAt * 1000 : 0
                        const status = referral.status ? referralStatuses.get(referral.status) : ''

                        return (
                            <li className="history-operations__item" key={referral.referralId}>
                                <div className="history-operations__item-data">{ referral.referralId }</div>
                                <div className="history-operations__item-time">{ status }</div>
                                <div className="history-operations__item-user">{ referral.amount }$</div>
                                <div className="history-operations__item-type">{ daysjs(data).format("DD.MM.YYYY") }</div>
                            </li>
                        )
                    }) }

                    <li ref={ref}></li>
                </ul>
            </div>
        </div>
    )
}