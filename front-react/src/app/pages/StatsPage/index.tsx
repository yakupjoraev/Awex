import { useEffect, useState } from 'react'
import { StatsTop, TabsStates } from './StatsTop'
import StatsGroups from './StatsGroups'
import { AuthorizedService } from '@awex-api'


// 'Bills' | 'Deposits' | 'Incomes'

namespace OrderStatus {
  export enum status {
      WAIT = 'wait',
      PAID = 'paid',
      EXPIRED = 'expired',
  }
}

type Order = {
  id?: number
  data?: {
      name?: string
      price?: number
      currency?: string
      rate?: number
  }
  deposit?: {
      name?: string
      amount?: number
      currency?: string
      rate?: number
      returnTime?: number
  }
  amount?: number
  depositAmount?: number
  depositReturnTime?: number
  buyerIdentifier?: string
  status?: OrderStatus.status
  createdAt?: number
}


export default function StatsPage() {
  const [dataBills, setDataBills] = useState<Array<Order>>([])
  const [dataDeposits, setDataDeposits] = useState(null)
  const [dataIncomes, setDataIncomes] = useState(null)


  useEffect(() => {
    getData()
  }, [])


  async function getData(): Promise<void> {
    await getDataBills()
    await getDataDeposits()
    await getDataIncomes()
  }

  async function getDataBills(): Promise<void> {
    console.time()
    let page: number = 1
    let newDataBills: Array<Order> = []

    while(true) {
      try {
        const response = await AuthorizedService.ordersList(page.toString())

        if(!response || !response.page || !response.pages || !response.list) {
          break
        }
        newDataBills = [ ...newDataBills, ...response.list ]

        if(response.page < response.pages) {
          page++
          continue
        }
        break
      } catch(error) {
        console.error(error)
        break
      }
    }

    setDataBills(newDataBills)
    console.log('newDataBills', newDataBills)
    console.timeEnd()
  }

  async function getDataDeposits(): Promise<void> {

  }

  async function getDataIncomes(): Promise<void> {

  }


  return (
    <div className="wrapper">
      <section className="stats">
        <div className="deposits__header">
          <h1 className="deposits__title main-title">Статистика</h1>
        </div>

        <div className="stats__inner">

          <StatsTop />

          <StatsGroups />

        </div>
      </section>

      {/* <div className="modal" id="select-modal">
      <form action="#" className="modal-content modal-content--select-list">

      <div className="modal-content__header">
      <h4 className="modal-content__title"> Выберете криптовалюту: </h4>

      <button className="close-modal-btn">
      <img src="/img/icons/close-modal.svg" alt="" />
      </button>
      </div>

      <div className="deposits__filter-search search-group">
      <input className="deposits__filter-src search-input" type="search" placeholder="Поиск" />
      <img className="deposits__filter-search-img search-img" src="/img/icons/search.svg" alt="Поиск" />
      </div>

      <div className="modal-content__main">
      <ul className="crypto__list">
      <li className="crypto___item">
      <img className="crypto__item-pic" src="/img/actives/actives-2.png" alt="" />

      <div className="crypto__item-info">
      <h4 className="crypto__item-name"> Green Metaverse Token </h4>
      <h5 className="crypto__item-subname"> BTC </h5>
      </div>

      <div className="crypto__item-counts">
      <div className="crypto__item-count--main"> 1.578697 </div>
      <div className="crypto__item-count--second"> ~131567.654 USD </div>
      </div>
      </li>

      <li className="crypto___item">
      <img className="crypto__item-pic" src="/img/actives/actives-2.png" alt="" />

      <div className="crypto__item-info">
      <h4 className="crypto__item-name">  Green Metaverse Token  </h4>
      <h5 className="crypto__item-subname">  BTC  </h5>
      </div>

      <div className="crypto__item-counts">
      <div className="crypto__item-count--main">  1.578697  </div>
      <div className="crypto__item-count--second"> ~131567.654 USD  </div>
      </div>
      </li>

      <li className="crypto___item">
      <img className="crypto__item-pic" src="/img/actives/actives-2.png" alt="" />

      <div className="crypto__item-info">
      <h4 className="crypto__item-name">  Green Metaverse Token  </h4>
      <h5 className="crypto__item-subname">  BTC  </h5>
      </div>

      <div className="crypto__item-counts">
      <div className="crypto__item-count--main">  1.578697  </div>
      <div className="crypto__item-count--second"> ~131567.654 USD  </div>
      </div>
      </li>
      </ul>
      </div>

      </form>
      </div> */}
    </div>
  )
}