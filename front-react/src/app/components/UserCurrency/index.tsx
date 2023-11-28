
import { useDispatch } from "react-redux"
import { useAppSelector } from "@store/hooks"
import usePortal from "react-useportal"
import { SelectCurrencyModal, Currency } from "@components/SelectCurrenyModal"
import { useState } from "react"

export function UserCurrency() {  
  const { Portal } = usePortal()
  const dispatch = useDispatch()
  const displayCurrency = useAppSelector((state) => state.accountProfile.data?.displayCurrency)
  const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false)
  const [userCurrencies, setUserCurrencies] = useState<Currency[]>([])


  function selectedCurrency(currency: string, chain?: string | null):void {

  }


  return (
    <>
      <div className="sidebar__currency">
        <div className="sidebar__currency-inner">
          <span className="sidebar__currency-label">Валюта:</span>

          <div className="sidebar__currency-select open-modal-btn" data-modal-id="select-modal">
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
          // loading={props.loading}
          onSelect={selectedCurrency}
          onClose={() => setIsOpenSelect(false)}
        />
      </Portal>

    </>
  )
}