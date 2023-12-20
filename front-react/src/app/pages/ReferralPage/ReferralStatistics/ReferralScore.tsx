import { useIntegerFractionNumber } from "../../../hooks/useIntegerFractionNumber"

type ReferralScoreProps = {
    amount: number
}

export function ReferralScore(props: ReferralScoreProps) {
    const { integer, fraction } = useIntegerFractionNumber(props.amount, 3)

    return (
        <div className="referral__score">
            <p className="referral__score-label">Получено от рефералов:</p>
            <div className="referral__score-sum">
                { integer } <span>,{ fraction } $</span>
            </div>
        </div>
    )
}