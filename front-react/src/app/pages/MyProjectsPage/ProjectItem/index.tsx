import { Link } from "react-router-dom"
import { ProjectValidation } from "src/types"

interface Validation {
  validation?: ProjectValidation | null
  validationRequestedAt?: number | null
}

export interface ProjectItemProps {
  id: string
  name: string
  tokenIcon: string
  tokenSymbol: string
  url: string
  commissionPaidBy: "client" | "merchant"
  validation: Validation | null
  onGeneratePaymentLink: (id: string) => void
}

function Validation({validation, validationRequestedAt}: {validation?: ProjectValidation | null, validationRequestedAt?: number | null}) {
  if(validation === null && validationRequestedAt === null) {
    return (<span className="validtext_notvalidate">Черновик</span>)
  }
  if(validation?.status === 'onReview' || validation?.status === 'waiting') {
    return (<span className="validtext_onvalidate">На модерации</span>)
  }
  if(validation?.status === 'rejected') {
    return (<span className="validtext_rejected">Отклонен ({ validation?.rejectReason })</span>)
  }
  return(<></>)
}

export function ProjectItem(props: ProjectItemProps) {
  const handleGenerateLinkBtnClick = () => {
    props.onGeneratePaymentLink(props.id)
  }

  let commissionPayByLabel
  switch (props.commissionPaidBy) {
    case "client": {
      commissionPayByLabel = "клиент"
      break
    }
    case "merchant": {
      commissionPayByLabel = "мерчант"
      break
    }
  }

  return (
    <li className="my-projects__item">
      <div className="my-projects__item-info">
      <Validation
        validation={props.validation?.validation}
        validationRequestedAt={props.validation?.validationRequestedAt}
      />

        <h3 className="my-projects__item-title main-title">
          {props.name}

          <Link to={"/projects/" + props.id}>
            <img
              className="my-projects__item-icon"
              src="/img/icons/pen.svg"
              alt="pen"
            />
          </Link>
        </h3>

        <a className="my-projects__item-address"
          href={props.url}
          rel="noopener"
          target="_blank"
        >
          {props.url}
        </a>
      </div>

      <div className="my-projects__item-convertion">
        <div className="my-projects__item-for">
          <div className="my-projects__item-text">конвертация в:</div>

          <div className="my-projects__item-currency">
            <img
              className="my-projects__item-pic"
              src={"/img/actives/" + props.tokenIcon}
              alt=""
            />

            <span className="my-projects__item-curr">{props.tokenSymbol}</span>
          </div>
        </div>

        <div className="my-projects__item-to">
          <div className="my-projects__item-text">комиссию платит:</div>
          <div className="my-projects__item-client">{commissionPayByLabel}</div>
        </div>
      </div>

      <button
        className="my-projects__item-btn second-btn"
        onClick={handleGenerateLinkBtnClick}
      >
        Сгенерировать платежную ссылку
      </button>
    </li>
  )
}
