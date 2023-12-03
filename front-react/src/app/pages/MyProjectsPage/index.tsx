import { useEffect } from "react"
import { ProjectItem } from "./ProjectItem"
import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { getProjects } from "@store/projects/slice"
import { currencyToName } from "@constants/currency-names"


export function MyProjectsPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const projects = useAppSelector((state) => state.projects.data)


  useEffect(() => {
    dispatch(getProjects())
  }, [dispatch])


  const handleGeneratePaymentLink = (projectId: string): void => {
    // alert("NOT IMPLEMENTED")
    navigate('/invoice')
    navigate('/invoice', { state: { projectId } })
  }

  return (
    <div className="wrapper">
      <Helmet title="Мои проекты" />

      <section className="my-projects">
        <div className="my-projects__header">
          <h1 className="my-projects__title main-title">Мои проекты</h1>

          <div
            className="my-projects__added"
            role="button"
            onClick={() => navigate("/projects/new-project")}
          >
            <img
              className="my-projects__added-img"
              src="/img/icons/plus-circle.svg"
              alt="plus-circle"
            />

            <span className="my-projects__added-descr">Добавить проект</span>
          </div>
        </div>

        <h2 className="main-title" hidden>
          Список проектов
        </h2>

        <div className="my-projects__items-wrapper">
          <ul className="my-projects__items">
            {projects &&
              projects.map(({ id, project }) => { console.log('project: ', id,  project)
                let currency: string = "..."

                if (project.convertTo !== undefined) {
                  if (
                    Object.prototype.hasOwnProperty.call(
                      currencyToName,
                      project.convertTo
                    )
                  ) {
                    currency = currencyToName[project.convertTo]
                  } else {
                    currency = project.convertTo
                  }
                }

                return (
                  <ProjectItem
                    id={id}
                    name={project.name}
                    tokenIcon="actives-1.png"
                    tokenSymbol={
                      (project.convertTo !== undefined &&
                        currencyToName[project.convertTo]) ||
                      "..."
                    }
                    url={project.urlWeb || "#"}
                    commissionPaidBy={project.feePayee ? "merchant" : "client"}
                    key={id}
                    onGeneratePaymentLink={handleGeneratePaymentLink}
                  />
                )
              })}
          </ul>
        </div>
      </section>
    </div>
  )
}
