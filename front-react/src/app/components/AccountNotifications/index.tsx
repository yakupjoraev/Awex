import { AuthenticatedService } from "@awex-api"
import React, { useEffect, useState } from "react"
import { NotificationsList } from "./NotificationsList"
import { useShortString } from "../../hooks/useShortString"
import { useAccountNotifications } from "../../hooks/useAccountNotifications"
import { accountNotificationsType } from "../../hooks/useAccountNotifications"

export function AccountNotifications() {
    const {
        notificationsFiltered,
        count,
    } = useAccountNotifications()
    const [isOpenList, setIsOpenList] = useState<boolean>(false)
    const [shortMessage, setShortMessage] = useShortString('', 40)

    useEffect(() => {
        if(!notificationsFiltered.length) {
            setShortMessage('')
            return
        }
        setShortMessage(notificationsFiltered[0].short)
    }, [notificationsFiltered])

    function toggleOpenList(state?: boolean): void {
        if(notificationsFiltered.length <= 0) {
            setIsOpenList(false)
            return
        }

        if(typeof state === "undefined") {
            setIsOpenList(!isOpenList)
            return
        }
        setIsOpenList(state)
    }

  return (
    <>
        <div className="about-deposit__header"
            onClick={() => toggleOpenList()}
        >
            <div className="about-deposit__header-notif">
                <img src="/img/icons/bell.svg" alt="" />
                Новые уведомления
                { count && ( <span>{ count }</span> )}
            </div>

            { notificationsFiltered.length && (
                <div className="about-deposit__header-info">
                    { shortMessage }
                </div>
            )}
        </div>
        
        { notificationsFiltered.length && (
            <NotificationsList
                notifications={notificationsFiltered}
                count={count}
                isOpenList={isOpenList}
                onClose={()=>setIsOpenList(false)}
            />
        )}
    </>
  )
}
