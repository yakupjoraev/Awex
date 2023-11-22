import { AuthenticatedService } from "@awex-api"
import React, { useEffect, useState } from "react"
import { NotificationsList } from "./NotificationsList"
import { useShortString } from "../../hooks/useShortString"

export interface accountNotifications {
    id: number
    type: string
    short?: string
    message: string
    read: boolean
    createdAt?: number
}

export function AccountNotifications() {
    const [notifications, setNotifications] = useState<accountNotifications[]>([])
    const [page, setPage] = useState<number>(1)
    const [pages, setPages] = useState<number>(1)
    const [isOpenList, setIsOpenList] = useState<boolean>(false)
    const [shortMessage, setShortMessage] = useShortString('', 40)

    useEffect(() => {
        getNotifications()
    }, [])

    useEffect(() => {
        if(!notifications.length) {
            setShortMessage('')
            return
        }
        setShortMessage(notifications[0].short)
    }, [notifications])

    function getNotifications(): void {
        AuthenticatedService.getAccountNotifications() //(page.toString(), pages.toString())
        .then((response) => {
            if(!response) {
                setNotifications([])
                return
            }
            console.log('getNotifications', response)
            const {list, page, pages} = response
            const notifications = list.slice(0)
            setPage(page)
            setPages(pages)
            setNotifications(notifications)
        })
        .catch((error) => {
            console.error(error)
        })
    }

    function toggleOpenList(state?: boolean): void {
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
                { notifications.length && ( <span>{ notifications.length }</span> )}
            </div>

            { notifications.length && (
                <div className="about-deposit__header-info">
                    { shortMessage }
                </div>
            )}
        </div>

        <NotificationsList
            notifications={notifications}
            page={page}
            pages={pages}
            isOpenList={isOpenList}
            onClose={()=>setIsOpenList(false)}
        />
    </>
  )
}
