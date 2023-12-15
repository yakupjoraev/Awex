import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { HistoryOperations } from "./HistoryOperations"
import { MyActives } from "./MyActives"
import { InvoiceLight } from "../../components/InvoiceLight"
import { CheckBalance } from "./CheckBalance"
import { GenerationLinksModal } from "@components/GenerationLinksModal"
import { AccountNotifications } from "@components/AccountNotifications"
import { ActiveAccounts } from "./ActiveAccounts"
import { ActiveDeposits } from "./ActiveDeposits"

export function HomePage() {
  const [isGenerationLinksModal, setIsGenerationLinksModal] = useState<boolean>(false)

  const handleGeneratePaymentLink = () => {
    setIsGenerationLinksModal(true)
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

                <ActiveAccounts />
                
                <ActiveDeposits />

                <AccountNotifications />

                <div
                  className="generate__link"
                  onClick={handleGeneratePaymentLink}
                >
                  <img src="/img/icons/link-white.svg" alt="" />
                  Сгенерировать ссылку
                </div>
              </div>

              <CheckBalance />

              <InvoiceLight isMobile={false} />

              <GenerationLinksModal
                open={isGenerationLinksModal}
                onClose={() => setIsGenerationLinksModal(false)}
              />
            </div>
          </div>

          <MyActives />

          <HistoryOperations />
        </div>
      </section>
    </div>
  )
}
