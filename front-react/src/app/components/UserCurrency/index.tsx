import { useAppSelector, useAppDispatch } from "@store/hooks"
import usePortal from "react-useportal"
import { SelectCurrencyModal, Currency } from "@components/SelectCurrenyModal"
import { useEffect, useState } from "react"
import { AuthenticatedService } from "@awex-api"
import { getAccountProfile } from "@store/accountProfile/slice"
import { getAccountBalance } from "@store/accountBalance/slice"

export function UserCurrency() {  
  const { Portal } = usePortal()
  const dispatch = useAppDispatch()
  const displayCurrency = useAppSelector((state) => state.accountProfile.data?.displayCurrency)
  const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false)
  const [userCurrencies, setUserCurrencies] = useState<Currency[]>([])


  useEffect(() => {
    getProfileCurrencies()
  }, [])


  function getProfileCurrencies() {
    AuthenticatedService.accountProfileCurrencies()
    .then((response) => {
      if(!response) {
        setUserCurrencies([])
        return
      }
      const newCurrencies = response.currencies.map((currency: string) => {
        return {
          currency
        }
      })
      setUserCurrencies(newCurrencies)
    })
    .catch((error: string) => {
      console.error(error)
    })
  }

  function openCurrencyModal() {
    setIsOpenSelect(true)
  }

  function selectedCurrency(currency: string):void {
    const requestBody: {currency?: string} = {
      currency
    }
    AuthenticatedService.currencySet(requestBody)
    .then((response) => {
      if(!response) return
      console.log(response)
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      dispatch(getAccountProfile())
      dispatch(getAccountBalance())
    })
  }


  return (
    <>
      <div className="sidebar__currency">
        <div className="sidebar__currency-inner">
          <span className="sidebar__currency-label">Валюта:</span>

          <div className="sidebar__currency-select open-modal-btn"
            onClick={openCurrencyModal}
          >
            <span>{ displayCurrency?.toUpperCase() }</span>

            <img className="sidebar__currency-srrow"
              src="/img/sidebar/arrow.svg"
              alt="arrow"
            />
          </div>
        </div>
      </div>

      <Portal>
        <SelectCurrencyModal
          open={isOpenSelect}
          currencies={userCurrencies}
          onSelect={selectedCurrency}
          onClose={() => setIsOpenSelect(false)}
        />
      </Portal>

    </>
  )
}