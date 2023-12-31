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
import { InvoicesPage } from "./pages/InvoicesPage";
import { Toaster } from "react-hot-toast";
import { DepositsPage } from "./pages/DepositsPage";
import { DepositRetentionPage } from "./pages/DepositRetentionPage";
import { DatePickerPage } from "./pages/DatePickerPage";
import { PaymentCryptoPage } from "./pages/PaymentCryptoPage";
import { AuthPage } from "./pages/AuthPage";
import { PrivateRoute } from "@components/PrivateRoute";
import { InfocenterPage } from "./pages/InfocenterPage";
import { MyAssetsPage } from "./pages/MyAssetsPage";
import { AssetPage } from "./pages/AssetPage";
import {
  ADMIN_MERCHANTS_ROUTE,
  ADMIN_MERCHANT_STATS_SUBROUTE,
  ADMIN_STATS_ROUTE,
  ASSETS_ROUTE,
} from "./constants/path-locations";
import { AdminFeesPage } from "./pages/AdminFeesPage";
import { AdminAreaLayout } from "./layouts/AdminAreaLayout";
import { AdminAuthPage } from "./pages/AdminAuthPage";
import { AdminMerchantsPage } from "./pages/AdminMerchantsPage";
import "rc-tooltip/assets/bootstrap.css";
import { AdminMerchantStats } from "./pages/AdminMerchantStats";
import { AdminStatsPage } from "./pages/AdminStats";
import { UserAreaNotFoundPage } from "./pages/UserAreaNotFoundPage";
import { PaymentPage } from "./pages/PaymentPage";

export function App() {
  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s - Awex" defaultTitle="Awex"></Helmet>
      <Routes>
        <Route
          element={
            <PrivateRoute>
              <AdminAreaLayout />
            </PrivateRoute>
          }
        >
          <Route path="/admin/" element={<AdminFeesPage />} />
          <Route
            path={ADMIN_MERCHANTS_ROUTE}
            element={<AdminMerchantsPage />}
          />
          <Route
            path={`${ADMIN_MERCHANTS_ROUTE}/:merchantId${ADMIN_MERCHANT_STATS_SUBROUTE}`}
            element={<AdminMerchantStats />}
          />
          <Route path={ADMIN_STATS_ROUTE} element={<AdminStatsPage />} />
        </Route>
        <Route
          element={
            <PrivateRoute>
              <UserAreaLayout />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/invoice" element={<InvoicePage />} />
          <Route path="/successfully-invoice" element={<InvoicesPage />} />
          <Route path="/deposits" element={<DepositsPage />} />
          <Route path="/deposit-retention" element={<DepositRetentionPage />} />
          <Route path="/projects" element={<MyProjectsPage />} />
          <Route path="/projects/:projectId" element={<EditProjectPage />} />
          <Route path="/projects/new-project" element={<CreateProjectPage />} />
          <Route path="/settings/*" element={<SettingsPage />} />
          <Route path={ASSETS_ROUTE} element={<MyAssetsPage />} />
          <Route
            path={`${ASSETS_ROUTE}/:assetId/:action?`}
            element={<AssetPage />}
          />
          <Route path="/infocenter" element={<InfocenterPage />} />
          <Route path="/date-picker" element={<DatePickerPage />} />
          <Route path="*" element={<UserAreaNotFoundPage />} />
        </Route>
        <Route path="/payment-crypto/:stage" element={<PaymentCryptoPage />} />
        <Route path="/payment/:uniqueId" element={<PaymentPage />} />
        <Route path="/index" element={<IndexPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/admin/auth" element={<AdminAuthPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
