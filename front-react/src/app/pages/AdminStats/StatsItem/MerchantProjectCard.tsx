import { Project } from "@awex-api";
import React from "react";
import toast from "react-hot-toast";

interface IProps {
  project: Project;
}

const MerchantProjectCard: React.FC<IProps> = ({ project }) => {
  const handleNotImplemented = () => {
    toast("NOT IMPLEMENTED!");
  };

  return (
    <li className="my-projects__item">
      <div className="my-projects__item-info">
        <h3 className="my-projects__item-title main-title">{project?.name}</h3>
        <a href={project?.urlWeb} className="my-projects__item-address">
          {project?.urlWeb}
        </a>
      </div>
      <div className="my-projects__item-convertion my-projects__item-convertion--row">
        <div className="my-projects__item-for">
          <div className="my-projects__item-text">конвертация в:</div>
          <div className="my-projects__item-currency">
            <img
              className="my-projects__item-pic"
              src="/img/actives/actives-1.png"
              alt=""
            />
            <span className="my-projects__item-curr">{project?.convertTo}</span>
          </div>
        </div>
        <div className="my-projects__item-to">
          <div className="my-projects__item-text">комиссию платит:</div>
          <div className="my-projects__item-client">
            {project?.feePayee ? "мерчант" : "клиент"}
          </div>
        </div>
      </div>
      <div className="my-projects__item-btn">
        <img
          src="/img/icons/lock-grey.svg"
          alt="lock"
          onClick={handleNotImplemented}
        />
        <img
          src="/img/icons/pen.svg"
          alt="pen"
          onClick={handleNotImplemented}
        />
        <img
          src="/img/icons/trash.svg"
          alt="trash"
          onClick={handleNotImplemented}
        />
        <a href="#" onClick={handleNotImplemented}>
          Статистика
        </a>
      </div>
    </li>
  );
};

export default MerchantProjectCard;
