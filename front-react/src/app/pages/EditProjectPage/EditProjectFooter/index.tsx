export interface EditProjectFooterProps {
  validationStatus: boolean
  onValidate: () => void
}

export function EditProjectFooter(props: EditProjectFooterProps) {
  return (
    <div className="my-projects__item-btns">
      { !props.validationStatus && (
        <button
          type="button"
          className="my-projects__btn second-btn"
          onClick={props.onValidate}
        >
          Отправить на валидацию
        </button>
      )}

      <button type="submit" className="my-projects__btn second-btn">
        Сохранить данные
      </button>
    </div>
  )
}
