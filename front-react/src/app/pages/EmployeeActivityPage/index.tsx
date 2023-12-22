import { AuthorizedService } from "@awex-api"
import { msg } from "@constants/messages"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useInView } from 'react-intersection-observer'
import daysjs from "dayjs"
import { EmployeeActivityFilters } from "./EmployeeActivityFilters"
import { isNull } from "lodash"


type ActivityLog = {
    id: number,
    event: string,
    data: {
        user_id: number,
    },
    createdAt: number
}

export type ActivityLogFilters = {
    event?: string
    startTime?: number
    endTime?: number
}


const activityLogFiltersDefault = {
    event: undefined,
    startTime: undefined,
    endTime: undefined,
}


export function EmployeeActivityPage() {
    const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([])
    const [activityLogIsLoading, setActivityLogIsLoading] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [pages, setPages] = useState<number>(1)
    const [activityLogFilters, setActivityLogFilters] = useState<ActivityLogFilters>(activityLogFiltersDefault)
    const { ref, inView } = useInView({ threshold: 0.5 })

    
    useEffect(() => {
        getActivityLog()
    }, [page, activityLogFilters])

    useEffect(() => {
        scrollLaod()
    }, [inView])


    function getActivityLog(): void {
        if(activityLogIsLoading) return
        setActivityLogIsLoading(true)
        const { event, startTime, endTime } = activityLogFilters
        AuthorizedService.getLog(page.toString(), event, startTime, endTime)
        .then((response) => {
            if(!response) {
                setActivityLogs([])
                return
            }
            const newActivityLogs: ActivityLog[] = page === 1 ? [ ...response.list ] : [ ...activityLogs, ...response.list ]
            setActivityLogs(newActivityLogs)
            setPages(response.pages)
        })
        .catch((error) => {
            toast.error(msg.SERVER_ERROR)
            setActivityLogs([])
            console.error(error)
        })
        .finally(() => {
            setActivityLogIsLoading(false)
        })
    }
    
    function scrollLaod(): void {
        if(!inView) return
        page < pages && setPage(page + 1)
    }

    function changeReferralFilters(newFilter: ActivityLogFilters): void {
        if(!isNull(newFilter)) {
            const newActivityLogFilters = {
              ...activityLogFilters,
              ...newFilter,
            }
            setActivityLogFilters(newActivityLogFilters)
            setPage(1)
          }
    } 


    return (
        <div className="wrapper">
            <section className="settings operations-history">
                <div className="deposits__header">
                    <h1 className="deposits__title main-title">История действий сотрудников</h1>
                </div>

                <EmployeeActivityFilters
                    setFilter={changeReferralFilters}
                />
    
                <div className="settings__inner">    
                    <div className="operations-history__content">
                        <div className="history-operations">
                            <div className='history-operations__container history-operations__container_full'>
                                <ul className="history-operations__list">
                                    <li className="history-operations__item history-operations__item-header">
                                        <div className="history-operations__item-data">Дата</div>
                                        <div className="history-operations__item-time">Время</div>
                                        <div className="history-operations__item-user">User</div>
                                        <div className="history-operations__item-details">Детали</div>
                                    </li>
                                </ul>
                            </div>

                            <div className='history-operations__container history-operations__container_full'>
                                <ul className="history-operations__list">

                                    { activityLogs && activityLogs.length > 0 && activityLogs.map((activityLog) => {
                                        const data = activityLog.createdAt ? activityLog.createdAt * 1000 : 0

                                        return(
                                            <li className="history-operations__item">
                                                <div className="history-operations__item-data"> { daysjs(data).format("DD.MM.YYYY") } </div>
                                                <div className="history-operations__item-time"> { daysjs(data).format("HH:mm") } </div>
                                                <div className="history-operations__item-user"> { activityLog.data.user_id } </div>
                                                <div className="history-operations__item-details hoid_fix"> { activityLog.event } </div>
                                            </li>
                                        )
                                    }) }

                                    <li className="history-operations__item" ref={ref}></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}