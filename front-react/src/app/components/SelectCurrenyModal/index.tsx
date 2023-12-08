import React, { useEffect, useMemo, useRef, useState } from "react"
import classNames from "classnames"
import { useDebounce } from "usehooks-ts"
import escapeRegExp from "lodash/escapeRegExp"

const SEARCH_TEXT_DEBOUNCE = 200

export interface Currency {
  currency: string
  name?: string
  rate?: string
  chain?: string
}

interface SelectCurrencyModalProps {
  open: boolean
  currencies?: Currency[]
  loading?: boolean
  onSelect?: (currency: string, chain?: string | null) => void
  onClose: () => void
}

export function SelectCurrencyModal(props: SelectCurrencyModalProps) {
  const modalContentRef = useRef<HTMLFormElement>(null)
  const [searchText, setSearchText] = useState("")
  const debouncedSearchText = useDebounce(searchText, SEARCH_TEXT_DEBOUNCE)

  useEffect(() => {
    setSearchText("")
  }, [props.open])

  const handleCoverClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (
      modalContentRef.current &&
      ev.target instanceof Element &&
      !modalContentRef.current.contains(ev.target)
    ) {
      props.onClose()
    }
  }

  const handleSearchInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(ev.currentTarget.value)
  }

  const handleOptionClick = (
    ev: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const currency = ev.currentTarget.getAttribute("data-value")
    const chain = ev.currentTarget.getAttribute("data-chain")
    
    if (currency === null || !props.currencies) return
    const index = props.currencies.findIndex(
      (listItem) => listItem.currency === currency
    )

    if (index === -1) return

    if (props.onSelect) {
      props.onSelect(currency, chain)
      props.onClose()
    }
  }

  const currenciesBySearchText = useMemo(() => {
    if (props.currencies === undefined) return undefined
    return filterBySearchText(props.currencies, searchText)
  }, [props.currencies, debouncedSearchText])

  return (
    <div className={classNames("modal", { show: props.open })}
      onClick={handleCoverClick}
    >
      <form className="modal-content modal-content--select-list"
        ref={modalContentRef}
      >
        <div className="modal-content__header">
          <h4 className="modal-content__title">Выберете криптовалюту:</h4>

          <button className="close-modal-btn"
            type="button"
            onClick={props.onClose}
          >
            <img src="/img/icons/close-modal.svg" alt="" />
          </button>
        </div>

        <div className="deposits__filter-search search-group">
          <input className="deposits__filter-src search-input"
            type="search"
            placeholder="Поиск"
            value={searchText}
            onChange={handleSearchInputChange}
          />
          <img className="deposits__filter-search-img search-img"
            src="/img/icons/search.svg"
            alt="Поиск"
          />
        </div>

        <div className="modal-content__main">
          <ul className="crypto__list">
            {props.loading && "Загрузка..."}
            {!props.loading &&
              currenciesBySearchText &&
              currenciesBySearchText.map((currency) => {
                return renderOption(
                  currency,
                  currency.currency + currency.chain,
                  handleOptionClick
                )
              })}
          </ul>
        </div>
      </form>
    </div>
  )
}

function renderOption(
  currency: Currency,
  key: string,
  handleClick: (ev: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
) {
  let name: string
  let subName: string | undefined

  if (!currency.name) {
    name = currency.currency.toUpperCase()
    subName = undefined
  } else {
    name = currency.name
    subName = currency.currency.toUpperCase()
  }

  return (
    <li className="crypto___item"
      key={key}
      data-value={currency.currency}
      data-chain={currency.chain ? currency.chain : ''}
      onClick={handleClick}
    >
      <img className="crypto__item-pic"
        src="/img/actives/actives-2.png"
        alt=""
      />

      <div className="crypto__item-info">
        <div className="crypto__item-name">{name}</div>

        {subName && (
          <div className="crypto__item-subname">
            {currency.currency.toUpperCase()}
            {currency.chain !== undefined && (
              <span className="crypto__item-chain">({currency.chain})</span>
            )}
          </div>
        )}
      </div>

      <div className="crypto__item-counts">
        {currency.rate !== undefined && (
          <div className="crypto__item-count--main">{`~${currency.rate} USD`}</div>
        )}
      </div>
    </li>
  )
}

function filterBySearchText(
  currencies: Array<Currency>,
  searchText: string
) {
  let normalizedSearchText = searchText.trim()

  if (normalizedSearchText.length === 0) return currencies
  normalizedSearchText = normalizedSearchText.replace(/\s{2,}/g, " ")

  const searchRe = new RegExp(escapeRegExp(normalizedSearchText), "i")
  const filtered = currencies.filter((listItem) => {
    if (listItem.name !== undefined && searchRe.test(listItem.name)) return true

    if (searchRe.test(listItem.currency)) return true
    return false
  })
  return filtered
}
