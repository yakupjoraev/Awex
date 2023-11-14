import React, { useState, useEffect, useRef } from "react"
import { useAppSelector } from "@store/hooks"
// import classNames from "classnames"
// import { Project } from "../../../state-defaults/projects"
// import { SelectCurrencyModal } from "../../../components/SelectCurrenyModal"
import { AppProject } from "../../../../types"
import { InvoiceCurrencySelector } from "../../../components/InvoiceCurrencySelector"
import { SelectorSimpleOptions, SelectorSimple } from "@components/SelectorSimple"
import { useForm, Controller } from "react-hook-form"
import { AuthorizedService } from "@awex-api"
import { yupResolver } from "@hookform/resolvers/yup"
import { invoiceFormValidator } from "./validators"
import toast from "react-hot-toast"

// interface Project {
//   id: string
//   name: string
// }
const DEFAULT_PROJECTS: { id: string; project: AppProject }[] = []
const DEFAULT_CURRENCIES: { currency: string; name?: string; rate?: string }[] = []

interface InvoiceFormData {
  projectId: string
  amount: number
  currency: string
}

export function InvoiceLight() {
  const projectSelectorRef = useRef<HTMLDivElement>(null)
  const [projectSelectorOpened, setProjectSelectorOpened] = useState(false)
  // const [currencySelectorOpened, setCurrencySelectorOpened] = useState(false)
  // const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projectsOptions, setProjectsOptions] = useState<SelectorSimpleOptions[] | []>([])
  // const [depositCurrencies, depositCurrenciesLoading] = useCurrencies(DEFAULT_CURRENCIES)
  const [invoiceCurrencies, invoiceCurrenciesLoading] = useCurrencies(DEFAULT_CURRENCIES)

  const projects = useAppSelector((state) => state.projects.data || DEFAULT_PROJECTS)
  // const projectsError = useAppSelector((state) => state.projects.error)

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
    setProjectsOptions(
      projects.map((project)=>{
        return {
          label: project.project.name,
          value: project.id
        }
      })
    )
  },[projects])

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

  
  const handleInvoiceFormSubmit = handleSubmit((formData) => {
    let projectId: number | undefined = undefined
    if (formData.projectId) {
      projectId = parseInt(formData.projectId, 10)
      if (isNaN(projectId)) { return }
    }

    const price = formData.amount
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
          // setPaymentLinkModalOpened(true)
          // setPaymentToken(response.uniqueId)
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
        reset()
      })
  })

  return (
    <form
      className="main-content__deposit about-deposit"
      onSubmit={handleInvoiceFormSubmit}
    >
      <div className="about-deposit__generation">
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
                type="number"
                placeholder="Введите сумму"
                {...register("amount", { valueAsNumber: true })}
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
      

      <button type="submit" className="about-check__btn main-btn" >
        Сгенерировать платежную ссылку
      </button>
    </form>
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