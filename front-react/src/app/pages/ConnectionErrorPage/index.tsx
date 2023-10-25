import { ConnectionErrorMessage } from "@components/ConnectionErrorMessage";
import { Helmet } from "react-helmet-async";

export interface ConnectionErrorPageProps {
  onRetry?: () => void;
}

export function ConnectionErrorPage(props: ConnectionErrorPageProps) {
  return (
    <main className="main">
      <div className="wrapper">
        <Helmet title="Ошибка соединения" />
        <ConnectionErrorMessage onRetry={props.onRetry} />
      </div>
    </main>
  );
}
