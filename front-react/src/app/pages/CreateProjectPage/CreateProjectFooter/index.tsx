export interface CreateProjectFooterProps {
  onCancel: () => void;
}

export function CreateProjectFooter(props: CreateProjectFooterProps) {
  return (
    <div className="my-projects__item-btns">
      <button
        type="button"
        className="my-projects__btn third-btn"
        onClick={props.onCancel}
      >
        Отменить
      </button>
      <button type="submit" className="my-projects__btn second-btn">
        Создать проект
      </button>
    </div>
  );
}
