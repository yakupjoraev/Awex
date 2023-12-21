import { HistoryOperations } from "../HomePage/HistoryOperations"


export function OperationsHistoryPage() {
    

return (
    <div className="wrapper">
        <section className="settings operations-history">
            <div className="deposits__header">
                <h1 className="deposits__title main-title">История операций</h1>
                <a className="operations-history__exel main-btn" href="#"> в Exel </a>
            </div>

            <div className="settings__inner">
                <div className="settings__list" data-payment-details-content>
                    <a className="settings__item active" href="#">Платежи</a>
                    <img className="settings__list-arrow" src="./img/icons/arrow-down-white.svg" alt="" data-payment-details-btn />
                    <a className="settings__item" href="#">Депозиты</a>
                    <a className="settings__item" href="#">Вывод</a>
                    <a className="settings__item" href="#">Реферальные начисления</a>
                    <a className="settings__item" href="#">SWAP</a>
                </div>

                <div className="operations-history__content">
                    <HistoryOperations
                        isFullFrame={true}
                    />
                </div>
            </div>
        </section>
    </div>
)}