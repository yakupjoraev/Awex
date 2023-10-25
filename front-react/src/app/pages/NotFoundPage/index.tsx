import { Helmet } from "react-helmet-async";
import { NotFoundErrorMessage } from "@components/NotFoundErrorMessage";

export function NotFoundPage() {
  return (
    <div className="wrapper">
      <Helmet title="Страница не найдена" />
      <NotFoundErrorMessage/>
    </div>
  );
}
