import { currencyToName } from "@constants/currency-names";
import { AppProject } from "src/types";

interface EditProjectHeaderProps {
  project?: AppProject;
}

export function EditProjectHeader(props: EditProjectHeaderProps) {
  const { project } = props;

  let urlWeb = "...";
  let feePayee = "...";
  let currency = "...";

  if (project) {
    if (project.urlWeb) {
      urlWeb = project.urlWeb;
    }
    feePayee = project.feePayee ? "мерчант" : "клиент";
    if (project.convertTo !== undefined) {
      if (
        Object.prototype.hasOwnProperty.call(currencyToName, project.convertTo)
      ) {
        currency = currencyToName[project.convertTo];
      } else {
        currency = project.convertTo;
      }
    }
  }

  return (
    <div className="my-projects__item">
      <div className="my-projects__item-info">
        <h3 className="my-projects__item-title main-title">
          {project ? project.name : "..."}
          <img
            className="my-projects__item-icon"
            src="/img/icons/pen.svg"
            alt="pen"
          />
        </h3>
        <a
          href={project ? project.urlWeb : "#"}
          className="my-projects__item-address"
          rel="noopener"
          target="_blank"
        >
          {urlWeb}
        </a>
      </div>

      <div className="my-projects__item-convertion">
        <div className="my-projects__item-for">
          <div className="my-projects__item-text">конвертация в:</div>
          <div className="my-projects__item-currency">
            <img
              className="my-projects__item-pic"
              src={"/img/actives/" + "actives-1.png"}
              alt=""
            />
            <span className="my-projects__item-curr">{currency}</span>
          </div>
        </div>

        <div className="my-projects__item-to">
          <div className="my-projects__item-text">комиссию платит:</div>
          <div className="my-projects__item-client">{feePayee}</div>
        </div>
      </div>
    </div>
  );
}
