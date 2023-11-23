

export function NotificationsFilters() {
    
    return (
        <div className="deposits__filters">
            <div className="deposits__filter-select" data-select-wrapper>
                <div className="deposits__filter-label">
                    Проект
                </div>

                <div className="deposits__filter-selected" data-select-value>
                    Все
                </div>

                <img className="deposits__filter-arrow" src="./img/icons/mini-arrow-down.svg" alt="mini-arrow-down" data-select-arrow />

                <ul className="deposits__filter-list select-list" data-select-list>
                    <li className="deposits__filter-item select-item" data-select-item>Все</li>
                    <li className="deposits__filter-item select-item" data-select-item>Все</li>
                    <li className="deposits__filter-item select-item" data-select-item>Все</li>
                </ul>
            </div>

            <div className="deposits__filter-select" data-select-wrapper>
                <div className="deposits__filter-label">
                    Статус
                </div>

                <div className="deposits__filter-selected" data-select-value>
                    Ожидает действий
                </div>

                <img className="deposits__filter-arrow" src="./img/icons/mini-arrow-down.svg" alt="mini-arrow-down" data-select-arrow />

                <ul className="deposits__filter-list select-list" data-select-list>
                    <li className="deposits__filter-item select-item" data-select-item>Ожидает действий</li>
                    <li className="deposits__filter-item select-item" data-select-item>Ожидает действий</li>
                    <li className="deposits__filter-item select-item" data-select-item>Ожидает действий</li>
                </ul>
            </div>

            <div className="deposits__filter-select deposits__filter-select--datapicker" data-select-wrapper>
                <div className="deposits__filter-label">
                    Дата
                </div>

                <div className="deposits__filter-selected" data-select-value>
                    01/06/2022-13/06/2023
                </div>

                <img className="deposits__filter-arrow" src="./img/icons/mini-arrow-down.svg" alt="mini-arrow-down" data-select-arrow />

                <ul className="deposits__filter-list select-list" data-select-list>
                    <li className="deposits__filter-item select-item" data-select-item>01/06/2022-13/06/2023</li>
                    <li className="deposits__filter-item select-item" data-select-item>01/06/2022-13/06/2023</li>
                    <li className="deposits__filter-item select-item" data-select-item>01/06/2022-13/06/2023</li>
                </ul>
            </div>
        </div>
    )
}