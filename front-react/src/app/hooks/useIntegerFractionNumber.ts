import { useEffect, useState } from "react"


const useIntegerFractionNumber = (initialData: number | undefined, decimals: number = 2) => {
    const [data, setData] = useState(initialData ? initialData : 0)
    const [integer, setInteger] = useState('')
    const [fraction, setFraction] = useState('')


    useEffect(() => {
        if(!data || data === 0) {
            setInteger('0')
            setFraction('0')
            return
        }
        const fixed = data.toFixed(decimals)
        const decimalsWithPoint = decimals + 1
        let integerPart = fixed.slice(0, -decimalsWithPoint)

        if (integerPart.length > 3) {
          integerPart = integerPart.replace(/\d(?=(\d{3})+$)/g, "$&.")
        }
        const fractionalPart = fixed.slice(-decimals)
        setInteger(integerPart)
        setFraction(fractionalPart)
    }, [data])

    return { integer, fraction, setData }
}

export { useIntegerFractionNumber }