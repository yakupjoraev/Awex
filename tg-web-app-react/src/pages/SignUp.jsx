<<<<<<< HEAD
import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <main>
        <div className="wrapper" >
            <Link to="/">{`<< back`}</Link>
            <br />
            <br />
           

          <form action="#" className="sign-form">
            <div className="sign-form__header">
              <div className="sign-form__header-logo">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                <rect x="0.248047" y="0.871094" width="25" height="25" rx="4" fill="#FED602"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3949 7.42849C13.1958 7.33457 12.9746 7.2832 12.7452 7.2832C12.1483 7.2832 11.6071 7.63113 11.3637 8.17142L6.28955 19.436H8.1789L9.39003 16.663L10.0925 15.0716L12.4399 9.68411L13.3949 7.42849ZM13.4425 10.761L15.3003 15.0475L15.9785 16.6389L17.1897 19.4119H19.2001L14.3395 8.6427L13.4425 10.761ZM14.185 16.6732L12.6758 13.3532L11.1154 16.6732L14.185 16.6732Z" fill="#292421"/>
              </svg>

                <h2>Регистрация</h2>
              </div>
            </div>

            <div className="sign-form__main">
            <div className="project-group">
              <label className="project-label" htmlFor="#">
                E-mail
              </label>

              <input className="project-input" type="email" placeholder="Введите e-mail" />
            </div>

            {/* //<!-- несколько вариантов  --> */}

              <div className=" project-group project-group--successfully">
                <label className=" project-label" htmlFor="#">
                  Пароль
                </label>

                <input className=" project-input" type="password" placeholder="Введите пароль"/>

                <button type="button" className="project-input__see">
                  <img src="./img/icons/eye-open.svg" alt=""/>
                </button>
              </div>


              {/* -------------------вариант, когда видно пароля----------- */}

              <div className=" project-group project-group--error">
                <label className=" project-label" htmlFor="#">
                  Пароль
                </label>

                <input className=" project-input" type="text" placeholder="Введите пароль"/>

                <button type="button" className="project-input__see">
                  <img src="./img/icons/eye-close.svg" alt=""/>
                </button>
              </div>

              <div className="project-password__complexity project-password__complexity--bad">
                <div className="project-password__complexity-circle"></div>

                <p className="project-password__complexity-text">Плохой пароль</p>
              </div>

              <div className="project-password__complexity project-password__complexity--middle">
                <div className="project-password__complexity-circle"></div>

                <p className="project-password__complexity-text">Средний пароль</p>
              </div>
              <div className="project-password__complexity project-password__complexity--perfect">
                <div className="project-password__complexity-circle"></div>

                <p className="project-password__complexity-text">Хороший пароль</p>
              </div>


              <div className=" project-group">
                <label className=" project-label" htmlFor="#">
                  Повторите пароль
                </label>

                <input className=" project-input" type="password" placeholder="Введите пароль"/>

                <button type="button" className="project-input__see">
                  <img src="./img/icons/eye-open.svg" alt=""/>
                </button>
              </div>

              <div className="checkbox-group modal-content__checkbox">
                <input className="checkbox-input" type="checkbox" id="modal-checkbox" checked/>

                <label className="checkbox-label" htmlFor="modal-checkbox">
                  <div className="checkbox-decor"></div>
                  <div className="checkbox-text">Я принимаю <a href="#" target="_blank">Условия
                      пользовательского соглашения</a></div>
                </label>
              </div>
            </div>

            <button type="button" className="second-btn">Создать аккаунт</button>

          </form>
        </div>
    </main>
  )
}
=======
import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <main>
        <div className="wrapper" >
            <Link to="/">{`<< back`}</Link>
            <br />
            <br />
           

          <form action="#" className="sign-form">
            <div className="sign-form__header">
              <div className="sign-form__header-logo">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                <rect x="0.248047" y="0.871094" width="25" height="25" rx="4" fill="#FED602"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3949 7.42849C13.1958 7.33457 12.9746 7.2832 12.7452 7.2832C12.1483 7.2832 11.6071 7.63113 11.3637 8.17142L6.28955 19.436H8.1789L9.39003 16.663L10.0925 15.0716L12.4399 9.68411L13.3949 7.42849ZM13.4425 10.761L15.3003 15.0475L15.9785 16.6389L17.1897 19.4119H19.2001L14.3395 8.6427L13.4425 10.761ZM14.185 16.6732L12.6758 13.3532L11.1154 16.6732L14.185 16.6732Z" fill="#292421"/>
              </svg>

                <h2>Регистрация</h2>
              </div>
            </div>

            <div className="sign-form__main">
            <div className="project-group">
              <label className="project-label" htmlFor="#">
                E-mail
              </label>

              <input className="project-input" type="email" placeholder="Введите e-mail" />
            </div>

            {/* //<!-- несколько вариантов  --> */}

              <div className=" project-group project-group--successfully">
                <label className=" project-label" htmlFor="#">
                  Пароль
                </label>

                <input className=" project-input" type="password" placeholder="Введите пароль"/>

                <button type="button" className="project-input__see">
                  <img src="./img/icons/eye-open.svg" alt=""/>
                </button>
              </div>


              {/* -------------------вариант, когда видно пароля----------- */}

              <div className=" project-group project-group--error">
                <label className=" project-label" htmlFor="#">
                  Пароль
                </label>

                <input className=" project-input" type="text" placeholder="Введите пароль"/>

                <button type="button" className="project-input__see">
                  <img src="./img/icons/eye-close.svg" alt=""/>
                </button>
              </div>

              <div className="project-password__complexity project-password__complexity--bad">
                <div className="project-password__complexity-circle"></div>

                <p className="project-password__complexity-text">Плохой пароль</p>
              </div>

              <div className="project-password__complexity project-password__complexity--middle">
                <div className="project-password__complexity-circle"></div>

                <p className="project-password__complexity-text">Средний пароль</p>
              </div>
              <div className="project-password__complexity project-password__complexity--perfect">
                <div className="project-password__complexity-circle"></div>

                <p className="project-password__complexity-text">Хороший пароль</p>
              </div>


              <div className=" project-group">
                <label className=" project-label" htmlFor="#">
                  Повторите пароль
                </label>

                <input className=" project-input" type="password" placeholder="Введите пароль"/>

                <button type="button" className="project-input__see">
                  <img src="./img/icons/eye-open.svg" alt=""/>
                </button>
              </div>

              <div className="checkbox-group modal-content__checkbox">
                <input className="checkbox-input" type="checkbox" id="modal-checkbox" checked/>

                <label className="checkbox-label" htmlFor="modal-checkbox">
                  <div className="checkbox-decor"></div>
                  <div className="checkbox-text">Я принимаю <a href="#" target="_blank">Условия
                      пользовательского соглашения</a></div>
                </label>
              </div>
            </div>

            <button type="button" className="second-btn">Создать аккаунт</button>

          </form>
        </div>
    </main>
  )
}
>>>>>>> 741e678a4a13aa4a0d67692a463159962cb77a8a
