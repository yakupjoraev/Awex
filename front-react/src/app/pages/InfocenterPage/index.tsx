import { Helmet } from "react-helmet-async";
import { InfocenterItem } from "./InfocenterItem";

export function InfocenterPage() {
  return (
    <div className="wrapper">
      <Helmet title="FAQ" />
      <section className="infocenter">
        <div className="deposits__header">
          <h1 className="deposits__title main-title">FAQ</h1>
        </div>
        <div className="infocenter__inner">
          <div className="infocenter__header">
            <a className="infocenter__header-link main-btn" href="#">
              Комиссия
            </a>
            <a className="infocenter__header-link main-btn" href="#">
              Поддержка
            </a>
          </div>
          <div className="infocenter__info">
            <h2 className="infocenter__info-title main-title">
              Часто задаваемые вопросы
            </h2>
            <ul className="infocenter__list">
              <InfocenterItem title="Знакомство в сервисом">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                  repudiandae fugiat rem delectus incidunt aut deserunt ab est
                  dicta quo?
                </p>
              </InfocenterItem>
              <InfocenterItem title="Добавление и настройка проекта">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                  repudiandae fugiat rem delectus incidunt aut deserunt ab est
                  dicta quo?
                </p>
              </InfocenterItem>
              <InfocenterItem title="Как создать платежную ссылку?">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                  repudiandae fugiat rem delectus incidunt aut deserunt ab est
                  dicta quo?
                </p>
              </InfocenterItem>
              <InfocenterItem title="Как добавить сотрудника?">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                  repudiandae fugiat rem delectus incidunt aut deserunt ab est
                  dicta quo?
                </p>
              </InfocenterItem>
              <InfocenterItem title="Платежи с депозитом">
                {" "}
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                  repudiandae fugiat rem delectus incidunt aut deserunt ab est
                  dicta quo?
                </p>
              </InfocenterItem>
              <InfocenterItem title="Реферальная программа">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                  repudiandae fugiat rem delectus incidunt aut deserunt ab est
                  dicta quo?
                </p>
              </InfocenterItem>
              <InfocenterItem title="Как сделать вывод фиатного баланса">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                  repudiandae fugiat rem delectus incidunt aut deserunt ab est
                  dicta quo?
                </p>
              </InfocenterItem>
            </ul>

            <a className="infocenter__link third-btn" href="#">
              Все вопросы
            </a>
          </div>
          <div className="infocenter__news">
            <h3 className="infocenter__new-title main-title">
              Новости
              <img src="./img/icons/angle-right-circle.svg" alt="" />
            </h3>
            <ul className="infocenter__news-list">
              <li className="infocenter__news-item">
                <a className="infocenter__news-link" href="#">
                  <div className="infocenter__news-info">
                    <img src="./img/icons/mobile.svg" alt="mobile" />
                    <div className="infocenter__news-titles">
                      <h4 className="infocenter__news-label">
                        Запуск нового сервиса TG WebApp - узнай о новых
                        возможностях первым!
                      </h4>
                      <p className="infocenter__news-descr">25.07.2023</p>
                    </div>
                  </div>
                  <img src="./img/icons/arrow-right.svg" alt="arrow-right" />
                </a>
              </li>
              <li className="infocenter__news-item">
                <a className="infocenter__news-link" href="#">
                  <div className="infocenter__news-info">
                    <img src="./img/icons/mobile.svg" alt="mobile" />
                    <div className="infocenter__news-titles">
                      <h4 className="infocenter__news-label">
                        Запуск нового сервиса TG WebApp - узнай о новых
                        возможностях первым!
                      </h4>
                      <p className="infocenter__news-descr">25.07.2023</p>
                    </div>
                  </div>
                  <img src="./img/icons/arrow-right.svg" alt="arrow-right" />
                </a>
              </li>
              <li className="infocenter__news-item">
                <a className="infocenter__news-link" href="#">
                  <div className="infocenter__news-info">
                    <img src="./img/icons/mobile.svg" alt="mobile" />
                    <div className="infocenter__news-titles">
                      <h4 className="infocenter__news-label">
                        Запуск нового сервиса TG WebApp - узнай о новых
                        возможностях первым!
                      </h4>
                      <p className="infocenter__news-descr">25.07.2023</p>
                    </div>
                  </div>
                  <img src="./img/icons/arrow-right.svg" alt="arrow-right" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
