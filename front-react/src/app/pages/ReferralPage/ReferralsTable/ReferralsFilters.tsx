import { useEffect, useState } from "react"
import { ReferralFilters } from "."
import { DepositsFiltersSelect } from "../../../components/DepositsFilterSelect"
import { DepositsFilterDate, DateRange, } from "../../../components/DepositsFilterDate"


type ReferralsFiltersProps = {
    setFilter: (newFilter: ReferralFilters) => void
}

type ReferralStatus = 'active' | 'inActive'

interface StatusFilterType {
    value: string
    options: { value: ReferralStatus | '', label: string }[]
}

const statusFilterDefault: StatusFilterType = {
    value: '',
    options: [
        {value: '', label: 'Все'},
        {value: 'active', label: 'Активный'},
        {value: 'inActive', label: 'Не активный'},
    ]
}

const defaultDateFilterValue: DateRange = {
    from: undefined,
    to: undefined,
}


export function ReferralsFilters(props: ReferralsFiltersProps) {
    const { setFilter } = props
    const [statusFilter, setStatusFilter] = useState<StatusFilterType>(statusFilterDefault)
    const [dateFilter, setDateFilter] = useState<DateRange | undefined>(defaultDateFilterValue)


    function handleStatusFilterChange(value: string) {
        const newStatusFilter = {
            ...statusFilter,
            value,
        }
        setStatusFilter(newStatusFilter)
        const referralStatusValue: ReferralStatus | '' = stringToReferralStatus(value)
        setFilter({
            status: referralStatusValue !== '' ? referralStatusValue : undefined,
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

    function stringToReferralStatus(str: string): ReferralStatus | '' {
        if(str === 'active' || str === 'inActive' ) return str
        return ''
    }


    return (
        <div className="history-operations__header">
            <DepositsFiltersSelect
                label="Статус"
                value={statusFilter.value}
                options={statusFilter.options}
                onChange={handleStatusFilterChange}
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