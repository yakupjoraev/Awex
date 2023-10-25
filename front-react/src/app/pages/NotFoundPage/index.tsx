import { Helmet } from "react-helmet-async";
import { NotFoundErrorMessage } from "@components/NotFoundErrorMessage";

export function NotFoundPage() {
  return (
    <main className="main">
      <div className="wrapper">
        <Helmet title="Страница не найдена" />
        <NotFoundErrorMessage />
      </div>
    </main>
  );
}
