
type ReferralRuleModalProps = {
    isOpen: boolean
    setStatus: (value: boolean) => void
}

export function ReferralRuleModal(props: ReferralRuleModalProps) {
    const { isOpen, setStatus } = props

    function close(): void {
        setStatus(false)
    }

    function stop(event: any) {
        event.stopPropagation()
    }

    return (
        <div className={`modal modal-cash-to-office modal-link-generated modal-genation-links${isOpen ? ' show' : ''}`}
            onClick={close}
        >
            <form action="#" className="modal-content" onClick={stop}>
                <div className="modal-content__header">
                    <h4 className="modal-content__title">Правила реферальной программы</h4>

                    <button className="close-modal-btn"
                        onClick={close}
                    >
                        <img src="/img/icons/close-modal.svg" alt="" />
                    </button>
                </div>

                <div className="modal-content__main">
                    <div className="actives-action__withdrawal-group invoice-project__group-select">
                        <div className="scrollable-container">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque nostrum hic odit culpa earum dolores neque explicabo? 
                            Numquam provident minima magnam nobis quam vel sapiente iste repellat quidem aliquid! Quia in odit similique exercitationem cumque minus! 
                            Laborum, magni quis illum odio enim non minima tempora est. Assumenda mollitia rem aspernatur et repudiandae fugit recusandae, error suscipit impedit magnam repellendus, eum corrupti illo explicabo.
                            Illum nam et obcaecati, omnis saepe inventore quos nisi dolores, 
                            rem dignissimos officia quae modi laboriosam in beatae magnam dolorem. Quaerat magni, voluptatum molestias modi doloremque recusandae hic quia quod nesciunt eius necessitatibus vitae laborum quo dolorem sed quae eos? 
                            Laborum inventore sapiente iusto soluta voluptatibus quaerat excepturi blanditiis, animi, ducimus atque et. Soluta commodi dolor dicta, ut repellendus, debitis quisquam quo molestiae qui aliquam doloremque,
                            cumque corrupti animi nemo voluptates. Amet nostrum impedit eveniet harum sint necessitatibus eum dolor numquam recusandae, eligendi, quidem aut eaque! Ullam voluptate quam earum eveniet cupiditate odit ratione,
                            doloribus expedita molestias aspernatur alias obcaecati totam impedit eligendi eum tempore commodi ipsum? Corporis tempore iste eius quia, architecto, exercitationem suscipit obcaecati nostrum voluptas optio neque temporibus totam
                            iusto! Repellendus dolorum impedit vel voluptatibus reiciendis quas fugit architecto sunt ut dolor. Alias repellat nostrum harum aliquam laudantium nesciunt, eaque minima impedit officiis velit expedita fuga quis corporis inventore.
                            Nemo doloremque eum, eligendi quis inventore tempore quo sed soluta temporibus laboriosam dolore cupiditate cumque repellendus? Eaque cum iste fugit molestias dolore, odio delectus tempore provident magnam dolores et, 
                            quae omnis quaerat nulla. Odit, id!
                        </div>
                    </div>
                </div>

                <button type="button" className="modal-content__btn second-btn"
                    onClick={close}
                >
                    Закрыть
                </button>
            </form>
        </div>
    )
}