import { AuthenticatedService } from "@awex-api"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { ReferralScore } from "./ReferralScore"


type ReferralFees = {
    fromFees?: number
    fromTurnover?: number
}

type ReferralStatistics = {
    totalReferralsNumber?: number
    activeReferralsNumber?: number
    earnings?: number
    referralFees?: ReferralFees
}


export function ReferralStatistics() {
    const [onLoadStatistics, setOnLoadStatistics] = useState<boolean>(false)
    const [referralStatistics, setReferralStatistics] = useState<ReferralStatistics>({})
    const [receivedFromReferrals, setReceivedFromReferrals] = useState<number>(0)


    useEffect(() => {
        getStatistics()
    }, [])

    useEffect(() => {
        calcReceivedFromReferrals()
    }, [referralStatistics])


    function getStatistics(): void {
        if(onLoadStatistics) return
        setOnLoadStatistics(true)
        AuthenticatedService.referralStatistics()
        .then((response) => {
            if(!response) {
                setReferralStatistics({})
                return
            }
            setReferralStatistics({...response})
        })
        .catch((error) => {
            console.error(error)
            setReferralStatistics({})
        })
        .finally(() => {
            setOnLoadStatistics(false)
        })
    }

    function calcReceivedFromReferrals(): void {
        if(!referralStatistics || !referralStatistics.referralFees) {
            setReceivedFromReferrals(0)
            return
        }
        const fees: ReferralFees = referralStatistics.referralFees
        const fromFees: number = fees.fromFees ? fees.fromFees : 0
        const fromTurnover: number = fees.fromTurnover ? fees.fromTurnover : 0
        const rezult: number =  fromFees + fromTurnover
        setReceivedFromReferrals(rezult)
    }


    return (
        <div className="referral__header">
            <ReferralScore amount={receivedFromReferrals} />
    
            <div className="referral__scores">
                <div className="referral__score">
                    <p className="referral__score-label">Всего рефералов:</p>
                    <div className="referral__score-sum">
                        { referralStatistics.totalReferralsNumber ? referralStatistics.totalReferralsNumber : '0' }
                    </div>
                </div>
        
                <div className="referral__score">
                    <p className="referral__score-label">Активных рефералов:</p>
                    <div className="referral__score-sum">
                        { referralStatistics.activeReferralsNumber ? referralStatistics.activeReferralsNumber : '0' }
                    </div>
                </div>
            </div>
    
            <NavLink className="referral__score-link history-operations__link" to={'#'}>
                Статистика
                <img className="history-operations__link-img" src="./img/icons/arrow-right.svg" alt="Перейти в Статистика" />
            </NavLink>
        </div>
    )
}