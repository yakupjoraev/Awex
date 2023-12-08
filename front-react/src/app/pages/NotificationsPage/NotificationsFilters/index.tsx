// import { Filters, FiltersPropType, DateRange, filterSelect, filterDate } from "@components/Filters"
import { AccountNotifiFilterType } from "../../../hooks/useAccountNotifications"
import { useEffect, useState } from "react"
import { AuthorizedService } from "@awex-api"

import { DepositsFiltersSelect } from "@components/DepositsFilterSelect";
import { DepositsFilterDate, DateRange } from "@components/DepositsFilterDate";

interface NotificationsFiltersProps {
    setFilter: (filter: AccountNotifiFilterType)=>void
}

interface SelectFilterType {
    value: string
    options: { value: string, label: string }[]
}

const projectsFilterDefault = {
    value: '',
    options: [{value: '', label: 'Все'}]
}

const statusFilterDefault = {
    value: '0',
    options: [
        {value: '0', label: 'Все'},
        {value: 'unread', label: 'Ожидает действий'},
        {value: 'read', label: 'Прочитано'}
    ]
}
const dataValueDefault = {
    from: undefined,
    to: undefined,
}

export function NotificationsFilters({ setFilter }: NotificationsFiltersProps) {
    const [projectsFilter, setProjectsFilter] = useState<SelectFilterType>(projectsFilterDefault)
    const [statusFilter, setStatusFilter] = useState<SelectFilterType>(statusFilterDefault)
    const [dataValue, setDataValue] = useState<DateRange>(dataValueDefault)

    useEffect(() => {
        getProjects()
    },[])

    function projectFilterChange(value: string) {
        const newProjectFilter = {
            ...projectsFilter,
            value,
        }
        setProjectsFilter(newProjectFilter)
        setFilter({
            projectId: value !== '' ? value : undefined,
        })
    }

    function statusFilterChange(value: string) {
        const newStatusFilter = {
            ...statusFilter,
            value,
        }
        setStatusFilter(newStatusFilter)

        let newStatus: boolean | undefined

        switch(value) {
            case 'unread':
                newStatus = false
                break
            case 'read':
                newStatus = true
                break
        }
        setFilter({
            read: newStatus,
        })
    }

    function dateFilterChange(value: DateRange | undefined) {
        if(!value) {
            setDataValue(dataValueDefault)
            return
        }
        setDataValue(value)
    }

    function dateFilterChangeFine() {
        setFilter({
            startTime: dataValue.from ? (Date.parse(dataValue.from.toString()) / 1000).toString() : '',
            endTime: dataValue.to ? (Date.parse(dataValue.to.toString()) / 1000).toString() : '',
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
                value: projectsFilter.value,
                options: [{value: '', label: 'Все'}, ...newProjectOptions],
            }
            setProjectsFilter(newProjectFilter)
        })
        .catch((error) => {
            console.error(error)
        })
    }
    
    return (        
        <div className="deposits__filters">
            <DepositsFiltersSelect
                label="Проект"
                value={projectsFilter.value}
                options={projectsFilter.options}
                onChange={projectFilterChange}
            />
            
            <DepositsFiltersSelect
                label="Статус"
                value={statusFilter.value}
                options={statusFilter.options}
                onChange={statusFilterChange}
            />

            <DepositsFilterDate
                label="Дата"
                value={dataValue}
                onChange={dateFilterChange}
                onClose={dateFilterChangeFine}
            />
        </div>

    )
}