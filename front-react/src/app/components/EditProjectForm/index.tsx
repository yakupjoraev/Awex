import { ReactNode, useEffect, useId, useMemo, useState } from "react"
import { useForm, Controller, FieldErrors } from "react-hook-form"
import { useDropdown } from "../../hooks/useDropdown"
import classNames from "classnames"
import { CompanyProfileModalContainer } from "@containers/CompanyProfileModalContainer"
import { Selector } from "@components/Selector"
import { yupResolver } from "@hookform/resolvers/yup"
import { editProjectFormValidator } from "./validators"
import style from "./style.module.css"
import { AppProject } from "src/types"


export type EditProjectFormData = {
  companyId: string
  name: string
  description: string
  feePayee: boolean
  paymentBills: boolean
  paymentWeb: boolean
  paymentTelegram: boolean
  activity: string
  convertTo?: string
  urlWeb: string
  urlNotification: string
  urlPaymentSuccess: string
  urlPaymentFailure: string
}

const DEFAULT_FORM_DATA: EditProjectFormData = {
  companyId: "",
  name: "",
  description: "",
  feePayee: true,
  paymentBills: false,
  paymentWeb: false,
  paymentTelegram: false,
  activity: "",
  convertTo: "",
  urlWeb: "",
  urlNotification: "",
  urlPaymentSuccess: "",
  urlPaymentFailure: "",
}

const currencyToLabel: Record<string, string> = {
  rub: "RUB",
  eur: "EURO",
  usd: "USD",
  usdt: "USDT",
}

export interface EditProjectFormProps {
  project?: AppProject
  loading?: boolean
  error?: string
  currencies?: { name: string; type: "fiat" | "crypto" }[]
  companies?: { id: string; companyName: string }[]
  onSubmit: (formData: EditProjectFormData) => void
  header?: ReactNode
  footer?: ReactNode
}


