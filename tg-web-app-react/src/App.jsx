import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { AppContext } from './store'
import cookies from './services/cookies'
import Loading from './components/Loading'
const Header = React.lazy(() => import("./components/Header"))
const Home = React.lazy(() => import("./pages/Home"))
const Dashboard = React.lazy(() => import("./pages/Dashboard"))
const SignIn = React.lazy(() => import("./pages/SignIn"))
const SignUp = React.lazy(() => import("./pages/SignUp"))

function App() {
  const store = useContext(AppContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = cookies.get('token')
    token && store.site.setToken(token)
    setLoading(false)
  }, [])

  return (
    <BrowserRouter>
    {loading
      ? <Loading />
      : <>
        <Header />
        <Routes>
          <Route
              index
              element={
                <React.Suspense>
                  {store?.site?.token ? <Dashboard /> : <Home />}
                </React.Suspense>
              }
            />
          <Route
              path="sign-in"
              element={
                <React.Suspense>
                  <SignIn />
                </React.Suspense>
              }
            />
            <Route
                path="sign-up"
                element={
                  <React.Suspense>
                    <SignUp />
                  </React.Suspense>
                }
              />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </>}
    </BrowserRouter>
  )
}

export default App
