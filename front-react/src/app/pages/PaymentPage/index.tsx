import { ApiError, CommonService } from "@awex-api";
import { InternalErrorMessage } from "@components/InternalErrorMessage";
import { LdsSpinner } from "@components/LdsSpinner";
import { NotFoundErrorMessage } from "@components/NotFoundErrorMessage";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { PaymentCurrencySelector } from "./PaymentCurrencySelector";
import { AuthenticatedService, AuthorizedService } from "@awex-api";


const DEFAULT_CURRENCIES: { currency: string; name?: string; rate?: string }[] = [];


interface DataOrder {
  paymentAmount: string | undefined;
  currency: string | undefined;
  chain: string | undefined;
  address: string | undefined;
}

interface OrderVM {
  amountUSDT: number;
  name?: string;
  dataOrder: DataOrder | null;
}


// ======================
  type OrderError = { type: "unknown" | "not_found" };

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

  const DEFAULT_PAYER_CURRENCY: PayerCurrency = {
    type: 'crypto',
    currency: 'usdt',
    chain: 'trc20usdt',
  }
// /======================

export function PaymentPage() {

  // ======================
    const { uniqueId } = useParams()
    const [orderLoading, setOrderLoading] = useState<boolean>(false)
    const [currenciesLoading, setCurrenciesLoading] = useState(false)
    const [orderError, setOrderError] = useState<OrderError | null>(null)
    const [orderCurrency, setOrderCurrency] = useState<PayerCurrency>(DEFAULT_PAYER_CURRENCY)
    const [paymentOrder, setPaymentOrder] = useState<PaymentOrder | null>(null)
    const [currencies, setCurrencies] = useState<Currency[] | null>(null)
    const [currenciesError, setCurrenciesError] = useState<string | null>(null)
    const [paymentAmountValue, setPaymentAmountValue] = useState<string | undefined>(undefined)

    useEffect(() => {
      getOrderPayment(uniqueId)
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
        newpaymentAmountValue = Number(paymentOrder.amount) * currencyRate(paymentOrder.userCurrency, paymentOrder.userChain)
      }
      setPaymentAmountValue(newpaymentAmountValue.toString())
    }, [paymentOrder])

    function currencyRate(userCurrency: string, userChain: string): number {
      if(!currencies) {
        return 1
      }
      const currency: Currency = currencies.filter((item) =>  item.chain === userChain && item.currency === userCurrency)[0]
      return Number(currency.rate)
    }

    function getOrderPayment(uniqueId: string | undefined): void {
      if (!uniqueId) {
        setPaymentOrder(null)
        setOrderLoading(false)
        setOrderError({ type: "not_found" })
        return
      }
      setOrderLoading(true)
      CommonService.orderPaymentGet(uniqueId)
        .then((response) => {
          const {amount, name, paymentData} = response
          
          if (!amount) {
            setPaymentOrder(null)
            setOrderError({ type: "not_found" })
          } else {
            setPaymentOrder({
              amount: amount.toString(),
              name: name ? name : undefined,
              type: orderCurrency.type,
              currency: orderCurrency.currency,
              chain: orderCurrency.chain,
              userCurrency: paymentData ? paymentData.currency : orderCurrency.currency,
              userChain: paymentData ? paymentData.chain : orderCurrency.chain,
              paymentData: paymentData ? paymentData : null
            })
            getPaymentCurrencies(paymentOrder?.amount)
          }
        })
        .catch((error) => {
          if (error instanceof ApiError && error.status === 404) {
            setPaymentOrder(null);
            setOrderError({ type: "not_found" })
          } else {
            console.error(error);
            setPaymentOrder(null);
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

    function toPay(): void {
      if(!paymentOrder || !uniqueId) return
      setOrderLoading(true)
      const request = {
        type: paymentOrder.type,
        currency: paymentOrder.userCurrency.toLocaleLowerCase(),
        chain: paymentOrder.userChain,
      }

    }
  // /======================

  // const { uniqueId } = useParams();

  // const [order, setOrder] = useState<OrderVM | null>(null);
  // const [dataOrder, setDataOrder] = useState(null)
  // const [orderLoading, setOrderLoading] = useState<boolean>(false);
  // const [orderError, setOrderError] = useState<OrderError | null>(null);
  // const [payerCurrency, setPayerCurrency] = useState<PayerCurrency | null>({
  //   currency: 'usdt',
  //   chain: 'trc20usdt',
  // });
  // const [invoiceCurrencies, invoiceCurrenciesLoading] = useCurrencies(DEFAULT_CURRENCIES);

  // useEffect(() => {
  //   if (uniqueId === undefined) {
  //     setOrder(null);
  //     setOrderLoading(false);
  //     setOrderError({ type: "not_found" });
  //     return;
  //   }

  //   setOrderLoading(true);
  //   CommonService.orderPaymentGet(uniqueId)
  //     .then((response) => {
  //       const amountUSDT = response.amount;
  //       const name = response.name;
        
  //       if (amountUSDT === undefined) {
  //         setOrder(null);
  //         setOrderError({ type: "not_found" });
  //       } else {
  //         setOrder({
  //           amountUSDT,
  //           name,
  //           dataOrder: null,
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       console.log('catch')
  //       if (error instanceof ApiError && error.status === 404) {
  //         setOrder(null);
  //         setOrderError({ type: "not_found" });
  //       } else {
  //         console.error(error);
  //         setOrder(null);
  //         setOrderError({ type: "unknown" });
  //       }
  //     })
  //     .finally(() => {
  //       console.log('finally')
  //       setOrderLoading(false);
  //     });

  // }, [uniqueId]);

  // useEffect(() => {
  //   if(!payerCurrency || !uniqueId) return
  //   setOrderLoading(true);
  //   const request = {
  //     type: 'crypto',
  //     currency: payerCurrency.currency.toLocaleLowerCase(),
  //     chain: payerCurrency?.chain //payerCurrency?.chain ? payerCurrency?.chain.toLocaleLowerCase() : '',
  //   }
  //   console.log('orderPaymentPost', uniqueId, request)
  //   CommonService.orderPaymentPost(uniqueId, request)
  //     .then((response) => {
  //             console.log('orderPaymentPost then:')
  //             console.table(response)
  //       const dataOrder: DataOrder | null = {
  //         paymentAmount: response.paymentData.paymentAmount,
  //         currency: response.paymentData.currency,
  //         chain: response.paymentData.chain,
  //         address: response.paymentData.address,
  //       }
  //       if(!order) return
  //       setOrder({
  //         amountUSDT: order.amountUSDT,
  //         name: order?.name,
  //         dataOrder,
  //       })
  //     })
  //     .catch((error) => {
  //       if (error instanceof ApiError && error.status === 403) {
  //         console.log("not_found error", error);
  //       } else {
  //         console.log("unknown error", error);
  //       }
  //     })
  //     .finally(() => {
  //       setOrderLoading(false);
  //     });
  // }, [payerCurrency])

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

      {/* === Cash === */}
      {/* <div className="wrapper-payment">
        <div className="payment">
          <a href="#" className="payment__logo">
            <img className="payment__logo-img" src="/img/icons/logo-2.svg" alt="" />
          </a>

          <form className="payment__from payment-form" action="#">
            <div className="payment-form__group">
              <p className="payment-form__label">
                Выберете способ оплаты
              </p>

              <div className="payment-form__radios">
                <div className="payment-form__radio">
                  <input className="payment-form__radio-input" type="radio" name="pay" id="pay4" />
                  <label className="payment-form__radio-label" htmlFor="pay4">Крипто</label>
                </div>

                <div className="payment-form__radio">
                  <input className="payment-form__radio-input" type="radio" name="pay" id="pay5" checked />
                  <label className="payment-form__radio-label" htmlFor="pay5">Наличный расчет</label>
                </div>

                <div className="payment-form__radio">
                  <input className="payment-form__radio-input" type="radio" name="pay" id="pay6" />
                  <label className="payment-form__radio-label" htmlFor="pay6">Карта РФ</label>
                </div>

                <div className="tooltip" data-tooltip="Доступно для операций до 99.000 RUB" data-tooltip-pos="right" data-tooltip-length="medium">
                  <img className="payment-form__radio-pic" src="/img/icons/tooltip.svg" alt="tooltip" />
                </div>
              </div>

              <div className="about-deposit__generation-select invoice__generation-select about-deposit__generation-select--white">
                <div className="about-deposit__generation-selected">
                  <div className="about-deposit__generation-info">
                    <input className="about-deposit__generation-input" type="number" placeholder="Введите сумму" value="9.650" />
                  </div>

                  <div className="about-deposit__generation-currency open-modal-btn" data-modal-id="select-modal">
                    <div className="about-deposit__generation-curr">
                      <img src="/img/aed.png" alt="" />
                      AED
                    </div>

                    <img className="about-deposit__generation-img" src="/img/icons/arrow-down.svg" alt="arrow-down" />
                  </div>
                </div>
              </div>

              <!-- <div className="invoice-project__group-selects">
                <div className="invoice-project__group-select" data-select-wrapper>
                  <div className="invoice-project__group-selected" data-select-arrow>
                    Выберете страну
                    <img className="invoice-project__group-select-arrow" src="/img/icons/mini-arrow-down.svg" alt="mini-arrow-down" />
                  </div>

                  <ul className="invoice-project__group-list select-list" data-select-list>
                    <li className="invoice-project__group-item select-item" data-select-item>Выберете страну</li>
                    <li className="invoice-project__group-item select-item" data-select-item>Выберете страну</li>
                    <li className="invoice-project__group-item select-item" data-select-item>Выберете страну</li>
                  </ul>
                </div>

                <div className="invoice-project__group-select" data-select-wrapper>
                  <div className="invoice-project__group-selected" data-select-arrow>
                    Выберете город
                    <img className="invoice-project__group-select-arrow" src="/img/icons/mini-arrow-down.svg" alt="mini-arrow-down" />
                  </div>

                  <ul className="invoice-project__group-list select-list" data-select-list>
                    <li className="invoice-project__group-item select-item" data-select-item>Выберете город</li>
                    <li className="invoice-project__group-item select-item" data-select-item>Выберете город</li>
                    <li className="invoice-project__group-item select-item" data-select-item>Выберете город</li>
                  </ul>
                </div>
              </div> -->

              <div className="invoice-project__group-select" data-select-wrapper>
                <div className="invoice-project__group-selected" data-select-arrow>
                  Выберете офис
                  <img className="invoice-project__group-select-arrow" src="/img/icons/mini-arrow-down.svg" alt="mini-arrow-down" />
                </div>

                <ul className="invoice-project__group-list select-list" data-select-list>
                  <li className="invoice-project__group-item select-item" data-select-item>Выберете офис</li>
                  <li className="invoice-project__group-item select-item" data-select-item>Выберете офис</li>
                  <li className="invoice-project__group-item select-item" data-select-item>Выберете офис</li>
                </ul>
              </div>
            </div>

            <div className="payment-form__group">
              <p className="payment-form__label">
                Выберете способ возврата депозита
              </p>

              <div className="payment-form__radios">
                <div className="payment-form__radio">
                  <input className="payment-form__radio-input" type="radio" name="pay2" id="pay7" checked />
                  <label className="payment-form__radio-label" htmlFor="pay7">Крипто</label>
                </div>

                <div className="payment-form__radio">
                  <input className="payment-form__radio-input" type="radio" name="pay2" id="pay8" />
                  <label className="payment-form__radio-label" htmlFor="pay8">Карта РФ</label>
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
              <button className="payment-form__btn second-btn">
                Оплатить
              </button>

              <!-- <button className="payment-form__btn blue-btn">
                <img src="/img/icons/WalletConnect.svg" alt="" />
              </button>

              <button className="payment-form__btn second-btn">
                <img src="/img/icons/payment-form-awex.svg" alt="" />
              </button> -->
            </div>

            <div className="payment-form__footer">
              Нажимая «Оплатить», вы принимаете
              <a href="#">пользовательское соглашение...</a>
            </div>
          </form>
        </div>

        <div className="payment-details">
          <a href="#" className="payment-details__logo">
            <img className="payment-details__logo-img" src="/img/icons/logo-2.svg" alt="" />
          </a>

          <div className="payment-details__block payment-details__block--main">
            <h2 className="payment-details__title main-title">Детали счета №12345678</h2>

            <div className="payment-details__label">
              <div className="payment-details__label-text">
                Истечет через:
              </div>

              <div className="payment-details__label-time">12:34:56</div>
            </div>

            <img className="payment-details__pic" src="/img/icons/info.svg" alt="" data-payment-details-btn />
          </div>

          <div className="payment-details__block-wrapper" data-payment-details-content>
            <div className="payment-details__block">
              <h2 className="payment-details__title main-title">Детали счета №12345678</h2>

              <div className="payment-details__label">
                <div className="payment-details__label-text">
                  Истечет через:
                </div>
                <div className="payment-details__label-time">12:34:56</div>
              </div>
            </div>

            <div className="payment-details__block">
              <div className="payment-details__sum">
                <div className="payment-details__sum-label">
                  Сумма к оплате:
                </div>

                <div className="payment-details__sum-count">
                  3.500 <span>AED</span>
                </div>
              </div>
            </div>

            <div className="payment-details__block">
              <div className="payment-details__salesman">
                <div className="payment-details__salesman-label">Продавец:</div>
                <div className="payment-details__salesman-name">ООО “Первый”</div>
              </div>
            </div>

            <div className="payment-details__block">
              <div className="payment-details__product">
                <div className="payment-details__product-label">
                  Наименование товара или услуги:
                </div>

                <p className="payment-details__product-descr">
                  Аренда машины гос.номер А123АА123 на 10 дней (марка, модель и другая информация)
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
          </div>
        </div>

        <div className="modal" id="select-modal">
          <form action="#" className="modal-content modal-content--select-list">
            <div className="modal-content__header">
              <h4 className="modal-content__title">
                Выберете криптовалюту:
              </h4>

              <button className="close-modal-btn">
                <img src="/img/icons/close-modal.svg" alt="" />
              </button>
            </div>

            <div className="deposits__filter-search search-group">
              <input className="deposits__filter-src search-input" type="search" placeholder="Поиск" />
              <img className="deposits__filter-search-img search-img" src="/img/icons/search.svg" alt="Поиск" />
            </div>

            <div className="modal-content__main">
              <ul className="crypto__list">
                <li className="crypto___item">
                  <img className="crypto__item-pic" src="/img/actives/actives-2.png" alt="" />

                  <div className="crypto__item-info">
                    <h4 className="crypto__item-name">
                      Green Metaverse Token
                    </h4>

                    <h5 className="crypto__item-subname">
                      BTC
                    </h5>
                  </div>

                  <div className="crypto__item-counts">
                    <div className="crypto__item-count--main">
                      1.578697
                    </div>

                    <div className="crypto__item-count--second">
                      ~131567.654 USD
                    </div>
                  </div>
                </li>

                <li className="crypto___item">
                  <img className="crypto__item-pic" src="/img/actives/actives-2.png" alt="" />

                  <div className="crypto__item-info">
                    <h4 className="crypto__item-name">
                      Green Metaverse Token
                    </h4>

                    <h5 className="crypto__item-subname">
                      BTC
                    </h5>
                  </div>

                  <div className="crypto__item-counts">
                    <div className="crypto__item-count--main">
                      1.578697
                    </div>

                    <div className="crypto__item-count--second">
                      ~131567.654 USD
                    </div>
                  </div>
                </li>

                <li className="crypto___item">
                  <img className="crypto__item-pic" src="/img/actives/actives-2.png" alt="" />

                  <div className="crypto__item-info">
                    <h4 className="crypto__item-name">
                      Green Metaverse Token
                    </h4>

                    <h5 className="crypto__item-subname">
                      BTC
                    </h5>
                  </div>

                  <div className="crypto__item-counts">
                    <div className="crypto__item-count--main">
                      1.578697
                    </div>

                    <div className="crypto__item-count--second">
                      ~131567.654 USD
                    </div>
                  </div>
                </li>

                <li className="crypto___item">
                  <img className="crypto__item-pic" src="/img/actives/actives-2.png" alt="" />

                  <div className="crypto__item-info">
                    <h4 className="crypto__item-name">
                      Green Metaverse Token
                    </h4>

                    <h5 className="crypto__item-subname">
                      BTC
                    </h5>
                  </div>

                  <div className="crypto__item-counts">
                    <div className="crypto__item-count--main">
                      1.578697
                    </div>

                    <div className="crypto__item-count--second">
                      ~131567.654 USD
                    </div>
                  </div>
                </li>

                <li className="crypto___item">
                  <img className="crypto__item-pic" src="/img/actives/actives-2.png" alt="" />

                  <div className="crypto__item-info">
                    <h4 className="crypto__item-name">
                      Green Metaverse Token
                    </h4>

                    <h5 className="crypto__item-subname">
                      BTC
                    </h5>
                  </div>

                  <div className="crypto__item-counts">
                    <div className="crypto__item-count--main">
                      1.578697
                    </div>

                    <div className="crypto__item-count--second">
                      ~131567.654 USD
                    </div>
                  </div>
                </li>

                <li className="crypto___item">
                  <img className="crypto__item-pic" src="/img/actives/actives-2.png" alt="" />

                  <div className="crypto__item-info">
                    <h4 className="crypto__item-name">
                      Green Metaverse Token
                    </h4>

                    <h5 className="crypto__item-subname">
                      BTC
                    </h5>
                  </div>

                  <div className="crypto__item-counts">
                    <div className="crypto__item-count--main">
                      1.578697
                    </div>

                    <div className="crypto__item-count--second">
                      ~131567.654 USD
                    </div>
                  </div>
                </li>

                <li className="crypto___item">
                  <img className="crypto__item-pic" src="/img/actives/actives-2.png" alt="" />

                  <div className="crypto__item-info">
                    <h4 className="crypto__item-name">
                      Green Metaverse Token
                    </h4>

                    <h5 className="crypto__item-subname">
                      BTC
                    </h5>
                  </div>

                  <div className="crypto__item-counts">
                    <div className="crypto__item-count--main">
                      1.578697
                    </div>

                    <div className="crypto__item-count--second">
                      ~131567.654 USD
                    </div>
                  </div>
                </li>

                <li className="crypto___item">
                  <img className="crypto__item-pic" src="/img/actives/actives-2.png" alt="" />

                  <div className="crypto__item-info">
                    <h4 className="crypto__item-name">
                      Green Metaverse Token
                    </h4>

                    <h5 className="crypto__item-subname">
                      BTC
                    </h5>
                  </div>

                  <div className="crypto__item-counts">
                    <div className="crypto__item-count--main">
                      1.578697
                    </div>

                    <div className="crypto__item-count--second">
                      ~131567.654 USD
                    </div>
                  </div>
                </li>

                <li className="crypto___item">
                  <img className="crypto__item-pic" src="/img/actives/actives-2.png" alt="" />

                  <div className="crypto__item-info">
                    <h4 className="crypto__item-name">
                      Green Metaverse Token
                    </h4>

                    <h5 className="crypto__item-subname">
                      BTC
                    </h5>
                  </div>

                  <div className="crypto__item-counts">
                    <div className="crypto__item-count--main">
                      1.578697
                    </div>

                    <div className="crypto__item-count--second">
                      ~131567.654 USD
                    </div>
                  </div>
                </li>

                <li className="crypto___item">
                  <img className="crypto__item-pic" src="/img/actives/actives-2.png" alt="" />

                  <div className="crypto__item-info">
                    <h4 className="crypto__item-name">
                      Green Metaverse Token
                    </h4>

                    <h5 className="crypto__item-subname">
                      BTC
                    </h5>
                  </div>

                  <div className="crypto__item-counts">
                    <div className="crypto__item-count--main">
                      1.578697
                    </div>

                    <div className="crypto__item-count--second">
                      ~131567.654 USD
                    </div>
                  </div>
                </li>

                <li className="crypto___item">
                  <img className="crypto__item-pic" src="/img/actives/actives-2.png" alt="" />

                  <div className="crypto__item-info">
                    <h4 className="crypto__item-name">
                      Green Metaverse Token
                    </h4>

                    <h5 className="crypto__item-subname">
                      BTC
                    </h5>
                  </div>

                  <div className="crypto__item-counts">
                    <div className="crypto__item-count--main">
                      1.578697
                    </div>

                    <div className="crypto__item-count--second">
                      ~131567.654 USD
                    </div>
                  </div>
                </li>

                <li className="crypto___item">
                  <img className="crypto__item-pic" src="/img/actives/actives-2.png" alt="" />

                  <div className="crypto__item-info">
                    <h4 className="crypto__item-name">
                      Green Metaverse Token
                    </h4>

                    <h5 className="crypto__item-subname">
                      BTC
                    </h5>
                  </div>

                  <div className="crypto__item-counts">
                    <div className="crypto__item-count--main">
                      1.578697
                    </div>

                    <div className="crypto__item-count--second">
                      ~131567.654 USD
                    </div>
                  </div>
                </li>

                <li className="crypto___item">
                  <img className="crypto__item-pic" src="/img/actives/actives-2.png" alt="" />

                  <div className="crypto__item-info">
                    <h4 className="crypto__item-name">
                      Green Metaverse Token
                    </h4>

                    <h5 className="crypto__item-subname">
                      BTC
                    </h5>
                  </div>

                  <div className="crypto__item-counts">
                    <div className="crypto__item-count--main">
                      1.578697
                    </div>

                    <div className="crypto__item-count--second">
                      ~131567.654 USD
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </form>
        </div>
      </div> */}

      
      {/* === Crypto === */}
      <div className="wrapper-payment">
        <div className="payment">
          <a href="#" className="payment__logo">
            <img className="payment__logo-img" src="/img/icons/logo-2.svg" alt="" />
          </a>

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


          <div className="payment-details__block-wrapper" data-payment-details-content>
            <div className="payment-details__block">
              <h2 className="payment-details__title main-title">Детали счета №{uniqueId}</h2>

              <div className="payment-details__label">
                <div className="payment-details__label-text">
                  Истечет через:
                </div>
                <div className="payment-details__label-time">12:34:56</div>
              </div>
            </div>

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

            <div className="payment-details__block">
              <div className="payment-details__salesman">
                <div className="payment-details__salesman-label">Продавец:</div>

                <div className="payment-details__salesman-name">ООО “Первый”</div>
              </div>
            </div>

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
          </div>
        </div>
        
        {/* <div className="modal" id="select-modal">
          <form action="#" className="modal-content modal-content--select-list">
            <div className="modal-content__header">
              <h4 className="modal-content__title">
                Выберете криптовалюту:
              </h4>

              <button className="close-modal-btn">
                <img src="/img/icons/close-modal.svg" alt="" />
              </button>
            </div>

            <div className="deposits__filter-search search-group">
              <input className="deposits__filter-src search-input" type="search" placeholder="Поиск" />
              <img className="deposits__filter-search-img search-img" src="/img/icons/search.svg" alt="Поиск" />
            </div>

            <div className="modal-content__main">
              <ul className="crypto__list">
                <li className="crypto___item">
                  <img className="crypto__item-pic" src="/img/actives/actives-2.png" alt="" />

                  <div className="crypto__item-info">
                    <h4 className="crypto__item-name">
                      Green Metaverse Token
                    </h4>

                    <h5 className="crypto__item-subname">
                      BTC
                    </h5>
                  </div>

                  <div className="crypto__item-counts">
                    <div className="crypto__item-count--main">
                      1.578697
                    </div>

                    <div className="crypto__item-count--second">
                      ~131567.654 USD
                    </div>
                  </div>
                </li>

                <li className="crypto___item">
                  <img className="crypto__item-pic" src="/img/actives/actives-2.png" alt="" />

                  <div className="crypto__item-info">
                    <h4 className="crypto__item-name">
                      Green Metaverse Token
                    </h4>

                    <h5 className="crypto__item-subname">
                      BTC
                    </h5>
                  </div>

                  <div className="crypto__item-counts">
                    <div className="crypto__item-count--main">
                      1.578697
                    </div>

                    <div className="crypto__item-count--second">
                      ~131567.654 USD
                    </div>
                  </div>
                </li>

                <li className="crypto___item">
                  <img className="crypto__item-pic" src="/img/actives/actives-2.png" alt="" />

                  <div className="crypto__item-info">
                    <h4 className="crypto__item-name">
                      Green Metaverse Token
                    </h4>

                    <h5 className="crypto__item-subname">
                      BTC
                    </h5>
                  </div>

                  <div className="crypto__item-counts">
                    <div className="crypto__item-count--main">
                      1.578697
                    </div>

                    <div className="crypto__item-count--second">
                      ~131567.654 USD
                    </div>
                  </div>
                </li>

                <li className="crypto___item">
                  <img className="crypto__item-pic" src="/img/actives/actives-2.png" alt="" />

                  <div className="crypto__item-info">
                    <h4 className="crypto__item-name">
                      Green Metaverse Token
                    </h4>

                    <h5 className="crypto__item-subname">
                      BTC
                    </h5>
                  </div>

                  <div className="crypto__item-counts">
                    <div className="crypto__item-count--main">
                      1.578697
                    </div>

                    <div className="crypto__item-count--second">
                      ~131567.654 USD
                    </div>
                  </div>
                </li>

                <li className="crypto___item">
                  <img className="crypto__item-pic" src="/img/actives/actives-2.png" alt="" />

                  <div className="crypto__item-info">
                    <h4 className="crypto__item-name">
                      Green Metaverse Token
                    </h4>

                    <h5 className="crypto__item-subname">
                      BTC
                    </h5>
                  </div>

                  <div className="crypto__item-counts">
                    <div className="crypto__item-count--main">
                      1.578697
                    </div>

                    <div className="crypto__item-count--second">
                      ~131567.654 USD
                    </div>
                  </div>
                </li>

                <li className="crypto___item">
                  <img className="crypto__item-pic" src="/img/actives/actives-2.png" alt="" />

                  <div className="crypto__item-info">
                    <h4 className="crypto__item-name">
                      Green Metaverse Token
                    </h4>

                    <h5 className="crypto__item-subname">
                      BTC
                    </h5>
                  </div>

                  <div className="crypto__item-counts">
                    <div className="crypto__item-count--main">
                      1.578697
                    </div>

                    <div className="crypto__item-count--second">
                      ~131567.654 USD
                    </div>
                  </div>
                </li>

                <li className="crypto___item">
                  <img className="crypto__item-pic" src="/img/actives/actives-2.png" alt="" />

                  <div className="crypto__item-info">
                    <h4 className="crypto__item-name">
                      Green Metaverse Token
                    </h4>

                    <h5 className="crypto__item-subname">
                      BTC
                    </h5>
                  </div>

                  <div className="crypto__item-counts">
                    <div className="crypto__item-count--main">
                      1.578697
                    </div>

                    <div className="crypto__item-count--second">
                      ~131567.654 USD
                    </div>
                  </div>
                </li>

                <li className="crypto___item">
                  <img className="crypto__item-pic" src="/img/actives/actives-2.png" alt="" />

                  <div className="crypto__item-info">
                    <h4 className="crypto__item-name">
                      Green Metaverse Token
                    </h4>

                    <h5 className="crypto__item-subname">
                      BTC
                    </h5>
                  </div>

                  <div className="crypto__item-counts">
                    <div className="crypto__item-count--main">
                      1.578697
                    </div>

                    <div className="crypto__item-count--second">
                      ~131567.654 USD
                    </div>
                  </div>
                </li>

                <li className="crypto___item">
                  <img className="crypto__item-pic" src="/img/actives/actives-2.png" alt="" />

                  <div className="crypto__item-info">
                    <h4 className="crypto__item-name">
                      Green Metaverse Token
                    </h4>

                    <h5 className="crypto__item-subname">
                      BTC
                    </h5>
                  </div>

                  <div className="crypto__item-counts">
                    <div className="crypto__item-count--main">
                      1.578697
                    </div>

                    <div className="crypto__item-count--second">
                      ~131567.654 USD
                    </div>
                  </div>
                </li>

                <li className="crypto___item">
                  <img className="crypto__item-pic" src="/img/actives/actives-2.png" alt="" />

                  <div className="crypto__item-info">
                    <h4 className="crypto__item-name">
                      Green Metaverse Token
                    </h4>

                    <h5 className="crypto__item-subname">
                      BTC
                    </h5>
                  </div>

                  <div className="crypto__item-counts">
                    <div className="crypto__item-count--main">
                      1.578697
                    </div>

                    <div className="crypto__item-count--second">
                      ~131567.654 USD
                    </div>
                  </div>
                </li>

                <li className="crypto___item">
                  <img className="crypto__item-pic" src="/img/actives/actives-2.png" alt="" />

                  <div className="crypto__item-info">
                    <h4 className="crypto__item-name">
                      Green Metaverse Token
                    </h4>

                    <h5 className="crypto__item-subname">
                      BTC
                    </h5>
                  </div>

                  <div className="crypto__item-counts">
                    <div className="crypto__item-count--main">
                      1.578697
                    </div>

                    <div className="crypto__item-count--second">
                      ~131567.654 USD
                    </div>
                  </div>
                </li>

                <li className="crypto___item">
                  <img className="crypto__item-pic" src="/img/actives/actives-2.png" alt="" />

                  <div className="crypto__item-info">
                    <h4 className="crypto__item-name">
                      Green Metaverse Token
                    </h4>

                    <h5 className="crypto__item-subname">
                      BTC
                    </h5>
                  </div>

                  <div className="crypto__item-counts">
                    <div className="crypto__item-count--main">
                      1.578697
                    </div>

                    <div className="crypto__item-count--second">
                      ~131567.654 USD
                    </div>
                  </div>
                </li>

                <li className="crypto___item">
                  <img className="crypto__item-pic" src="/img/actives/actives-2.png" alt="" />

                  <div className="crypto__item-info">
                    <h4 className="crypto__item-name">
                      Green Metaverse Token
                    </h4>

                    <h5 className="crypto__item-subname">
                      BTC
                    </h5>
                  </div>

                  <div className="crypto__item-counts">
                    <div className="crypto__item-count--main">
                      1.578697
                    </div>

                    <div className="crypto__item-count--second">
                      ~131567.654 USD
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </form>
        </div> */}
      </div>
    </main>
  )
}