export function EditProjectForm(props: EditProjectFormProps) {
  const formId = useId()
  const [companyModalOpened, setCompanyModalOpened] = useState(false)
  const [currencyType, setCurrencyType] = useState<"fiat" | "crypto">("fiat")
  const csmDropdown = useDropdown<HTMLDivElement>()
  const {
    register,
    setValue,
    setError,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    reset,
  } = useForm<EditProjectFormData>({
    defaultValues: DEFAULT_FORM_DATA,
    resolver: yupResolver(editProjectFormValidator),
  })


  useEffect(() => {
    if (props.project === undefined) {
      const currentFormData = getValues()
      if (currentFormData !== DEFAULT_FORM_DATA) {
        reset(DEFAULT_FORM_DATA)
      }
    } else {
      const nextFormState: EditProjectFormData = {
        companyId: "",
        name: "",
        description: "",
        feePayee: true,
        paymentBills: false,
        paymentWeb: false,
        paymentTelegram: false,
        activity: "",
        urlWeb: "",
        urlNotification: "",
        urlPaymentSuccess: "",
        urlPaymentFailure: "",
      }
      reset(createEditProjectFormData(props.project))
    }
  }, [props.project])

  useEffect(() => {
    if (props.error) {
      setError("root", { message: props.error })
    }
  }, [props.error])
  
  useEffect(() => {
    setValue("convertTo", "")
  }, [currencyType])


  const handleCompanyModalClose = () => {
    setCompanyModalOpened(false)
  }

  const handleProjectFormSubmit = handleSubmit((formData) => {
    props.onSubmit(formData)
  })

  const companyOptions: { value: string; label: string }[] = useMemo(() => {
    if (!props.companies) {
      return []
    }
    return props.companies.map(({ id, companyName }) => ({
      value: id,
      label: companyName,
    }))
  }, [props.companies])

  const currencyOptions: { value: string; label: string }[] = useMemo(() => {
    if (!props.currencies) {
      return []
    }
    return props.currencies
      .filter(({ type }) => {
        return type === currencyType
      })
      .map(({ name }) => ({
        value: name,
        label: currencyToLabel[name] || name,
      }))
  }, [props.currencies, currencyType])


  return (
    <>
      <form
        className="my-projects__item-wrapper"
        onSubmit={handleProjectFormSubmit}
      >
        {props.header}

        <div className="my-projects__groups project-groups">
          <div className="my-projects__group project-group">
            <label
              className="my-projects__label project-label"
              htmlFor={`${formId}name`}
            >
              Название проекта
            </label>

            <input
              className="my-projects__input project-input"
              id={`${formId}name`}
              type="text"
              placeholder="ООО “Первый”"
              {...register("name", { required: true })}
            />

            {renderFieldError(errors, "name")}
          </div>

          <div className="my-projects__group project-group">
            <label
              className="my-projects__label project-label"
              htmlFor={`${formId}activity`}
            >
              Деятельность
            </label>

            <input
              className="my-projects__input project-input"
              id={`${formId}activity`}
              type="text"
              placeholder="Введите род деятельности"
              {...register("activity", { required: true })}
            />

            {renderFieldError(errors, "activity")}
          </div>
        </div>

        <div className="my-projects__groups project-groups  my-projects__groups--second">
          <div className="my-projects__group project-group">
            <label
              className="my-projects__label project-label"
              htmlFor={`${formId}description`}
            >
              Описание проекта
            </label>

            <textarea
              className="my-projects__textarea project-textarea"
              id={`${formId}description`}
              placeholder="Введите краткое описание проекта"
              {...register("description", { required: true })}
            ></textarea>{" "}

            {renderFieldError(errors, "description")}
          </div>

          <div className="my-projects__group my-projects__group-changes">
            <div className="my-projects__radios">
              <div className="my-projects__label project-label">
                <img
                  className="my-projects__label-img"
                  src="/img/icons/checkbox-circle-checked.svg"
                  alt="checkbox-circle-checked"
                />

                <label
                  className="my-projects__label-descr project-label-descr"
                  htmlFor={`${formId}convert_to_stablecoin`}
                >
                  Конвертировать оплату в:
                </label>
              </div>

              <div className="my-projects__radio-container">
                <div className="my-projects__radio-group">
                  <input
                    className="my-projects__radio"
                    id={`${formId}currency_type_crypto`}
                    type="radio"
                    name="currency_type"
                    checked={currencyType === "crypto"}
                    onChange={() => void setCurrencyType("crypto")}
                  />

                  <label
                    className="my-projects__radio-label"
                    htmlFor={`${formId}currency_type_crypto`}
                  >
                    Стейблкоин
                  </label>
                </div>

                <div className="my-projects__radio-group">
                  <input
                    className="my-projects__radio"
                    id={`${formId}currency_type_fiat`}
                    type="radio"
                    name="currency_type"
                    checked={currencyType === "fiat"}
                    onChange={() => void setCurrencyType("fiat")}
                  />

                  <label
                    className="my-projects__radio-label"
                    htmlFor={`${formId}currency_type_fiat`}
                  >
                    Фиат
                  </label>
                </div>
              </div>
            </div>

            <Controller
              name="convertTo"
              control={control}
              render={({ field }) => {
                return (
                  <Selector
                    value={field.value || ""}
                    options={currencyOptions}
                    disabled={props.loading}
                    onChange={field.onChange}
                  />
                )
              }}
            />

            {renderFieldError(errors, "convertTo")}
          </div>
        </div>

        <div className="my-projects__groups project-groups">
          <div className="my-projects__group my-projects__group--transparent project-group">
            <div className="my-projects__radios">
              <label
                className="my-projects__label project-label"
                htmlFor={`${formId}fee_payee_merchant`}
              >
                Комиссию оплачивает:
                <img
                  className="my-projects__label-pic"
                  src="/img/icons/tooltip.svg"
                  alt="tooltip"
                />
              </label>

              <Controller
                name="feePayee"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => {
                  return (
                    <div className="my-projects__radio-container">
                      <div className="my-projects__radio-group">
                        <input
                          className="my-projects__radio"
                          id={`${formId}fee_payee_merchant`}
                          type="radio"
                          name="pay"
                          checked={value === true}
                          ref={ref}
                          onChange={() => {
                            onChange(true);
                          }}
                          onBlur={onBlur}
                        />

                        <label
                          className="my-projects__radio-label"
                          htmlFor={`${formId}fee_payee_merchant`}
                        >
                          Мерчант
                        </label>
                      </div>

                      <div className="my-projects__radio-group">
                        <input
                          className="my-projects__radio"
                          id={`${formId}fee_payee_client`}
                          type="radio"
                          name="pay"
                          value="client"
                          checked={value === false}
                          ref={ref}
                          onChange={() => {
                            onChange(false);
                          }}
                          onBlur={onBlur}
                        />

                        <label
                          className="my-projects__radio-label"
                          htmlFor={`${formId}fee_payee_client`}
                        >
                          Клиент
                        </label>
                      </div>
                    </div>
                  )
                }}
              />
            </div>
          </div>

          <div className="my-projects__group my-projects__group--transparent project-group">
            <div className="my-projects__group my-projects__group-changes">
              <div className="my-projects__radios">
                <div className="my-projects__label project-label">
                  <img
                    className="my-projects__label-img"
                    src="/img/icons/checkbox-circle-checked.svg"
                    alt="checkbox-circle-checked"
                  />

                  <p className="my-projects__label-descr project-label-descr">
                    Использую CMS
                  </p>
                </div>
              </div>

              <div
                className="my-projects__group-select"
                data-select-wrapper=""
                ref={csmDropdown.containerRef}
              >
                <div
                  className={classNames("my-projects__group-selected", {
                    active: csmDropdown.opened,
                  })}
                  data-select-arrow=""
                  onClick={() => csmDropdown.toggle()}
                >
                  Выбрать CMS
                  <img
                    className="my-projects__group-select-arrow"
                    src="/img/icons/mini-arrow-down.svg"
                    alt="mini-arrow-down"
                  />
                </div>

                <ul
                  className={classNames("my-projects__group-list select-list", {
                    active: csmDropdown.opened,
                  })}
                  data-select-list=""
                >
                  <li
                    className="my-projects__group-item select-item"
                    data-select-item=""
                    onClick={() => csmDropdown.toggle(false)}
                  >
                    Выбрать CMS
                  </li>
                  <li
                    className="my-projects__group-item select-item"
                    data-select-item=""
                    onClick={() => csmDropdown.toggle(false)}
                  >
                    Выбрать CMS
                  </li>
                  <li
                    className="my-projects__group-item select-item"
                    data-select-item=""
                    onClick={() => csmDropdown.toggle(false)}
                  >
                    Выбрать CMS
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="my-projects__checkboxes">
          <label
            className="my-projects__checkboxes-label project-label"
            htmlFor={`${formId}payment_bills`}
          >
            Как вы планируете принимать платежи:
          </label>

          <div className="my-projects__checkboxes-list">
            <div className="my-projects__checkbox-view checkbox-group">
              <input
                className="my-projects__checkbox-checkbox checkbox-input"
                id={`${formId}payment_bills`}
                type="checkbox"
                {...register("paymentBills")}
              />

              <label
                className="my-projects__checkbox-label checkbox-label"
                htmlFor={`${formId}payment_bills`}
              >
                <div className="my-projects__checkbox-decor checkbox-decor"></div>
                <span className="my-projects__checkbox-text checkbox-text">
                  Выставлять счета
                </span>
              </label>
            </div>

            <div className="my-projects__checkbox-view checkbox-group">
              <input
                className="my-projects__checkbox-checkbox checkbox-input"
                id={`${formId}payment_web`}
                type="checkbox"
                {...register("paymentWeb")}
              />

              <label
                className="my-projects__checkbox-label checkbox-label"
                htmlFor={`${formId}payment_web`}
              >
                <div className="my-projects__checkbox-decor checkbox-decor"></div>
                <span className="my-projects__checkbox-text checkbox-text">
                  На сайте
                </span>
              </label>
            </div>

            <div className="my-projects__checkbox-view checkbox-group">
              <input
                className="my-projects__checkbox-checkbox checkbox-input"
                id={`${formId}payment_telegram`}
                type="checkbox"
                {...register("paymentTelegram")}
              />

              <label
                className="my-projects__checkbox-label checkbox-label"
                htmlFor={`${formId}payment_telegram`}
              >
                <div className="my-projects__checkbox-decor checkbox-decor"></div>
                <span className="my-projects__checkbox-text checkbox-text">
                  В Telegram
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="my-projects__groups project-groups">
          <div className="my-projects__group my-projects__group--transparent project-group">
            <label
              className="my-projects__label project-label"
              htmlFor={`${formId}url_web`}
            >
              Профиль бизнеса
            </label>
            
            <Controller
              name="companyId"
              control={control}
              render={({ field }) => {
                return (
                  <Selector
                    value={field.value || ""}
                    options={companyOptions}
                    disabled={props.loading}
                    appendBottom={
                      <div
                        className={style["add-company-btn"]}
                        role="button"
                        onClick={() => {
                          setCompanyModalOpened(true);
                        }}
                      >
                        Создать профиль бизнеса
                      </div>
                    }
                    onChange={field.onChange}
                  />
                )
              }}
            />

            {renderFieldError(errors, "companyId")}
          </div>
          <div className={style["project-group-filler"]}></div>
        </div>

        <div className="my-projects__groups project-groups">
          <div className="my-projects__group project-group">
            <label
              className="my-projects__label project-label"
              htmlFor={`${formId}url_web`}
            >
              URL сайта или Telegram канала
              <img
                className="my-projects__label-pic"
                src="/img/icons/tooltip.svg"
                alt="tooltip"
              />
            </label>

            <input
              className="my-projects__input project-input"
              id={`${formId}url_web`}
              type="url"
              placeholder="https://www.gemini.com/"
              {...register("urlWeb", { required: true })}
            />

            {renderFieldError(errors, "urlWeb")}
          </div>

          <div className="my-projects__group project-group">
            <label
              className="my-projects__label project-label"
              htmlFor={`${formId}url_payment_success`}
            >
              URL успешной оплаты
              <img
                className="my-projects__label-pic"
                src="/img/icons/tooltip.svg"
                alt="tooltip"
              />
            </label>

            <input
              className="my-projects__input project-input"
              id={`${formId}url_payment_success`}
              type="url"
              placeholder="Введите URL"
              {...register("urlPaymentSuccess", { required: true })}
            />

            {renderFieldError(errors, "urlPaymentSuccess")}
          </div>
        </div>

        <div className="my-projects__groups project-groups">
          <div className="my-projects__group project-group">
            <label
              className="my-projects__label project-label"
              htmlFor={`${formId}url_notifications`}
            >
              URL уведомлений
              <img
                className="my-projects__label-pic"
                src="/img/icons/tooltip.svg"
                alt="tooltip"
              />
            </label>

            <input
              className="my-projects__input project-input"
              id={`${formId}url_notifications`}
              type="url"
              placeholder="Введите URL"
              {...register("urlNotification", { required: true })}
            />

            {renderFieldError(errors, "urlNotification")}
          </div>

          <div className="my-projects__group project-group">
            <label
              className="my-projects__label project-label"
              htmlFor={`${formId}url_payment_failure`}
            >
              URL неудачной оплаты
              <img
                className="my-projects__label-pic"
                src="/img/icons/tooltip.svg"
                alt="tooltip"
              />
            </label>

            <input
              className="my-projects__input project-input"
              id={`${formId}url_payment_failure`}
              type="url"
              placeholder="Введите URL"
              {...register("urlPaymentFailure", { required: true })}
            />

            {renderFieldError(errors, "urlPaymentFailure")}
          </div>
        </div>

        {errors.root?.message && (
          <div className="my-projects__error">{errors.root.message}</div>
        )}

        {props.footer}
      </form>

      <CompanyProfileModalContainer
        open={companyModalOpened}
        onClose={handleCompanyModalClose}
      />
    </>
  )
}

