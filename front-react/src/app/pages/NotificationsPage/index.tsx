import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useAccountNotifications } from "../../hooks/useAccountNotifications"
import { NotificationsFilters } from "./NotificationsFilters"
import { NotificationsAccordion } from "./NotificationsAccordion"
import { Pagination } from "@components/Pagination"
import { AccountNotifiFilterType } from "../../hooks/useAccountNotifications"

export function NotificationsPage() {
    const location = useLocation()
    const [openedNotificationId, setOpenedNotificationId] = useState<number | null>(null)
    const {
        notificationsFiltered,
        page,
        pages,
        count,
        notificationTypes,
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

    function toggleOpenedNotification(notificationID: number): void {
        if(notificationID === openedNotificationId) {
            setOpenedNotificationId(null)
            return
        }
        setOpenedNotificationId(notificationID)
        setStatusRead(notificationID, true)
    }

    function changePage(page: number): void {
        setNotificationFilter({
            page: page.toString()
        })
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

                <NotificationsFilters />

                <NotificationsAccordion
                    notifications={notificationsFiltered}
                    openedNotificationId={openedNotificationId}
                    clickNotification={toggleOpenedNotification}
                />

                <Pagination
                    currentPage={page}
                    pages={pages}
                    goToPage={changePage}
                />
            </div>
        </div>
    )
}