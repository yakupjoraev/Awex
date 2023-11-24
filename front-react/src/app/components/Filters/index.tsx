import { useState } from "react";
import { DepositsFiltersSelect, DepositsFiltersSelectProps } from "@components/DepositsFilterSelect";
import { DepositsFilterDate, DepositsFilterDateProps, DateRange } from "@components/DepositsFilterDate";

export type { DateRange } from "@components/DepositsFilterDate";

export interface filterSelect extends DepositsFiltersSelectProps {
    fieldType: 'Select'
}

export interface filterDate extends DepositsFilterDateProps {
    fieldType: 'Date'
}

export interface FiltersPropType {
    filter: Array<filterSelect | filterDate>
}

export function Filters({ filter }: FiltersPropType) {

    return (
        <div className="deposits__filters">
            { filter && filter.length > 0 && filter.map((item) => {
                if(item.fieldType === undefined || item.fieldType === 'Select') {
                    return (
                        <DepositsFiltersSelect
                            key={item.label}
                            className={item.className}
                            label={item.label}
                            value={item.value}
                            options={item.options}
                            onChange={item.onChange}
                        />
                    )
                }

                if(item.fieldType !== undefined && item.fieldType === 'Date') {
                    return (
                        <DepositsFilterDate
                            key={item.label}
                            className={item.className}
                            label={item.label}
                            value={item.value}
                            onChange={item.onChange}
                        />
                    )
                }

            })}
        </div>
    )
}