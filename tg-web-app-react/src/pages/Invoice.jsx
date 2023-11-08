import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../store'
import { getCurrencies, getProject, orderInvoice } from '../apis/Awex'

export default function Invoice() {
  const {config, site} = useContext(AppContext)
  const [showBlock, setShowBlock] = useState()
  const [project, setProject] = useState({})
  const [currencies, setCurrencies] = useState({})
  const [currency, setCurrency] = useState('usdt')
  const [commission, setCommission] = useState('BNB')
  const [uniqueId, setUniqueId] = useState()
  const [successMessage, setSuccessMessage] = useState()
  const [depositAmount, setDepositAmount] = useState()
  const [projectId, setProjectId] = useState()

  const getProjectData = async () => {
    try {
      const response = await getProject()
      if(response?.status == 200) {
        setProject(response?.data)
      }
    } catch (error) {
        console.log(error)
    }
  }

    const getCurrenciesData = async () => {
        try {
          const response = await getCurrencies()
          if(response?.status == 200) {
            setCurrencies(response?.data)
          }
        } catch (error) {
          console.log(error)
        }
    }

    const handleCurrency = (e, currency) => {
        e.preventDefault()
        setCurrency(currency)
        setShowBlock()
    }

    const handleCommission = (e, currency) => {
        e.preventDefault()
        setCommission(currency)
        setShowBlock()
    }

    const handleInvoice = async () => {
        setSuccessMessage()
        setUniqueId()
        let data = {
            name: "Invoice from telegram",
            price: 0.3,
            currency,
            buyerIdentifier: "",
            depositAmount: parseFloat(depositAmount),
            depositReturnTime: 1,
            convertTo: "stablecoin"
        }
        if(projectId) {
            data = {...data, projectId}
        }
        const response = await orderInvoice(data)
        if(response?.status == 200) {
            setSuccessMessage(response?.data?.message)
            setUniqueId(response?.data?.uniqueId)
        }
    }

    useEffect(() => {
        getProjectData()
        getCurrenciesData()
    }, [site?.token])

    return (
        <main>
            <div className="wrapper">
                <h1 className="title">Выставление счета</h1>

                <div className="invoicing">
                    <div className="select" data-select-wrapper>
                    <div className="select__selected" data-select-arrow onClick={() => setShowBlock('currencies')}>
                        Выбор криптовалюты
                        <img className="select__arrow" src="./img/icons/mini-arrow-down.svg" alt="mini-arrow-down" />
                    </div>

                    <ul className={`select__list select-list ${showBlock == 'currencies' ? 'active': ''}`} data-select-list>
                        {currencies?.order?.map(currency => <li className="select__item select-item" data-select-item key={currency} onClick={(e) => handleCurrency(e, currency)}>
                            <img src="./img/icons/bnb.png" alt={currency} />
                            <span>{currency?.toUpperCase()}</span>
                        </li>)}
                    </ul>
                    </div>

                    <div className="sum">
                    <div className="sum__main">
                        <label className="sum__label" htmlFor="sum-2">Сумма</label>
                        <input className="sum__input" id="sum-2" type="number" placeholder="Введите сумму" onChange={(e) => setDepositAmount(e.target.value)} />
                    </div>

                    <div className="sum__right">
                        <p className="sum__text">{currency?.toUpperCase()}</p>
                        <img className="select__arrow" src="./img/icons/mini-arrow-down.svg" alt="mini-arrow-down" />
                    </div>
                    </div>

                    <div className="select" data-select-wrapper>
                        <div className="select__selected" data-select-arrow onClick={() => setShowBlock('commissions')}>
                            Тип комиссии
                            <img className="select__arrow" src="./img/icons/mini-arrow-down.svg" alt="mini-arrow-down" />
                        </div>

                        <ul className={`select__list select-list ${showBlock == 'commissions' ? 'active': ''}`} data-select-list>
                            <li className="select__item select-item" data-select-item onClick={(e) => handleCommission(e, 'BNB')}>
                                <img src="./img/icons/bnb.png" alt="bnb" />

                                <span>BNB</span>
                            </li>
                            <li className="select__item select-item" data-select-item onClick={(e) => handleCommission(e, 'BNB')}>
                                <img src="./img/icons/bnb.png" alt="bnb" />

                                <span>BNB</span>
                            </li>
                            <li className="select__item select-item" data-select-item onClick={(e) => handleCommission(e, 'BNB')}>
                                <img src="./img/icons/bnb.png" alt="bnb" />

                                <span>BNB</span>
                            </li>
                        </ul>
                    </div>

                    <div className="select" data-select-wrapper>
                    <div className="select__selected" data-select-arrow>
                        Выбор проекта
                        <img className="select__arrow" src="./img/icons/mini-arrow-down.svg" alt="mini-arrow-down" />
                    </div>

                    <ul className="select__list select-list" data-select-list>
                        {project?.list?.map(project => <li className="select__item select-item" data-select-item key={project?.id} onClick={() => setProjectId(project?.id)}>
                            <img src="./img/icons/bnb.png" alt="bnb" />
                            <span>{project?.data?.properties?.name}</span>
                        </li>)}
                    </ul>
                    </div>

                    <div className="select" data-select-wrapper>
                    <div className="select__selected" data-select-arrow>
                        Формат выставления суммы

                        <img className="select__arrow" src="./img/icons/mini-arrow-down.svg" alt="mini-arrow-down" />
                    </div>

                    <ul className="select__list select-list" data-select-list>
                        <li className="select__item select-item" data-select-item>
                        <img src="./img/icons/bnb.png" alt="bnb" />

                        <span>BNB</span>
                        </li>
                        <li className="select__item select-item" data-select-item>
                        <img src="./img/icons/bnb.png" alt="bnb" />

                        <span>BNB</span>
                        </li>
                        <li className="select__item select-item" data-select-item>
                        <img src="./img/icons/bnb.png" alt="bnb" />

                        <span>BNB</span>
                        </li>
                    </ul>
                    </div>

                    <div className="checkbox-item">
                    <label className="checkbox-item__label" htmlFor="checkbox-4">
                        <input className="checkbox-item__input" type="checkbox" id="checkbox-4" data-checkbox-input />

                        <div className="checkbox-item__decor"></div>

                        <span>Депозит</span>
                    </label>
                    </div>

                    <div className="checked-others">
                    <div className="sum">
                        <div className="sum__main">
                        <label className="sum__label" htmlFor="sum-3">Сумма депозита</label>
                        <input className="sum__input" id="sum-3" type="number" placeholder="Введите сумму" />
                        </div>

                        <div className="sum__right">
                        <p className="sum__text">RUB</p>
                        <img className="select__arrow" src="./img/icons/mini-arrow-down.svg" alt="mini-arrow-down" />
                        </div>
                    </div>

                    <div className="sum">
                        <div className="sum__main">
                        <label className="sum__label" htmlFor="sum-4">Срок депозита</label>
                        <input className="sum__input" id="sum-4" type="text" placeholder="Срок депозита" defaultValue="21 день" />
                        </div>
                    </div>

                    <div className="select" data-select-wrapper>
                        <div className="select__selected" data-select-arrow>
                        Способ возврата депозита

                        <img className="select__arrow" src="./img/icons/mini-arrow-down.svg" alt="mini-arrow-down" />
                        </div>

                        <ul className="select__list select-list" data-select-list>
                        <li className="select__item select-item" data-select-item>
                            <img src="./img/icons/bnb.png" alt="bnb" />

                            <span>BNB</span>
                        </li>
                        <li className="select__item select-item" data-select-item>
                            <img src="./img/icons/bnb.png" alt="bnb" />

                            <span>BNB</span>
                        </li>
                        <li className="select__item select-item" data-select-item>
                            <img src="./img/icons/bnb.png" alt="bnb" />

                            <span>BNB</span>
                        </li>
                        </ul>
                    </div>
                    </div>


                    <button type="button" className="second-btn" disabled={!depositAmount} onClick={handleInvoice}>Сгенерировать платежную ссылку</button>

                    {uniqueId && <>
                        <div className="copy">
                            <input type="text" className="copy__text" defaultValue={uniqueId} />

                            <button type="button" className="copy__btn" onClick={() => navigator.clipboard.writeText(`${config.siteUrl}/payment/${uniqueId}`)}>
                                <img src="./img/icons/copy.svg" alt="copy" />
                            </button>
                        </div>

                        <button type="submit" className="third-btn">Отправить</button>
                    </>}
                </div>
            </div>
        </main>
    )
}
