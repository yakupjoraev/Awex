import { useEffect, useState } from "react"
import { DepositsFiltersSelect } from "../../../components/DepositsFilterSelect"
import { DepositsFilterDate, DateRange, } from "../../../components/DepositsFilterDate"
import { useAppSelector } from "@store/hooks"
import { useDebounce } from 'usehooks-ts'


type DepositStatus = 'wait' | 'paid' | 'expired'

interface DepositsFilters {
    projectId?: number
    status?: DepositStatus
    startTime?: number
    endTime?: number
}

interface DepositFiltersProps {
    setFilter: (searchString: string | null, filter: DepositsFilters | null) => void
}

interface SelectFilterType {
    value: string
    options: { value: string, label: string }[]
}

interface StatusFilterType {
    value: string
    options: { value: DepositStatus | '', label: string }[]
}


const projectsFilterDefault: SelectFilterType = {
    value: '',
    options: [
        {value: '', label: 'Все'}
    ]
}

const statusFilterDefault: StatusFilterType = {
    value: '',
    options: [
        {value: '', label: 'Все'},
        {value: 'wait', label: 'Ожидает действий'},
        {value: 'paid', label: 'Оплаченный'},
        {value: 'expired', label: 'Истекший'}
    ]
}

const defaultDateFilterValue: DateRange = {
    from: undefined,
    to: undefined,
}


export function DepositFilters(props: DepositFiltersProps) {
    const { setFilter } = props 
    const projects = useAppSelector((state) => state.projects.data)
    const [projectFilter, setProjectFilter] = useState<SelectFilterType>(projectsFilterDefault)
    const [statusFilter, setStatusFilter] = useState<StatusFilterType>(statusFilterDefault)
    const [dateFilter, setDateFilter] = useState<DateRange | undefined>(defaultDateFilterValue)
    const [searchString, setSearchString] = useState<string>('')
    const searchFilterDebounce = useDebounce<string>(searchString, 200)

        
    useEffect(() => {
        formattingProjectFilter()
    }, [projects])

    useEffect(() => {
        setFilter(searchString, null)
    }, [searchFilterDebounce])


    function formattingProjectFilter() {
        if(!projects) return
        const newProjectOptions = projects.map((project) => {
            return {
                value: project.id,
                label: project.project.name
            }
        })
        const newProjectFilter: SelectFilterType = {
            value: projectFilter.value,
            options: [{value: '', label: 'Все'}, ...newProjectOptions],
        }
        setProjectFilter(newProjectFilter)
    }
    
    function handleProjectFilterChange(value: string) {
        const newProjectFilter = {
            ...projectFilter,
            value,
        }
        setProjectFilter(newProjectFilter)
        setFilter(null, {
            projectId: value !== '' ? Number(value) : undefined,
        })
    }

    function handleStatusFilterChange(value: string) {
        const newStatusFilter = {
            ...statusFilter,
            value,
        }
        setStatusFilter(newStatusFilter)
        const depositStatusValue: DepositStatus | '' = stringToDepositStatus(value)
        setFilter(null, {
            status: depositStatusValue !== '' ? depositStatusValue : undefined,
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
        setFilter(null, {
            startTime: dateFilter?.from ? (Date.parse(dateFilter.from.toString()) / 1000) : undefined,
            endTime: dateFilter?.to ? (Date.parse(dateFilter.to.toString()) / 1000) : undefined,
        })
    }

    function stringToDepositStatus(str: string): DepositStatus | '' {
        if(str === 'wait' || str === 'paid' || str === 'expired' ) return str
        return ''
    }

    function onSearch(event: any) {
        const value = event.target.value
        setSearchString(value)
    }


    return (
        <>
            <div className="deposits__filters">
                <DepositsFiltersSelect
                    label="Проект"
                    value={projectFilter.value}
                    options={projectFilter.options}
                    onChange={handleProjectFilterChange}
                />

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
            

            <div className="deposits__filter-search search-group">
                <input className="deposits__filter-src search-input" type="search"
                    placeholder="Поиск по ID или комментарию"
                    value={searchString}
                    onInput={onSearch}
                />
                <img className="deposits__filter-search-img search-img" src="/img/icons/search.svg" alt="Поиск" />
            </div>
        </>
    )
}