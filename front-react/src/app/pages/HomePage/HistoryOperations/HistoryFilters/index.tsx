import { useEffect, useState } from "react"
import { AuthorizedService } from "@awex-api"
import { DepositsFiltersSelect } from "../../../../components/DepositsFilterSelect"
import { DepositsFilterDate, DateRange } from "../../../../components/DepositsFilterDate"


interface HistoryFilterType {
    startTime?: string
    endTime?: string
    projectId?: string
    currency?: string
    type?: string
    classType?: string
}

interface HistoryFiltersProps {
    setFilter: (filter: HistoryFilterType) => void
}

interface SelectFilterType {
    value: string
    options: { value: string, label: string }[]
}

const projectsFilterDefault: SelectFilterType = {
    value: '',
    options: [{value: '', label: 'Все'}]
}
const currencyFilterDefault: SelectFilterType = {
    value: '',
    options: [{value: '', label: 'Все'}]
}

const operationFilterDefault: SelectFilterType = {
    value: '',
    options: [{value: '', label: 'Все'}]
}

const defaultDateFilterValue: DateRange = {
    from: undefined,
    to: undefined,
}


export function HistoryFilters({ setFilter }: HistoryFiltersProps) {
    const [projectFilter, setProjectFilter] = useState<SelectFilterType>(projectsFilterDefault)
    const [currencyFilter, setCurrencyFilter] = useState<SelectFilterType>(currencyFilterDefault)
    const [operationFilter, setOperationFilter] = useState<SelectFilterType>(operationFilterDefault)
    const [dateFilter, setDateFilter] = useState<DateRange | undefined>(defaultDateFilterValue)


    useEffect(() => {
        getProjects()
        getParameters()
    },[])


    function handleProjectFilterChange(value: string) {
        const newProjectFilter = {
            ...projectFilter,
            value,
        }
        setProjectFilter(newProjectFilter)
        setFilter({
            projectId: value !== '' ? value : undefined,
        })
    }

    function handleCurrencyFilterChange(value: string) {
        const newCurrencyFilter = {
            ...currencyFilter,
            value,
        }
        setCurrencyFilter(newCurrencyFilter)
        setFilter({
            currency: value !== '' ? value : undefined,
        })
    }

    function handleOperationFilterChange(value: string) {
        const newOperationFilter = {
            ...operationFilter,
            value,
        }
        setOperationFilter(newOperationFilter)
        setFilter({
            type: value !== '' ? value : undefined,
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
            startTime: dateFilter?.from ? (Date.parse(dateFilter.from.toString()) / 1000).toString() : '',
            endTime: dateFilter?.to ? (Date.parse(dateFilter.to.toString()) / 1000).toString() : '',
        })
    }
    
    function getProjects() {
        AuthorizedService.projectNames()
        .then((response) => {
            if(!response || !response.list) return
            const newProjectOptions = response.list.map((project) => {
                return {
                    value: project.id.toString(),
                    label: project.name
                }
            })
            const newProjectFilter: SelectFilterType = {
                value: projectFilter.value,
                options: [{value: '', label: 'Все'}, ...newProjectOptions],
            }
            setProjectFilter(newProjectFilter)
        })
        .catch((error) => {
            console.error(error)
        })
    }

    function getParameters() {
        AuthorizedService.getTransactionParameters()
        .then((response) => {
            if(!response) return
            const { classes, types } = response.parameters
            const newOperationFilterOptions = types.map((item) => {
                return {
                    value: item,
                    label: item
                }
            })
            setOperationFilter({
                ...operationFilter,
                options: [{value: '', label: 'Все'}, ...newOperationFilterOptions]
            })
        })
    }


    return (
        <div className="history-operations__header">
            <DepositsFiltersSelect
                label="Проект"
                value={projectFilter.value}
                options={projectFilter.options}
                onChange={handleProjectFilterChange}
            />

            <DepositsFiltersSelect
                label="Валюта"
                value={currencyFilter.value}
                options={currencyFilter.options}
                onChange={handleCurrencyFilterChange}
            />

            <DepositsFiltersSelect
                label="Тип операции"
                value={operationFilter.value}
                options={operationFilter.options}
                onChange={handleOperationFilterChange}
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