import { useEffect, useState } from "react"
import { AuthenticatedService } from "@awex-api"

const GETTING_TIMEOUT = 5000 // 60000

interface AccountNotifiFilter {
    page?: string,
    read?: string,
    projectId?: string,
    startTime?:string,
    endTime?: string
}

interface accountNotifications {
    id: number
    type: string
    short?: string
    message: string
    read: boolean
    createdAt?: number
    data: {
        projectId: number
    }
}

const useAccountNotifications = () => {
    const [notifications, setNotifications] = useState<accountNotifications[]>([])
    const [notifiFilter, setNotifiFilter] = useState<AccountNotifiFilter>({})
    const [page, setPage] = useState<number>(0)
    const [pages, setPages] = useState<number>(0)
    const [count, setCount] = useState<number>(0)
    const [notificationsFiltered, setNotificationsFiltered] = useState<accountNotifications[]>([])
    
    useEffect(() => {
        let notificationsTimer: any = null
        getNotifications()
        notificationsTimer = setInterval(getNotifications, GETTING_TIMEOUT)

        return () => {
            clearInterval(notificationsTimer)
        }
    }, [])

    useEffect(()=>{
        setNotificationsFiltered(notifications)
    },[notifications])

    
    function getNotifications(): void {
        AuthenticatedService.getAccountNotifications()
        .then((response) => {
            if(!response) {
                setNotifications([])
                return
            }
            console.log('getNotifications', response)
            const {list, page, pages, count} = response
            const notifications = list.slice(0)
            setPage(page)
            setPages(pages)
            setCount(count)
            setNotifications(notifications)
        })
        .catch((error) => {
            console.error(error)
        })
    }

    function setNotificationFilter(filter: AccountNotifiFilter): void {
        setNotifiFilter(filter)
    }

    function setStatusRead(notificationID: number, status: boolean) {
        AuthenticatedService.setAccountNotifications(notificationID.toString(), status)
        .then((response)=>{
            console.log(response)
            const newNotifications = notificationsFiltered.map((item)=>{
                if(item.id === notificationID) {
                    return {...item, read: true}
                }
                return {...item}
            })
            setNotificationsFiltered(newNotifications)
        })
        .catch((error) => {
            console.error(error)
        })
    }

    return {
        notificationsFiltered,
        page,
        pages,
        count,
        setNotificationFilter,
        setStatusRead
    }
}

export { useAccountNotifications }