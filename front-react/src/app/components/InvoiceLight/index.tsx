import React, { useState, useEffect, useRef } from "react"
import { useAppSelector } from "@store/hooks"
import { AppProject } from "../../../types"
import { InvoiceCurrencySelector } from "../InvoiceCurrencySelector"
import { SelectorSimpleOptions, SelectorSimple } from "@components/SelectorSimple"
import { useForm, Controller } from "react-hook-form"
import { AuthorizedService } from "@awex-api"
import { yupResolver } from "@hookform/resolvers/yup"
import { invoiceFormValidator } from "./validators"
import toast from "react-hot-toast"
import usePortal from "react-useportal"
import { PaymentLinkModal } from "@components/PaymentLinkModal"


const EMPTY_FIELD = 'empty'
const DEFAULT_PROJECTS: { id: string; project: AppProject }[] = [{ id: EMPTY_FIELD,  project: { name: 'Без проекта' } }]
const DEFAULT_CURRENCIES: { currency: string; name?: string; rate?: string }[] = []


interface InvoiceFormData {
  projectId?: string
  amount: string
  currency: string
}

interface InvoiceLightProps {
  isMobile: boolean
  onSubmit?: () => void
}


export function InvoiceLight(props: InvoiceLightProps) {
  const projectSelectorRef = useRef<HTMLDivElement>(null)
  const [projectSelectorOpened, setProjectSelectorOpened] = useState(false)
  const [projectsOptions, setProjectsOptions] = useState<SelectorSimpleOptions[] | []>([])
  const [invoiceCurrencies, invoiceCurrenciesLoading] = useCurrencies(DEFAULT_CURRENCIES)
  const projects = useAppSelector((state) => state.projects.data || null)
  const [paymentLinkModalOpened, setPaymentLinkModalOpened] = useState(false)
  const [paymentToken, setPaymentToken] = useState<string | null>(null)
  const { Portal } = usePortal()
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


  useEffect(() => {
    if (!projectSelectorOpened) {
      return
    }

    const handleDocumentClick = (ev: MouseEvent) => {
      if (
        projectSelectorRef.current &&
        ev.target instanceof Element &&
        !projectSelectorRef.current.contains(ev.target)
      ) {
        setProjectSelectorOpened(false);
      }
    }

    document.addEventListener("click", handleDocumentClick)
    return () => {
      document.removeEventListener("click", handleDocumentClick)
    }
  }, [projectSelectorOpened])

  useEffect(() => {
    const filteredProjects = !projects ? [] : projects.filter((project) => {
      if(project.project.validation?.status !== 'approved') return false
      return true
    })
    const newProjectsOptions = !projects ? [] : filteredProjects.map((project) => {
      
      return {
        label: project.project.name,
        value: project.id
      }
    })
    setProjectsOptions([ { value: DEFAULT_PROJECTS[0].id, label: DEFAULT_PROJECTS[0].project.name }, ...newProjectsOptions ])
  },[projects])

  useEffect(() => {
    setValue('projectId', EMPTY_FIELD)
  }, [projectsOptions])


  const handlePaymentLinkModalClose = () => {
    setPaymentLinkModalOpened(false)
  }
 
  const handleInvoiceFormSubmit = handleSubmit((formData) => {
    let projectId: number | undefined = undefined
    if (formData.projectId) {
      projectId = formData.projectId === EMPTY_FIELD ? undefined : parseInt(formData.projectId, 10)
      if (projectId && isNaN(projectId)) { return }
    }

    const price = parseFloat(formData.amount)
    const currency = formData.currency

    AuthorizedService.orderCreate({
      name: '',
      price,
      currency,
      projectId,
    })
      .then((response) => {
        if (response.uniqueId) {
          console.log('response.uniqueId:', response.uniqueId)
          setPaymentLinkModalOpened(true)
          setPaymentToken(response.uniqueId)
          // setPaymentDescription(formData.name)
        } else {
          toast.error("Не удалось создать платежную ссылку.");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Не удалось создать платежную ссылку.");
      })
      .finally(() => {
        if(props.onSubmit) props.onSubmit()
        reset()
        setValue('projectId', EMPTY_FIELD)
      })
  })


  return (
    <>
      <form className={`main-content__deposit ${!props.isMobile && 'about-deposit'}`}
        onSubmit={handleInvoiceFormSubmit}
      >
        <div className={`${props.isMobile? '' : 'about-deposit__generation'}`}>
          <p className="about-deposit__generation-label">
            Быстрая генерация ссылки
          </p>

          <Controller
            control={control}
            name="projectId"
            render={({ field }) => {
              return (
                <SelectorSimple
                  disabled={false}
                  options={projectsOptions}
                  value={field.value}
                  onChange={field.onChange}
                />
              );
            }}
          />
          
          {errors.projectId?.message && (
            <div className="project-error">{errors.projectId.message}</div>
          )}

          <div className="about-deposit__generation-select about-deposit__generation-selected--not-reverse about-deposit__generation-selected--white">
            <div className="about-deposit__generation-selected">
              <div className="about-deposit__generation-info">
                <h5 className="about-deposit__generation-title">Сумма</h5>
                <input
                  className="about-deposit__generation-input"
                  type="text"
                  placeholder="Введите сумму"
                  {...register("amount")}
                />

                {errors.amount?.message && (
                  <div className="project-error">{errors.amount.message}</div>
                )}
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
            {errors.currency?.message && (
              <div className="project-error">{errors.currency.message}</div>
            )}
            {errors.root?.message && (
              <div className="my-projects__error">{errors.root.message}</div>
            )}
          </div>
        </div>
        
        <button type="submit"
          className={`${props.isMobile ? 'modal-content__btn second-btn' : 'about-check__btn main-btn'}`}
        >
          Сгенерировать платежную ссылку
        </button>
      </form>
      
      {paymentToken !== null && (
        <Portal>
          <PaymentLinkModal
            open={paymentLinkModalOpened}
            token={paymentToken}
            text={'---'}
            onClose={handlePaymentLinkModalClose}
          />
        </Portal>
      )}
    </>
  )
}

function useCurrencies(
  defaultValue: { currency: string; name?: string; rate?: string }[]
): [
  { currency: string; name?: string; rate?: string }[],
  boolean,
  string | null
] {
  const [currencies, setCurrencies] = useState(defaultValue);
  const [currenciesLoading, setCurrenciesLoading] = useState(false);
  const [currenciesError, setCurrenciesError] = useState<string | null>(null);

  useEffect(() => {
    setCurrenciesLoading(true);
    AuthorizedService.merchantCurrencies()
      .then((response) => {
        if (!response.currencies) {
          setCurrencies(defaultValue);
        } else {
          const nextCurrencies: {
            currency: string;
            name?: string;
            rate?: string;
            chain?: string;
          }[] = [];
          for (const listItem of response.currencies) {
            if (listItem.currency === undefined) {
              continue;
            }
            nextCurrencies.push({
              currency: listItem.currency,
              name: listItem.name,
              rate: listItem.rate,
              chain: listItem.chain,
            });
          }
          setCurrencies(nextCurrencies);
        }
      })
      .catch((error) => {
        console.error(error);
        setCurrenciesError(
          typeof error.message === "string"
            ? error.message
            : "failed to load currencies"
        );
      })
      .finally(() => {
        setCurrenciesLoading(false);
      });
  }, []);

  return [currencies, currenciesLoading, currenciesError];
}