import { useEffect } from "react"
import { useIntegerFractionNumber } from "../../../hooks/useIntegerFractionNumber"

interface DepositInSummProps {
  amount?: number
}

export function DepositInSumm(props: DepositInSummProps) {
  const { amount } = props
  const { integer, fraction, setData } = useIntegerFractionNumber(amount, 4)

  useEffect(() => {
    if(!amount) {
      setData(0)
      return
    }
    setData(amount)
  }, [amount])

  return (
    <div className="deposits__in">
      <p className="deposits__in-label">На депозитах:</p>

      <div className="deposits__in-sum">
        { integer }
        <span>
          ,{ fraction }$
        </span>
      </div>
    </div>
  )
}