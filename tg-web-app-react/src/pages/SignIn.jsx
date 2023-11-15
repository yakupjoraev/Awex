import React, { useContext, useState } from 'react'
import axios from 'axios'
import cookies from '../services/cookies'
import { AppContext } from '../store'
import { Link, useNavigate } from 'react-router-dom'
import { signIn } from '../apis/Awex'

export default function SignIn() {
  const {config, site} = useContext(AppContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const navigate = useNavigate()

  const handleForm = async (e) => {
    setErrors([])
    const data = {email, password}
    try {
      const response = await signIn(data)
      if(response?.status == 200) {
        cookies.set("token", response?.data?.token)
        site.setToken(response?.data?.token)
        navigate('/')
      }
    } catch (err) {
      if(err?.response?.status == 401 && err?.response?.data?.errors) {
        setErrors(err?.response?.data?.errors)
      }
    }
  }

  return (
    <main>
        <div className="wrapper">
            <Link to="/">{`<< back`}</Link>
            <br />
            <br />
            {/* <h1 className="title">Sign in to AWEX</h1>
            {errors.map((error, i) => <em key={i}>{error}</em>)}
            <div>
              <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value?.trim())} />
            </div>
            <div>
              <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value?.trim())} />
            </div>
            <button className="second-btn" onClick={handleForm} disabled={!(email && password)}>Sign in</button> */}

        <form action="#" className="sign-form">
          <div className="sign-form__header">
            <div className="sign-form__header-logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
              <rect x="0.248047" y="0.871094" width="25" height="25" rx="4" fill="#FED602"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3949 7.42849C13.1958 7.33457 12.9746 7.2832 12.7452 7.2832C12.1483 7.2832 11.6071 7.63113 11.3637 8.17142L6.28955 19.436H8.1789L9.39003 16.663L10.0925 15.0716L12.4399 9.68411L13.3949 7.42849ZM13.4425 10.761L15.3003 15.0475L15.9785 16.6389L17.1897 19.4119H19.2001L14.3395 8.6427L13.4425 10.761ZM14.185 16.6732L12.6758 13.3532L11.1154 16.6732L14.185 16.6732Z" fill="#292421"/>
            </svg>

              <h2>Вход</h2>
            </div>
          </div>

          <div className="sign-form__main">
            <div className="project-group">
              <label className="project-label" htmlFor="#">
                Логин
              </label>

              <input className="project-input" type="text" placeholder="Введите e-mail или логин AWEX" />
            </div>

            <a className="sign-form__forget" href="#">Не помните пароль? </a>

            <div className="project-group">
              <label className="project-label" htmlFor="#">
                Пароль
              </label>

              <input className="project-input" type="password" placeholder="Введите пароль" />
            </div>
          </div>

          <button type="button" className="second-btn">Войти в аккаунт</button>

          <div className="sign-form__footer">
            <p>Нет аккаунта?</p>
            <a href="#">Регистрация</a>
          </div>

          <div className="sign-form__footer">
            <a href="#">Не могу получить доступ</a>
          </div>

        </form>
      </div>


    </main>
  )
}
