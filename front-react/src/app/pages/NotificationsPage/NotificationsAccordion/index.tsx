import { accountNotificationsType } from "src/app/hooks/useAccountNotifications"

interface NotificationsAccordionPropsType {
    notifications: accountNotificationsType[],
    openedNotificationId: number | null,
    clickNotification: (id: number)=>void
}

export function NotificationsAccordion({notifications, openedNotificationId, clickNotification}: NotificationsAccordionPropsType) {

    return (
        <div className="notifications__accordion accordion">
            {notifications.map((notification) => {
                return (
                    <div
                        className={`accordion__item${notification.read ? ' accordion__item--disabled' : ''}${notification.id === openedNotificationId ? ' active' : ''}`}
                        data-accordion-item
                        key={notification.id}
                        onClick={() => clickNotification(notification.id)}
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
    )
}