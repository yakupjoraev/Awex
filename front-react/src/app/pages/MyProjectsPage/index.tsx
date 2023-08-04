import react from "react";
import { projects } from "../../state-defaults/projects";
import { ProjectItem } from "./ProjectItem";
import { Helmet } from "react-helmet-async";

export function MyProjectsPage() {
  const handleGeneratePaymentLink = () => {
    alert("NOT IMPLEMENTED");
  };

  return (
    <>
      <Helmet title="Мои проекты" />
      <section className="my-projects">
        <div className="my-projects__header">
          <h1 className="my-projects__title main-title">Мои проекты</h1>

          <div className="my-projects__added">
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
            {projects.map((project) => {
              return (
                <ProjectItem
                  {...project}
                  key={project.id}
                  onGeneratePaymentLink={handleGeneratePaymentLink}
                />
              );
            })}
            {/* <li className="my-projects__item">
              <div className="my-projects__item-info">
                <h3 className="my-projects__item-title main-title">
                  ООО ”Первый”
                  <img
                    className="my-projects__item-icon"
                    src="/img/icons/pen.svg"
                    alt="pen"
                  />
                </h3>

                <a href="#" className="my-projects__item-address">
                  https://www.gemini.com/
                </a>
              </div>

              <div className="my-projects__item-convertion">
                <div className="my-projects__item-for">
                  <div className="my-projects__item-text">конвертация в:</div>
                  <div className="my-projects__item-currency">
                    <img
                      className="my-projects__item-pic"
                      src="/img/actives/actives-1.png"
                      alt=""
                    />

                    <span className="my-projects__item-curr">USDT</span>
                  </div>
                </div>

                <div className="my-projects__item-to">
                  <div className="my-projects__item-text">комиссию платит:</div>
                  <div className="my-projects__item-client">клиент</div>
                </div>
              </div>

              <a className="my-projects__item-btn second-btn" href="#">
                Сгенерировать платежную ссылку
              </a>
            </li>

            <li className="my-projects__item">
              <div className="my-projects__item-info">
                <h3 className="my-projects__item-title main-title">
                  ООО Второй
                  <img
                    className="my-projects__item-icon"
                    src="/img/icons/pen.svg"
                    alt="pen"
                  />
                </h3>

                <a href="#" className="my-projects__item-address">
                  https://www.gemini.com/
                </a>
              </div>

              <div className="my-projects__item-convertion">
                <div className="my-projects__item-for">
                  <div className="my-projects__item-text">конвертация в:</div>
                  <div className="my-projects__item-currency">
                    <img
                      className="my-projects__item-pic"
                      src="/img/actives/actives-2.png"
                      alt=""
                    />

                    <span className="my-projects__item-curr">USDT</span>
                  </div>
                </div>

                <div className="my-projects__item-to">
                  <div className="my-projects__item-text">комиссию платит:</div>
                  <div className="my-projects__item-client">клиент</div>
                </div>
              </div>

              <a className="my-projects__item-btn second-btn" href="#">
                Сгенерировать платежную ссылку
              </a>
            </li>

            <li className="my-projects__item">
              <div className="my-projects__item-info">
                <h3 className="my-projects__item-title main-title">
                  ООО Третий
                  <img
                    className="my-projects__item-icon"
                    src="/img/icons/pen.svg"
                    alt="pen"
                  />
                </h3>

                <a href="#" className="my-projects__item-address">
                  https://www.gemini.com/
                </a>
              </div>

              <div className="my-projects__item-convertion">
                <div className="my-projects__item-for">
                  <div className="my-projects__item-text">конвертация в:</div>
                  <div className="my-projects__item-currency">
                    <img
                      className="my-projects__item-pic"
                      src="/img/actives/actives-3.png"
                      alt=""
                    />

                    <span className="my-projects__item-curr">USDT</span>
                  </div>
                </div>

                <div className="my-projects__item-to">
                  <div className="my-projects__item-text">комиссию платит:</div>
                  <div className="my-projects__item-client">мерчант</div>
                </div>
              </div>

              <a className="my-projects__item-btn second-btn" href="#">
                Сгенерировать платежную ссылку
              </a>
            </li> */}
          </ul>
        </div>
      </section>
    </>
  );
}
