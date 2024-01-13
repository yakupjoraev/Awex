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
        <div className="deposits__header deposits__header--mob-column">
          <h1 className="deposits__title main-title">Статистика</h1>

            {/* взял из старого компонента (я так понял сюда подключишь табы) */}

          <div className="stats__filters">
            <div className="deposits__filter-select stats__filter-select" data-select-wrapper>
              <div className="deposits__filter-label"> Проект </div>
              <div className="deposits__filter-selected stats__filter-selected" data-select-value>“Первый Главный проект”</div>
              <img className="deposits__filter-arrow" src="/img/icons/mini-arrow-down.svg" alt="mini-arrow-down" data-select-arrow />
              <ul className="deposits__filter-list select-list" data-select-list>
                <li className="deposits__filter-item select-item" data-select-item>“Первый Главный проект”</li>
              </ul>
            </div>

            <div className="deposits__filter-select stats__filter-select" data-select-wrapper>
              <div className="deposits__filter-label"> Дата </div>
              <div className="deposits__filter-selected stats__filter-selected" data-select-value> 01.06.2022-13.06.2023 </div>
              <img className="deposits__filter-arrow" src="/img/icons/mini-arrow-down.svg" alt="mini-arrow-down" data-select-arrow />
              <ul className="deposits__filter-list select-list" data-select-list>
                <li className="deposits__filter-item select-item" data-select-item>01/06/2022-13/06/2023</li>
                <li className="deposits__filter-item select-item" data-select-item>01/06/2022-13/06/2023</li>
                <li className="deposits__filter-item select-item" data-select-item>01/06/2022-13/06/2023</li>
              </ul>
            </div>  
          </div>     
        </div>

        <div className="stats__inner">

          {/* <StatsTop /> */}

          {/* <StatsGroups /> */}


          {/* ///////////////////////////////////////
                          new stats 
          //////////////////////////////////////////*/}

          

          {/* ///////////////////////////////////////
                          new stats header
          //////////////////////////////////////////*/}

          <div className="stats__header">
              {/* взял из старого компонента (я так понял сюда подключишь табы) */}
              
            <div className="stats__selects-wrapper">
              <div className="stats__selects">
                <a href="#" className="stats__selects-tab active">Счета</a>
                <a href="#" className="stats__selects-tab false">Депозиты</a>
              </div>

            <div className="stats__checheds stats__checheds--sums">
              <div className="stats__cheched">
                  <img src="/img/icons/check-circle-grey.svg" alt="check icon" />
                  <p>Сумма удержаний</p>
              </div>

              <div className="stats__cheched">
                  <img src="/img/icons/check-circle-dark-grey.svg" alt="check icon" />
                  <p>Сумма оплаченных</p>
              </div>

             </div>

            <div className="stats__graphik">
              <img width="1128" height="336" src="/img/new-stats-pic.png" alt="Статистика" />
            </div>
            </div>
          </div>







          {/* ///////////////////////////////////////
                          new stats footer
          //////////////////////////////////////////*/}

          <div className="stats__footer">
            <ul className="stats__list">
              <li className="stats__item stats__item--full">
                <div className="stats__item-label">Общая сумма USD</div>
                <div className="stats__item-sum">10 000 000,23</div>
                <div className="stats__item-footer">
                  <span className='stats__item-percent green'>+5.67% </span> за сегодня
                </div>
              </li>

              <li className="stats__item">
                <div className="stats__item-label">Оплаченные счета</div>
                <div className="stats__item-sum">256</div>
                <div className="stats__item-footer">
                  <span className='stats__item-percent green'>+5.67% </span> за сегодня
                </div>
              </li>

              <li className="stats__item">
                <div className="stats__item-label">Создано счетов</div>
                <div className="stats__item-sum">25</div>
                <div className="stats__item-footer">
                  <span className='stats__item-percent red'>-1.67% </span> за сегодня
                </div>
              </li>

              <li className="stats__item">
                <div className="stats__item-label">Оплачено частично</div>
                <div className="stats__item-sum">34</div>
                <div className="stats__item-footer">
                  <span className='stats__item-percent grey'>0.00% </span> за сегодня
                </div>
              </li>
            </ul>
          </div>

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