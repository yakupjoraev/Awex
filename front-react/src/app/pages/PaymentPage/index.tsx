import { ApiError, CommonService } from "@awex-api"
import { InternalErrorMessage } from "@components/InternalErrorMessage"
import { LdsSpinner } from "@components/LdsSpinner"
import { NotFoundErrorMessage } from "@components/NotFoundErrorMessage"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router-dom"
import { PaymentCurrencySelector } from "./PaymentCurrencySelector"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm, Controller } from "react-hook-form"
import { paymentFormValidator } from "./validators"
import { SelectorOptions, Selector } from "@components/Selector"
import CopyToClipboard from "react-copy-to-clipboard"
import toast from "react-hot-toast"
import QRCode from "react-qr-code"


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
  fee?: string
  depositWithdrawCurrency: string
  depositWithdrawChain: string
  depositWithdrawAddress: string
  cryptoPaymentAddressId: number
}

interface PaymentOrder {
  amount: string
  expired: boolean
  depositAmount: number
  depositReturnTime: number
  expiredDate: number
  paid: boolean
  type: string
  currency: string
  chain: string
  userCurrency: string
  userChain: string
  name?: string | undefined
  projectName: string
  merchantName: string
  paymentData?: PaymentData | null
}

interface OrderPaymentRequest {
  type: string
  currency: string
  chain: string
  depositWithdrawCurrency: string,
  depositWithdrawChain: string,
  depositWithdrawAddress: string
}

interface PaymentFormData {
  amount?: string
  currency?: string
  userChain?: string
  useDeposit?: boolean
  withdrawCurrency?: string
  withdrawNet?: string
  withdrawEmail?: string
  withdrawWalletId?: string
}

interface ExpiresTimer {
  hours: number | string
  minutes: number | string
  seconds: number | string
}

interface WithdrawCurrencies {
  currency: string
  name: string
  rate: string
  chain: string
  chainName: string
}

interface paymentCurrency {
  currency: string
  name: string
  rate: string
  chain: string
  chainName: string
}

interface userChains {
  value: string
  label: string
}

interface formattedCurrency {
  currency: string,
  name: string,
  rate: string,
  chains: Array<userChains>
}

type PaymentStatus = 'invoicing' | 'prepared' | 'paid' | 'expired' | 'success'

const DEFAULT_PAYER_CURRENCY: PayerCurrency = {
  type: 'crypto',
  currency: 'usdt',
  chain: 'trc20usdt',
}

