import daysjs from "dayjs"
import { Deposit } from ".."


export interface DepositItemProps {
  deposit: Deposit
}


const statusLabels = new Map([
  ['wait', 'Ожидает действий'],
  ['paid', 'Оплаченный'],
  ['expired', 'Истекший']
]);


export function DepositItem(props: DepositItemProps) {
  const { id, data, deposit, depositAmount, status, createdAt } = props.deposit
  const depositStatusLabel = status ? statusLabels.get(status) : ''
  const createdDate = createdAt ? createdAt * 1000 : 0
  const returnTime = deposit?.returnTime ? createdDate + (deposit.returnTime * 86400000) : 0


  return (
    <li className="deposits__item">  {/* Class 'deposits__item-rejected' highlights the element with a red frame */}
      <div className="deposits__item-status">
        {/* {props.applicationStatus === "rejected" && (
          <img src="/img/icons/rejected.svg" alt="" />
        )} */}
      </div>
      <div className="deposits__item-id">{ id }</div>
      <div className="deposits__item-data">
        {createdDate && daysjs(createdDate).format("DD.MM.YYYY")}
      </div>
      <div className="deposits__item-status-deposite">{ depositStatusLabel }</div>
      <div className="deposits__item-sum">
        { depositAmount } { deposit && deposit.currency }
      </div>
      <div className="deposits__item-data-end">
        { returnTime && daysjs(returnTime).format("DD.MM.YYYY")}
        {/* { deposit && deposit.returnTime && deposit.returnTime} */}
      </div>
      {/* <div className="deposits__item-status-application">
        {applicationStatusLabel}
      </div> */}
      <div className="deposits__item-commets">
        { data && data.name }
      </div>
    </li>
  )
}