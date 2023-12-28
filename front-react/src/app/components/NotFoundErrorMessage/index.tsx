import { Link } from "react-router-dom";
import { ROUTE } from "../../constants/path-locations";

export interface NotFoundErrorMessageProps {}

export function NotFoundErrorMessage(props: NotFoundErrorMessageProps) {
  return (
    <section className="page-404">
      <div className="page-404__inner">
        <h1 className="page-404__title">404</h1>

        <p className="page-404__descr">что-то пошло не так</p>

        <Link className="page-404__link main-btn" to={ROUTE.DASHBOARD_PATH}>
          Вернуться на Главную
        </Link>
      </div>
    </section>
  );
}
