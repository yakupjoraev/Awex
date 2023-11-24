import { useEffect, useState } from "react"
import { AuthenticatedService } from "@awex-api"

const GETTING_TIMEOUT = 60000

export interface AccountNotifiFilterType {
    page?: string,
    read?: boolean | string,
    projectId?: string,
    startTime?:string,
    endTime?: string
}

export interface accountNotificationsType {
    id: number
    type: string
    short?: string
    message: string
    read: boolean
    createdAt?: number
    data: {
        projectId?: number
    }
}

const useAccountNotifications = () => {
    const [notifications, setNotifications] = useState<accountNotificationsType[]>([])
    const [notifiFilter, setNotifiFilter] = useState<AccountNotifiFilterType>({})
    const [notificationTypes, setNotificationTypes] = useState<string[]>([])
    const [page, setPage] = useState<number>(0)
    const [pages, setPages] = useState<number>(0)
    const [count, setCount] = useState<number>(0)
    const [notificationsFiltered, setNotificationsFiltered] = useState<accountNotificationsType[]>([])
    const [notificationsIsLoading, setNotificationsIsLoading] = useState<boolean>(false)
    
    useEffect(() => {
        let notificationsTimer: any = null
        getNotifications()
        accountNotificationsTypes()

        notificationsTimer = setInterval(() => {
            getNotifications()
            accountNotificationsTypes()
        }, GETTING_TIMEOUT)

        return () => {
            console.log('notificationsTimer close')
            clearInterval(notificationsTimer)
        }
    }, [notifiFilter])

    useEffect(() => {
        getFiterredNotifications()
    },[notifications])
    
    function getNotifications(): boolean {
        if(notificationsIsLoading) return false
        setNotificationsIsLoading(true)
        let responseStatus: boolean = false

        AuthenticatedService.getAccountNotifications(notifiFilter)
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
            responseStatus = true
        })
        .catch((error) => {
            console.error(error)
        })
        .finally(() => {
            setNotificationsIsLoading(false)
        })
        return responseStatus
    }

    function setNotificationFilter(filter: AccountNotifiFilterType): void {
        const newFilter = {
            ...notifiFilter,
            ...filter,
        }
        setNotifiFilter(newFilter)
    }

    function setStatusRead(notificationID: number, status: boolean) {
        const item: accountNotificationsType | undefined = notifications.find((item: accountNotificationsType)=>{
            return item.id === notificationID
        })

        if(!item || item.read) return
        AuthenticatedService.setAccountNotifications(notificationID.toString(), status)
        .then((response)=>{
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

    function accountNotificationsTypes() {
        AuthenticatedService.getAccountNotificationsTypes()
        .then((response) => {
            if(response && response.types) {
                setNotificationTypes(response.types)
            }
        })
        .catch((error) => {
            console.error(error)
        })
    }

    function getFiterredNotifications() {
        setNotificationsFiltered(notifications)
    }

    return {
        notificationsFiltered,
        page,
        pages,
        count,
        notificationTypes,
        setNotificationFilter,
        setStatusRead
    }
}

export { useAccountNotifications }