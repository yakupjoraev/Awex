import { Filters, FiltersPropType, DateRange, filterSelect, filterDate } from "@components/Filters"
import { AccountNotifiFilterType } from "../../../hooks/useAccountNotifications"
import { useEffect, useState } from "react"
import { AuthorizedService } from "@awex-api"

interface NotificationsFiltersProps {
    setFilter: (filter: AccountNotifiFilterType)=>void
}

export function NotificationsFilters({ setFilter }: NotificationsFiltersProps) {
    // const filterDefault: FiltersPropType = {
    //     filter: [
    //         {
    //             fieldType: 'Select',
    //             className: '',
    //             label: 'Проект',
    //             value: 1,
    //             options: [
    //                 { value: 1, label: 'Проект 1' },
    //                 { value: 2, label: 'Проект 2' },
    //                 { value: 3, label: 'Проект 3' },
    //             ],
    //             onChange: (i: string | number)=>{console.log(i)}
    //         },
    //         {
    //             fieldType: 'Select',
    //             className: '',
    //             label: 'Статус',
    //             value: 1,
    //             options: [
    //                 { value: 1, label: 'Pfrfps 1' },
    //                 { value: 2, label: 'Pfrfps 2' },
    //                 { value: 3, label: 'Pfrfps 3' },
    //             ],
    //             onChange: (i: string | number)=>{console.log(i)}
    //         },
    //         {
    //             fieldType: 'Date',
    //             className: '',
    //             label: 'Дата',
    //             onChange: (value: DateRange | undefined)=>{console.log(value)}
    //         }
    //     ]
    // }

    // type DateRange = {
    //     from: Date | undefined;
    //     to?: Date | undefined;
    // };

    const projectFilterDefault: filterSelect = {
        fieldType: 'Select',
        className: '',
        label: 'Проект',
        value: 'default',
        options: [],
        onChange: (value: string) => projectFilterChange(value)
    }
    const statusFilterDefault: filterSelect = {
        fieldType: 'Select',
        className: '',
        label: 'Статус',
        value: 'default',
        options: [],
        onChange: (value: string) => statusFilterChange(value)
    }
    const dateFilterDefault: filterDate = {
        fieldType: 'Date',
        className: '',
        label: 'Дата',
        onChange: dateFilterChange
    }
    const filterDefault: FiltersPropType = {
        filter: [
            // projectFilterDefault,
            // statusFilterDefault,
            // dateFilterDefault
        ]
    }

    const [projectFilter, setProjectFilter] = useState<filterSelect>(projectFilterDefault)
    const [statusFilter, setStatusFilter] = useState<filterSelect>(statusFilterDefault)
    const [dateFilter, setDateFilter] = useState<filterDate>(dateFilterDefault)
    const [filterOptions, setFilterOptions] = useState<FiltersPropType>(filterDefault)

    useEffect(() => {
        getProjects()
    },[])
    
    useEffect(() => {
        getFilterOptions()
    },[projectFilter, statusFilter, dateFilter])

    function projectFilterChange(value: string) {
        const newProjectFilter = {
            ...projectFilter,
            value,
        }
        console.log('projectFilterChange newProjectFilter', newProjectFilter)
        setProjectFilter(newProjectFilter)
    }

    function statusFilterChange(value: string) {}

    function dateFilterChange(value: DateRange | undefined) {}

    function getFilterOptions() {
        const newFilter: FiltersPropType = {
            filter: [
                { ...projectFilter },
                { ...statusFilter },
                { ...dateFilter }
            ]
        }
        console.log('newFilter', newFilter)
        setFilterOptions(newFilter)
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
            const newProjectFilter = {
                ...projectFilter,
                options: [{value: 'default', label: 'Все'}, ...newProjectOptions],
            }
            setProjectFilter(newProjectFilter)
        })
        .catch((error) => {
            console.error(error)
        })
    }
    
    return (
        <Filters filter={filterOptions.filter} />
    )
}