function renderFieldError(
  errors: FieldErrors<EditProjectFormData>,
  field: keyof EditProjectFormData
) {
  const error = errors[field]
  if (!error || !error.message) {
    return null
  }
  return <div className="project-error">{error.message}</div>
}

function createEditProjectFormData(project: AppProject): EditProjectFormData {
  return {
    companyId:
      project.companyId !== undefined
        ? project.companyId.toString()
        : DEFAULT_FORM_DATA.companyId,
    name: project.name,
    description:
      project.description !== undefined
        ? project.description
        : DEFAULT_FORM_DATA.description,
    feePayee:
      project.feePayee !== undefined
        ? project.feePayee
        : DEFAULT_FORM_DATA.feePayee,
    paymentBills:
      project.paymentBills !== undefined
        ? project.paymentBills
        : DEFAULT_FORM_DATA.paymentBills,
    paymentWeb:
      project.paymentWeb !== undefined
        ? project.paymentWeb
        : DEFAULT_FORM_DATA.paymentWeb,
    paymentTelegram:
      project.paymentTelegram !== undefined
        ? project.paymentTelegram
        : DEFAULT_FORM_DATA.paymentTelegram,
    activity:
      project.activity !== undefined
        ? project.activity
        : DEFAULT_FORM_DATA.activity,
    convertTo:
      project.convertTo !== undefined
        ? project.convertTo
        : DEFAULT_FORM_DATA.convertTo,
    urlWeb:
      project.urlWeb !== undefined ? project.urlWeb : DEFAULT_FORM_DATA.urlWeb,
    urlNotification:
      project.urlNotification !== undefined
        ? project.urlNotification
        : DEFAULT_FORM_DATA.urlNotification,
    urlPaymentSuccess:
      project.urlPaymentSuccess !== undefined
        ? project.urlPaymentSuccess
        : DEFAULT_FORM_DATA.urlPaymentSuccess,
    urlPaymentFailure:
      project.urlPaymentFailure !== undefined
        ? project.urlPaymentFailure
        : DEFAULT_FORM_DATA.urlPaymentFailure,
  }
}
