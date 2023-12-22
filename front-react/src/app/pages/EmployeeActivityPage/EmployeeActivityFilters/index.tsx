import { useEffect, useState } from "react"
import { ActivityLogFilters } from "../"
import { DepositsFiltersSelect } from "../../../components/DepositsFilterSelect"
import { DepositsFilterDate, DateRange, } from "../../../components/DepositsFilterDate"
import { AuthorizedService } from "@awex-api"


type EmployeeActivityProps = {
    setFilter: (newFilter: ActivityLogFilters) => void
}

interface EventFilterType {
    value: string
    options: { value: string, label: string }[]
}


const eventFilterDefault: EventFilterType = {
    value: '',
    options: [
        {value: '', label: 'Все'},
    ]
}

const defaultDateFilterValue: DateRange = {
    from: undefined,
    to: undefined,
}


export function EmployeeActivityFilters(props: EmployeeActivityProps) {
    const { setFilter } = props
    const [eventFilter, setEventFilter] = useState<EventFilterType>(eventFilterDefault)
    const [dateFilter, setDateFilter] = useState<DateRange | undefined>(defaultDateFilterValue)

    useEffect(() => {
        getEvents()
    }, [])


    function getEvents() {
        AuthorizedService.getLogEvents()
        .then((response) => {
            if(!response) return
            const events = response.events.map((eventItem) => {
                return { value: eventItem, label: eventItem }
            })
            const newEventFilter = {
                ...eventFilterDefault,
                options: [ ...eventFilterDefault.options, ...events ]
            }
            setEventFilter(newEventFilter)
        })
    }

    function handleEventFilterChange(value: string) {
        const newEventFilter = {
            ...eventFilter,
            value,
        }
        setEventFilter(newEventFilter)
        const referralEventValue: string = value
        setFilter({
            event: referralEventValue !== '' ? referralEventValue : undefined,
        })
    }
    
    function handleDateFilterChange(value?: DateRange) {
        if(!value) {
            setDateFilter(defaultDateFilterValue)
            return
        }
        setDateFilter(value)
    }

    function dateFilterChangeFine() {
        setFilter({
            startTime: dateFilter?.from ? (Date.parse(dateFilter.from.toString()) / 1000) : undefined,
            endTime: dateFilter?.to ? (Date.parse(dateFilter.to.toString()) / 1000) : undefined,
        })
    }


    return (
        <div className="history-operations__header">
            <DepositsFiltersSelect
                label="Событие"
                value={eventFilter.value}
                options={eventFilter.options}
                onChange={handleEventFilterChange}
            />

            <DepositsFilterDate
                label="Дата"
                value={dateFilter}
                onChange={handleDateFilterChange}
                onClose={dateFilterChangeFine}
            />
        </div>
    )
}