export function PaymentPage() {
  let checkingPaidTimer: any = null
  let expiredTimer: any = null

  const { uniqueId } = useParams()
  const [orderLoading, setOrderLoading] = useState<boolean>(false)
  const [currenciesLoading, setCurrenciesLoading] = useState(false)
  const [orderError, setOrderError] = useState<OrderError | null>(null)
  const [orderCurrency, setOrderCurrency] = useState<PayerCurrency>(DEFAULT_PAYER_CURRENCY)
  const [paymentOrder, setPaymentOrder] = useState<PaymentOrder | null>(null)
  // const [currencies, setCurrencies] = useState<Currency[] | null>(null)
  const [currencies, setCurrencies] = useState<formattedCurrency[] | null>(null)
  const [currenciesError, setCurrenciesError] = useState<string | null>(null)
  const [paymentAmountValue, setPaymentAmountValue] = useState<string | undefined>(undefined)
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('invoicing')
  const [expiresIn, setExpiresIn] = useState<string | null>(null)

  const [withdrawCurrencies, setWithdrawCurrencies] = useState<WithdrawCurrencies[] | null>(null)
  const [withdrawCurrenciesName, setWithdrawCurrenciesName] = useState<SelectorOptions[] | null>(null)
  const [withdrawChains, setWithdrawChains] = useState<SelectorOptions[] | null>(null)
  const [isDeposit, setIsDeposit] = useState<boolean>(false)
  // const [isOpenPaimentDetalisMobile, setIsOpenPaimentDetalisMobile] = useState(false)
  const [userChains, setUserChains] = useState<userChains[]>([])

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: yupResolver(paymentFormValidator),
  })

  // useEffect(() => {
  //   document.addEventListener('click', closePaimentDetalisMobile)

  //   return () => document.removeEventListener('click', closePaimentDetalisMobile)
  // }, [])

  // useEffect(() => {
  //   CommonService.orderPaymentWithdrawCurrencies()
  //   .then((response) => {
  //     if(response && response.currencies) {
  //       setWithdrawCurrencies(response.currencies)
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error)
  //   })
  // }, [])

  useEffect(() => {
    updateCurrencies()
  }, [withdrawCurrencies])

  useEffect(() => {
    getOrderPayment(uniqueId)
    return () => {
      clearInterval(checkingPaidTimer)
      clearInterval(expiredTimer)
    }
  }, [uniqueId])

  useEffect(() => {
    ( function(){
      console.log('paymentOrder useEffect', paymentOrder)
      if(!paymentOrder) {
        setPaymentAmountValue(undefined)
        return
      }
      let newpaymentAmountValue
      if(paymentOrder.paymentData && paymentOrder.userCurrency === paymentOrder.paymentData.currency) {
        newpaymentAmountValue = paymentOrder.paymentData.paymentAmount
      } else {
        newpaymentAmountValue = Number(paymentOrder.amount) / currencyRate(paymentOrder.userCurrency)
      }
      setPaymentAmountValue(newpaymentAmountValue.toString())

      if(!paymentOrder.expired) {
        toggleExpiredTimer(paymentOrder.expiredDate)
      }
    }());
        
    (function(){
      if(!paymentOrder) {
        setIsDeposit(false)
        return
      }
      if(paymentOrder.depositAmount) {
        setIsDeposit(true)
        return
      }
      setIsDeposit(false)
    }());
  }, [paymentOrder])

  useEffect(() => {
    (function(){
      if(!paymentOrder) return
      setValue('currency', paymentOrder.userCurrency)
      
      const userCurrency = currencies?.find((item) => item.currency === paymentOrder.userCurrency)
      const newUserChains: userChains[] = userCurrency?.chains ? userCurrency?.chains : []
      setUserChains(newUserChains)
      setValue('userChain', paymentOrder.chain)

      if(!paymentOrder.paymentData) return
      setValue('withdrawCurrency', paymentOrder.paymentData.depositWithdrawCurrency)
      setValue('withdrawNet', paymentOrder.paymentData.depositWithdrawChain)
      setValue('withdrawWalletId', paymentOrder.paymentData.depositWithdrawAddress)
    }());
  }, [paymentOrder, currencies])

  useEffect(() => {
    setValue('amount', paymentAmountValue)
  }, [paymentAmountValue])

  useEffect(() => {
    setValue('useDeposit', isDeposit)
    if(isDeposit) {
      getOrderPaymentWithdrawCurrencies()
    }
  },[isDeposit])

  function getOrderPaymentWithdrawCurrencies() {
    CommonService.orderPaymentWithdrawCurrencies()
    .then((response) => {
      if(response && response.currencies) {
        setWithdrawCurrencies(response.currencies)
      }
    })
    .catch((error) => {
      console.error(error)
    })
  }
  
  function updateCurrencies(currencyFilter?: string): void {
    if(!withdrawCurrencies) {
      setWithdrawCurrenciesName(null)
      setWithdrawChains(null)
      return
    }

    const currencies = withdrawCurrencies.map((item) => {
      return { label: item.name, value: item.currency }
    })

    let filteredCurrencies: SelectorOptions[] = []

    currencies.forEach((item) => {
      if(filteredCurrencies.find((filteredItem) => filteredItem.value === item.value)) return
      filteredCurrencies.push(item)
    })

    setWithdrawCurrenciesName([...filteredCurrencies])

    if(!currencyFilter) {
      setWithdrawChains(null)
      return
    }

    let filteredWithdrawCurrenciesForChains: WithdrawCurrencies[] = withdrawCurrencies.filter(
      (item) => currencyFilter === item.currency
    )
    const chains = new Set(
      filteredWithdrawCurrenciesForChains.map((item) => {
        return { label: item.chainName, value: item.chain }
      })
    )
    setWithdrawChains([...chains])
  }

  function toggleExpiredTimer(expiredDate: number) {
    clearInterval(expiredTimer)

    if(setEndtime(expiredDate)) {
      expiredTimer = setInterval(() => {
        if(!setEndtime(expiredDate)) {
          clearInterval(expiredTimer)
        }
      }, 1000)
      return
    }
  }

  function setEndtime(expiredDate: number): boolean {
    const now = Date.now()
    let endtime = (expiredDate && (expiredDate > now)) ? expiredDate - now : 0
    if(endtime <= 0) {
      setExpiresIn(null)
      setPaymentStatus('expired')
      return false
    }
    setExpiresIn(getTimeString(getTimeObject(endtime)))
    return true
  }

  function getTimeString(timeObject: ExpiresTimer): string {
    if(!timeObject || !timeObject.hours || !timeObject.minutes || !timeObject.seconds) return ''
    return `${timeObject?.hours} : ${timeObject?.minutes} : ${timeObject?.seconds}`
  }

  function getTimeObject(t: number): ExpiresTimer {
    if(!t) return {
      hours: '00',
      minutes: '00',
      seconds: '00',
    }
    let seconds: number | string = Math.floor( (t/1000) % 60 )
    let minutes: number | string = Math.floor( (t/1000/60) % 60 )
    let hours: number | string = Math.floor( (t/(1000*60*60)))
    seconds = seconds < 10 ? `0${seconds}` : seconds.toString()
    minutes = minutes < 10 ? `0${minutes}` : minutes.toString()
    hours = hours < 10 ? `0${hours}` : hours.toString()
    return {
     hours,
     minutes,
     seconds,
    };  
  }

  function currencyRate(userCurrency: string): number {
    if(!currencies) {
      return 1
    }
    const currency: formattedCurrency[] = currencies.filter((item) => item.currency === userCurrency)
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
        const {amount, expired, name, paid, paymentData, depositAmount, depositReturnTime, expiredDate, projectName, merchantName} = response
        
        if (!amount) {
          setPaymentOrder(null)
          setPaymentStatus('invoicing')
          setOrderError({ type: "not_found" })
          return
        }
        const paymentOrderAmount = amount.toString()
        console.log('getOrderPayment response: ', response)
        console.log('getOrderPayment paymentData: ', paymentData)
        setPaymentOrder({
          amount: paymentOrderAmount,
          expired,
          depositAmount,
          depositReturnTime,          
          expiredDate: Number(expiredDate) * 1000,
          paid,
          name: name ? name : undefined,
          type: orderCurrency.type,
          currency: orderCurrency.currency,
          chain: orderCurrency.chain,
          userCurrency: paymentData ? paymentData.currency : orderCurrency.currency,
          userChain: paymentData ? paymentData.chain : orderCurrency.chain,
          projectName,
          merchantName,
          paymentData: paymentData ? paymentData : null
        })
        

        if(expired && !paid) {
          // setPaymentOrder(null)
          setPaymentStatus('expired')
          return
        }

        setPaymentStatus(paid ? 'success' : paymentData ? 'prepared' : 'invoicing')
        getPaymentCurrencies(paymentOrderAmount)
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
          setCurrencies(formattingСurrencies(response.currencies))
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

  function formattingСurrencies(currencies: paymentCurrency[]): formattedCurrency[] {
    const unicMap = new Map()
    const formattedCurrencies:formattedCurrency[] = []

    currencies.forEach((currencyItem) => {
      const { currency, name, rate, chain, chainName } = currencyItem
      let idx = unicMap.get(currency)

      if(idx !== undefined) {
        formattedCurrencies[idx].chains.push({ value: chain, label: chainName })
      } else {
        formattedCurrencies.push({
          currency,
          name,
          rate,
          chains: [{ value: chain, label: chainName }]
        })
        unicMap.set(currency, formattedCurrencies.length - 1)
      }
    })
    return formattedCurrencies
  }
  
  // function networkPaymentSelected(currency: string, onChange: any, chain?: string | null): void {
  //   onChange(currency)
  //   setPaymentOrder(paymentOrder ? {
  //     ...paymentOrder,
  //     userCurrency: currency,
  //     userChain: chain ? chain : paymentOrder.chain,
  //     paymentData: paymentOrder.paymentData ? {...paymentOrder.paymentData} : null
  //   } : null)
  // }
  
  function currencySelected(currency: string): void {
    const userCurrency = currencies?.find((item) => item.currency === currency)
    const newUserChains: userChains[] = userCurrency?.chains ? userCurrency?.chains : []
    setUserChains(newUserChains)
    setValue('userChain', newUserChains[0].value)

    setPaymentOrder(paymentOrder ? {
      ...paymentOrder,
      userCurrency: currency,
      chain: newUserChains[0].value,
      userChain: newUserChains[0].value,
      paymentData: paymentOrder.paymentData ? {...paymentOrder.paymentData} : null
    } : null)
  }

  function chainSelected(value: string): void {
    console.log('paymentOrder: ', paymentOrder)
    console.log('chain: value: ', value)
    setPaymentOrder(paymentOrder ? {
      ...paymentOrder,
      chain: value,
      userChain: value,
      paymentData: paymentOrder.paymentData ? {...paymentOrder.paymentData} : null
    } : null)
  }
 
  const toPay = handleSubmit((formData) => {
    if(!paymentOrder || !uniqueId) return
    console.log('toPay paymentOrder', paymentOrder)
    setOrderLoading(true)
    const request: OrderPaymentRequest = {
      type: paymentOrder.type,
      currency: paymentOrder.userCurrency.toLocaleLowerCase(),
      chain: paymentOrder.userChain,
      depositWithdrawCurrency: formData.withdrawCurrency || '',
      depositWithdrawChain: formData.withdrawNet || '',
      depositWithdrawAddress: formData.withdrawWalletId || ''
    }
    console.log('toPay request', request)
    CommonService.orderPaymentSet(uniqueId, request)
    .then((response) => {
      const dataOrder: PaymentData | null = response.paymentData ? {
        type: response.paymentData.type,
        paymentAmount: response.paymentData.paymentAmount,
        currency: response.paymentData.currency,
        chain: response.paymentData.chain,
        address: response.paymentData.address,
        fee: response.paymentData.fee,
        depositWithdrawCurrency: response.paymentData.depositWithdrawCurrency,
        depositWithdrawChain: response.paymentData.depositWithdrawChain,
        depositWithdrawAddress: response.paymentData.depositWithdrawAddress,
        cryptoPaymentAddressId: response.paymentData.cryptoPaymentAddressId,
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
  })

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

  // function toggleIsOpenPaimentDetalisMobile(event: React.MouseEvent): void {
  //   event.stopPropagation()
  //   setIsOpenPaimentDetalisMobile(!isOpenPaimentDetalisMobile)
  // }

  // function closePaimentDetalisMobile(): void {
  //   setIsOpenPaimentDetalisMobile(false)
  // }

  const handleLinkCopy = () => {
    toast.success("Скопировано!");
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
            <form className="payment__from payment-form"
              onSubmit={toPay}
            >
              <div className="payment-form__group">
                <p className="payment-form__label">
                  Выберете способ оплаты
                </p>

                {/* <div className="payment-form__radios">
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
                </div> */}

                <div className="about-deposit__generation-select invoice__generation-select">
                  <div className="about-deposit__generation-selected">
                    <div className="about-deposit__generation-info">
                      <input className="about-deposit__generation-input"
                        type="number"
                        placeholder="Введите сумму"
                        value={paymentAmountValue}
                        {...register('amount')}
                      />
                      
                      {errors.amount?.message && (
                        <div className="project-error">
                          {errors.amount.message}
                        </div>
                      )}
                    </div>

                    <div className="about-deposit__generation-currency open-modal-btn">
                      <Controller
                        control={control}
                        name="currency"
                        defaultValue={paymentOrder?.userCurrency}
                        render={({ field }) => {
                          return (
                            <PaymentCurrencySelector
                              currency={field.value}
                              currencies={currencies ? currencies : undefined}
                              loading={currenciesLoading}
                              // onChange={(value: string, chain?: string | null) => { networkPaymentSelected(value, field.onChange, chain)}}
                              onChange={(value: string) => { currencySelected(value); field.onChange()}}
                            />
                          )
                        }}
                      />
                      
                      {errors.currency?.message && (
                        <div className="project-error">
                          {errors.currency.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                
                { userChains && userChains.length > 0 && (
                    <>
                      <div className="invoice-project__group-select">
                        <Controller
                          control={control}
                          name="userChain"
                          render={({ field }) => {
                            return (
                              <Selector
                                options={userChains}
                                value={field.value}
                                placeholder={'Выберете сеть'}
                                onChange={(value: string) => { chainSelected(value); field.onChange(value)}}
                              />
                            )
                          }}
                        />
                      </div>
                      {errors.withdrawNet?.message && (
                        <div className="project-error">{errors.withdrawNet.message}</div>
                      )}
                    </>
                  )}

              </div>

              { isDeposit && (
                <div className="payment-form__group">
                  <p className="payment-form__label">
                    Выберете способ возврата депозита
                  </p>

                  {/* <div className="payment-form__radios">
                    <div className="payment-form__radio">
                      <input className="payment-form__radio-input" type="radio" name="returnPay" id="pay4" checked />
                      <label className="payment-form__radio-label" htmlFor="pay4">Крипто</label>
                    </div>

                    <div className="payment-form__radio">
                      <input className="payment-form__radio-input" type="radio" name="returnPay" id="pay5" />
                      <label className="payment-form__radio-label" htmlFor="pay5">Карта РФ</label>
                    </div>
                  </div> */}

                  <input className="d-none" type="checkbox"
                    {...register('useDeposit')}
                  />

                  { withdrawCurrenciesName && (
                    <>
                      <div className="invoice-project__group-select">
                        <Controller
                          control={control}
                          name="withdrawCurrency"
                          render={({ field }) => {
                            return (
                              <Selector
                                options={withdrawCurrenciesName}
                                value={field.value}
                                placeholder={'Выберете криптовалюту'}
                                onChange={(value) => {
                                  updateCurrencies(value)
                                  field.onChange(value)
                                }}
                              />
                            )
                          }}
                        />
                      </div>
                      {errors.withdrawCurrency?.message && (
                        <div className="project-error">{errors.withdrawCurrency.message}</div>
                      )}
                    </>
                  )}

                  { withdrawChains && (
                    <>
                      <div className="invoice-project__group-select">
                        <Controller
                          control={control}
                          name="withdrawNet"
                          render={({ field }) => {
                            return (
                              <Selector
                                options={withdrawChains}
                                value={field.value}
                                placeholder={'Выберете сеть'}
                                onChange={field.onChange}
                              />
                            )
                          }}
                        />
                      </div>
                      {errors.withdrawNet?.message && (
                        <div className="project-error">{errors.withdrawNet.message}</div>
                      )}
                    </>
                  )}

                  <div className="my-projects__group project-group">
                    <label className="my-projects__label project-label" htmlFor="#">
                      Адрес кошелька
                    </label>
                    <input className="my-projects__input project-input" type="text" placeholder="Введите адрес кошелька"
                      {...register('withdrawWalletId')}
                    />
                    {errors.withdrawWalletId?.message && (
                      <div className="project-error">{errors.withdrawWalletId.message}</div>
                    )}
                  </div>
                </div>
              )}

              <div className="payment-form__group">
                <p className="payment-form__label">
                  Отправить уведомление на почту
                </p>

                <div className="my-projects__group project-group">
                  <label className="my-projects__label project-label" htmlFor="#">
                    E-mail
                  </label>
                  <input className="my-projects__input project-input" type="text" placeholder="Введите ваш e-mail" 
                    {...register('withdrawEmail')}
                  />
                </div>
              </div>

              <div className="payment-form__btns">
                <button className="payment-form__btn second-btn" type="submit" >
                  Оплатить
                </button>

                {/* <button className="payment-form__btn blue-btn">
                  <img src="/img/icons/WalletConnect.svg" alt="" />
                </button>

                <button className="payment-form__btn second-btn">
                  <img src="/img/icons/payment-form-awex.svg" alt="" />
                </button> */}
              </div>

              <div className="payment-form__footer">
                Нажимая «Оплатить», вы принимаете
                <a href="#"> пользовательское соглашение...</a>
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

                {/* <div className="invoice-project__group-select" data-select-wrapper>
                  <div className="invoice-project__group-selected" data-select-arrow>
                    Выберете сеть
                    <img className="invoice-project__group-select-arrow" src="/img/icons/mini-arrow-down.svg" alt="mini-arrow-down" />
                  </div>

                  <ul className="invoice-project__group-list select-list" data-select-list>
                    <li className="invoice-project__group-item select-item" data-select-item>Выберете сеть</li>
                    <li className="invoice-project__group-item select-item" data-select-item>Выберете сеть</li>
                    <li className="invoice-project__group-item select-item" data-select-item>Выберете сеть</li>
                  </ul>
                </div> */}
              </div>

              {/* <div className="payment-form__group">
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
              </div> */}

              { paymentOrder && paymentOrder.depositAmount > 0 && paymentOrder.paymentData && (
                <div className="payment-form__group">
                  <p className="payment-form__label">
                    Возврат депозита на крипто кошелек

                    <a className="payment-form__label-link"
                      onClick={changeMethod}
                    >
                      Изменить способ
                      <img className="payment-form__label-arrow" src="./img/icons/arrow-right.svg" alt="" />
                    </a>
                  </p>

                  <div className="about-deposit__generation-select invoice__generation-select">
                    <div className="about-deposit__generation-selected">
                      <div className="about-deposit__generation-info">
                        <div className="about-deposit__generation-val">
                          { paymentOrder?.paymentData?.depositWithdrawChain }
                        </div>
                      </div>

                      <div className="about-deposit__generation-currency">
                        <div className="about-deposit__generation-curr">
                          <img src="./img/usdt.png" alt="" />
                          { paymentOrder?.paymentData?.depositWithdrawCurrency }
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="my-projects__group project-group">
                    <label className="my-projects__label project-label" htmlFor="#">
                      Адрес
                    </label>

                    <input className="my-projects__input project-input" type="text" placeholder="Адрес"
                      value={paymentOrder?.paymentData?.depositWithdrawAddress} disabled />
                  </div>
                </div>
              )}

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
            <h2 className="payment-details__title main-title">Детали счета № {uniqueId}</h2>

            <div className="payment-details__label">
              { expiresIn ? (
                <>
                  <div className="payment-details__label-text">
                    Истечет через:
                  </div>
                  <div className="payment-details__label-time">
                    { expiresIn }
                  </div>
                </>
              ) : (
                <div className="payment-details__label-text">
                  Истек
                </div>
              )}
            </div>

            {/* <img className="payment-details__pic"
              src="/img/icons/info.svg"
              alt=""
              data-payment-details-btn
              onClick={toggleIsOpenPaimentDetalisMobile}
            /> */}
          </div>


          <div className="payment-details__block-wrapper"
            onClick={(ev)=>ev.stopPropagation()}
          >
            <div className="payment-details__block">
              <h2 className="payment-details__title main-title">Детали счета № {uniqueId}</h2>

              <div className="payment-details__label">
                { expiresIn ? (
                  <>
                    <div className="payment-details__label-text">
                      Истечет через:
                    </div>
                    <div className="payment-details__label-time">
                      { expiresIn }
                    </div>
                  </>
                ) : (
                  <div className="payment-details__label-text">
                    Истек
                  </div>
                )}
              </div>
            </div>

            { (paymentStatus === 'invoicing' || paymentStatus === 'expired') && (
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

                <div className="payment-details__salesman-name">{ paymentOrder?.projectName }</div>
              </div>
            </div>

            { (paymentStatus === 'invoicing' || paymentStatus === 'expired') && (
              <>

                { paymentOrder && paymentOrder.name && (
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
                )}

                <div className="payment-details__block">
                  <div className="payment-details__row">
                    <div className="payment-details__row-label">
                      Стоимость:
                    </div>

                    <div className="payment-details__row-text">
                      {(paymentOrder?.amount && paymentOrder?.depositAmount) ? Number(paymentOrder.amount) - Number(paymentOrder.depositAmount) : paymentOrder?.amount} {paymentOrder?.currency.toUpperCase()}
                    </div>
                  </div>

                  <div className="payment-details__row-border"></div>

                  { paymentOrder?.depositAmount && (
                    <div className="payment-details__row">
                      <div className="payment-details__row-label">
                        Депозит:
                      </div>

                      <div className="payment-details__row-text">
                        {paymentOrder?.depositAmount} {paymentOrder?.currency.toUpperCase()}
                        {paymentOrder?.depositReturnTime ? (
                          <span>{`(срок: ${paymentOrder?.depositReturnTime} день)`}</span>
                        ) : ''}
                      </div>
                    </div>
                  )}
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
                    {paymentOrder && paymentOrder.paymentData && (
                      <CopyToClipboard text={paymentOrder.paymentData.paymentAmount} onCopy={handleLinkCopy}>
                        <img src="/img/icons/file.svg" alt="" />
                      </CopyToClipboard>
                    )}
                  </div>
                </div>

                { paymentOrder && paymentOrder.paymentData && paymentOrder.paymentData.fee && (
                  <div className="payment-details__commission">
                    <div className="payment-details__commission-label">
                      в том числе комиссия:
                    </div>

                    <p className="payment-details__commission-sum">
                      { paymentOrder.paymentData.fee }
                      <span>USDT</span>
                    </p>
                  </div>
                )}

                { paymentOrder && paymentOrder.paymentData && (
                  <div className="payment-details__qr">

                    <CopyToClipboard text={paymentOrder.paymentData.address} onCopy={handleLinkCopy}>
                      <QRCode
                        className="payment-details__qr-img payment-details__qr-img_fix"
                        value={paymentOrder.paymentData.address}
                        size={156}
                      />
                    </CopyToClipboard>

                    <p className="payment-details__qr-descr">
                      Отправьте точную сумму по указанному адресу. После совершения оплаты нажмите на кнопку «Я оплатил» для
                      проверки
                      транзакции.
                    </p>
                  </div>
                )}

                <div className="payment-details__group my-projects__group project-group">
                  <label className="my-projects__label project-label" htmlFor="#">
                    Адрес:
                  </label>

                  <p className="project-label__text">
                    {paymentOrder?.paymentData?.address}
                  </p>

                  {paymentOrder && paymentOrder.paymentData && (
                    <CopyToClipboard text={paymentOrder.paymentData.address} onCopy={handleLinkCopy}>
                      <img className="payment-details__group-copy" src="/img/icons/file.svg" alt="" />
                    </CopyToClipboard>
                  )}
                </div>

                {/* <div className="payment-details__group my-projects__group project-group">
                  <label className="my-projects__label project-label" htmlFor="#">
                    ФИО владельца
                  </label>

                  <p className="project-label__text">
                    {paymentOrder?.paymentData?.chain}
                  </p>
                </div> */}
              </div>) }

          </div>
        </div>
      </div>
    </main>
  )
}