import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { HistoryOperations } from "./HistoryOperations"
import { MyActives } from "./MyActives"
import { InvoiceLight } from "./InvoiceLight"
import { CheckBalance } from "./CheckBalance"

export function HomePage() {

  const handleGeneratePaymentLink = () => {
    // TODO: show modal
    alert("NOT IMPLEMENTED")
  }

  return (
    <div className="wrapper">
      <Helmet title="Главная" />
      <section className="main-content">
        <a href="#" className="main-content__logo">
          <img
            className="main-content__logo-pic"
            src="/img/icons/logo.svg"
            alt=""
          />
        </a>

        <h1 className="main-content__title main-title">Главная</h1>

        <div className="main-content__inner">
          <div className="main-content__header">
            <div className="main-content__check about-check">
              <div className="about-check__header">
                <div className="about-check__info">
                  <div className="about-check__info-top">
                    <h4 className="about-check__info-title">Активные счета:</h4>
                    <span className="about-check__info-sum">350</span>
                  </div>

                  <div className="about-check__info-labels">
                    <div className="about-check__info-label">На сумму:</div>
                    <div className="about-check__info-label">1.789.567.57</div>
                  </div>
                </div>

                <div className="about-check__info">
                  <div className="about-check__info-top">
                    <h4 className="about-check__info-title">Активные депозиты:</h4>
                    <span className="about-check__info-sum">350</span>
                  </div>

                  <div className="about-check__info-labels">
                    <div className="about-check__info-label">На сумму:</div>
                    <div className="about-check__info-label">1.789.567.57</div>
                  </div>
                </div>

                <div className="about-deposit__header">
                  <div className="about-deposit__header-notif">
                    <img src="/img/icons/bell.svg" alt="" />
                    Новые уведомления
                    <span>350</span>
                  </div>

                  <div className="about-deposit__header-info">
                    Закончился срок депозита по заявке №123...
                  </div>
                </div>

                <div
                  className="generate__link"
                  onClick={handleGeneratePaymentLink}
                >
                  <img src="/img/icons/link-white.svg" alt="" />
                  Сгенерировать ссылку
                </div>
              </div>

              <CheckBalance />

              <InvoiceLight />
            </div>
          </div>

          <MyActives />

          <HistoryOperations />
        </div>
      </section>
    </div>
  )
}
