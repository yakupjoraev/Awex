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
import { AuthorizedService } from "@awex-api"
import toast from "react-hot-toast"
import usePortal from "react-useportal"
import { PaymentLinkModal } from "@components/PaymentLinkModal"
import classNames from "classnames"
import { NavLink, useLocation } from "react-router-dom"
import { useCurrencies } from "../../hooks/useCurrencies"


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
  isTemplate?: boolean
}

interface OrderTemplateData {
  userId: number
  name: string
  price: number
  currency: string
  projectId: number
  depositAmount: number
  depositReturnTime: number
}

interface OrderTemplate {
  id: number
  data: OrderTemplateData,
  created_at: number
}

type InvoiceStates = 'new' | 'edit' | 'template'


export function InvoicePage() {
  const dispatch = useAppDispatch()
  const nameId = useId()
  const amountId = useId()
  const useConvertToId = useId()
  const useDepositId = useId()
  const depositAmountId = useId()
  const depositReturnAtId = useId()
  const isTemplateId = useId()
  const projects = useAppSelector((state) => state.projects.data || DEFAULT_PROJECTS)
  const projectsError = useAppSelector((state) => state.projects.error)
  const [depositCurrencies, depositCurrenciesLoading] = useCurrencies(DEFAULT_CURRENCIES)
  const [invoiceCurrencies, invoiceCurrenciesLoading] = useCurrencies(DEFAULT_CURRENCIES)
  const [paymentLinkModalOpened, setPaymentLinkModalOpened] = useState(false)
  const [paymentToken, setPaymentToken] = useState<string | null>(null)
  const [paymentDescription, setPaymentDescription] = useState<string | undefined>(undefined)
  const [formProcess, setFormProcess] = useState<InvoiceStates>('new') // The form is universal, therefore it has several states: 
  /*
  * 'new'       : New payment without template. Normal state. Has a checkbox with saving the payment template
  * 'template'  : Create a payment using a template. Has a chexbox for saving changes to the template
  * 'edit'      : Editing a template. Does not allow creating a new payment
  * */
  const [editableOrderId, setEditableOrderId] = useState<number>(0)
  const { Portal } = usePortal()
  const location = useLocation()
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    resolver: yupResolver(invoiceFormValidator),
  })
  const useConvertToValue = useWatch({ control, name: "useConvertTo" })
  const useDepositValue = useWatch({ control, name: "useDeposit" })


  useEffect(() => {
    setValue("depositCurrency", "usdt")
  }, [])

  useEffect(() => {
    dispatch(getProjects())
  }, [dispatch])

  useEffect(() => {
    checkLocationProjectId()
    checkLocationOrderTemplate()
  }, [location, projects, setValue])
  

  const projectOptions = useMemo(() => {
    return projects.map(({ id, project }) => ({
      value: id,
      label: project.name,
      key: id,
    }))
  }, [projects])


  function checkLocationProjectId() {
    if (
      !location ||
      !("state" in location) ||
      !location.state ||
      !("projectId" in location.state)
    )
      return
    setValue("projectId", location.state.projectId)
  }

  function checkLocationOrderTemplate() {
    if (
      !location ||
      !("state" in location) ||
      !location.state ||
      !("templateData" in location.state)
    )
      return
      
    const process: InvoiceStates = location.state.templateData.process
    setFormProcess(process)
    const orderTemplate: OrderTemplate = location.state.templateData.template
    if(!("data" in orderTemplate)) return
    setEditableOrderId(orderTemplate.id)
    const data: OrderTemplateData = orderTemplate.data;

    
    ("projectId" in data) && setValue("projectId", data.projectId.toString());
    ("name" in data) && setValue("name", data.name)
    if("depositAmount" in data) { 
      setValue("depositAmount", data.depositAmount.toString())
      setValue("useDeposit", true)
    }
    ("depositReturnTime" in data) && setValue("depositReturnAt", data.depositReturnTime);
    ("price" in data) && setValue("amount", data.price.toString());
    ("currency" in data) && setValue("currency", data.currency)
  }

  const handleInvoiceFormSubmit = handleSubmit((formData) => {
    let projectId: number | undefined = undefined
    if (formData.projectId) {
      projectId = parseInt(formData.projectId, 10)
      if (isNaN(projectId)) return
    }
    const name = formData.name
    const price = parseFloat(formData.amount)
    const currency = formData.currency
    const isTemplate = formData.isTemplate
    let buyerIdentifier: string | undefined = undefined
    let depositAmount: number | undefined = undefined
    if (formData.useDeposit) {
      depositAmount = formData.depositAmount
        ? parseFloat(formData.depositAmount)
        : 0
    }
    const depositReturnTime = formData.depositReturnAt

    console.log('handleInvoiceFormSubmit', formProcess, editableOrderId)

    if(formProcess === 'new' || formProcess === 'template') {
      AuthorizedService.orderCreate({
        name,
        price,
        currency,
        projectId,
        buyerIdentifier,
        depositAmount,
        depositReturnTime,
        isTemplate,
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
    }

    if(formProcess === 'edit' && editableOrderId > 0) {
      AuthorizedService.setOrderTemplate(editableOrderId.toString(), {
        name,
        price,
        currency,
        projectId: Number(projectId),
        buyerIdentifier,
        // comment: '',
        depositAmount: Number(depositAmount),
        depositReturnTime: Number(depositReturnTime),
        convertTo: "stablecoin"
      })
      .then((response) => {
        if(response) {
          toast.success('Изменения успешно сохранены!')
          return
        }
        toast.error('Не удалось сохранить изменения.')
      })
      .catch((error) => {
        console.error(error)
        toast.error('Не удалось сохранить изменения.')
      })
    }
  })

  const handlePaymentLinkModalClose = () => {
    setPaymentLinkModalOpened(false)
  }


  return (
    <div className="wrapper">
      <Helmet title="Выставление счета" />
      <section className="invoice">
        <div className="invoice__header">
          <div className="invoice__header-label">
            <h1 className="invoice__title main-title">Выставление счета</h1>
          </div>

          <NavLink to={'/invoice-templates'} className="invoice__header-link second-btn">Выбрать шаблон</NavLink>
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
            <label
              className="invoice-project__label project-label"
              htmlFor={nameId}
            >
              Наименование товара или услуги
            </label>

            <textarea
              className="invoice-project__textarea project-textarea"
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
                      <input
                        className="checkbox-input"
                        type="checkbox"
                        id={useConvertToId}
                        {...register("useConvertTo")}
                      />
                      <label
                        className="checkbox-label"
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
                    )
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

                    <label
                      className="invoice-project__radio-label"
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
                      className="invoice-project__radio-label"
                      htmlFor="radio13"
                    >
                      Клиент
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="invoice-project__label project-label invoice__group-textarea">
            <div className="checkbox-group">
              <input
                className="checkbox-input"
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

              <input
                className="invoice-project__input project-input"
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

              <input
                className="invoice-project__input project-input"
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
                <label
                  className="about-deposit__generation-title"
                  htmlFor={amountId}
                >
                  Сумма
                </label>

                <input
                  className="about-deposit__generation-input"
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
                  )
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

          <div className="invoice-project__item-btns my-projects__item-btns flex-column">
            <button type="submit" className="invoice-project__btn second-btn">
              { (formProcess === 'new' || formProcess === 'template') && 'Сгенерировать платежную ссылку' }
              { formProcess === 'edit' && 'Сохранить изменения' }
            </button>
            
            { formProcess === 'new' && (
              <div className="checkbox-group pt15">
                <input className="checkbox-input"
                  type="checkbox"
                  id={isTemplateId}
                  {...register("isTemplate")}
                />
                <label className="checkbox-label" htmlFor={isTemplateId}>
                  <div className="checkbox-decor"></div> Сохранить как шаблон
                </label>
              </div>
            )}
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
  )
}