import { useEffect, useMemo, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { AuthorizedService, Project, ProjectData } from "@awex-api"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import {
  deleteProject,
  getProjects,
  updateProject,
} from "@store/projects/slice"
import {
  EditProjectForm,
  EditProjectFormData,
} from "@components/EditProjectForm"
import { EditProjectFooter } from "./EditProjectFooter"
import { EditProjectHeader } from "./EditProjectHeader"
import { toast } from "react-hot-toast"
import { AppProject } from "src/types"
import { getCompanies } from "@store/companies/slice"


const DEFAULT_CURRENCIES: { name: string; type: "fiat" | "crypto" }[] = []


export function EditProjectPage() {
  const navigate = useNavigate()
  const { projectId } = useParams()
  const dispatch = useAppDispatch()
  const projectsLoading = useAppSelector((state) => state.projects.loading)
  const projects = useAppSelector((state) => state.projects.data)

  const project = useMemo(() => {
    if (projects === undefined) {
      return undefined
    }
    if (projectId === undefined) {
      return undefined
    }
    const listItem = projects.find((listItem) => listItem.id === projectId);
    if (listItem === undefined) {
      return undefined
    }
    const project = listItem.project
    return project
  }, [projects, projectId])

  const [currenciesLoading, setCurrenciesLoading] = useState(false)
  const [currenciesLoadingError, setCurrencyLoadingError] = useState("")
  const [currencies, setCurrenceis] = useState(DEFAULT_CURRENCIES)
  const companiesLoading = useAppSelector((state) => state.companies.loading)
  const companies = useAppSelector((state) => state.companies.data)


  useEffect(() => {
    setCurrenciesLoading(true)
    AuthorizedService.currenciesList()
    .then((response) => {
      if (response.convertTo) {
        const nextCurrencies: {
          name: string
          type: "fiat" | "crypto"
        }[] = []
        for (const { name, type } of response.convertTo) {
          if (name && type) {
            if (type === "fiat") {
              nextCurrencies.push({ name, type })
            } else if (type === "crypto") {
              nextCurrencies.push({ name, type: "crypto" })
            }
          }
        }
        setCurrenceis(nextCurrencies)
      }
    })
    .catch((error) => {
      setCurrencyLoadingError(error?.message || "failed to load currencies")
    })
    .finally(() => {
      setCurrenciesLoading(false)
    })
  }, [])

  useEffect(() => {
    dispatch(getProjects())
    dispatch(getCompanies())
  }, [dispatch])

  const handleDeleteBtnClick = () => {
    if (projectId) {
      dispatch(deleteProject({ id: projectId }))
      toast.success("Проект удален!")
    }
    navigate("/projects")
  }

  const handleSubmit = (formData: EditProjectFormData) => {
    if (!projectId) {
      return
    }

    const companyId = parseInt(formData.companyId, 10)

    const projectData: AppProject = {
      companyId: companyId,
      name: formData.name,
      description: formData.description,
      feePayee: formData.feePayee,
      paymentBills: formData.paymentBills,
      paymentWeb: formData.paymentWeb,
      paymentTelegram: formData.paymentTelegram,
      activity: formData.activity,
      convertTo: formData.convertTo?.length ? formData.convertTo : undefined,
      urlWeb: formData.urlWeb,
      urlNotification: formData.urlNotification,
      urlPaymentSuccess: formData.urlPaymentSuccess,
      urlPaymentFailure: formData.urlPaymentFailure,
    };

    dispatch(updateProject({ id: projectId, project: projectData }))
      .unwrap()
      .then(() => {
        toast.success("Проект обновлен!")
      })
      .catch((error) => {
        console.error(error)
        toast.error("Не удалось обновить проект.")
      })
  }

  function handleValidateBtnClick() {
    if(!projectId) return
    AuthorizedService.projectValidate(projectId?.toString())
    .then((response) => {
      if(!response) return
      if(response.message === 'Successfully updated') {
        toast.success("Проект отправлен на модерацию.")
        return
      }
      toast.error("Не удалось отправить на модерацию. Попробуйте позже или обратитесь в поддержку!")
    })
    .catch((error) => {
      console.error(error)
      toast.error("Произошла обшибка. Попробуйте позже или обратитесь в поддержку!")
    })
    .finally(() => {
      dispatch(getProjects())
    })
  }

  if (!project && !projectsLoading) {
    navigate("/projects", { replace: true })
    return null
  }

  return (
    <div className="wrapper">
      <section className="my-projects">
        <div className="my-projects__header">
          <h1 className="my-projects__title main-title">Мои проекты</h1>

          <div
            className="my-projects__added"
            role="button"
            onClick={handleDeleteBtnClick}
          >
            <img
              className="my-projects__added-img"
              src="/img/icons/trash.svg"
              alt="trash"
            />

            <span className="my-projects__added-descr">Удалить проект</span>
          </div>
        </div>

        <h2 className="main-title" hidden>
          окно проекта
        </h2>

        <EditProjectForm
          project={project}
          loading={companiesLoading || currenciesLoading || projectsLoading}
          companies={companies}
          onSubmit={handleSubmit}
          header={<EditProjectHeader project={project} />}
          footer={<EditProjectFooter
            validationStatus={ project?.validation && project?.validation !== null ? true : false }
            onValidate={handleValidateBtnClick}
          />}
        />
      </section>
    </div>
  )
}
