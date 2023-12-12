interface ConfirmationModalProps {
    isOpen: boolean
    text: string
    data: any
    ansver: (data: any, ansver: boolean) => void
}

export function ConfirmationModal(props: ConfirmationModalProps) {
    const { isOpen, text, data, ansver } = props

    return (
        <div className={`modal modal-notifications modal-genation-links${isOpen ? ' show' : ''}`}>
            <form action="#" className="modal-content">

                <div className="modal-content__header">
                    <h4 className="modal-content__title">
                        { text }
                    </h4>
                </div>

                <div className="modal-content__btns">
                    <button type="button" className="modal-content__btn third-btn" onClick={() => ansver(data, false)}>Отмена</button>
                    <button type="button" className="modal-content__btn second-btn" onClick={() => ansver(data, true)}>Подтвердить</button>
                </div>
            </form>
        </div>
    )
}