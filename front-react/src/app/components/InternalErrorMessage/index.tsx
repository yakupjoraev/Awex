export interface ConenctionErrorMessageProps {
  onRetry?: () => void;
}

export function InternalErrorMessage(props: ConenctionErrorMessageProps) {
  return (
    <section className="page-404">
      <div className="page-404__inner">
        <p className="page-404__descr">внутренняя ошибка приложения</p>
        {!!props.onRetry && (
          <button className="page-404__link main-btn" onClick={props.onRetry}>
            Повторить
          </button>
        )}
      </div>
    </section>
  );
}
