import { useEffect, useState } from "react"
import DoughnutChart from "./DoughnutChart"
import Tabs from "@components/Tabs"
import StatsList from "./StatsList"


type TabsStatuses = 'Bills' | 'Deposits' | 'Incomes'

type Filter = {
    value: string
    label: string
} 

interface TabsStateType {
    value: TabsStatuses
    label: string
    filters: Array<Filter>
}


export const TabsStates: Array<TabsStateType> = [
    {
        value: 'Bills',
        label: 'Счета',
        filters: [
            { value: 'Paid', label: 'Оплачено' },
            { value: 'Created', label: 'Создано' },
            { value: 'PartiallyPaid', label: 'Оплачено частично' },
            { value: 'Total', label: 'Всего' },
            { value: 'InProgress', label: 'В работе' },
            { value: 'Completed', label: 'Завершенных' },
        ]
    },
    {
        value: 'Deposits',
        label: 'Депозиты',
        filters: [
            { value: 'Paid', label: 'Оплачено' },
            { value: 'Created', label: 'Создано' },
            { value: 'PartiallyPaid', label: 'Оплачено частично' },
            { value: 'Total', label: 'Всего' },
            { value: 'InProgress', label: 'В работе' },
            { value: 'Completed', label: 'Завершенных' },
        ]
    },
    {
        value: 'Incomes',
        label: 'Доход',
        filters: [
            { value: 'General', label: 'Общий' },
            { value: 'FromAccounts', label: 'От счетов' },
            { value: 'FromDeposits', label: 'От депозитов' },
            { value: 'FromTheReferralProgram', label: 'От реферальной программы' },
        ]
    },
]


export function StatsTop() {
    const [tabStatusIndex, setStatusIndex] = useState<number>(0)
    const [filterIndex, setFilterIndex] = useState<number>(0)


    useEffect(() => {
        filterStatsData()
    }, [
        tabStatusIndex,
        filterIndex
    ])


    function onSelectTabsStates(stateIndex: number): void {
        setStatusIndex(stateIndex)
        setFilterIndex(0)
    }

    function onSelectFilters(filtersIndex: number): void {
        setFilterIndex(filtersIndex)
    }

    function filterStatsData() {

    }


    return (
        <div className="stats__top">
            <div className="stats__info">
                <div className="stats__circkle">

                    <DoughnutChart />

                </div>

                <div className="stats__selects-wrapper">

                    <Tabs
                        items={TabsStates}
                        onSelect={onSelectTabsStates}
                    />

                    <Tabs
                        items={TabsStates[tabStatusIndex].filters}
                        onSelect={onSelectFilters}
                        size={'small'}
                    />

                    <StatsList />

                </div>
            </div>

            <div className="deposits__filter-select deposits__filter-select--datapicker" data-select-wrapper>
                <div className="deposits__filter-label"> Дата </div>
                <div className="deposits__filter-selected" data-select-value> 01.06.2022-13.06.2023 </div>
                <img className="deposits__filter-arrow" src="/img/icons/mini-arrow-down.svg" alt="mini-arrow-down" data-select-arrow />
                <ul className="deposits__filter-list select-list" data-select-list>
                    <li className="deposits__filter-item select-item" data-select-item>01/06/2022-13/06/2023</li>
                    <li className="deposits__filter-item select-item" data-select-item>01/06/2022-13/06/2023</li>
                    <li className="deposits__filter-item select-item" data-select-item>01/06/2022-13/06/2023</li>
                </ul>
            </div>
        </div>
    )
}