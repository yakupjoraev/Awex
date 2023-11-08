import { ApiError, CommonService } from "@awex-api"
import { InternalErrorMessage } from "@components/InternalErrorMessage"
import { LdsSpinner } from "@components/LdsSpinner"
import { NotFoundErrorMessage } from "@components/NotFoundErrorMessage"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router-dom"
import { PaymentCurrencySelector } from "./PaymentCurrencySelector"


type OrderError = { type: "unknown" | "not_found" }

interface PayerCurrency {
  type: string
  currency: string
  chain: string
}

interface PaymentData {
  type: string
  chain: string
  currency: string
  paymentAmount: string
  address: string
}

interface PaymentOrder {
  amount: string
  paid: boolean
  type: string
  currency: string
  chain: string
  userCurrency: string
  userChain: string
  name?: string | undefined
  paymentData?: PaymentData | null
}

interface Currency {
  currency: string
  name?: string
  rate?: string
  chain?: string
}

interface OrderPaymentRequest {
  type: string
  currency: string
  chain: string
}

type PaymentStatus = 'invoicing' | 'prepared' | 'paid' | 'expired' | 'success'

const DEFAULT_PAYER_CURRENCY: PayerCurrency = {
  type: 'crypto',
  currency: 'usdt',
  chain: 'trc20usdt',
}

