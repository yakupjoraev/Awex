import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { HOME_PAGE_PATH } from "../../constants/path-locations";

export function NotFoundPage() {
  return (
    <div className="wrapper">
      <Helmet title="Страница не найдена" />
      <section className="page-404">
        <div className="page-404__inner">
          <h1 className="page-404__title">404</h1>

          <p className="page-404__descr">что-то пошло не так</p>

          <Link className="page-404__link main-btn" to={HOME_PAGE_PATH}>
            Вернуться на Главную
          </Link>
        </div>
      </section>
    </div>
  );
}
