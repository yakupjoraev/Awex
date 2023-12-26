import { Helmet } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IndexPage } from "./pages/IndexPage";
// import { NotFoundPage } from "./pages/NotFoundPage"
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
import { ROUTE } from "./constants/path-locations";
import { AdminFeesPage } from "./pages/AdminFeesPage";
import { AdminAreaLayout } from "./layouts/AdminAreaLayout";
import { AdminAuthPage } from "./pages/AdminAuthPage";
import { AdminMerchantsPage } from "./pages/AdminMerchantsPage";
import "rc-tooltip/assets/bootstrap.css";
import { AdminMerchantStats } from "./pages/AdminMerchantStats";
import { AdminStatsPage } from "./pages/AdminStats";
import { UserAreaNotFoundPage } from "./pages/UserAreaNotFoundPage";
import { PaymentPage } from "./pages/PaymentPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import AdminApplicationsPage from "./pages/AdminApplicationsPage";
import AdminApplicationAreaLayout from "./layouts/AdminAreaLayout/AdminApplicationAreaLayout";
import ProjectsIncrease from "./pages/AdminApplicationsPage/ProjectsIncrease";
import { OperationsHistoryPage } from "./pages/OperationsHistoryPage";
import { InvoiceTemplates } from "./pages/InvoiceTemplates";
import { ReferralPage } from "./pages/ReferralPage";
import { ReferralAuthPage } from "./pages/ReferralAuthPage";
import { EmployeeActivityPage } from "./pages/EmployeeActivityPage";
import { useEffect } from "react";
import { OpenAPI } from "@awex-api";
import { getUser, checkUser, LoginStatus } from "../services/user.service";
import toast from "react-hot-toast";
import { signOut } from "@store/auth/slice";
import { useAppDispatch } from "@store/hooks";
import { msg } from "@constants/messages";
import AdminOfficeAddress from "./pages/AdminApplicationsPage/AdminOfficeAddresses";
import AdminOfficeAddressDetails from "./pages/AdminApplicationsPage/AdminOfficeAddressDetails";
import AdminProjectDetails from "./pages/AdminApplicationsPage/AdminProjectDetails";

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    checkLogin();
  }, []);

  async function checkLogin() {
    const user = getUser();

    if (!user) {
      dispatch(signOut());
      return;
    }
    const userStatus: LoginStatus = await checkUser();

    switch (userStatus) {
      case "Error":
        console.error(msg.SERVER_ERROR);
        toast.error(msg.SERVER_ERROR);
        break;

      case "Not authorized":
        console.error(msg.NEED_LOGIN_ERROR);
        toast.error(msg.NEED_LOGIN_ERROR);
        OpenAPI.TOKEN = undefined;
        dispatch(signOut());
        break;
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
          <Route
            path={ROUTE.ADMIN_COMMISSION_PATH}
            element={<AdminFeesPage />}
          />
          <Route
            path={ROUTE.ADMIN_MERCHANTS_PATH}
            element={<AdminMerchantsPage />}
          />
          <Route
            path={`${ROUTE.ADMIN_MERCHANTS_PATH}/:merchantId${ROUTE.ADMIN_MERCHANT_STATS_SUBROUTE_PATH}`}
            element={<AdminMerchantStats />}
          />
          <Route
            path={ROUTE.ADMIN_APPLICATIONS_PATH}
            element={<AdminApplicationAreaLayout />}
          >
            <Route
              path={ROUTE.ADMIN_APPLICATIONS_PATH}
              element={<AdminApplicationsPage />}
            />
            <Route
              path={ROUTE.ADMIN_APPLICATIONS_PROJECTS_PATH}
              element={<ProjectsIncrease />}
            />
            <Route
              path={`${ROUTE.ADMIN_APPLICATIONS_PROJECTS_DETAILS_PATH}`}
              element={<AdminProjectDetails />}
            />
            <Route
              path={ROUTE.ADMIN_APPLICATIONS_OFFICE_ADDRESS_PATH}
              element={<AdminOfficeAddress />}
            />
            <Route
              path={ROUTE.ADMIN_APPLICATIONS_OFFICE_ADDRESS_DETAILS_PATH}
              element={<AdminOfficeAddressDetails />}
            />
          </Route>

          <Route path={ROUTE.ADMIN_STATS_PATH} element={<AdminStatsPage />} />
        </Route>
        <Route
          element={
            <PrivateRoute>
              <UserAreaLayout />
            </PrivateRoute>
          }
        >
          <Route path={ROUTE.HOME_PAGE_PATH} element={<HomePage />} />
          <Route path={ROUTE.INVOICE_PATH} element={<InvoicePage />} />
          <Route
            path={ROUTE.INVOICE_TEMPLATES_PATH}
            element={<InvoiceTemplates />}
          />
          <Route
            path={ROUTE.SUCCESSFULLY_INVOICE_PATH}
            element={<InvoicesPage />}
          />
          <Route path={ROUTE.DEPOSITS_PATH} element={<DepositsPage />} />
          <Route
            path={ROUTE.DEPOSIT_RETENTION_PATH}
            element={<DepositRetentionPage />}
          />
          <Route path={ROUTE.PROJECTS_PATH} element={<MyProjectsPage />} />
          <Route
            path={`${ROUTE.PROJECTS_PROJECTID_PATH}/:projectId`}
            element={<EditProjectPage />}
          />
          <Route
            path={ROUTE.PROJECTS_NEW_PROJECT_PATH}
            element={<CreateProjectPage />}
          />
          <Route path={`${ROUTE.SETTINGS_PATH}/*`} element={<SettingsPage />} />
          <Route path={ROUTE.ASSETS_ROUTE_PATH} element={<MyAssetsPage />} />
          <Route
            path={`${ROUTE.ASSETS_ROUTE_ASSETID_ACTION_PATH}/:assetId/:action?`}
            element={<AssetPage />}
          />
          <Route path={ROUTE.INFOCENTER_PATH} element={<InfocenterPage />} />
          <Route path={ROUTE.DATE_PICKER_PATH} element={<DatePickerPage />} />
          <Route
            path={ROUTE.NOTIFICATIONS_PATH}
            element={<NotificationsPage />}
          />
          <Route
            path={ROUTE.HISTORY_PATH}
            element={<OperationsHistoryPage />}
          />
          <Route path={ROUTE.REFERRAL_PATH} element={<ReferralPage />} />
          <Route
            path={ROUTE.EMPLOYEE_ACTIVITY_PATH}
            element={<EmployeeActivityPage />}
          />
          <Route path="*" element={<UserAreaNotFoundPage />} />
        </Route>
        <Route
          path={`${ROUTE.PAYMENT_CRYPTO_STAGE_PATH}/:stage`}
          element={<PaymentCryptoPage />}
        />
        <Route
          path={`${ROUTE.PAYMENT_UNIQUEID_PATH}/:uniqueId`}
          element={<PaymentPage />}
        />
        <Route path={ROUTE.INDEX_PATH} element={<IndexPage />} />
        <Route path={ROUTE.AUTH_PATH} element={<AuthPage />} />
        <Route path={ROUTE.ADMIN_AUTH_PATH} element={<AdminAuthPage />} />
        <Route
          path={`${ROUTE.REFERRAL_LINK_PATH}/:referralId`}
          element={<ReferralAuthPage />}
        />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
