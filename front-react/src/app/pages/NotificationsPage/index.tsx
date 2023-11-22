import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useAccountNotifications } from "../../hooks/useAccountNotifications"

export function NotificationsPage() {
    const location = useLocation()
    const [openedNotificationId, setOpenedNotificationId] = useState<number | null>(null)
    const {
        notificationsFiltered,
        page,
        pages,
        count,
        setNotificationFilter,
        setStatusRead
    } = useAccountNotifications()

    useEffect(() => {
        if(location.state && 'notificationID' in location.state) {
            const id = location.state.notificationID
            setOpenedNotificationId(id)
            setStatusRead(id, true)
        }
    }, [location])

    function toggleOpenedNotification(notificationID: number) {
        if(notificationID === openedNotificationId) {
            setOpenedNotificationId(null)
            return
        }
        setOpenedNotificationId(notificationID)
        setStatusRead(notificationID, true)
    }

    return (
        <div className="wrapper">
            <div className="notifications">
                <div className="notifications__header about-deposit__header-notif">
                    <h1 className="notifications__title main-title">
                        Уведомления
                    </h1>
                    <span>{ count }</span>
                </div>

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

                <div className="notifications__accordion accordion">
                    {notificationsFiltered.map((notification) => {
                        return (
                            <div
                                className={`accordion__item${notification.read ? ' accordion__item--disabled' : ''}${notification.id === openedNotificationId ? ' active' : ''}`}
                                data-accordion-item
                                key={notification.id}
                                onClick={() => toggleOpenedNotification(notification.id)}
                            >
                                <div className="accordion__header">{ notification.short }</div>

                                <div className="accordion__content">
                                    <p className="accordion__content-text">
                                        { notification.message }
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="page-list">
                    <div className="page-list__item">
                        <a className="page-list__link" href="#">1</a>
                    </div>

                    <div className="page-list__item active">
                        <a className="page-list__link" href="#">2</a>
                    </div>

                    <div className="page-list__item">
                        <a className="page-list__link" href="#">3</a>
                    </div>

                    <div className="page-list__item">
                        <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.084 5.176L0.38 9.176V7.976L5.5 4.856L0.38 1.72V0.552L7.084 4.584V5.176Z" fill="#292421" />
                        </svg>
                    </div>

                    <div className="page-list__item"></div>

                    <div className="page-list__item last">
                        <a className="page-list__link" href="#">10</a>
                    </div>
                </div>
            </div>
        </div>
    )
}