export function PaymentPage() {

  let checkingPaidTimer: any = null

  const { uniqueId } = useParams()
  const [orderLoading, setOrderLoading] = useState<boolean>(false)
  const [currenciesLoading, setCurrenciesLoading] = useState(false)
  const [orderError, setOrderError] = useState<OrderError | null>(null)
  const [orderCurrency, setOrderCurrency] = useState<PayerCurrency>(DEFAULT_PAYER_CURRENCY)
  const [paymentOrder, setPaymentOrder] = useState<PaymentOrder | null>(null)
  const [currencies, setCurrencies] = useState<Currency[] | null>(null)
  const [currenciesError, setCurrenciesError] = useState<string | null>(null)
  const [paymentAmountValue, setPaymentAmountValue] = useState<string | undefined>(undefined)
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('invoicing')


  useEffect(() => {
    getOrderPayment(uniqueId)
    return () => {
      clearInterval(checkingPaidTimer)
    }
  }, [uniqueId])

  useEffect(() => {
    if(!paymentOrder) {
      setPaymentAmountValue(undefined)
      return
    }
    let newpaymentAmountValue
    if(paymentOrder.paymentData) {
      newpaymentAmountValue = paymentOrder.paymentData.paymentAmount
    } else {
      newpaymentAmountValue = Number(paymentOrder.amount) / currencyRate(paymentOrder.userCurrency, paymentOrder.userChain)
    }
    setPaymentAmountValue(newpaymentAmountValue.toString())
  }, [paymentOrder])

  function currencyRate(userCurrency: string, userChain: string): number {
    if(!currencies) {
      return 1
    }
    const currency: Currency[] = currencies.filter((item) =>  item.chain === userChain && item.currency === userCurrency)
    return Number(currency[0].rate)
  }

  function getOrderPayment(uniqueId: string | undefined): void {
    if (!uniqueId) {
      setPaymentOrder(null)
      setPaymentStatus('invoicing')
      setOrderLoading(false)
      setOrderError({ type: "not_found" })
      return
    }
    setOrderLoading(true)
    CommonService.orderPaymentGet(uniqueId)
      .then((response) => {
        const {amount, expired, name, paid, paymentData} = response

        if(expired && !paid) {
          setPaymentOrder(null)
          setPaymentStatus('expired')
          return
        }
        
        if (!amount) {
          setPaymentOrder(null)
          setPaymentStatus('invoicing')
          setOrderError({ type: "not_found" })
          return
        }
        setPaymentOrder({
          amount: amount.toString(),
          paid: paid,
          name: name ? name : undefined,
          type: orderCurrency.type,
          currency: orderCurrency.currency,
          chain: orderCurrency.chain,
          userCurrency: paymentData ? paymentData.currency : orderCurrency.currency,
          userChain: paymentData ? paymentData.chain : orderCurrency.chain,
          paymentData: paymentData ? paymentData : null
        })
        setPaymentStatus(paid ? 'success' : paymentData ? 'prepared' : 'invoicing')
        getPaymentCurrencies(paymentOrder?.amount)
      })
      .catch((error) => {
        if (error instanceof ApiError && error.status === 404) {
          setPaymentOrder(null)
          setOrderError({ type: "not_found" })
        } else {
          setPaymentOrder(null)
          setOrderError({ type: "unknown" })
        }
      })
      .finally(() => {
        setOrderLoading(false)
      })
  }

  function getPaymentCurrencies(paymentAmount?: string): void {
    setCurrenciesLoading(true);
    CommonService.paymentCurrencies(paymentAmount)
      .then((response) => {
        if (!response.currencies) {
          setCurrencies(null)
        } else {
          const nextCurrencies: Currency[] = []
          for (const currency of response.currencies) {
            nextCurrencies.push({
              currency: currency.currency,
              name: currency.name,
              rate: currency.rate,
              chain: currency.chain,
            });
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
  }
  
  function networkPaymentSelected(currency: string, chain?: string | null): void {
    setPaymentOrder(paymentOrder ? {
      ...paymentOrder,
      userCurrency: currency,
      userChain: chain ? chain : paymentOrder.chain,
      paymentData: paymentOrder.paymentData ? {...paymentOrder.paymentData} : null
    } : null)
  }

  function toPay(event: any): void {
    event.preventDefault()

    if(!paymentOrder || !uniqueId) return
    setOrderLoading(true)
    const request: OrderPaymentRequest = {
      type: paymentOrder.type,
      currency: paymentOrder.userCurrency.toLocaleLowerCase(),
      chain: paymentOrder.userChain,
    }
    CommonService.orderPaymentSet(uniqueId, request)
    .then((response) => {
      const dataOrder: PaymentData | null = response.paymentData ? {
        type: response.paymentData.type,
        paymentAmount: response.paymentData.paymentAmount,
        currency: response.paymentData.currency,
        chain: response.paymentData.chain,
        address: response.paymentData.address,
      } : null

      if(!paymentOrder || !dataOrder) return
      setPaymentOrder({
        ...paymentOrder,
        userCurrency: dataOrder.currency ? dataOrder.currency : paymentOrder.userCurrency,
        userChain: dataOrder.chain ? dataOrder.chain : paymentOrder.userChain,
        paymentData: { ...dataOrder }
      })
      setPaymentStatus(dataOrder ? 'prepared' : 'invoicing')
    })
    .catch((error) => {
      if (error instanceof ApiError && error.status === 403) {
        console.log("not_found error", error)
      } else {
        console.log("unknown error", error)
      }
    })
    .finally(() => {
      setOrderLoading(false)
    })
  }

  function changeMethod(event: any) {
    event.preventDefault()
    setPaymentStatus('invoicing')
  }

  function startWaitingForPayment(): void {
    setPaymentStatus('paid')
    startCheckingPaid()
  }

  function startCheckingPaid(): void {
    if(!checkingPaid()) {
      checkingPaidTimer = setInterval(() => {
        checkingPaid()
      }, 30000)
    }
  }

  function checkingPaid(): boolean {
    if(!uniqueId) return false
    let status: boolean = false
    CommonService.orderPaymentGet(uniqueId)
    .then((response) => {
      const {paid} = response
      if(paid) {
        setPaymentStatus('success')
        clearInterval(checkingPaidTimer)
        status = true
      }
    })
    .catch((error) => {
      console.error(error)
    })
    return status
  }

  if (orderLoading) {
    return (
      <main className="main">
        <Helmet title="Детали счета" />
        <div className="wrapper wrapper-spinner">
          <LdsSpinner />
        </div>
      </main>
    );
  }

  if (orderError) {
    if (orderError.type === "not_found") {
      return (
        <main className="main">
          <Helmet title="Счет не найден" />
          <div className="wrapper">
            <NotFoundErrorMessage />
          </div>
        </main>
      );
    } else {
      return (
        <main className="main">
          <Helmet title="Внутренняя ошибка" />
          <InternalErrorMessage />
        </main>
      );
    }
  }

  return (
    <main className="main">
      <Helmet title="Загружено" />
      
      <div className="wrapper-payment">
        <div className="payment">
          <a href="/" className="payment__logo">
            <img className="payment__logo-img" src="/img/icons/logo-2.svg" alt="" />
          </a>

          { paymentStatus === 'invoicing' && (
            <form className="payment__from payment-form" action="#">
              <div className="payment-form__group">
                <p className="payment-form__label">
                  Выберете способ оплаты
                </p>

                <div className="payment-form__radios">
                  <div className="payment-form__radio">
                    <input className="payment-form__radio-input" type="radio" name="pay" id="pay1" checked />
                    <label className="payment-form__radio-label" htmlFor="pay1">Крипто</label>
                  </div>

                  <div className="payment-form__radio">
                    <input className="payment-form__radio-input" type="radio" name="pay" id="pay2" />
                    <label className="payment-form__radio-label" htmlFor="pay2">Наличный расчет</label>
                  </div>

                  <div className="payment-form__radio">
                    <input className="payment-form__radio-input" type="radio" name="pay" id="pay3" />
                    <label className="payment-form__radio-label" htmlFor="pay3">Карта РФ</label>
                  </div>

                  <div className="tooltip" data-tooltip="Доступно для операций до 99.000 RUB" data-tooltip-pos="right" data-tooltip-length="medium">
                    <img className="payment-form__radio-pic" src="/img/icons/tooltip.svg" alt="tooltip" />
                  </div>
                </div>

                <div className="about-deposit__generation-select invoice__generation-select">
                  <div className="about-deposit__generation-selected">
                    <div className="about-deposit__generation-info">
                      <input className="about-deposit__generation-input" type="number" placeholder="Введите сумму" value={paymentAmountValue} />
                    </div>

                    <div className="about-deposit__generation-currency open-modal-btn">
                      <PaymentCurrencySelector
                        currency={paymentOrder?.userCurrency}
                        currencies={currencies ? currencies : undefined}
                        loading={currenciesLoading}
                        onChange={networkPaymentSelected}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="payment-form__group">
                <p className="payment-form__label">
                  Выберете способ возврата депозита
                </p>

                <div className="payment-form__radios">
                  <div className="payment-form__radio">
                    <input className="payment-form__radio-input" type="radio" name="returnPay" id="pay4" checked />
                    <label className="payment-form__radio-label" htmlFor="pay4">Крипто</label>
                  </div>

                  <div className="payment-form__radio">
                    <input className="payment-form__radio-input" type="radio" name="returnPay" id="pay5" />
                    <label className="payment-form__radio-label" htmlFor="pay5">Карта РФ</label>
                  </div>
                </div>

                
                <div className="invoice-project__group-select" data-select-wrapper>
                  <div className="invoice-project__group-selected" data-select-arrow>
                    Выберете криптовалюту
                    <img className="invoice-project__group-select-arrow" src="/img/icons/mini-arrow-down.svg" alt="mini-arrow-down" />
                  </div>

                  <ul className="invoice-project__group-list select-list" data-select-list>
                    <li className="invoice-project__group-item select-item" data-select-item>Выберете криптовалюту</li>
                    <li className="invoice-project__group-item select-item" data-select-item>Выберете криптовалюту</li>
                    <li className="invoice-project__group-item select-item" data-select-item>Выберете криптовалюту</li>
                  </ul>
                </div>

                <div className="invoice-project__group-select" data-select-wrapper>
                  <div className="invoice-project__group-selected" data-select-arrow>
                    Выберете сеть
                    <img className="invoice-project__group-select-arrow" src="/img/icons/mini-arrow-down.svg" alt="mini-arrow-down" />
                  </div>

                  <ul className="invoice-project__group-list select-list" data-select-list>
                    <li className="invoice-project__group-item select-item" data-select-item>Выберете сеть</li>
                    <li className="invoice-project__group-item select-item" data-select-item>Выберете сеть</li>
                    <li className="invoice-project__group-item select-item" data-select-item>Выберете сеть</li>
                  </ul>
                </div>

                <div className="my-projects__group project-group">
                  <label className="my-projects__label project-label" htmlFor="#">
                    Адрес кошелька
                  </label>
                  <input className="my-projects__input project-input" type="text" placeholder="Введите адрес кошелька" />
                </div>

                {/* <div className="my-projects__group project-group">
                  <label className="my-projects__label project-label" htmlFor="#">
                    Введите номер карты
                  </label>
                  <input className="my-projects__input project-input" type="text" placeholder="Введите номер" />
                </div>

                <div className="my-projects__group project-group">
                  <label className="my-projects__label project-label" htmlFor="#">
                    ФИО владельца
                  </label>
                  <input className="my-projects__input project-input" type="text" placeholder="Введите ФИО" />
                </div> */}
              </div>

              <div className="payment-form__group">
                <p className="payment-form__label">
                  Отправить уведомление на почту
                </p>

                <div className="my-projects__group project-group">
                  <label className="my-projects__label project-label" htmlFor="#">
                    E-mail
                  </label>
                  <input className="my-projects__input project-input" type="text" placeholder="Введите ваш e-mail" />
                </div>
              </div>

              <div className="payment-form__btns">
                <button className="payment-form__btn second-btn"
                  onClick={toPay}
                >
                  Оплатить
                </button>

                <button className="payment-form__btn blue-btn">
                  <img src="/img/icons/WalletConnect.svg" alt="" />
                </button>

                <button className="payment-form__btn second-btn">
                  <img src="/img/icons/payment-form-awex.svg" alt="" />
                </button>
              </div>

              <div className="payment-form__footer">
                Нажимая «Оплатить», вы принимаете
                <a href="#">пользовательское соглашение..</a>
              </div>
            </form>
            )}

          { paymentStatus === 'prepared' && (
            <form className="payment__from payment-form" action="#">
              <div className="payment-form__group">
                <div className="payment-form__label">
                  Реквизиты для оплаты

                  <a className="payment-form__label-link"
                    onClick={changeMethod}
                  >
                    Изменить способ
                    <img className="payment-form__label-arrow" src="/img/icons/arrow-right.svg" alt="" />
                  </a>
                </div>

                <div className="about-deposit__generation-select invoice__generation-select about-deposit__generation-select--white ">
                  <div className="about-deposit__generation-selected">
                    <div className="about-deposit__generation-info">
                      <input className="about-deposit__generation-input" type="number" placeholder="Введите сумму" value={paymentOrder?.paymentData?.paymentAmount}
                        disabled />
                    </div>

                    <div className="about-deposit__generation-currency">
                      <div className="about-deposit__generation-curr">
                        {/* <img src={`/img/${paymentOrder?.paymentData?.chain}.png`} alt="" /> */}
                        <img src="/img/usdt.png" alt="" />
                        {paymentOrder?.paymentData?.currency}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="invoice-project__group-select" data-select-wrapper>
                  <div className="invoice-project__group-selected" data-select-arrow>
                    Выберете сеть
                    <img className="invoice-project__group-select-arrow" src="/img/icons/mini-arrow-down.svg" alt="mini-arrow-down" />
                  </div>

                  <ul className="invoice-project__group-list select-list" data-select-list>
                    <li className="invoice-project__group-item select-item" data-select-item>Выберете сеть</li>
                    <li className="invoice-project__group-item select-item" data-select-item>Выберете сеть</li>
                    <li className="invoice-project__group-item select-item" data-select-item>Выберете сеть</li>
                  </ul>
                </div>
              </div>

              <div className="payment-form__group">
                <p className="payment-form__label">
                  Возврат депозита на карту РФ
                  <a className="payment-form__label-link"
                    onClick={changeMethod}
                  >
                    Изменить
                    <img className="payment-form__label-arrow" src="/img/icons/arrow-right.svg" alt="" />
                  </a>
                </p>

                <div className="my-projects__card">
                  <div className="my-projects__card-num">
                    <span>**** **** **** </span>
                    <span>1234</span>
                  </div>

                  <div className="my-projects__card-name">
                    IVANOV I.
                  </div>
                </div>
              </div>

              <div className="payment-form__btns">
                <button className="payment-form__btn second-btn"
                  onClick={startWaitingForPayment}
                >
                  Я оплатил
                </button>
              </div>
            </form>
          )}

          { paymentStatus === 'paid' && (
            <div className="payment__wait">
              <div className="payment__wait-header">
                <h1 className="payment__wait-title main-title">
                  Ищем транзакцию в сети Blockchain...
                </h1>

                <img className="payment__wait-img" src="/img/icons/loader.svg" alt="" />
              </div>

              <p className="payment__wait-text">Обычно это занимает до 15 минут</p>
            </div>
          )}

          { paymentStatus === 'success' && (
            <div className="payment__wait payment__wait--cash payment__wait--dedline">
              <div className="payment__wait-header">
                <img className="payment__wait-imgg" src="/img/icons/modal-content-checked.svg" alt="" />

                <h1 className="payment__wait-title main-title">
                  Счет успешно оплачен
                </h1>
              </div>

              <div className="payment-form__info">
                <p className="payment-form__inf-descr">
                  ...
                </p>
              </div>

              <a className="payment__wait-link second-btn" href="#">Вернуться на сайт компании</a>
            </div>
          )}

          { paymentStatus === 'expired' && (
            <div className="payment__wait payment__wait--cash payment__wait--dedline">
              <div className="payment__wait-header">
                <img className="payment__wait-imgg" src="/img/icons/payment-deadline.svg" alt="" />
          
                <h1 className="payment__wait-title main-title">Счет не оплачен</h1>
              </div>
          
              <div className="payment-form__info">
                <p className="payment-form__inf-descr">
                  Срок действия вашего счета истек. Если вы хотите совершить платеж, вернитесь на сайт и создайте счет заново.
                </p>
              </div>
          
              <a className="payment__wait-link second-btn" href="#">Вернуться на сайт компании</a>
            </div>
          )}
        </div>

        <div className="payment-details">
          <a href="#" className="payment-details__logo">
            <img className="payment-details__logo-img" src="/img/icons/logo-2.svg" alt="" />
          </a>

          <div className="payment-details__block payment-details__block--main">
            <h2 className="payment-details__title main-title">Детали счета №{uniqueId}</h2>

            <div className="payment-details__label">
              <div className="payment-details__label-text">
                Истечет через:
              </div>
              <div className="payment-details__label-time">12:34:56</div>
            </div>

            <img className="payment-details__pic" src="/img/icons/info.svg" alt="" data-payment-details-btn />
          </div>


          <div className="payment-details__block-wrapper">
            <div className="payment-details__block">
              <h2 className="payment-details__title main-title">Детали счета №{uniqueId}</h2>

              <div className="payment-details__label">
                <div className="payment-details__label-text">
                  Истечет через:
                </div>
                <div className="payment-details__label-time">12:34:56</div>
              </div>
            </div>

            
            { paymentStatus === 'invoicing' && (
              <div className="payment-details__block">
                <div className="payment-details__sum">
                  <div className="payment-details__sum-label">
                    Сумма к оплате:
                  </div>

                  <div className="payment-details__sum-count">
                    {paymentOrder?.amount} <span>{paymentOrder?.currency.toUpperCase()}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="payment-details__block">
              <div className="payment-details__salesman">
                <div className="payment-details__salesman-label">Продавец:</div>

                <div className="payment-details__salesman-name">ООО “Первый”</div>
              </div>
            </div>

            { paymentStatus === 'invoicing' && (
              <>
                <div className="payment-details__block">
                  <div className="payment-details__product">
                    <div className="payment-details__product-label">
                      Наименование товара или услуги:
                    </div>

                    <p className="payment-details__product-descr">
                      {paymentOrder?.name}
                    </p>
                  </div>
                </div>

                <div className="payment-details__block">
                  <div className="payment-details__row">
                    <div className="payment-details__row-label">
                      Стоимость:
                    </div>

                    <div className="payment-details__row-text">
                      2.500 AED
                    </div>
                  </div>

                  <div className="payment-details__row-border"></div>

                  <div className="payment-details__row">
                    <div className="payment-details__row-label">
                      Депозит:
                    </div>

                    <div className="payment-details__row-text">
                      1.000 AED <span>(срок: 21 день)</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            { (paymentStatus === 'prepared' || paymentStatus === 'paid' || paymentStatus === 'success') && (
              <div className="payment-details__block">
                <div className="payment-details__sum">
                  <div className="payment-details__sum-label">
                    Сумма к оплате:
                  </div>

                  <div className="payment-details__sum-count">
                    {paymentOrder?.paymentData?.paymentAmount} <span>{paymentOrder?.paymentData?.currency}</span>
                    <img src="/img/icons/file.svg" alt="" />
                  </div>
                </div>

                <div className="payment-details__commission">
                  <div className="payment-details__commission-label">
                    в том числе комиссия:
                  </div>

                  <p className="payment-details__commission-sum">
                    7,45
                    <span>USDT</span>
                  </p>
                </div>

                <div className="payment-details__qr">
                  <img className="payment-details__qr-img" src="/img/payment-qr.png" alt="" />

                  <p className="payment-details__qr-descr">
                    Отправьте точную сумму по указанному адресу. После совершения оплаты нажмите на кнопку «Я оплатил» для
                    проверки
                    транзакции.
                  </p>
                </div>

                <div className="payment-details__group my-projects__group project-group">
                  <label className="my-projects__label project-label" htmlFor="#">
                    Адрес:
                  </label>

                  <p className="project-label__text">
                    {paymentOrder?.paymentData?.address}
                  </p>

                  <img className="payment-details__group-copy" src="/img/icons/file.svg" alt="" />
                </div>

                <div className="payment-details__group my-projects__group project-group">
                  <label className="my-projects__label project-label" htmlFor="#">
                    ФИО владельца
                  </label>

                  <p className="project-label__text">
                    {paymentOrder?.paymentData?.chain}
                  </p>
                </div>
              </div>) }

          </div>
        </div>
      </div>
    </main>
  )
}