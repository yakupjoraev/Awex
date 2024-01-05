import { useState } from "react"


type Sizes = 'small'

type Items = {
    value: string
    label: string
} 

interface TabsProps {
    items: Items[]
    onSelect: (index: number) => any
    size?: Sizes
}


export default function Tabs(props: TabsProps) {
    const [tabStatusIndex, setStatusIndex] = useState<number>(0)
    const { items, onSelect, size } = props
    let classSize: string = ''


    switch (size) {
        case 'small':
            classSize = 'stats__selects-label'
            break
    
        default:
            classSize = 'stats__selects-tab'
            break
    }

    function SelectStatusTab(event: any, idx: number) {
        event.preventDefault()
        setStatusIndex(idx)
        onSelect(idx)
    }


    return ( 
        <div className="stats__selects">
            { items.map((state, idx) => {
                return (
                    <a href="#"
                        key={state.value}
                        className={`${classSize} ${ idx === tabStatusIndex && 'active' }`}
                        onClick={(event) => { SelectStatusTab(event, idx) }}
                    >
                        { state.label }
                    </a>
                )
            }) }
        </div>            
    )
}