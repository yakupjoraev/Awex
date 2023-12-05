
import { Link, NavLink } from "react-router-dom"


export function HistoryOperationsHeader() {

    return (
        <div className="history-operations__label">
            <h3 className="history-operations__title main-title"> История операций </h3>

            <NavLink className="history-operations__link" to="/history">
                Перейти в Операции
                <img className="history-operations__link-img" src="/img/icons/arrow-right.svg" alt="Перейти в Операции" />
            </NavLink>
        </div>
    )
}