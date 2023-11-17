import { useEffect, useId, useMemo, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { AppProject } from "../../../types"
import { invoiceFormValidator } from "./validators"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm, Controller, useWatch } from "react-hook-form"
import { InvoiceProjectSelector } from "./InvoiceProjectSelector"
import { InvoiceCurrencySelector } from "./InvoiceCurrencySelector"
import { getProjects } from "@store/projects/slice"
import { AuthenticatedService, AuthorizedService } from "@awex-api"
import toast from "react-hot-toast"
import usePortal from "react-useportal"
import { PaymentLinkModal } from "@components/PaymentLinkModal"
import { DepositCurrencySelector } from "./DepositCurrencySelector"
import classNames from "classnames"
import { useLocation } from "react-router-dom"

const DEFAULT_PROJECTS: { id: string; project: AppProject }[] = []
const DEFAULT_CURRENCIES: { currency: string; name?: string; rate?: string }[] = []

interface InvoiceFormData {
  projectId?: string
  name: string
  amount: string //number
  currency: string
  useConvertTo?: boolean
  useDeposit?: boolean
  depositCurrency?: string
  depositAmount?: string //number
  depositReturnAt?: number
}

export function InvoicePage() {
  const dispatch = useAppDispatch()
  const nameId = useId()
  const amountId = useId()
  const useConvertToId = useId()
  const useDepositId = useId()
  const depositAmountId = useId()
  const depositReturnAtId = useId()
  const projects = useAppSelector((state) => state.projects.data || DEFAULT_PROJECTS)
  const projectsError = useAppSelector((state) => state.projects.error)
  const [depositCurrencies, depositCurrenciesLoading] = useCurrencies(DEFAULT_CURRENCIES)
  const [invoiceCurrencies, invoiceCurrenciesLoading] = useCurrencies(DEFAULT_CURRENCIES)
  const [paymentLinkModalOpened, setPaymentLinkModalOpened] = useState(false)
  const [paymentToken, setPaymentToken] = useState<string | null>(null)
  const [paymentDescription, setPaymentDescription] = useState<string | undefined>(undefined)
  const { Portal } = usePortal()
  const location = useLocation()

  const {
    register,
    setValue,
    setError,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    reset,
  } = useForm<InvoiceFormData>({
    resolver: yupResolver(invoiceFormValidator),
  })
  const useConvertToValue = useWatch({ control, name: "useConvertTo" })
  const useDepositValue = useWatch({ control, name: "useDeposit" })
  
  useEffect(()=>{
    setValue("depositCurrency", 'usdt')
  }, [])

  useEffect(() => {
    dispatch(getProjects())
  }, [dispatch])
  
  useEffect(() => {
    if(!location || !('state' in location) || !location.state || !('projectId' in location.state)) return
    setValue("projectId", location.state.projectId)
  }, [location, projects, setValue])

  const handleInvoiceFormSubmit = handleSubmit((formData) => {
    let projectId: number | undefined = undefined
    if (formData.projectId) {
      projectId = parseInt(formData.projectId, 10)
      if (isNaN(projectId)) return 
    }
    const name = formData.name
    const price = parseFloat(formData.amount)
    const currency = formData.currency
    let buyerIdentifier: string | undefined = undefined
    let depositAmount: number | undefined = undefined
    if (formData.useDeposit) {
      depositAmount = formData.depositAmount ? parseFloat(formData.depositAmount) : 0
    }
    const depositReturnTime = formData.depositReturnAt

    AuthorizedService.orderCreate({
      name,
      price,
      currency,
      projectId,
      buyerIdentifier,
      depositAmount,
      depositReturnTime
    })
    .then((response) => {
      if (response.uniqueId) {
        setPaymentLinkModalOpened(true)
        setPaymentToken(response.uniqueId)
        setPaymentDescription(formData.name)
      } else {
        toast.error("Не удалось создать платежную ссылку.")
      }
    })
    .catch((error) => {
      console.error(error)
      toast.error("Не удалось создать платежную ссылку.")
    })
  })

  const handlePaymentLinkModalClose = () => {
    setPaymentLinkModalOpened(false)
  };

  const projectOptions = useMemo(() => {
    return projects.map(({ id, project }) => ({
      value: id,
      label: project.name,
      key: id,
    }));
  }, [projects])

  return (
    <div className="wrapper">
      <Helmet title="Выставление счета" />
      <section className="invoice">
        <div className="invoice__header">
          <div className="invoice__header-label">
            <h1 className="invoice__title main-title">Выставление счета</h1>
          </div>
        </div>

        <form className="invoice__wrapper" onSubmit={handleInvoiceFormSubmit}>
          <Controller
            control={control}
            name="projectId"
            render={({ field }) => {
              return (
                <InvoiceProjectSelector
                  value={field.value}
                  options={projectOptions}
                  error={errors?.projectId?.message}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )
            }}
          />

          <div className="invoice-project__group project-group invoice__group-textarea">
            <label className="invoice-project__label project-label"
              htmlFor={nameId}
            >
              Наименование товара или услуги
            </label>

            <textarea className="invoice-project__textarea project-textarea"
              id={nameId}
              placeholder="Введите наименование товара, номер договора, ФИО клиента и комментарий, отображающий особенность услуги или товара"
              {...register("name")}
            ></textarea>
            {errors.name?.message && (
              <div className="project-error">{errors.name.message}</div>
            )}
          </div>

          <div className="invoice-project__groups project-groups">
            <div className="invoice-project__group invoice-project__group--transparent project-group">
              <div className="invoice-project__group invoice-project__group-changes">
                <div className="invoice-project__radios">
                  <div className="invoice-project__label project-label">
                    <div className="checkbox-group">
                      <input className="checkbox-input"
                        type="checkbox"
                        id={useConvertToId}
                        {...register("useConvertTo")}
                      />
                      <label className="checkbox-label"
                        htmlFor={useConvertToId}
                      >
                        <div className="checkbox-decor"></div> Конвертировать в:
                      </label>
                    </div>

                    {/* <div className="invoice-project__radio-container">
                      <div className="invoice-project__radio-group">
                        <input
                          className="invoice-project__radio"
                          type="radio"
                          name="marka"
                          id="radio10"
                          defaultChecked
                        />

                        <label
                          className={classNames(
                            "invoice-project__radio-label",
                            !useConvertToValue &&
                              "invoice-project__radio-label--disabled"
                          )}
                          htmlFor="radio10"
                        >
                          Фиат
                        </label>
                      </div>

                      <div className="invoice-project__radio-group">
                        <input
                          className="invoice-project__radio"
                          type="radio"
                          name="marka"
                          id="radio11"
                        />

                        <label
                          className={classNames(
                            "invoice-project__radio-label",
                            !useConvertToValue &&
                              "invoice-project__radio-label--disabled"
                          )}
                          htmlFor="radio11"
                        >
                          Крипто
                        </label>
                      </div>
                    </div> */}
                  </div>
                </div>
                {/* <Controller
                  control={control}
                  name="depositCurrency"
                  render={({ field }) => {
                    return (
                      <DepositCurrencySelector
                        currency={field.value}
                        currencies={depositCurrencies}
                        loading={depositCurrenciesLoading}
                        disabled={useConvertToValue !== true}
                        onChange={field.onChange}
                      />
                    );
                  }}
                /> */}
                
                <Controller
                  name="depositCurrency"
                  control={control}
                  render={({ field }) => {
                    return (
                      <InvoiceCurrencySelector
                        currency={field.value}
                        currencies={depositCurrencies}
                        loading={depositCurrenciesLoading}
                        disabled={useConvertToValue !== true}
                        onChange={field.onChange}
                      />
                    );
                  }}
                />

              </div>
            </div>

            {/* <div className="invoice-project__group invoice-project__group--transparent project-group">
              <div className="invoice-project__radios">
                <div
                  className={classNames(
                    "invoice-project__label project-label",
                    !useConvertToValue && "invoice-project__label--disabled"
                  )}
                >
                  Комиссию оплачивает:
                </div>

                <div className="invoice-project__radio-container">
                  <div className="invoice-project__radio-group">
                    <input
                      className="invoice-project__radio"
                      type="radio"
                      name="pay"
                      id="radio12"
                      defaultChecked
                    />

                    <label
                      className={classNames(
                        "invoice-project__radio-label",
                        !useConvertToValue &&
                          "invoice-project__radio-label--disabled"
                      )}
                      htmlFor="radio12"
                    >
                      Мерчант
                    </label>
                  </div>

                  <div className="invoice-project__radio-group">
                    <input
                      className="invoice-project__radio"
                      type="radio"
                      name="pay"
                      id="radio13"
                    />

                    <label
                      className={classNames(
                        "invoice-project__radio-label",
                        !useConvertToValue &&
                          "invoice-project__radio-label--disabled"
                      )}
                      htmlFor="radio13"
                    >
                      Клиент
                    </label>
                  </div>
                </div>
              </div>
            </div> */}

            <div className="invoice-project__group invoice-project__group--transparent project-group">
              <div className="invoice-project__radios">
                <div className="invoice-project__label project-label">
                  Комиссию оплачивает:
                </div>

                <div className="invoice-project__radio-container">
                  <div className="invoice-project__radio-group">
                    <input
                      className="invoice-project__radio"
                      type="radio"
                      name="pay"
                      id="radio12"
                      defaultChecked
                    />

                    <label className="invoice-project__radio-label" htmlFor="radio12">
                      Мерчант
                    </label>
                  </div>

                  <div className="invoice-project__radio-group">
                    <input
                      className="invoice-project__radio"
                      type="radio"
                      name="pay"
                      id="radio13"
                    />

                    <label className="invoice-project__radio-label" htmlFor="radio13">
                      Клиент
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="invoice-project__label project-label invoice__group-textarea">
            <div className="checkbox-group">
              <input className="checkbox-input"
                type="checkbox"
                id={useDepositId}
                {...register("useDeposit")}
              />
              <label className="checkbox-label" htmlFor={useDepositId}>
                <div className="checkbox-decor"></div> Использовать депозит
              </label>
            </div>
          </div>

          <div className="invoice-project__groups project-groups">
            <div
              className={classNames(
                "invoice-project__group project-group",
                useDepositValue !== true && "invoice-project__group--disabled"
              )}
            >
              <label
                className={classNames(
                  "invoice-project__label project-label",
                  useDepositValue !== true && "invoice-project__label--disabled"
                )}
                htmlFor={depositAmountId}
              >
                Депозит
              </label>

              <input className="invoice-project__input project-input"
                id={depositAmountId}
                type="text"
                placeholder="Введите сумму депозита"
                disabled={useDepositValue !== true}
                {...register("depositAmount")}
              />
              {errors.depositAmount?.message && (
                <div className="project-error">
                  {errors.depositAmount.message}
                </div>
              )}
            </div>

            <div
              className={classNames(
                "invoice-project__group project-group",
                useDepositValue !== true && "invoice-project__group--disabled"
              )}
            >
              <label
                className={classNames(
                  "invoice-project__label project-label",
                  useDepositValue !== true && "invoice-project__label--disabled"
                )}
                htmlFor={depositReturnAtId}
              >
                Срок депозита (суток)
              </label>

              <input className="invoice-project__input project-input"
                id={depositReturnAtId}
                type="number"
                placeholder="Введите количество дней"
                disabled={useDepositValue !== true}
                {...register("depositReturnAt", { valueAsNumber: true })}
              />
              {errors.depositReturnAt?.message && (
                <div className="project-error">
                  {errors.depositReturnAt?.message}
                </div>
              )}
            </div>
          </div>

          <div className="about-deposit__generation-select invoice__generation-select">
            <div className="about-deposit__generation-selected about-deposit__generation-selected--not-reverse">
              <div className="about-deposit__generation-info">
                <label className="about-deposit__generation-title"
                  htmlFor={amountId}
                >
                  Сумма
                </label>

                <input className="about-deposit__generation-input"
                  id={amountId}
                  type="text"
                  placeholder="Введите сумму"
                  {...register("amount")}
                />
              </div>
              <Controller
                name="currency"
                control={control}
                render={({ field }) => {
                  return (
                    <InvoiceCurrencySelector
                      currency={field.value}
                      currencies={invoiceCurrencies}
                      loading={invoiceCurrenciesLoading}
                      onChange={field.onChange}
                    />
                  );
                }}
              />
            </div>
            {errors.amount?.message && (
              <div className="project-error">{errors.amount.message}</div>
            )}
            {errors.currency?.message && (
              <div className="project-error">{errors.currency.message}</div>
            )}
          </div>

          {errors.root?.message && (
            <div className="my-projects__error">{errors.root.message}</div>
          )}
          {projectsError && (
            <div className="my-projects__error">
              Не удалось загрузить список проектов.
            </div>
          )}
          <div className="invoice-project__item-btns my-projects__item-btns">
            <button type="submit" className="invoice-project__btn second-btn">
              Сгенерировать платежную ссылку
            </button>
          </div>
        </form>
      </section>
      {paymentToken !== null && (
        <Portal>
          <PaymentLinkModal
            open={paymentLinkModalOpened}
            token={paymentToken}
            text={paymentDescription}
            onClose={handlePaymentLinkModalClose}
          />
        </Portal>
      )}
    </div>
  );
}

function useCurrencies(
  defaultValue: { currency: string; name?: string; rate?: string }[]
): [
  { currency: string; name?: string; rate?: string }[],
  boolean,
  string | null
] {
  const [currencies, setCurrencies] = useState(defaultValue)
  const [currenciesLoading, setCurrenciesLoading] = useState(false)
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
            continue;
          }
          nextCurrencies.push({
            currency: listItem.currency,
            name: listItem.name,
            rate: listItem.rate,
            chain: listItem.chain,
          })
        }
        setCurrencies(nextCurrencies);
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
