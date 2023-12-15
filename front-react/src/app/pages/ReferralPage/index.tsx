

export function ReferralPage() {

    return (
        <div className="wrapper">
            <section className="referral">
                <div className="deposits__header">
                    <h1 className="deposits__title main-title"> Реферальная программа </h1>
                </div>

                <div className="referral__inner">
                    <div className="referral__header">
                        <div className="referral__score">
                            <p className="referral__score-label">Получено от рефералов:</p>
                            <div className="referral__score-sum">
                                200.565.678
                                <span>
                                    ,456$
                                </span>
                            </div>
                        </div>
                
                        <div className="referral__scores">
                            <div className="referral__score">
                                <p className="referral__score-label">Всего рефералов:</p>
                                <div className="referral__score-sum"> 2.456 </div>
                            </div>
                    
                            <div className="referral__score">
                                <p className="referral__score-label">Активных рефералов:</p>
                                <div className="referral__score-sum"> 1.230 </div>
                            </div>
                        </div>
                
                        <a className="referral__score-link history-operations__link" href="#">
                            Статистика
                            <img className="history-operations__link-img" src="./img/icons/arrow-right.svg" alt="Перейти в Статистика" />
                        </a>
                    </div>
                
                    <form action="#" className="referral__middle">
                        <div className="referral__middle-block">
                            <p className="referral__middle-label"> Реферальная ссылка: </p>
                            <input className="referral__middle-input" type="text" value="iakj3490bkkjv;l2..." />
                        </div>
                
                        <div className="referral__middle-block">
                            <p className="referral__middle-label"></p>
                            <button type="button" className="referral__middle-btn second-btn">Пригласить друзей</button>
                        </div>
                
                        <div className="referral__middle-block referral__middle-block--code">
                            <div className="referral__middle-label">
                                Реферальный код:
                                <button type="button" className="referral__middle-qr">
                                    <img src="./img/icons/QR.svg" alt="QR.svg" />
                                </button>
                            </div>
                    
                            <div className="referral__middle-code">5467923</div>
                        </div>
                    </form>
                
                    <a className="referral__rule" href="#">
                        <img src="./img/icons/note-text.svg" alt="note-text" />
                        <span>Правила реферальной программы</span>
                    </a>
                
                    <div className="history-operations">
                        <div className="history-operations__label">
                            <h3 className="history-operations__title main-title"> Рефералы: </h3>
                        </div>
                
                        <div className="history-operations__header">
                            <div className="history-operations__select">
                                <div className="history-operations__select-label"> Статус </div>
                                <div className="history-operations__select-selected"> Все </div>
                            </div>
                    
                            <div className="deposits__filter-select deposits__filter-select--datapicker" data-select-wrapper="">
                                <div className="deposits__filter-label"> Дата </div>
                                <div className="deposits__filter-selected" data-select-value=""> 01/06/2022-13/06/2023 </div>
                                <img className="deposits__filter-arrow" src="./img/icons/mini-arrow-down.svg" alt="mini-arrow-down" data-select-arrow="" />
                                <ul className="deposits__filter-list select-list" data-select-list="">
                                    <li className="deposits__filter-item select-item" data-select-item="">01/06/2022-13/06/2023</li>
                                    <li className="deposits__filter-item select-item" data-select-item="">01/06/2022-13/06/2023</li>
                                    <li className="deposits__filter-item select-item" data-select-item="">01/06/2022-13/06/2023</li>
                                </ul>
                            </div>
                        </div>

                        <div className="history-operations__container">
                            <ul className="history-operations__list">
                                <li className="history-operations__item history-operations__item-header">
                                    <div className="history-operations__item-data">ID реферала</div>
                                    <div className="history-operations__item-time">Статус</div>
                                    <div className="history-operations__item-user">Получено</div>
                                    <div className="history-operations__item-type">Дата</div>
                                    <div className="history-operations__item-sum">Тип вознаграждения</div>
                                </li>
                    
                                <li className="history-operations__item">
                                    <div className="history-operations__item-data">ID345678</div>
                                    <div className="history-operations__item-time">активный</div>
                                    <div className="history-operations__item-user">+5,72$</div>
                                    <div className="history-operations__item-type">05/07/23</div>
                                    <div className="history-operations__item-sum">комиссия</div>
                                </li>
                    
                                <li className="history-operations__item">
                                    <div className="history-operations__item-data">ID345678</div>
                                    <div className="history-operations__item-time">активный</div>
                                    <div className="history-operations__item-user">+0.00035BTC</div>
                                    <div className="history-operations__item-type">05/07/23</div>
                                    <div className="history-operations__item-sum">оборот</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}