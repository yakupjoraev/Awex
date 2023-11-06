import React, { useContext, useEffect, useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import cookies from '../services/cookies'
import { getStatistics } from '../apis/Awex'
import { AppContext } from '../store'

export default function Dashboard() {
  const {site} = useContext(AppContext)
  const tg = window?.Telegram?.WebApp
  // const [count, setCount] = useState(0)
  const [statistics, setStatistics] = useState({})

  const handleClose = async (e) => {
    // cookies.remove('token')
    tg?.close()
  }

  const getStatisticsData = async () => {
    try {
      const response = await getStatistics()
      if(response?.status == 200) {
        setStatistics(response?.data)
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getStatisticsData()
  }, [site?.token])

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
        {/* <div>
            <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
            </button>
        </div> */}
        <h3>AWEX data</h3>
        {Object.entries(statistics)?.map((statistic, i) => <p key={i}>{statistic[0]}: {statistic[1]}</p>)}
        <hr />
        <h3>Telegram data</h3>
        <p>query_id: {tg?.initDataUnsafe?.query_id}</p>
        {Object.entries(tg?.initDataUnsafe?.user || {})?.map((user, i) => <p key={i}>{user[0]}: {user[1]}</p>)}
        <p>auth_date: {tg?.initDataUnsafe?.auth_date}</p>
        {/* <p>hash: {tg?.initDataUnsafe?.hash}</p> */}
        <button onClick={handleClose}>close</button>
    </div>
  )
}
