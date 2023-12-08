import { Helmet } from "react-helmet-async"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { IndexPage } from "./pages/IndexPage"
import { NotFoundPage } from "./pages/NotFoundPage"
import { HomePage } from "./pages/HomePage"
import { SettingsPage } from "./pages/SettingsPage"
import { MyProjectsPage } from "./pages/MyProjectsPage"
import { EditProjectPage } from "./pages/EditProjectPage"
import { UserAreaLayout } from "./layouts/UserAreaLayout"
import { CreateProjectPage } from "./pages/CreateProjectPage"
import { InvoicePage } from "./pages/InvoicePage"
import { InvoicesPage } from "./pages/InvoicesPage"
import { Toaster } from "react-hot-toast"
import { DepositsPage } from "./pages/DepositsPage"
import { DepositRetentionPage } from "./pages/DepositRetentionPage"
import { DatePickerPage } from "./pages/DatePickerPage"
import { PaymentCryptoPage } from "./pages/PaymentCryptoPage"
import { AuthPage } from "./pages/AuthPage"
import { PrivateRoute } from "@components/PrivateRoute"
import { InfocenterPage } from "./pages/InfocenterPage"
import { MyAssetsPage } from "./pages/MyAssetsPage"
import { AssetPage } from "./pages/AssetPage"
import {
  ADMIN_APPLICATIONS_PROJECTS_DETAILS_ROUTE,
  ADMIN_APPLICATIONS_PROJECTS_ROUTE,
  ADMIN_APPLICATIONS_ROUTE,
  ADMIN_MERCHANTS_ROUTE,
  ADMIN_MERCHANT_STATS_SUBROUTE,
  ADMIN_STATS_ROUTE,
  ASSETS_ROUTE,
} from "./constants/path-locations"
import { AdminFeesPage } from "./pages/AdminFeesPage"
import { AdminAreaLayout } from "./layouts/AdminAreaLayout"
import { AdminAuthPage } from "./pages/AdminAuthPage"
import { AdminMerchantsPage } from "./pages/AdminMerchantsPage"
import "rc-tooltip/assets/bootstrap.css"
import { AdminMerchantStats } from "./pages/AdminMerchantStats"
import { AdminStatsPage } from "./pages/AdminStats"
import { UserAreaNotFoundPage } from "./pages/UserAreaNotFoundPage"
import { PaymentPage } from "./pages/PaymentPage"
import { NotificationsPage } from "./pages/NotificationsPage"
import AdminApplicationsPage from "./pages/AdminApplicationsPage"
import AdminApplicationAreaLayout from "./layouts/AdminAreaLayout/AdminApplicationAreaLayout"
import ProjectsIncrease from "./pages/AdminApplicationsPage/ProjectsIncrease"
import AdminProject from "./pages/AdminApplicationsPage/AdminProject"
import { OperationsHistoryPage } from "./pages/OperationsHistoryPage"

import { useEffect } from "react"
import { OpenAPI } from "@awex-api"
import { getUser, checkUser, LoginStatus } from "../services/user.service"
import toast from "react-hot-toast"
import { signOut } from "@store/auth/slice"
import { useAppDispatch } from "@store/hooks"


export function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    checkLogin()
  }, [])

  async function checkLogin() {
    const user = getUser()

    if (!user) {
      dispatch(signOut())
      return
    }
    const userStatus: LoginStatus = await checkUser()

    switch(userStatus) {
      case 'Error':
        console.error('Ошибка связи с сервером. Проверьте соединение с интернетом или попробуйте зайти позже.')
        toast.error('Ошибка связи с сервером. Проверьте соединение с интернетом или попробуйте зайти позже.')
      break

      case 'Not authorized':
        console.error('Вам необходимо авторизоваться!')
        toast.error('Вам необходимо авторизоваться!')
        OpenAPI.TOKEN = undefined
        dispatch(signOut())
      break
    }
  }


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
          <Route path="/admin/commission" element={<AdminFeesPage />} />
          <Route path={ADMIN_STATS_ROUTE} element={<AdminStatsPage />} />
          <Route
            path={ADMIN_MERCHANTS_ROUTE}
            element={<AdminMerchantsPage />}
          />
          <Route
            path={`${ADMIN_MERCHANTS_ROUTE}/:merchantId${ADMIN_MERCHANT_STATS_SUBROUTE}`}
            element={<AdminMerchantStats />}
          />
          <Route
            path={ADMIN_APPLICATIONS_ROUTE}
            element={<AdminApplicationAreaLayout />}
          >
            <Route
              path={ADMIN_APPLICATIONS_ROUTE}
              element={<AdminApplicationsPage />}
            />
            <Route
              path={ADMIN_APPLICATIONS_PROJECTS_ROUTE}
              element={<ProjectsIncrease />}
            />
            <Route
              path={ADMIN_APPLICATIONS_PROJECTS_DETAILS_ROUTE}
              element={<AdminProject />}
            />
          </Route>
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
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="*" element={<UserAreaNotFoundPage />} />
          <Route path="/history" element={<OperationsHistoryPage />} />
        </Route>
        <Route path="/payment-crypto/:stage" element={<PaymentCryptoPage />} />
        <Route path="/payment/:uniqueId" element={<PaymentPage />} />
        <Route path="/index" element={<IndexPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/admin/auth" element={<AdminAuthPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}
