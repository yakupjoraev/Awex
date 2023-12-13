import { useEffect, useState } from "react"
import { DepositsFiltersSelect } from "../../../components/DepositsFilterSelect"
import { DepositsFilterDate, DateRange, } from "../../../components/DepositsFilterDate"


const projectFilterOptions = [
    { value: "0", label: "Все" },
    { value: "1", label: "Все" },
    { value: "2", label: "Все" },
]
  
const statusFilterOptions = [
    { value: "0", label: "Ожидает действий" },
    { value: "1", label: "Ожидает действий" },
    { value: "2", label: "Ожидает действий" },
]
  
const defaultDateFilterValue: DateRange = {
    from: new Date("2022-01-05T22:00:00.000Z"),
    to: new Date("2023-06-05T22:00:00.000Z"),
}


export function DepositFilters() {
    const [projectFilter, setProjectFilter] = useState("0")
    const [statusFilter, setStatusFilter] = useState("0")
    const [dateFilter, setDateFilter] = useState<DateRange | undefined>(defaultDateFilterValue)

    
    const handleProjectFilterChange = (value: string) => {
        setProjectFilter(value)
    }

    const handleStatusFilterChange = (value: string) => {
        setStatusFilter(value)
    }

    const handleDateFilterChange = (value?: DateRange) => {
        setDateFilter(value)
    }


    return (
        <>
            <div className="deposits__filters">
                <DepositsFiltersSelect
                    label="Проект"
                    options={projectFilterOptions}
                    value={projectFilter}
                    onChange={handleProjectFilterChange}
                />

                <DepositsFiltersSelect
                    label="Статус"
                    options={statusFilterOptions}
                    value={statusFilter}
                    onChange={handleStatusFilterChange}
                />

                <DepositsFilterDate
                    label="Дата"
                    value={dateFilter}
                    onChange={handleDateFilterChange}
                />
            </div>
            

            <div className="deposits__filter-search search-group">
                <input
                    className="deposits__filter-src search-input"
                    type="search"
                    placeholder="Поиск по ID или комментарию"
                />
                <img
                    className="deposits__filter-search-img search-img"
                    src="/img/icons/search.svg"
                    alt="Поиск"
                />
            </div>
        </>
    )
}