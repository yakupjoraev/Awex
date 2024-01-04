import { useEffect, useRef } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js"
import { Doughnut } from 'react-chartjs-2'


ChartJS.register(ArcElement, Tooltip)


export default function StatsPage() {

    
    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="wrapper">
          <section className="stats">
            <div className="deposits__header">
              <h1 className="deposits__title main-title"> Статистика </h1>
            </div>
    
            <div className="stats__inner">
              <div className="stats__top">
                <div className="stats__info">
                  <div className="stats__circkle">

                    {/* <Doughnut data={ data } /> */}

                    <svg xmlns="http://www.w3.org/2000/svg" width="239" height="239" viewBox="0 0 239 239" fill="none">
                      <path d="M198.344 208.918C177.4 227.532 150.564 238.166 122.555 238.952C94.5461 239.738 67.1565 230.626 45.2012 213.216C23.2459 195.807 8.13046 171.215 2.51203 143.764C-3.1064 116.313 1.13186 87.76 14.4817 63.1246L36.4926 75.0523C25.9484 94.5102 22.6009 117.062 27.0386 138.744C31.4762 160.426 43.4149 179.849 60.756 193.6C78.097 207.35 99.7303 214.548 121.853 213.927C143.975 213.306 165.171 204.907 181.713 190.205L198.344 208.918Z" fill="#292421" />
                      <path d="M200.661 32.9522C212.655 44.1904 222.194 57.7892 228.677 72.8931C235.16 87.997 238.447 104.279 238.332 120.715C238.216 137.152 234.7 153.386 228.006 168.397C221.311 183.409 211.582 196.872 199.431 207.941L182.572 189.433C192.17 180.691 199.854 170.057 205.142 158.2C210.429 146.344 213.206 133.521 213.297 120.539C213.389 107.558 210.792 94.6974 205.672 82.7678C200.551 70.8382 193.017 60.0974 183.543 51.221L200.661 32.9522Z" fill="#FED602" />
                      <path d="M14.4778 62.2031C26.0131 40.9956 43.7198 23.7935 65.2519 12.8762C86.784 1.95883 111.125 -2.15845 135.05 1.06987L131.658 26.2073C112.828 23.6664 93.6697 26.9069 76.7226 35.4996C59.7755 44.0922 45.8391 57.6313 36.7602 74.323L14.4778 62.2031Z" fill="#6F6F6F" />
                      <path d="M135.036 1.06805C159.381 4.35013 182.115 15.0781 200.126 31.7827L183.511 49.6958C169.195 36.4174 151.123 27.8898 131.772 25.2808L135.036 1.06805Z" fill="#D1D1D1" />
                    </svg>
    
                    <div className="stats__circkle-count">
                      1000
                      <span>счетов</span>
                    </div>
                  </div>
    
                  <div className="stats__selects-wrapper">
                    <div className="stats__selects">
                      <a className="stats__selects-tab active" href="#">Счета</a>
                      <a className="stats__selects-tab" href="#">Депозиты</a>
                      <a className="stats__selects-tab" href="#">Доход</a>
                    </div>
    
                    <div className="stats__selects">
                      <a className="stats__selects-label active" href="#">Оплачено</a>
                      <a className="stats__selects-label" href="#">Создано</a>
                      <a className="stats__selects-label" href="#">Оплачено частично</a>
                    </div>
    
                    <div className="stats__checheds">
                      <div className="stats__cheched">
                        <img src="/img/icons/check-circle-yellow.svg" alt="" />
                        <p>ООО “Первый”</p>
                      </div>
    
                      <div className="stats__cheched">
                        <img src="/img/icons/check-circle-yellow.svg" alt="" />
                        <p>ООО “Первый”</p>
                      </div>
    
                      <div className="stats__cheched">
                        <img src="/img/icons/check-circle-dark-grey.svg" alt="" />
                        <p>ООО “Второй”</p>
                      </div>
    
                      <div className="stats__cheched">
                        <img src="/img/icons/check-circle-dark-grey.svg" alt="" />
                        <p>ООО “Второй”</p>
                      </div>
    
                      <div className="stats__cheched">
                        <img src="/img/icons/check-circle-grey.svg" alt="" />
                        <p>ООО “Третий”</p>
                      </div>
    
                      <div className="stats__cheched">
                        <img src="/img/icons/check-circle-grey.svg" alt="" />
                        <p>ООО “Третий”</p>
                      </div>
    
                      <div className="stats__cheched">
                        <img src="/img/icons/check-circle-dark.svg" alt="" />
                        <p>ООО “Четвертый”</p>
                      </div>
    
                      <div className="stats__cheched">
                        <img src="/img/icons/check-circle-dark.svg" alt="" />
                        <p>ООО “Четвертый”</p>
                      </div>
                    </div>
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
    
    
              <div className="stats__groups">
                <div className="stats__group">
                  <h2 className="stats__title main-title"> Счета </h2>
                  <img src="/img/stats-pic.svg" alt="" />
                </div>
    
                <div className="stats__group">
                  <h2 className="stats__title main-title"> Депозиты </h2>
    
                  <div className="stats__counts">
                    <div className="stats__count">
                      Всего
                      <span>256</span>
                    </div>

                    <div className="stats__count">
                      В работе
                      <span>125</span>
                    </div>

                    <div className="stats__count">
                      Завершенные
                      <span>100</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <div className="modal" id="select-modal">
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
          </div>
        </div>
    )
}