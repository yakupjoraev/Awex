import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { Project, projects } from "../../../state-defaults/projects";

interface AboutCheckDepositProps {
  projects: { id: string; name: string }[];
  onGeneratePaymentLink: () => void;
}

export function AboutCheckDeposit(props: AboutCheckDepositProps) {
  const projectSelectorRef = useRef<HTMLDivElement>(null);
  const [projectSelectorOpened, setProjectSelectorOpened] = useState(false);
  const [project, setProject] = useState<Project | null>(projects[0]);

  useEffect(() => {
    if (!projectSelectorOpened) {
      return;
    }

    const handleDocumentClick = (ev: MouseEvent) => {
      if (
        projectSelectorRef.current &&
        ev.target instanceof Element &&
        !projectSelectorRef.current.contains(ev.target)
      ) {
        setProjectSelectorOpened(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [projectSelectorOpened]);

  const handleProjectOptionClick = (
    ev: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const projectId = ev.currentTarget.getAttribute("data-project-id");
    if (projectId !== null) {
      const nextProject = projects.find(({ id }) => id === projectId);
      setProject(nextProject || null);
    }

    setProjectSelectorOpened(false);
  };

  return (
    <div className="main-content__deposit about-deposit">
      <div className="about-deposit__generation">
        <p className="about-deposit__generation-label">
          Быстрая генерация ссылки
        </p>

        <div
          className="about-deposit__generation-select about-deposit__generation-selected--not-reverse about-deposit__generation-selected--white"
          data-select-wrapper=""
          ref={projectSelectorRef}
        >
          <div
            className={classNames("about-deposit__generation-selected", {
              active: projectSelectorOpened,
            })}
            data-select-arrow=""
            onClick={() => setProjectSelectorOpened(!projectSelectorOpened)}
          >
            <div className="about-deposit__generation-info">
              <h5 className="about-deposit__generation-title">
                {project && project.name}
              </h5>
            </div>

            <div className="about-deposit__generation-currency">
              <img
                className="about-deposit__generation-img"
                src="/img/icons/arrow-down.svg"
                alt="arrow-down"
              />
            </div>
          </div>

          <ul
            className={classNames("about-deposit__generation-list", {
              active: projectSelectorOpened,
            })}
            data-select-list=""
          >
            {projects.map((project) => {
              return (
                <li
                  className="about-deposit__generation-item"
                  data-select-item=""
                  data-project-id={project.id}
                  key={project.id}
                  onClick={handleProjectOptionClick}
                >
                  {project.name}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="about-deposit__generation-select about-deposit__generation-selected--not-reverse about-deposit__generation-selected--white">
          <div className="about-deposit__generation-selected">
            <div className="about-deposit__generation-info">
              <h5 className="about-deposit__generation-title">Сумма</h5>

              <input
                className="about-deposit__generation-input"
                type="number"
                placeholder="Введите сумму"
              />
            </div>

            <div
              className="about-deposit__generation-currency open-modal-btn"
              data-modal-id="select-modal"
            >
              <div className="about-deposit__generation-curr">USD</div>

              <img
                className="about-deposit__generation-img"
                src="/img/icons/arrow-down.svg"
                alt="arrow-down"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="about-check__btn main-btn"
        onClick={props.onGeneratePaymentLink}
      >
        Сгенерировать платежную ссылку
      </button>
    </div>
  );
}
