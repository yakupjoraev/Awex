export interface ConenctionErrorMessageProps {
  onRetry?: () => void;
}

export function ConnectionErrorMessage(props: ConenctionErrorMessageProps) {
  return (
    <section className="page-404">
      <div className="page-404__inner">
        <h1 className="page-404__descr">Соединение медленное или недоступно</h1>
        {!!props.onRetry && (
          <button className="page-404__link main-btn" onClick={props.onRetry}>
            Повторить
          </button>
        )}
      </div>
    </section>
  );
}
