import { NOTIFICATIONS_PAGE } from "@constants/path-locations"
import { accountNotificationsType } from "src/app/hooks/useAccountNotifications"
import { useNavigate } from "react-router-dom"


export interface NotificationsListProps {
    notifications: accountNotificationsType[]
    unread: number
    isOpenList: boolean
    onClose: () => void
}


export function NotificationsList({notifications, unread, isOpenList, onClose}: NotificationsListProps) {
    const navigate = useNavigate()


    function close(): void {
        onClose()
    }

    function openNotifications(notificationID?: number): void {
        close()

        if(notificationID) {
            navigate(NOTIFICATIONS_PAGE, { replace: false, state: { notificationID } })
            return
        }
        navigate(NOTIFICATIONS_PAGE, { replace: false })
    }


  return (
    <div
        className={`modal modal-notifications modal-genation-links${isOpenList ? ' show' : ''}`}
        id="notifications"
        onClick={close}
    >
        <div className="modal-content"
            onClick={(ev)=>ev.stopPropagation()}
        >
            <div className="modal-content__header">
                <h4 className="modal-content__title">
                    Уведомления
                    { (unread && (unread > 0)) ? ( <span>{ unread }</span> ) : ('') }
                </h4>

                <button className="close-modal-btn"
                    onClick={close}
                >
                    <img src="./img/icons/close-modal.svg" alt="" />
                </button>
            </div>

            <div className="notifications__accordion accordion">
                { notifications.map((item) => {
                    return (
                        <div
                            className={`accordion__item${item.read ? ' accordion__item--disabled' : ''}`}
                            data-accordion-item
                            key={item.id}
                            onClick={() => openNotifications(item.id)}
                        >
                            <div className="accordion__header">{ item.short }</div>
                        </div>
                    )
                })}

                <button type="button"
                    className="modal-content__btn third-btn"
                    onClick={() => openNotifications()}
                >
                    Открыть все
                </button>
            </div>
        </div>
    </div>
  )
}
