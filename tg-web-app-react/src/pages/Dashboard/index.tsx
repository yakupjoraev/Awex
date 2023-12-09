import React, { useContext, useEffect, useState } from "react";
import cookies from "../../services/cookies";
import { getBalance, getStatistics } from "../../apis/Awex";
import { AppContext } from "../../store";
import { Link } from "react-router-dom";
import {
  useGetBalance,
  useGetTransactions,
} from "../../services/account.services";
import TransactionList from "./TransactionList";

const Dashboard: React.FC = () => {
  const { site } = useContext(AppContext);
  const tg = window?.Telegram?.WebApp;
  // const [statistics, setStatistics] = useState({});
  const { balance } = useGetBalance();

  const { transactions } = useGetTransactions();

  const handleClose = async (e) => {
    cookies.remove("token");
    site.setToken("");
    tg?.close();
  };

  // const getStatisticsData = async () => {
  //   try {
  //     const response = await getStatistics();
  //     if (response?.status == 200) {
  //       setStatistics(response?.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getStatisticsData();
  // }, [site?.token]);

  // useEffect(() => {
  //   if(count >= 10) {
  //     !tg?.MainButton?.isVisible && tg?.MainButton?.show()
  //   } else {
  //     tg?.MainButton?.isVisible && tg?.MainButton?.hide()
  //   }
  //   tg?.MainButton?.setParams({
  //     text: `Send Data (${count})`
  //   })
  // }, [count])

  return (
    <div>
      {/* <h3>AWEX data</h3> */}
      {/* {Object.entries(statistics)?.map((statistic, i) => (
        <p key={i}>
          {statistic[0]}: {statistic[1]}
        </p>
      ))} */}
      {/* <hr />
      <h3>Telegram data</h3>
      <p>channel_id: {tg?.initDataUnsafe.chat.id}</p>
      <p>query_id: {tg?.initDataUnsafe?.query_id}</p>
      {tg.initDataUnsafe?.user?.id} */}
      {/* {Object.entries(tg?.initDataUnsafe?.user || {})?.map((user, i) => (
        <p key={i}>
          {user[0]}: {user[1]}
        </p>
      ))} */}
      {/* <p>auth_date: {tg?.initDataUnsafe?.auth_date}</p>
      <p>hash: {tg?.initDataUnsafe?.hash}</p> */}
      <button onClick={handleClose}>Выйти</button>
      <main>
        <div className="wrapper-middle">
          <div className="status">PRO</div>

          <div className="balance">
            <h1 className="balance__title">Баланс</h1>

            <div className="balance__sum">
              <span>
                <b>{String(balance?.balance || 0).split(".")[0]}</b>
              </span>
              <span>
                <b>,</b>
              </span>
              <span>{String(balance?.balance || 0).split(".")[1]}</span>
              <span>{balance?.currency?.toUpperCase()}</span>
            </div>

            {/* <div className="balance__actions">
              <a className="balance__action replenish-action" href="#">
                <div className="balance__action-pic">
                  <img src="./img/icons/arrow-down.svg" alt="" />
                </div>

                <p className="balance__action-text">Пополнить</p>
              </a>

              <a className="balance__action make-action" href="#">
                <div className="balance__action-pic">
                  <img src="./img/icons/arrow-top.svg" alt="" />
                </div>

                <p className="balance__action-text">Вывести</p>
              </a>

              <a className="balance__action swap-action" href="#">
                <div className="balance__action-pic">
                  <img src="./img/icons/swap.svg" alt="" />
                </div>

                <p className="balance__action-text">SWAP</p>
              </a>
            </div> */}

            <Link to="/invoice" type="button" className="second-btn">
              Создать ссылку на оплату
            </Link>

            {/* <div className="actives">
              <div className="actives__header">
                <p className="actives__label">Активы</p>

                <button type="button" className="actives__btn-all">
                  Посмотреть все
                </button>
              </div>

              <ul className="actives__list">
                <li className="actives__item">
                  <div className="actives__info">
                    <img src="./img/icons/rubl.svg" alt="rubl" />

                    <div className="actives__info-texts">
                      <p className="actives__label">Russian Ruble</p>

                      <p className="actives__currency">RUB</p>
                    </div>
                  </div>

                  <div className="actives__sums">
                    <p className="actives__sum actives__sum--black">0.0038</p>
                    <p className="actives__sum">9876,45</p>
                  </div>
                </li>

                <li className="actives__item">
                  <div className="actives__info">
                    <img src="./img/icons/rubl.svg" alt="rubl" />

                    <div className="actives__info-texts">
                      <p className="actives__label">Russian Ruble</p>

                      <p className="actives__currency">RUB</p>
                    </div>
                  </div>

                  <div className="actives__sums">
                    <p className="actives__sum actives__sum--black">0.0038</p>
                    <p className="actives__sum">9876,45</p>
                  </div>
                </li>

                <li className="actives__item">
                  <div className="actives__info">
                    <img src="./img/icons/rubl.svg" alt="rubl" />

                    <div className="actives__info-texts">
                      <p className="actives__label">Russian Ruble</p>

                      <p className="actives__currency">RUB</p>
                    </div>
                  </div>

                  <div className="actives__sums">
                    <p className="actives__sum actives__sum--black">0.00</p>
                    <p className="actives__sum"></p>
                  </div>
                </li>

                <li className="actives__item">
                  <div className="actives__info">
                    <img src="./img/icons/rubl.svg" alt="rubl" />

                    <div className="actives__info-texts">
                      <p className="actives__label">Russian Ruble</p>

                      <p className="actives__currency">RUB</p>
                    </div>
                  </div>

                  <div className="actives__sums">
                    <p className="actives__sum actives__sum--black">0.00</p>
                    <p className="actives__sum"></p>
                  </div>
                </li>
              </ul>
            </div> */}

            <div className="history-transactions">
              <div className="actives__header">
                <p className="actives__label">История транзакций</p>

                {/* <button type="button" className="actives__btn-all">
                  Посмотреть все
                </button> */}
              </div>

              {transactions?.list?.length === 0 ? (
                <div className="flex justify-center w-full py-6">
                  <p className="text-gray-400">Нет доступных транзакций</p>
                </div>
              ) : (
                <TransactionList transactions={transactions?.list} />
              )}
            </div>

            {/* <div className="history-transactions">
              <div className="actives__header">
                <p className="actives__label">История транзакций</p>

                <button type="button" className="actives__btn-all">
                  Посмотреть все
                </button>
              </div>

              <ul className="history-transactions__list">
                <li className="history-transactions__item">
                  <div className="history-transactions__info">
                    <img
                      src="./img/icons/ic_round-log-in.svg"
                      alt="ic_round-log-in"
                    />

                    <div className="history-transactions__texts">
                      <div className="history-transactions__text">
                        <span className="history-transactions__action">
                          Пополнение:{" "}
                        </span>
                        <span> #125389</span>
                      </div>
                      <div className="history-transactions__text">
                        <span>27 июл. 2023</span>
                        <span>12:54:34</span>
                      </div>
                    </div>
                  </div>

                  <div className="history-transactions__sums">
                    <p className="history-transactions__sum">+9900 RUB</p>
                    <p className="history-transactions__status">Получено</p>
                  </div>
                </li>

                <li className="history-transactions__item">
                  <div className="history-transactions__info">
                    <img
                      src="./img/icons/ic_round-log-in.svg"
                      alt="ic_round-log-in"
                    />

                    <div className="history-transactions__texts">
                      <div className="history-transactions__text">
                        <span className="history-transactions__action">
                          SWAP:{" "}
                        </span>
                        <span> #125389</span>
                      </div>
                      <div className="history-transactions__text">
                        <span>27 июл. 2023</span>
                        <span>12:54:34</span>
                      </div>
                    </div>
                  </div>

                  <div className="history-transactions__sums">
                    <p className="history-transactions__sum">+0.0038 BTC</p>
                    <p className="history-transactions__status">-9900RUB</p>
                  </div>
                </li>

                <li className="history-transactions__item">
                  <div className="history-transactions__info">
                    <img
                      src="./img/icons/ic_round-log-in.svg"
                      alt="ic_round-log-in"
                    />

                    <div className="history-transactions__texts">
                      <div className="history-transactions__text">
                        <span className="history-transactions__action">
                          Пополнение:{" "}
                        </span>
                        <span> #125389</span>
                      </div>
                      <div className="history-transactions__text">
                        <span>27 июл. 2023</span>
                        <span>12:54:34</span>
                      </div>
                    </div>
                  </div>

                  <div className="history-transactions__sums">
                    <p className="history-transactions__sum">+9900 RUB</p>
                    <p className="history-transactions__status">Получено</p>
                  </div>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
