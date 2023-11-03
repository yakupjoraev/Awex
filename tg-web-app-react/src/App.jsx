import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const tg = window?.Telegram?.WebApp
  const [count, setCount] = useState(0)

  useEffect(() => {
    if(count >= 10 && !tg?.MainButton?.isVisible) {
      tg?.MainButton?.show()
    } else {
      tg?.MainButton?.hide()
    }
    tg?.MainButton?.setParams({
      text: `Send Data (${count})`
    })
  }, [count])

  return (
    <>
      <div>
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
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p>query_id: {tg?.initDataUnsafe?.query_id}</p>
      {Object.entries(tg?.initDataUnsafe?.user)?.map(user => <p>{user[0]}: {user[1]}</p>)}
      <p>auth_date: {tg?.initDataUnsafe?.auth_date}</p>
      <p>hash: {tg?.initDataUnsafe?.hash}</p>
      <button onClick={(e) => tg?.close()}>close</button>
    </>
  )
}

export default App
