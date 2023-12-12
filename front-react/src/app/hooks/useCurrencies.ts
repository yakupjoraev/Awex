import { useEffect, useState } from "react"
import { AuthorizedService } from "@awex-api"

export function useCurrencies(
    defaultValue: { currency: string; name?: string; rate?: string }[]
  ): [
    { currency: string; name?: string; rate?: string }[],
    boolean,
    string | null
  ] {
    const [currencies, setCurrencies] = useState(defaultValue);
    const [currenciesLoading, setCurrenciesLoading] = useState(false);
    const [currenciesError, setCurrenciesError] = useState<string | null>(null)
  
    useEffect(() => {
      setCurrenciesLoading(true)
      AuthorizedService.merchantCurrencies()
        .then((response) => {
          if (!response.currencies) {
            setCurrencies(defaultValue)
          } else {
            const nextCurrencies: {
              currency: string
              name?: string
              rate?: string
              chain?: string
            }[] = []
            for (const listItem of response.currencies) {
              if (listItem.currency === undefined) {
                continue
              }
              nextCurrencies.push({
                currency: listItem.currency,
                name: listItem.name,
                rate: listItem.rate,
                chain: listItem.chain,
              })
            }
            setCurrencies(nextCurrencies)
          }
        })
        .catch((error) => {
          console.error(error)
          setCurrenciesError(
            typeof error.message === "string"
              ? error.message
              : "failed to load currencies"
          )
        })
        .finally(() => {
          setCurrenciesLoading(false)
        })
    }, [])
  
    return [currencies, currenciesLoading, currenciesError]
  }