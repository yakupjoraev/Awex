import React, { useEffect, useState } from "react"
import { accountNotifications } from ".."

export interface NotificationsListProps {
    notifications: accountNotifications[]
    page: number
    pages: number
    isOpenList: boolean
    onClose: () => void
}

export function NotificationsList({notifications, page, pages, isOpenList, onClose}: NotificationsListProps) {

  return (
    <>
        <div
            className={`modal modal-notifications modal-genation-links${isOpenList ? ' show' : ''}`}
            id="notifications"
            onClick={onClose}
        >
            <div className="modal-content"
                onClick={(ev)=>ev.stopPropagation()}
            >
                <div className="modal-content__header">
                    <h4 className="modal-content__title">
                        Уведомления
                        <span>{ notifications.length }</span>
                    </h4>

                    <button className="close-modal-btn"
                        onClick={onClose}
                    >
                        <img src="./img/icons/close-modal.svg" alt="" />
                    </button>
                </div>
                <div className="notifications__accordion accordion">
                    { notifications.map((item) => {
                        return (
                            <div className="accordion__item"
                                data-accordion-item
                                key={item.id}
                            >
                                <div className="accordion__header">{ item.short }</div>

                                <div className="accordion__content">
                                    <p className="accordion__content-text">
                                        { item.message }
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                    <button type="button" className="modal-content__btn third-btn">Открыть все</button>
                </div>
            </div>
        </div>
    </>
  )
}
