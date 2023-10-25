import { Helmet } from "react-helmet-async";
import { NotFoundErrorMessage } from "@components/NotFoundErrorMessage";

export function UserAreaNotFoundPage() {
  return (
    <div className="wrapper">
      <Helmet title="Страница не найдена" />
      <NotFoundErrorMessage />
    </div>
  );
}
