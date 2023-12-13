import { useEffect, useState } from "react"
import { DepositItem } from "../DepositItem"
import { useInView } from 'react-intersection-observer'
import { Deposit } from ".."


interface DepositsListPropsTyeps {
    depositsList: Deposit[]
    onLoadMore: () => void
}


export function DepositsList(props: DepositsListPropsTyeps) {
    const { onLoadMore, depositsList } = props
    const { ref, inView } = useInView({
      threshold: 0.5,
    })
    

    useEffect(() => {
        scrollLaod()
    }, [inView])
    

  function scrollLaod(): void {
    if(!inView) return
    onLoadMore()
  }


    return (
        <>
            <div className="deposits__list-container">
                <ul className="deposits__list">
                    <li className="deposits__item-header">
                    <div className="deposits__item-status"></div>
                    <div className="deposits__item-id">Имя/ID</div>
                    <div className="deposits__item-data">Дата</div>
                    <div className="deposits__item-status-deposite"> Статус депозита </div>
                    <div className="deposits__item-sum">Сумма </div>
                    <div className="deposits__item-data-end">Дата окончания</div>
                    {/* <div className="deposits__item-status-application"> Статус заявки </div> */}
                    <div className="deposits__item-commets">Комментарий</div>
                    </li>
                </ul>
            </div>

            <div className="history-operations__container history-operations__container_full"> {/* deposits__list-container */}
                <ul className="deposits__list">

                    {depositsList.map((deposit) => {
                    return <DepositItem deposit={deposit} key={deposit.id} />
                    })}

                    <li ref={ref}></li>
                </ul>
            </div>
        </>
    )
}