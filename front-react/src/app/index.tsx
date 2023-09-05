import React from "react";
import { Helmet } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IndexPage } from "./pages/IndexPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { HomePage } from "./pages/HomePage";
import { SettingsPage } from "./pages/SettingsPage";
import { MyProjectsPage } from "./pages/MyProjectsPage";
import { EditProjectPage } from "./pages/EditProjectPage";
import { UserAreaLayout } from "./layouts/UserAreaLayout";
import { CreateProjectPage } from "./pages/CreateProjectPage";
import { InvoicePage } from "./pages/InvoicePage";
import { SuccessfullyInvoicePage } from "./pages/SuccessfullyInvoicePage";
import { Toaster } from "react-hot-toast";
import { DepositsPage } from "./pages/DepositsPage";
import { DepositRetentionPage } from "./pages/DepositRetentionPage";
import { DatePickerPage } from "./pages/DatePickerPage";
import { PaymentCryptoPage } from "./pages/PaymentCryptoPage";
import { AuthPage } from "./pages/AuthPage";
import { PrivateRoute } from "@components/PrivateRoute";
import { InfocenterPage } from "./pages/InfocenterPage";

export function App() {
  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s - Awex" defaultTitle="Awex"></Helmet>
      <Routes>
        <Route
          element={
            <PrivateRoute>
              <UserAreaLayout />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/invoice" element={<InvoicePage />} />
          <Route
            path="/successfully-invoice"
            element={<SuccessfullyInvoicePage />}
          />
          <Route path="/deposits" element={<DepositsPage />} />
          <Route path="/deposit-retention" element={<DepositRetentionPage />} />
          <Route path="/projects" element={<MyProjectsPage />} />
          <Route path="/projects/:projectId" element={<EditProjectPage />} />
          <Route path="/projects/new-project" element={<CreateProjectPage />} />
          <Route path="/settings/*" element={<SettingsPage />} />
          <Route path="/infocenter" element={<InfocenterPage />} />
          <Route path="/date-picker" element={<DatePickerPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/payment-crypto/:stage" element={<PaymentCryptoPage />} />
        <Route path="/index" element={<IndexPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
